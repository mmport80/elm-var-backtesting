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

module Utils where


import Maybe
import Dict
import List
import String

--
dictionarify : [[String]] -> [Dict.Dict comparable String]
dictionarify xss = xss  |> List.tail
                        |> List.map 
                        (xss    |> List.head  
                                |> List.zipWith (\x y -> (x, y) )  )
                        |> List.map Dict.fromList


-- 
splitUsingCommas : String -> [String]
splitUsingCommas x = x |> String.split ","


safeTail' : [a] -> [a]
safeTail' xs = xs       |> List.reverse 
                        |> List.drop 1
                        |> List.reverse

safeTail : [a] -> [a]
safeTail xs = xs |> List.drop 1

safeHead : [a] -> Maybe a
safeHead xs = case xs of
                hd::tl -> Just hd
                []     -> Nothing
