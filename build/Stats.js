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
};