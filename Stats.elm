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


module Stats where

import List
--import FileUpload


--calc for various percentiles
-- return result for each percentile

--somehow add an input port for percentile
getPercentileValue : (Float,[Float]) -> Float
getPercentileValue (p,ns) = ns |> List.sort 
                        --create index / value tuples
                        |> List.indexedMap (,) 
                        |> List.filter (\ (i,_) -> 
                                (ns |> List.length |> (+) -1 |> toFloat |> (*) p |> round) == i )
                        --convert back to values
                        |> List.foldl ( \(i,v) -> (+) v ) 0

--normal
--get average
--get vol

getNormalVar : (Float,[Float]) -> Float                    
getNormalVar (p,ns) = ns    |> getStdDeviation
                        ---multiple by z                   
                        |> (*) (p |> normalDistParameters)
        
getT3Var : (Float,[Float]) -> Float
getT3Var (p,ns) =   (ns |> getStdDeviation |> (*) (3 |> tStdDevAdjustment) )
                *
                (p |> t3DistParameters)

getT4Var : (Float,[Float]) -> Float
getT4Var (p,ns) =   (ns |> getStdDeviation |> (*) (4 |> tStdDevAdjustment) )
                *
                (p |> t4DistParameters)

getT5Var : (Float,[Float]) -> Float
getT5Var (p,ns) =   (ns |> getStdDeviation |> (*) (5 |> tStdDevAdjustment) )
                *
                (p |> t5DistParameters)

{--
getEwma : ([Float],float) -> Float
getEwma (ns,decay) = ns
        |> List.head 
        |> (^2) 
        |> (*) (1-decay)
        |> (+)
        |> (*) decay
        |> (^2)
        |> getEwma        
--}

getStdDeviation : [Float] -> Float                  
getStdDeviation ns = ns    --return minus average
                        |> List.map (\r -> (r - (ns |> average) ) ^ 2)
                        |> List.sum
                        --divide by N-1
                        |> (*) (ns 
                                |> List.length 
                                |> (+) -1 
                                |> toFloat 
                                |> (/) 1
                                )
                        |> sqrt

tStdDevAdjustment : Int -> Float
tStdDevAdjustment n = n 
                |> toFloat 
                |> (/) 2
                |> (-) 1 
                |> sqrt

--one sided
normalDistParameters : Float -> Float
normalDistParameters n = if     | n == 0.01 -> -3.1
                                | n == 0.05 -> -1.64
                                | n == 0.1  -> -1.28


--demean

demean : [Float] -> [Float]
demean ns = List.map ( \n -> n - (ns |> average) ) ns

average : [Float] -> Float
average ns = ns |> List.length
                |> toFloat
                |> (/) (ns |> List.sum)




--one sided
t3DistParameters : Float -> Float
t3DistParameters n = if  | n == 0.01 -> -4.541
                         | n == 0.05 -> -2.35336
                         | n == 0.1  -> -1.638
     
--one sided
t4DistParameters : Float -> Float
t4DistParameters n = if  | n == 0.01 -> -3.747
                         | n == 0.05 -> -2.132
                         | n == 0.1  -> -1.533
             
--one sided
t5DistParameters : Float -> Float
t5DistParameters n = if  | n == 0.01 -> -3.365
                         | n == 0.05 -> -2.015
                         | n == 0.1  -> -1.476

--one sided
t9DistParameters : Float -> Float
t9DistParameters n = if  | n == 0.01 -> -2.821
                         | n == 0.05 -> -1.833
                         | n == 0.1  -> -1.383     


t15DistParameters : Float -> Float
t15DistParameters n = if  | n == 0.01 -> -2.602
                          | n == 0.05 -> -1.753
                          | n == 0.1  -> -1.341   
