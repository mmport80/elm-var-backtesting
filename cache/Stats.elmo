Elm.Stats = Elm.Stats || {};
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
};