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
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Json = Elm.Native.Json.make(_elm),
   $Native$Ports = Elm.Native.Ports.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm);
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
   var t15DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -2.602 : _U.eq(n,
      5.0e-2) ? -1.753 : _U.eq(n,
      0.1) ? -1.341 : _E.If($moduleName,
      "between lines 273 and 275");
   };
   var t9DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -2.821 : _U.eq(n,
      5.0e-2) ? -1.833 : _U.eq(n,
      0.1) ? -1.383 : _E.If($moduleName,
      "between lines 267 and 269");
   };
   var t5DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -3.365 : _U.eq(n,
      5.0e-2) ? -2.015 : _U.eq(n,
      0.1) ? -1.476 : _E.If($moduleName,
      "between lines 261 and 263");
   };
   var t4DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -3.747 : _U.eq(n,
      5.0e-2) ? -2.132 : _U.eq(n,
      0.1) ? -1.533 : _E.If($moduleName,
      "between lines 255 and 257");
   };
   var t3DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -4.541 : _U.eq(n,
      5.0e-2) ? -2.35336 : _U.eq(n,
      0.1) ? -1.638 : _E.If($moduleName,
      "between lines 249 and 251");
   };
   var average = function (ns) {
      return F2(function (x,y) {
         return x / y;
      })($List.sum(ns))($Basics.toFloat($List.length(ns)));
   };
   var normalDistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -3.1 : _U.eq(n,
      5.0e-2) ? -1.64 : _U.eq(n,
      0.1) ? -1.28 : _E.If($moduleName,
      "between lines 238 and 240");
   };
   var tStdDevAdjustment = function (n) {
      return $Basics.sqrt(F2(function (x,
      y) {
         return x - y;
      })(1)(F2(function (x,y) {
         return x / y;
      })(2)($Basics.toFloat(n))));
   };
   var getStdDeviation = function (ns) {
      return $Basics.sqrt(F2(function (x,
      y) {
         return x * y;
      })(F2(function (x,y) {
         return x / y;
      })(1)($Basics.toFloat(F2(function (x,
      y) {
         return x + y;
      })(-1)($List.length(ns)))))($List.sum($List.map(function (r) {
         return Math.pow(r - average(ns),
         2);
      })(ns))));
   };
   var safeHead = function (xs) {
      return function () {
         switch (xs.ctor)
         {case "::":
            return $Maybe.Just(xs._0);
            case "[]":
            return $Maybe.Nothing;}
         _E.Case($moduleName,
         "between lines 68 and 70");
      }();
   };
   var safeTail = function (xs) {
      return $List.drop(1)(xs);
   };
   var safeTail$ = function (xs) {
      return $List.reverse($List.drop(1)($List.reverse(xs)));
   };
   var countBreaches = function (xs) {
      return F2(function (x,y) {
         return x * y;
      })(F2(function (x,y) {
         return x / y;
      })(1)($Basics.toFloat($List.length(xs))))(function (_v3) {
         return function () {
            switch (_v3.ctor)
            {case "_Tuple2":
               return $Basics.toFloat($List.length($List.filter(function (x) {
                    return _U.eq(x,true);
                 })($List.zipWith(F2(function (v,
                 r) {
                    return _U.cmp(A3($Maybe.maybe,
                    0,
                    $Basics.identity,
                    r),
                    v) < 0;
                 }))(safeTail(_v3._1))(safeTail$(_v3._0)))));}
            _E.Case($moduleName,
            "between lines 109 and 114");
         }();
      }($List.unzip(xs)));
   };
   var getReturns = function (xs) {
      return $List.zipWith(F2(function (x,
      y) {
         return A2($Basics.logBase,
         $Basics.e,
         x / y);
      }))(safeTail$(xs))(safeTail(xs));
   };
   var parameters = {_: {}
                    ,horizonSize: 5
                    ,lookback: 52
                    ,percentile: 5.0e-2};
   var backTest = function (xs) {
      return _U.cmp($List.length(xs),
      parameters.lookback * parameters.horizonSize) > 0 ? _L.append(_L.fromArray([{ctor: "_Tuple2"
                                                                                  ,_0: safeHead(xs)
                                                                                  ,_1: xs}]),
      backTest(safeTail(xs))) : _U.cmp($List.length(xs),
      parameters.lookback * parameters.horizonSize) < 1 ? _L.fromArray([{ctor: "_Tuple2"
                                                                        ,_0: safeHead(xs)
                                                                        ,_1: xs}]) : _E.If($moduleName,
      "between lines 100 and 103");
   };
   var lookback = function (xs) {
      return $List.take(parameters.lookback)(xs);
   };
   var horizon = function (ns) {
      return $List.map(function (_v11) {
         return function () {
            switch (_v11.ctor)
            {case "_Tuple2":
               return _v11._1;}
            _E.Case($moduleName,
            "on line 152, column 55 to 56");
         }();
      })($List.filter(function (_v7) {
         return function () {
            switch (_v7.ctor)
            {case "_Tuple2":
               return _U.eq(A2($Basics.rem,
                 _v7._0,
                 parameters.horizonSize),
                 0);}
            _E.Case($moduleName,
            "on line 151, column 56 to 92");
         }();
      })($List.indexedMap(F2(function (v0,
      v1) {
         return {ctor: "_Tuple2"
                ,_0: v0
                ,_1: v1};
      }))(ns)));
   };
   var getPercentileValue = function (ns) {
      return A2($List.foldl,
      function (_v19) {
         return function () {
            switch (_v19.ctor)
            {case "_Tuple2":
               return F2(function (x,y) {
                    return x + y;
                 })(_v19._1);}
            _E.Case($moduleName,
            "on line 178, column 52 to 56");
         }();
      },
      0)($List.filter(function (_v15) {
         return function () {
            switch (_v15.ctor)
            {case "_Tuple2":
               return _U.eq($Basics.round(F2(function (x,
                 y) {
                    return x * y;
                 })(parameters.percentile)($Basics.toFloat($List.length(ns)))),
                 _v15._0);}
            _E.Case($moduleName,
            "on line 176, column 34 to 106");
         }();
      })($List.indexedMap(F2(function (v0,
      v1) {
         return {ctor: "_Tuple2"
                ,_0: v0
                ,_1: v1};
      }))($List.sort(ns))));
   };
   var getNormalVar = function (ns) {
      return F2(function (x,y) {
         return x * y;
      })(normalDistParameters(parameters.percentile))(getStdDeviation(ns));
   };
   var getT3Var = function (ns) {
      return F2(function (x,y) {
         return x * y;
      })(tStdDevAdjustment(3))(getStdDeviation(ns)) * t3DistParameters(parameters.percentile);
   };
   var getT4Var = function (ns) {
      return F2(function (x,y) {
         return x * y;
      })(tStdDevAdjustment(4))(getStdDeviation(ns)) * t4DistParameters(parameters.percentile);
   };
   var getT5Var = function (ns) {
      return F2(function (x,y) {
         return x * y;
      })(tStdDevAdjustment(5))(getStdDeviation(ns)) * t5DistParameters(parameters.percentile);
   };
   var fileParameters = {_: {}
                        ,priceColumn: "Adjusted Close"};
   var process = function (x) {
      return $List.filterMap($String.toFloat)($List.map(A2($Dict.getOrElse,
      "",
      fileParameters.priceColumn))(dictionarify($List.map(splitUsingCommas)($String.lines(x)))));
   };
   var init = function (_v23) {
      return function () {
         switch (_v23.ctor)
         {case "_Tuple2":
            return function (i) {
                 return $String.show({ctor: "_Tuple2"
                                     ,_0: function (_v31) {
                                        return function () {
                                           switch (_v31.ctor)
                                           {case "_Tuple2":
                                              return _v31._1;}
                                           _E.Case($moduleName,
                                           "on line 90, column 53 to 54");
                                        }();
                                     }($List.head(i))
                                     ,_1: countBreaches(i)});
              }($List.map(function (_v27) {
                 return function () {
                    switch (_v27.ctor)
                    {case "_Tuple2":
                       return {ctor: "_Tuple2"
                              ,_0: _v27._0
                              ,_1: _v23._0(lookback(_v27._1))};}
                    _E.Case($moduleName,
                    "on line 87, column 41 to 62");
                 }();
              })(backTest(horizon(getReturns(process(_v23._1))))));}
         _E.Case($moduleName,
         "between lines 80 and 93");
      }();
   };
   var openFromFile = $Native$Ports.portIn("openFromFile",
   $Native$Ports.incomingSignal(function (v) {
      return typeof v === "string" || typeof v === "object" && v instanceof String ? v : _E.raise("invalid input, expecting JSString but got " + v);
   }));
   var outputNormal = $Native$Ports.portOut("outputNormal",
   $Native$Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2($Signal._op["<~"],
   function (x) {
      return init({ctor: "_Tuple2"
                  ,_0: getNormalVar
                  ,_1: x});
   },
   openFromFile));
   var outputHistorical = $Native$Ports.portOut("outputHistorical",
   $Native$Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2($Signal._op["<~"],
   function (x) {
      return init({ctor: "_Tuple2"
                  ,_0: getPercentileValue
                  ,_1: x});
   },
   openFromFile));
   var outputT3 = $Native$Ports.portOut("outputT3",
   $Native$Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2($Signal._op["<~"],
   function (x) {
      return init({ctor: "_Tuple2"
                  ,_0: getT3Var
                  ,_1: x});
   },
   openFromFile));
   var outputT4 = $Native$Ports.portOut("outputT4",
   $Native$Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2($Signal._op["<~"],
   function (x) {
      return init({ctor: "_Tuple2"
                  ,_0: getT4Var
                  ,_1: x});
   },
   openFromFile));
   var outputT5 = $Native$Ports.portOut("outputT5",
   $Native$Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2($Signal._op["<~"],
   function (x) {
      return init({ctor: "_Tuple2"
                  ,_0: getT5Var
                  ,_1: x});
   },
   openFromFile));
   var outputEwma = $Native$Ports.portOut("outputEwma",
   $Native$Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2($Signal._op["<~"],
   function (x) {
      return init({ctor: "_Tuple2"
                  ,_0: getT5Var
                  ,_1: x});
   },
   openFromFile));
   _elm.FileUpload.values = {_op: _op
                            ,fileParameters: fileParameters
                            ,parameters: parameters
                            ,safeTail$: safeTail$
                            ,safeTail: safeTail
                            ,safeHead: safeHead
                            ,init: init
                            ,backTest: backTest
                            ,countBreaches: countBreaches
                            ,process: process
                            ,lookback: lookback
                            ,horizon: horizon
                            ,getReturns: getReturns
                            ,getPercentileValue: getPercentileValue
                            ,getNormalVar: getNormalVar
                            ,getT3Var: getT3Var
                            ,getT4Var: getT4Var
                            ,getT5Var: getT5Var
                            ,getStdDeviation: getStdDeviation
                            ,tStdDevAdjustment: tStdDevAdjustment
                            ,normalDistParameters: normalDistParameters
                            ,average: average
                            ,t3DistParameters: t3DistParameters
                            ,t4DistParameters: t4DistParameters
                            ,t5DistParameters: t5DistParameters
                            ,t9DistParameters: t9DistParameters
                            ,t15DistParameters: t15DistParameters
                            ,dictionarify: dictionarify
                            ,splitUsingCommas: splitUsingCommas};
   return _elm.FileUpload.values;
};