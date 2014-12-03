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


module FileUpload where

import String
import List
import Dict
import Utils (..)


--import Ports (..)

------------------------------------------------------------------------

--calculate var
fileParameters = {priceColumn = "Adjusted Close"}


------------------------------------------------------------------------



------------------------------------------------------------------------

port openFromFile : Signal String

--
port processFile :  Signal [Float]
port processFile =  process <~ openFromFile





--
process : String -> [Float]
process x = x   |> String.lines 
                |> List.map splitUsingCommas 
                |> dictionarify 
                --convert back to a list in order to ouput
                |> List.map (Dict.getOrElse "" fileParameters.priceColumn)
                |> List.filterMap String.toFloat

