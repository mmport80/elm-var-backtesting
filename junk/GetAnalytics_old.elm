{--
Copyright (C) 2014 John Orford

This file is part of elm-var-backtesting.

elm-var-backtesting is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

elm-var-backtesting is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with elm-var-backtesting.  If not, see <http://www.gnu.org/licenses/>.
--}

module GetAnalytics where

import String
import List
import Dict

import Maybe

import Stats (..)
import Utils (..)

import Trampoline (..)

------------------------------------------------------------------------

port percentile : Signal Float
port horizon : Signal Int
port lookbackP : Signal Int
port statModel : Signal String
port priceData : Signal [Float]


type Result = {var:Float,breaches:Float, model:String, lookback:Int, percentile:Float, horizon:Int}
type Model = {description:String, functionName : (Float,[Float]) -> Float }

port outputResult :  Signal Result
port outputResult =  (\pd pr ho lo st -> 
                init (pd, pr, ho, lo, (lookupstatmodel st))
                )          <~ priceData ~ percentile ~ horizon ~ lookbackP ~ statModel


modelList = [   {description="T5",              functionName=getT5Var},
                {description="T4",              functionName=getT4Var},
                {description="T3",              functionName=getT3Var},
                {description="Normal",          functionName=getNormalVar},
                {description="Historical",      functionName=getPercentileValue}
                ]

lookupstatmodel : String -> Model
lookupstatmodel x = modelList |> List.filter (\y -> x == y.description) |> List.head

------------------------------------------------------------------------

--aim to have every step obviously piped together
init: ( [Float], Float, Int, Int, Model) -> Result
init (fileData, p, h, l, statModel) = fileData      --process file    
                |> \ms -> (ms, h)
                --filters in every 'horizonth' price
                |> horizonFilter 
                --calculates periodic returns
                |> getReturns
                
                --Demean
                |> demean
                
                --pass p and statModel into backtest
                |> \ns -> (ns,p,l,statModel.functionName)
                |> backTest
                --calculates var for current and each previous period
                
                --
                --get results
                |> (\i ->(
                        --find current var
                        --sure this is current var??????????????
                        i |> List.head |> \(_,v) -> v,
                        --count var breaches
                        i |> countBreaches
                        --get difference with percentile
                          |> (+) -p
                          -- |> abs
                        ))
                        
                |> List.filter ( \(v,b) -> not (b == -p)) 
                --translate var into dollar value, multiply (1-e^1+r) by current price
                |> (\(v,b) -> {var= v, breaches= b, model= (statModel.description), lookback=l, percentile=p, horizon=h})
                

--recursive!!
--var number (n+1), return (n)
--latest
backTest : ([Float],Float,Int,(Float,[Float]) -> Float) -> [(Maybe Float,Float)]
--ensure that comparison return is <horizon> in the future
backTest (xs,p,l,statModel) =  
                        [
                                (xs |> safeHead, xs |> \ns -> (l,ns) |> lookback ) 
                                |> \(r,rs) -> 
                                        (r, rs 
                                                |> \ns -> 
                                                        (p,ns) 
                                                        |> statModel ) 
                                |> \(r,v) -> (r,v)
                                ]
                        ++
                        if 
                           | (xs |> List.length) <= l ->    
                                []
                           | (xs |> List.length) > l  ->       
                                (xs |> safeTail |> \ns -> (ns,p,l,statModel) |> backTest)

{-
backTestT' : [Float] -> [(Float,[Float])]
backTestT' ns = trampoline (backTestT [] ns)
                
backTestT : [(Float,[Float])] -> [Float] -> Trampoline [(Float,[Float])]
backTestT accum ns = 
        case ns of
                []      -> Done accum 
                h::t    -> Continue (\() -> 
                                backTestT 
                                ( accum :: (h, lookback (20,t) ) )  
                                t 
                                )


lookback' : Int -> [Float] -> [Float]
lookback' l xs = xs |> List.take l

--}

countBreaches : [(Maybe Float,Float)] -> Float
countBreaches xs = xs   |> unzip 
                        |> (    \(rs, vs) -> 
                                safeTail' rs
                                |> (safeTail vs 
                                        |> zipWith ( \v r -> (Maybe.maybe 0 (identity) r) < v )    )
                                |> List.filter (\x -> x == True)
                                |> List.length
                                |> toFloat
                                )
                        |> (*) (xs |> List.length |> toFloat |> (/) 1)
                 
lookback : (Int,[Float]) -> [Float]
lookback (l,xs) = xs |> List.take l


--horizon - 1 day, 1 week, 1 month
--sampling
--need to add dynamic bit for % 5 etc.
horizonFilter : ([Float],Int) -> [Float]
horizonFilter (ns,h) = ns   |> List.indexedMap      (,) 
                  |> List.filter          ( \(i,v) -> (i `rem` h) == 0 )
                  |> List.map             ( \(i,v) -> v )


getReturns : [Float] -> [Float]
getReturns xs = xs      |> safeTail
                        --get both ends of the list and zip 'em up to get returns
                        |> ( xs         
                                        --remove last element - 'opposite of tail'
                                        |> safeTail'
                                        |> List.zipWith ( \x y -> logBase e (x/y) )
                                        )
