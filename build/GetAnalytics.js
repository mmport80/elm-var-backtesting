Elm.GetAnalytics = Elm.GetAnalytics || {};
Elm.GetAnalytics.make = function (_elm) {
   "use strict";
   _elm.GetAnalytics = _elm.GetAnalytics || {};
   if (_elm.GetAnalytics.values)
   return _elm.GetAnalytics.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "GetAnalytics",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Json = Elm.Native.Json.make(_elm),
   $Native$Ports = Elm.Native.Ports.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Stats = Elm.Stats.make(_elm),
   $Trampoline = Elm.Trampoline.make(_elm),
   $Utils = Elm.Utils.make(_elm);
   var getReturns = function (xs) {
      return $List.zipWith(F2(function (x,
      y) {
         return A2($Basics.logBase,
         $Basics.e,
         x / y);
      }))($Utils.safeTail$(xs))($Utils.safeTail(xs));
   };
   var horizonFilter = F2(function (h,
   ns) {
      return $List.map(function (_v4) {
         return function () {
            switch (_v4.ctor)
            {case "_Tuple2": return _v4._1;}
            _E.Case($moduleName,
            "on line 151, column 61 to 62");
         }();
      })($List.filter(function (_v0) {
         return function () {
            switch (_v0.ctor)
            {case "_Tuple2":
               return _U.eq(A2($Basics.rem,
                 _v0._0,
                 h),
                 0);}
            _E.Case($moduleName,
            "on line 150, column 62 to 77");
         }();
      })($List.indexedMap(F2(function (v0,
      v1) {
         return {ctor: "_Tuple2"
                ,_0: v0
                ,_1: v1};
      }))(ns)));
   });
   var lookback = F2(function (l,
   xs) {
      return $List.take(l)(xs);
   });
   var countBreaches = function (xs) {
      return function (_v8) {
         return function () {
            switch (_v8.ctor)
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
                 }))($Utils.safeTail(_v8._1))($Utils.safeTail$(_v8._0)))));}
            _E.Case($moduleName,
            "between lines 133 and 138");
         }();
      }($List.unzip(xs));
   };
   var backTestT = F3(function (accum,
   l,
   ns) {
      return _U.cmp($List.length(ns),
      l + 1) < 0 ? $Trampoline.Done(accum) : $Trampoline.Continue(function (_v12) {
         return function () {
            switch (_v12.ctor)
            {case "_Tuple0":
               return A2(backTestT,
                 A2($List._op["::"],
                 {ctor: "_Tuple2"
                 ,_0: $Utils.safeHead(ns)
                 ,_1: $Utils.safeTail(lookback(l)(ns))},
                 accum),
                 l)($List.drop(l)(ns));}
            _E.Case($moduleName,
            "between lines 114 and 124");
         }();
      });
   });
   var backTestT$ = F4(function (p,
   l,
   statModel,
   ns) {
      return $List.map(function (_v14) {
         return function () {
            switch (_v14.ctor)
            {case "_Tuple2":
               return {ctor: "_Tuple2"
                      ,_0: _v14._0
                      ,_1: statModel(p)(_v14._1)};}
            _E.Case($moduleName,
            "on line 105, column 50 to 70");
         }();
      })($List.reverse($Trampoline.trampoline(A3(backTestT,
      _L.fromArray([]),
      l,
      ns))));
   });
   var init = F5(function (fileData,
   p,
   h,
   l,
   statModel) {
      return function (_v22) {
         return function () {
            switch (_v22.ctor)
            {case "_Tuple3": return {_: {}
                                    ,breaches: _v22._1
                                    ,horizon: h
                                    ,kupiecTest: A3($Stats.kTest,
                                    p,
                                    $Basics.toFloat(_v22._2),
                                    _v22._1)
                                    ,lookback: l
                                    ,model: statModel.description
                                    ,percentile: p
                                    ,sampleSize: _v22._2
                                    ,var: _v22._0};}
            _E.Case($moduleName,
            "between lines 87 and 95");
         }();
      }(function (i) {
         return {ctor: "_Tuple3"
                ,_0: A2($Maybe.maybe,
                0,
                function (_v18) {
                   return function () {
                      switch (_v18.ctor)
                      {case "_Tuple2":
                         return _v18._1;}
                      _E.Case($moduleName,
                      "on line 77, column 67 to 68");
                   }();
                })($Utils.safeHead(i))
                ,_1: countBreaches(i)
                ,_2: $List.length(i)};
      }(A3(backTestT$,
      p,
      l,
      statModel.functionName)($Stats.demean(getReturns(horizonFilter(h)(fileData))))));
   });
   var modelList = _L.fromArray([{_: {}
                                 ,description: "T5"
                                 ,functionName: $Stats.getT5Var}
                                ,{_: {}
                                 ,description: "T4"
                                 ,functionName: $Stats.getT4Var}
                                ,{_: {}
                                 ,description: "T3"
                                 ,functionName: $Stats.getT3Var}
                                ,{_: {}
                                 ,description: "Normal"
                                 ,functionName: $Stats.getNormalVar}
                                ,{_: {}
                                 ,description: "Historical"
                                 ,functionName: $Stats.getPercentileValue}
                                ,{_: {}
                                 ,description: "Normal EWMA"
                                 ,functionName: $Stats.getNormalVarEWMA}]);
   var lookupstatmodel = function (x) {
      return $List.head($List.filter(function (y) {
         return _U.eq(x,
         y.description);
      })(modelList));
   };
   var Model = F2(function (a,b) {
      return {_: {}
             ,description: a
             ,functionName: b};
   });
   var Result = F8(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h) {
      return {_: {}
             ,breaches: b
             ,horizon: f
             ,kupiecTest: h
             ,lookback: d
             ,model: c
             ,percentile: e
             ,sampleSize: g
             ,var: a};
   });
   var priceData = $Native$Ports.portIn("priceData",
   $Native$Ports.incomingSignal(function (v) {
      return _U.isJSArray(v) ? _L.fromArray(v.map(function (v) {
         return typeof v === "number" ? v : _E.raise("invalid input, expecting JSNumber but got " + v);
      })) : _E.raise("invalid input, expecting JSArray but got " + v);
   }));
   var statModel = $Native$Ports.portIn("statModel",
   $Native$Ports.incomingSignal(function (v) {
      return typeof v === "string" || typeof v === "object" && v instanceof String ? v : _E.raise("invalid input, expecting JSString but got " + v);
   }));
   var lookbackP = $Native$Ports.portIn("lookbackP",
   $Native$Ports.incomingSignal(function (v) {
      return typeof v === "number" ? v : _E.raise("invalid input, expecting JSNumber but got " + v);
   }));
   var horizon = $Native$Ports.portIn("horizon",
   $Native$Ports.incomingSignal(function (v) {
      return typeof v === "number" ? v : _E.raise("invalid input, expecting JSNumber but got " + v);
   }));
   var percentile = $Native$Ports.portIn("percentile",
   $Native$Ports.incomingSignal(function (v) {
      return typeof v === "number" ? v : _E.raise("invalid input, expecting JSNumber but got " + v);
   }));
   var outputResult = $Native$Ports.portOut("outputResult",
   $Native$Ports.outgoingSignal(function (v) {
      return {var: v.var
             ,breaches: v.breaches
             ,model: v.model
             ,lookback: v.lookback
             ,percentile: v.percentile
             ,horizon: v.horizon
             ,sampleSize: v.sampleSize
             ,kupiecTest: v.kupiecTest};
   }),
   A2($Signal._op["~"],
   A2($Signal._op["~"],
   A2($Signal._op["~"],
   A2($Signal._op["~"],
   A2($Signal._op["<~"],
   F5(function (pd,pr,ho,lo,st) {
      return A5(init,
      pd,
      pr,
      ho,
      lo,
      lookupstatmodel(st));
   }),
   priceData),
   percentile),
   horizon),
   lookbackP),
   statModel));
   _elm.GetAnalytics.values = {_op: _op
                              ,Result: Result
                              ,Model: Model
                              ,modelList: modelList
                              ,lookupstatmodel: lookupstatmodel
                              ,init: init
                              ,backTestT$: backTestT$
                              ,backTestT: backTestT
                              ,countBreaches: countBreaches
                              ,lookback: lookback
                              ,horizonFilter: horizonFilter
                              ,getReturns: getReturns};
   return _elm.GetAnalytics.values;
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
   var kTest = F3(function (p,
   ss,
   b) {
      return -2 * (A2($Basics.logBase,
      $Basics.e,
      Math.pow(1 - p,
      ss - b)) + A2($Basics.logBase,
      $Basics.e,
      Math.pow(p,
      b)) - A2($Basics.logBase,
      $Basics.e,
      Math.pow(1 - b / ss,
      ss - b)) - A2($Basics.logBase,
      $Basics.e,
      Math.pow(b / ss,b)));
   });
   var x2Table = _L.fromArray([{_: {}
                               ,dof: 1
                               ,p: 1.0e-2
                               ,x2: 6.635}
                              ,{_: {}
                               ,dof: 1
                               ,p: 5.0e-2
                               ,x2: 3.841}
                              ,{_: {},dof: 1,p: 0.1,x2: 2.706}
                              ,{_: {}
                               ,dof: 1
                               ,p: 0.9
                               ,x2: 1.6e-2}
                              ,{_: {}
                               ,dof: 1
                               ,p: 0.95
                               ,x2: 4.0e-3}
                              ,{_: {}
                               ,dof: 1
                               ,p: 0.975
                               ,x2: 9.82e-4}
                              ,{_: {}
                               ,dof: 1
                               ,p: 0.995
                               ,x2: 3.93e-5}]);
   var tTable = _L.fromArray([{_: {}
                              ,dof: 3
                              ,p: 1.0e-2
                              ,z: -4.541}
                             ,{_: {}
                              ,dof: 3
                              ,p: 5.0e-2
                              ,z: -2.35336}
                             ,{_: {},dof: 3,p: 0.1,z: -1.638}
                             ,{_: {}
                              ,dof: 4
                              ,p: 1.0e-2
                              ,z: -3.747}
                             ,{_: {}
                              ,dof: 4
                              ,p: 5.0e-2
                              ,z: -2.132}
                             ,{_: {},dof: 4,p: 0.1,z: -1.533}
                             ,{_: {}
                              ,dof: 5
                              ,p: 1.0e-2
                              ,z: -3.365}
                             ,{_: {}
                              ,dof: 5
                              ,p: 5.0e-2
                              ,z: -2.015}
                             ,{_: {},dof: 5,p: 0.1,z: -1.476}
                             ,{_: {}
                              ,dof: 9
                              ,p: 1.0e-2
                              ,z: -2.821}
                             ,{_: {}
                              ,dof: 9
                              ,p: 5.0e-2
                              ,z: -1.833}
                             ,{_: {},dof: 9,p: 0.1,z: -1.383}
                             ,{_: {}
                              ,dof: 15
                              ,p: 1.0e-2
                              ,z: -2.602}
                             ,{_: {}
                              ,dof: 15
                              ,p: 5.0e-2
                              ,z: -1.753}
                             ,{_: {}
                              ,dof: 15
                              ,p: 0.1
                              ,z: -1.341}]);
   var normalDistParameters = function (n) {
      return _U.eq(n,
      1.0e-2) ? -3.1 : _U.eq(n,
      5.0e-2) ? -1.64 : -1.28;
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
   var tStdDevAdjustment = function (n) {
      return $Basics.sqrt(F2(function (x,
      y) {
         return x * y;
      })($Basics.toFloat(n) - 2)(F2(function (x,
      y) {
         return x / y;
      })(1)($Basics.toFloat(n))));
   };
   var getEwmaStdDeviation = F2(function (d,
   ns) {
      return $Basics.sqrt($List.sum($List.indexedMap(F2(function (i,
      n) {
         return Math.pow(d,
         $Basics.toFloat(i)) * (1.0 - d) * n;
      }))(ns)));
   });
   var getStdDeviation = function (ns) {
      return $Basics.sqrt(F2(function (x,
      y) {
         return x * y;
      })(F2(function (x,y) {
         return x / y;
      })(1)(F2(function (x,y) {
         return x + y;
      })(-1)($Basics.toFloat($List.length(ns)))))($List.sum($List.map(function (r) {
         return Math.pow(r - average(ns),
         2);
      })(ns))));
   };
   var getTVar = F3(function (pr,
   dof,
   ns) {
      return F2(function (x,y) {
         return x * y;
      })(tStdDevAdjustment(dof))(getStdDeviation(ns)) * function (x) {
         return x.z;
      }($List.head($List.filter(function (x) {
         return _U.eq(x.p,
         pr) && _U.eq(x.dof,dof);
      })(tTable)));
   });
   var getT5Var = F2(function (pr,
   ns) {
      return A3(getTVar,pr,5,ns);
   });
   var getT4Var = F2(function (pr,
   ns) {
      return A3(getTVar,pr,4,ns);
   });
   var getT3Var = F2(function (pr,
   ns) {
      return A3(getTVar,pr,3,ns);
   });
   var getNormalVarEWMA = F2(function (p,
   ns) {
      return F2(function (x,y) {
         return x * y;
      })(normalDistParameters(p))(getEwmaStdDeviation(0.94)(ns));
   });
   var getNormalVar = F2(function (p,
   ns) {
      return F2(function (x,y) {
         return x * y;
      })(normalDistParameters(p))(getStdDeviation(ns));
   });
   var getPercentileValue = F2(function (p,
   ns) {
      return A2($List.foldl,
      function (_v4) {
         return function () {
            switch (_v4.ctor)
            {case "_Tuple2":
               return F2(function (x,y) {
                    return x + y;
                 })(_v4._1);}
            _E.Case($moduleName,
            "on line 39, column 52 to 56");
         }();
      },
      0)($List.filter(function (_v0) {
         return function () {
            switch (_v0.ctor)
            {case "_Tuple2":
               return _U.eq($Basics.round(F2(function (x,
                 y) {
                    return x * y;
                 })(p)($Basics.toFloat(F2(function (x,
                 y) {
                    return x + y;
                 })(-1)($List.length(ns))))),
                 _v0._0);}
            _E.Case($moduleName,
            "on line 37, column 34 to 96");
         }();
      })($List.indexedMap(F2(function (v0,
      v1) {
         return {ctor: "_Tuple2"
                ,_0: v0
                ,_1: v1};
      }))($List.sort(ns))));
   });
   var Result = F7(function (a,
   b,
   c,
   d,
   e,
   f,
   g) {
      return {_: {}
             ,breaches: b
             ,horizon: f
             ,kupiecTest: g
             ,lookback: d
             ,model: c
             ,percentile: e
             ,var: a};
   });
   _elm.Stats.values = {_op: _op
                       ,Result: Result
                       ,getPercentileValue: getPercentileValue
                       ,getNormalVar: getNormalVar
                       ,getNormalVarEWMA: getNormalVarEWMA
                       ,getT3Var: getT3Var
                       ,getT4Var: getT4Var
                       ,getT5Var: getT5Var
                       ,getTVar: getTVar
                       ,getStdDeviation: getStdDeviation
                       ,getEwmaStdDeviation: getEwmaStdDeviation
                       ,tStdDevAdjustment: tStdDevAdjustment
                       ,demean: demean
                       ,average: average
                       ,normalDistParameters: normalDistParameters
                       ,tTable: tTable
                       ,x2Table: x2Table
                       ,kTest: kTest};
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