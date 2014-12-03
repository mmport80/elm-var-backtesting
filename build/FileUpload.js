Elm.FileUpload = Elm.FileUpload || {};
Elm.FileUpload.make = function (_elm) {
   "use strict";
   _elm.FileUpload = _elm.FileUpload || {};
   if (_elm.FileUpload.values)
   return _elm.FileUpload.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "FileUpload",
   $Basics = Elm.Basics.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $List = Elm.List.make(_elm),
   $Native$Json = Elm.Native.Json.make(_elm),
   $Native$Ports = Elm.Native.Ports.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $Utils = Elm.Utils.make(_elm);
   var openFromFile = $Native$Ports.portIn("openFromFile",
   $Native$Ports.incomingSignal(function (v) {
      return typeof v === "string" || typeof v === "object" && v instanceof String ? v : _E.raise("invalid input, expecting JSString but got " + v);
   }));
   var fileParameters = {_: {}
                        ,priceColumn: "Adjusted Close"};
   var process = function (x) {
      return $List.filterMap($String.toFloat)($List.map(A2($Dict.getOrElse,
      "",
      fileParameters.priceColumn))($Utils.dictionarify($List.map($Utils.splitUsingCommas)($String.lines(x)))));
   };
   var processFile = $Native$Ports.portOut("processFile",
   $Native$Ports.outgoingSignal(function (v) {
      return _L.toArray(v).map(function (v) {
         return v;
      });
   }),
   A2($Signal._op["<~"],
   process,
   openFromFile));
   _elm.FileUpload.values = {_op: _op
                            ,fileParameters: fileParameters
                            ,process: process};
   return _elm.FileUpload.values;
};Elm.Utils = Elm.Utils || {};
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
         "between lines 51 and 53");
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