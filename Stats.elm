{--
Copyright (C) 2014 John Orford

This file is part of VARIFY.

VARIFY is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

VARIFY is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with VARIFY.  If not, see <http://www.gnu.org/licenses/>.
--}


module Stats where

import List

type Result = {var:Float,breaches:Float, model:String, lookback:Int, percentile:Float, horizon:Int, kupiecTest:Float}

--import FileUpload


--calc for various percentiles
-- return result for each percentile
getPercentileValue : Float -> [Float] -> Float
getPercentileValue p ns = ns |> List.sort 
                        --create index / value tuples
                        |> List.indexedMap (,) 
                        |> List.filter (\ (i,_) -> 
                                (ns |> List.length |> (+) -1 |> toFloat |> (*) p |> round) == i )
                        --convert back to values
                        |> List.foldl ( \(i,v) -> (+) v ) 0

--normal
getNormalVar : Float -> [Float] -> Float                    
getNormalVar p ns = ns    |> getStdDeviation
                        ---multiple by z                   
                        |> (*) (p |> normalDistParameters)
 
 
getNormalVarEWMA : Float -> [Float] -> Float                    
getNormalVarEWMA p ns = ns
                        |> getEwmaStdDeviation 0.94
                        ---multiply by z                   
                        |> (*) (p |> normalDistParameters)
                        
                              
        
--t stats
getT3Var : Float -> [Float] -> Float
getT3Var pr ns = getTVar pr 3 ns

getT4Var : Float -> [Float] -> Float
getT4Var pr ns = getTVar pr 4 ns

getT5Var : Float -> [Float] -> Float
getT5Var pr ns =  getTVar pr 5 ns

getTVar : Float -> Int -> [Float] -> Float
getTVar pr dof ns =   (ns |> getStdDeviation |> (*) (dof |> tStdDevAdjustment) )
                        *
                        (tTable |> List.filter (\x -> x.p == pr && x.dof == dof)  |> List.head |> \x -> x.z)

 


--std dev stats
getStdDeviation : [Float] -> Float                  
getStdDeviation ns = ns --return minus average
                        --this needed, after series has been demeaned?
                        |> List.map (\r -> (r - (ns |> average) ) ^ 2)
                        |> List.sum
                        --divide by N-1
                        |> (*) (ns 
                                |> List.length 
                                |> toFloat 
                                |> (+) -1
                                |> (/) 1
                                )
                        |> sqrt

getEwmaStdDeviation : Float -> [Float] -> Float
getEwmaStdDeviation d ns = ns 
                        |> List.indexedMap (\i n -> (d^(toFloat i)) * (1.0-d) * n)
                        |> List.sum
                        |> sqrt

tStdDevAdjustment : Int -> Float
tStdDevAdjustment n = n 
                |> toFloat 
                |> (/) 1
                |> (*) ( (toFloat n) - 2 )
                |> sqrt


--demean
demean : [Float] -> [Float]
demean ns = List.map ( \n -> n - (ns |> average) ) ns

average : [Float] -> Float
average ns = ns |> List.length
                |> toFloat
                |> (/) (ns |> List.sum)


--lookup values
--one sided
normalDistParameters : Float -> Float
normalDistParameters n = if     | n == 0.01 -> -3.1
                                | n == 0.05 -> -1.64
                                | otherwise  -> -1.28

tTable = [
        {dof=3,p=0.01,z=-4.541}  ,{dof=3,p=0.05,z=-2.35336},    {dof=3,p=0.1,z=-1.638},
        {dof=4,p=0.01,z=-3.747}  ,{dof=4,p=0.05,z=-2.132},      {dof=4,p=0.1,z=-1.533},
        {dof=5,p=0.01,z=-3.365}  ,{dof=5,p=0.05,z=-2.015},      {dof=5,p=0.1,z=-1.476},
        {dof=9,p=0.01,z=-2.821}  ,{dof=9,p=0.05,z=-1.833},      {dof=9,p=0.1,z=-1.383},
        {dof=15,p=0.01,z=-2.602} ,{dof=15,p=0.05,z=-1.753},     {dof=15,p=0.1,z=-1.341}
        ]

x2Table = [
        {dof=1,p=0.01,x2=6.635},{dof=1,p=0.05,x2=3.841},{dof=1,p=0.1,x2=2.706},
        {dof=1,p=0.9,x2=0.016},
        {dof=1,p=0.95,x2=0.004},{dof=1,p=0.975,x2=0.000982},{dof=1,p=0.995,x2=0.0000393}
        ]


--kupiec test
kTest : Float -> Float -> Float -> Float
kTest p ss b = 
                -2 * (    ( logBase e ((1-p)^(ss-b))    )
                        + ( logBase e (p^b)             )
                        - ( logBase e ((1-b/ss)^(ss-b)) )
                        - ( logBase e ((b/ss)^b)        )
                        )
                        
                        

