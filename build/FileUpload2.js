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
   $List = Elm.List.make(_elm),
   $Native$Json = Elm.Native.Json.make(_elm),
   $Native$Ports = Elm.Native.Ports.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm);
   var splitWithCommas = function (x) {
      return $String.split(",")(x);
   };
   var zipUp = function (xss) {
      return $List.map($List.zipWith(F2(function (x,
      y) {
         return {ctor: "_Tuple2"
                ,_0: x
                ,_1: y};
      }))($List.head(xss)))($List.tail(xss));
   };
   var process = function (x) {
      return zipUp($List.map(splitWithCommas)($String.lines(x)));
   };
   var openFromFile = $Native$Ports.portIn("openFromFile",
   $Native$Ports.incomingSignal(function (v) {
      return typeof v === "string" || typeof v === "object" && v instanceof String ? v : _E.raise("invalid input, expecting JSString but got " + v);
   }));
   var output = $Native$Ports.portOut("output",
   $Native$Ports.outgoingSignal(function (v) {
      return _L.toArray(v).map(function (v) {
         return _L.toArray(v).map(function (v) {
            return [v._0,v._1];
         });
      });
   }),
   A2($Signal._op["<~"],
   process,
   openFromFile));
   var PriceData = F8(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h) {
      return _U.insert("adjusted_close",
      g,
      _U.insert("volume",
      f,
      _U.insert("close",
      e,
      _U.insert("low",
      d,
      _U.insert("high",
      c,
      _U.insert("openx",
      b,
      _U.insert("date",a,h)))))));
   });
   _elm.FileUpload.values = {_op: _op
                            ,PriceData: PriceData
                            ,process: process
                            ,zipUp: zipUp
                            ,splitWithCommas: splitWithCommas};
   return _elm.FileUpload.values;
};