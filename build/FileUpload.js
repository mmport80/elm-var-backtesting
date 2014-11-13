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
   $Stats = Elm.Stats.make(_elm),
   $String = Elm.String.make(_elm),
   $Utils = Elm.Utils.make(_elm);
   var getReturns = function (xs) {
      return $List.zipWith(F2(function (x,
      y) {
         return A2($Basics.logBase,
         $Basics.e,
         x / y);
      }))($Utils.safeTail$(xs))($Utils.safeTail(xs));
   };
   var horizonFilter = function (_v0) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return $List.map(function (_v8) {
                 return function () {
                    switch (_v8.ctor)
                    {case "_Tuple2": return _v8._1;}
                    _E.Case($moduleName,
                    "on line 181, column 55 to 56");
                 }();
              })($List.filter(function (_v4) {
                 return function () {
                    switch (_v4.ctor)
                    {case "_Tuple2":
                       return _U.eq(A2($Basics.rem,
                         _v4._0,
                         _v0._1),
                         0);}
                    _E.Case($moduleName,
                    "on line 180, column 56 to 71");
                 }();
              })($List.indexedMap(F2(function (v0,
              v1) {
                 return {ctor: "_Tuple2"
                        ,_0: v0
                        ,_1: v1};
              }))(_v0._0)));}
         _E.Case($moduleName,
         "between lines 179 and 181");
      }();
   };
   var lookback = function (_v12) {
      return function () {
         switch (_v12.ctor)
         {case "_Tuple2":
            return $List.take(_v12._0)(_v12._1);}
         _E.Case($moduleName,
         "on line 161, column 19 to 36");
      }();
   };
   var countBreaches = function (xs) {
      return F2(function (x,y) {
         return x * y;
      })(F2(function (x,y) {
         return x / y;
      })(1)($Basics.toFloat($List.length(xs))))(function (_v16) {
         return function () {
            switch (_v16.ctor)
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
                 }))($Utils.safeTail(_v16._1))($Utils.safeTail$(_v16._0)))));}
            _E.Case($moduleName,
            "between lines 137 and 142");
         }();
      }($List.unzip(xs)));
   };
   var backTest = function (_v20) {
      return function () {
         switch (_v20.ctor)
         {case "_Tuple4":
            return _L.append(_L.fromArray([function (_v26) {
                 return function () {
                    switch (_v26.ctor)
                    {case "_Tuple2":
                       return function (_v30) {
                            return function () {
                               switch (_v30.ctor)
                               {case "_Tuple2":
                                  return {ctor: "_Tuple2"
                                         ,_0: _v30._0
                                         ,_1: _v30._1};}
                               _E.Case($moduleName,
                               "on line 124, column 47 to 50");
                            }();
                         }({ctor: "_Tuple2"
                           ,_0: _v26._0
                           ,_1: function (ns) {
                              return _v20._3({ctor: "_Tuple2"
                                             ,_0: _v20._1
                                             ,_1: ns});
                           }(_v26._1)});}
                    _E.Case($moduleName,
                    "between lines 120 and 124");
                 }();
              }({ctor: "_Tuple2"
                ,_0: $Utils.safeHead(_v20._0)
                ,_1: function (ns) {
                   return lookback({ctor: "_Tuple2"
                                   ,_0: _v20._2
                                   ,_1: ns});
                }(_v20._0)})]),
              _U.cmp($List.length(_v20._0),
              _v20._2) < 1 ? _L.fromArray([]) : _U.cmp($List.length(_v20._0),
              _v20._2) > 0 ? function (ns) {
                 return backTest({ctor: "_Tuple4"
                                 ,_0: ns
                                 ,_1: _v20._1
                                 ,_2: _v20._2
                                 ,_3: _v20._3});
              }($Utils.safeTail(_v20._0)) : _E.If($moduleName,
              "between lines 127 and 131"));}
         _E.Case($moduleName,
         "between lines 117 and 131");
      }();
   };
   var generateModelLookbackCombos = function (_v34) {
      return function () {
         switch (_v34.ctor)
         {case "_Tuple2":
            return $List.concatMap(function (sm) {
                 return $List.map(function (l) {
                    return {ctor: "_Tuple2"
                           ,_0: sm
                           ,_1: l};
                 })(_v34._1);
              })(_v34._0);}
         _E.Case($moduleName,
         "between lines 65 and 68");
      }();
   };
   var Model = F2(function (a,b) {
      return {_: {}
             ,description: a
             ,functionName: b};
   });
   var Result = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,breaches: b
             ,horizon: f
             ,lookback: d
             ,model: c
             ,percentile: e
             ,var: a};
   });
   var horizon = $Native$Ports.portIn("horizon",
   $Native$Ports.incomingSignal(function (v) {
      return typeof v === "number" ? v : _E.raise("invalid input, expecting JSNumber but got " + v);
   }));
   var percentile = $Native$Ports.portIn("percentile",
   $Native$Ports.incomingSignal(function (v) {
      return typeof v === "number" ? v : _E.raise("invalid input, expecting JSNumber but got " + v);
   }));
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
   var init = function (_v38) {
      return function () {
         switch (_v38.ctor)
         {case "_Tuple5":
            return function (ms) {
                 return function (ns) {
                    return function (_v49) {
                       return function () {
                          switch (_v49.ctor)
                          {case "_Tuple2": return {_: {}
                                                  ,breaches: _v49._1
                                                  ,horizon: _v38._4
                                                  ,lookback: _v38._1
                                                  ,model: _v38._0.description
                                                  ,percentile: _v38._3
                                                  ,var: _v49._0};}
                          _E.Case($moduleName,
                          "on line 107, column 32 to 120");
                       }();
                    }(function (i) {
                       return {ctor: "_Tuple2"
                              ,_0: function (_v45) {
                                 return function () {
                                    switch (_v45.ctor)
                                    {case "_Tuple2":
                                       return _v45._1;}
                                    _E.Case($moduleName,
                                    "on line 100, column 53 to 54");
                                 }();
                              }($List.head(i))
                              ,_1: $Basics.abs(F2(function (x,
                              y) {
                                 return x + y;
                              })(0 - _v38._3)(countBreaches(i)))};
                    }(backTest({ctor: "_Tuple4"
                               ,_0: ns
                               ,_1: _v38._3
                               ,_2: _v38._1
                               ,_3: _v38._0.functionName})));
                 }($Stats.demean(getReturns(horizonFilter({ctor: "_Tuple2"
                                                          ,_0: ms
                                                          ,_1: _v38._4}))));
              }(process(_v38._2));}
         _E.Case($moduleName,
         "between lines 75 and 107");
      }();
   };
   var xoxo = $Native$Ports.portOut("xoxo",
   $Native$Ports.outgoingSignal(function (v) {
      return _L.toArray(v).map(function (v) {
         return {var: v.var
                ,breaches: v.breaches
                ,model: v.model
                ,lookback: v.lookback
                ,percentile: v.percentile
                ,horizon: v.horizon};
      });
   }),
   A2($Signal._op["~"],
   A2($Signal._op["~"],
   A2($Signal._op["<~"],
   F3(function (f,p,h) {
      return $List.sortBy(function (_) {
         return _.breaches;
      })($List.map(function (_v53) {
         return function () {
            switch (_v53.ctor)
            {case "_Tuple2":
               return init({ctor: "_Tuple5"
                           ,_0: _v53._0
                           ,_1: _v53._1
                           ,_2: f
                           ,_3: p
                           ,_4: h});}
            _E.Case($moduleName,
            "on line 50, column 43 to 63");
         }();
      })(generateModelLookbackCombos({ctor: "_Tuple2"
                                     ,_0: _L.fromArray([{_: {}
                                                        ,description: "Historical"
                                                        ,functionName: $Stats.getPercentileValue}
                                                       ,{_: {}
                                                        ,description: "Normal"
                                                        ,functionName: $Stats.getNormalVar}
                                                       ,{_: {}
                                                        ,description: "T3"
                                                        ,functionName: $Stats.getT3Var}
                                                       ,{_: {}
                                                        ,description: "T4"
                                                        ,functionName: $Stats.getT4Var}
                                                       ,{_: {}
                                                        ,description: "T5"
                                                        ,functionName: $Stats.getT5Var}])
                                     ,_1: _L.fromArray([20
                                                       ,60
                                                       ,252
                                                       ,504
                                                       ,756])})));
   }),
   openFromFile),
   percentile),
   horizon));
   _elm.FileUpload.values = {_op: _op
                            ,fileParameters: fileParameters
                            ,Result: Result
                            ,Model: Model
                            ,generateModelLookbackCombos: generateModelLookbackCombos
                            ,init: init
                            ,backTest: backTest
                            ,countBreaches: countBreaches
                            ,process: process
                            ,lookback: lookback
                            ,horizonFilter: horizonFilter
                            ,getReturns: getReturns};
   return _elm.FileUpload.values;
};Elm.Stats = Elm.Stats || {};
Elm.Stats.make = function (_elm) {
   "use strict";
   _elm.Stats = _elm.Stats || {};
   if (_elm.Stats.values)
   return _elm.Stats.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Stats",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm);
   var t15DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -2.602 : _U.eq(n,
      5.0e-2) ? -1.753 : _U.eq(n,
      0.1) ? -1.341 : _E.If($moduleName,
      "between lines 122 and 124");
   };
   var t9DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -2.821 : _U.eq(n,
      5.0e-2) ? -1.833 : _U.eq(n,
      0.1) ? -1.383 : _E.If($moduleName,
      "between lines 116 and 118");
   };
   var t5DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -3.365 : _U.eq(n,
      5.0e-2) ? -2.015 : _U.eq(n,
      0.1) ? -1.476 : _E.If($moduleName,
      "between lines 110 and 112");
   };
   var t4DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -3.747 : _U.eq(n,
      5.0e-2) ? -2.132 : _U.eq(n,
      0.1) ? -1.533 : _E.If($moduleName,
      "between lines 104 and 106");
   };
   var t3DistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -4.541 : _U.eq(n,
      5.0e-2) ? -2.35336 : _U.eq(n,
      0.1) ? -1.638 : _E.If($moduleName,
      "between lines 98 and 100");
   };
   var average = function (ns) {
      return F2(function (x,y) {
         return x / y;
      })($List.sum(ns))($Basics.toFloat($List.length(ns)));
   };
   var demean = function (ns) {
      return A2($List.map,
      function (n) {
         return n - average(ns);
      },
      ns);
   };
   var normalDistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -3.1 : _U.eq(n,
      5.0e-2) ? -1.64 : _U.eq(n,
      0.1) ? -1.28 : _E.If($moduleName,
      "between lines 78 and 80");
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
   var getT5Var = function (_v0) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return F2(function (x,y) {
                 return x * y;
              })(tStdDevAdjustment(5))(getStdDeviation(_v0._1)) * t5DistParameters(_v0._0);}
         _E.Case($moduleName,
         "between lines 40 and 42");
      }();
   };
   var getT4Var = function (_v4) {
      return function () {
         switch (_v4.ctor)
         {case "_Tuple2":
            return F2(function (x,y) {
                 return x * y;
              })(tStdDevAdjustment(4))(getStdDeviation(_v4._1)) * t4DistParameters(_v4._0);}
         _E.Case($moduleName,
         "between lines 35 and 37");
      }();
   };
   var getT3Var = function (_v8) {
      return function () {
         switch (_v8.ctor)
         {case "_Tuple2":
            return F2(function (x,y) {
                 return x * y;
              })(tStdDevAdjustment(3))(getStdDeviation(_v8._1)) * t3DistParameters(_v8._0);}
         _E.Case($moduleName,
         "between lines 30 and 32");
      }();
   };
   var getNormalVar = function (_v12) {
      return function () {
         switch (_v12.ctor)
         {case "_Tuple2":
            return F2(function (x,y) {
                 return x * y;
              })(normalDistParameters(_v12._0))(getStdDeviation(_v12._1));}
         _E.Case($moduleName,
         "between lines 25 and 27");
      }();
   };
   var getPercentileValue = function (_v16) {
      return function () {
         switch (_v16.ctor)
         {case "_Tuple2":
            return A2($List.foldl,
              function (_v24) {
                 return function () {
                    switch (_v24.ctor)
                    {case "_Tuple2":
                       return F2(function (x,y) {
                            return x + y;
                         })(_v24._1);}
                    _E.Case($moduleName,
                    "on line 18, column 52 to 56");
                 }();
              },
              0)($List.filter(function (_v20) {
                 return function () {
                    switch (_v20.ctor)
                    {case "_Tuple2":
                       return _U.eq($Basics.round(F2(function (x,
                         y) {
                            return x * y;
                         })(_v16._0)($Basics.toFloat(F2(function (x,
                         y) {
                            return x + y;
                         })(-1)($List.length(_v16._1))))),
                         _v20._0);}
                    _E.Case($moduleName,
                    "on line 16, column 34 to 96");
                 }();
              })($List.indexedMap(F2(function (v0,
              v1) {
                 return {ctor: "_Tuple2"
                        ,_0: v0
                        ,_1: v1};
              }))($List.sort(_v16._1))));}
         _E.Case($moduleName,
         "between lines 12 and 18");
      }();
   };
   _elm.Stats.values = {_op: _op
                       ,getPercentileValue: getPercentileValue
                       ,getNormalVar: getNormalVar
                       ,getT3Var: getT3Var
                       ,getT4Var: getT4Var
                       ,getT5Var: getT5Var
                       ,getStdDeviation: getStdDeviation
                       ,tStdDevAdjustment: tStdDevAdjustment
                       ,normalDistParameters: normalDistParameters
                       ,demean: demean
                       ,average: average
                       ,t3DistParameters: t3DistParameters
                       ,t4DistParameters: t4DistParameters
                       ,t5DistParameters: t5DistParameters
                       ,t9DistParameters: t9DistParameters
                       ,t15DistParameters: t15DistParameters};
   return _elm.Stats.values;
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