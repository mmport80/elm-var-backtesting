Elm.Utils = Elm.Utils || {};
Elm.Utils.make = function (_elm) {
   "use strict";
   _elm.Utils = _elm.Utils || {};
   if (_elm.Utils.values)
   return _elm.Utils.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Utils",
   $Basics = Elm.Basics.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $String = Elm.String.make(_elm);
   var safeHead = function (xs) {
      return function () {
         switch (xs.ctor)
         {case "::":
            return $Maybe.Just(xs._0);
            case "[]":
            return $Maybe.Nothing;}
         _E.Case($moduleName,
         "between lines 32 and 34");
      }();
   };
   var safeTail = function (xs) {
      return $List.drop(1)(xs);
   };
   var safeTail$ = function (xs) {
      return $List.reverse($List.drop(1)($List.reverse(xs)));
   };
   var splitUsingCommas = function (x) {
      return $String.split(",")(x);
   };
   var dictionarify = function (xss) {
      return $List.map($Dict.fromList)($List.map($List.zipWith(F2(function (x,
      y) {
         return {ctor: "_Tuple2"
                ,_0: x
                ,_1: y};
      }))($List.head(xss)))($List.tail(xss)));
   };
   _elm.Utils.values = {_op: _op
                       ,dictionarify: dictionarify
                       ,splitUsingCommas: splitUsingCommas
                       ,safeTail$: safeTail$
                       ,safeTail: safeTail
                       ,safeHead: safeHead};
   return _elm.Utils.values;
};