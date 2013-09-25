;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var cvalid;

  cvalid = require("./user/module.coffee");

}).call(this);


},{"./user/module.coffee":3}],2:[function(require,module,exports){
(function() {
  angular.module('cvalid').controller("user", function($scope, storage) {
    $scope.step = 0;
    $scope.card = "";
    $scope.pin = "";
    $scope.name = "";
    $scope.email = "";
    return $scope.next = function() {
      return $scope.step++;
    };
  });

}).call(this);


},{}],3:[function(require,module,exports){
(function() {
  var cvalid;

  module.exports = cvalid = angular.module("cvalid", []);

  require("./storage/service.coffee");

  require("./controller.coffee");

}).call(this);


},{"./controller.coffee":2,"./storage/service.coffee":4}],4:[function(require,module,exports){
(function() {
  angular.module('cvalid').service("storage", function($location, $q, $rootScope) {
    var storage;
    storage = {
      get: function() {},
      save: function() {}
    };
    return storage;
  });

}).call(this);


},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9wb3J0YWovZGV2ZWwvc2kvY3ZhbGlkL3NyYy9jbGllbnQvbWFpbi5jb2ZmZWUiLCIvaG9tZS9wb3J0YWovZGV2ZWwvc2kvY3ZhbGlkL3NyYy9jbGllbnQvdXNlci9jb250cm9sbGVyLmNvZmZlZSIsIi9ob21lL3BvcnRhai9kZXZlbC9zaS9jdmFsaWQvc3JjL2NsaWVudC91c2VyL21vZHVsZS5jb2ZmZWUiLCIvaG9tZS9wb3J0YWovZGV2ZWwvc2kvY3ZhbGlkL3NyYy9jbGllbnQvdXNlci9zdG9yYWdlL3NlcnZpY2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtDQUFBLEtBQUE7O0NBQUEsQ0FBQSxDQUFTLEdBQVQsQ0FBUyxlQUFBO0NBQVQ7Ozs7O0FDQUE7Q0FBQSxDQUFBLENBQTRDLEdBQTVDLENBQU8sQ0FBUCxDQUE2QyxDQUE3QztDQUNDLEVBQWMsQ0FBZCxFQUFNO0NBQU4sQ0FBQSxDQUVjLENBQWQsRUFBTTtDQUZOLENBQUEsQ0FHQSxDQUFBLEVBQU07Q0FITixDQUFBLENBSWMsQ0FBZCxFQUFNO0NBSk4sQ0FBQSxDQUthLENBQWIsQ0FBQSxDQUFNO0NBRUMsRUFBTyxDQUFkLEVBQU0sR0FBUSxFQUFkO0FBQ0MsQ0FBTyxHQUFQLEVBQU0sT0FBTjtDQVQwQyxJQVE3QjtDQVJmLEVBQTRDO0NBQTVDOzs7OztBQ0FBO0NBQUEsS0FBQTs7Q0FBQSxDQUFBLENBQWlCLEdBQVgsQ0FBTixDQUEwQjs7Q0FBMUIsQ0FFQSxLQUFBLG1CQUFBOztDQUZBLENBR0EsS0FBQSxjQUFBO0NBSEE7Ozs7O0FDQUE7Q0FBQSxDQUFBLENBQTRDLEdBQTVDLENBQU8sQ0FBUCxDQUFBLENBQTRDO0NBQzNDLE1BQUEsQ0FBQTtDQUFBLEVBQ0MsQ0FERCxHQUFBO0NBQ0MsQ0FBSyxDQUFMLEdBQUEsR0FBSztDQUFMLENBQ00sQ0FBQSxDQUFOLEVBQUEsR0FBTTtDQUZQLEtBQUE7Q0FEMkMsVUFLM0M7Q0FMRCxFQUE0QztDQUE1QyIsInNvdXJjZXNDb250ZW50IjpbImN2YWxpZCA9IHJlcXVpcmUgXCIuL3VzZXIvbW9kdWxlLmNvZmZlZVwiXG4iLCJhbmd1bGFyLm1vZHVsZSgnY3ZhbGlkJykuY29udHJvbGxlciBcInVzZXJcIiwgKCRzY29wZSwgc3RvcmFnZSktPlxuXHQkc2NvcGUuc3RlcCA9IDBcblxuXHQkc2NvcGUuY2FyZCA9IFwiXCJcblx0JHNjb3BlLnBpbiA9IFwiXCJcblx0JHNjb3BlLm5hbWUgPSBcIlwiXG5cdCRzY29wZS5lbWFpbD1cIlwiXG5cblx0JHNjb3BlLm5leHQgPSAoKS0+XG5cdFx0JHNjb3BlLnN0ZXArKztcbiIsIm1vZHVsZS5leHBvcnRzID0gY3ZhbGlkID0gYW5ndWxhci5tb2R1bGUgXCJjdmFsaWRcIiwgW11cblxucmVxdWlyZSBcIi4vc3RvcmFnZS9zZXJ2aWNlLmNvZmZlZVwiXG5yZXF1aXJlIFwiLi9jb250cm9sbGVyLmNvZmZlZVwiXG4iLCJhbmd1bGFyLm1vZHVsZSgnY3ZhbGlkJykuc2VydmljZSBcInN0b3JhZ2VcIiwgKCRsb2NhdGlvbiwgJHEsICRyb290U2NvcGUpLT5cblx0c3RvcmFnZSA9XG5cdFx0Z2V0OiAtPlxuXHRcdHNhdmU6IC0+XG5cblx0c3RvcmFnZVxuIl19
;