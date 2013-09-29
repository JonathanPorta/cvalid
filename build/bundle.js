;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var cvalid;

  cvalid = require("./user/module.coffee");

}).call(this);


},{"./user/module.coffee":3}],2:[function(require,module,exports){
(function() {
  angular.module('cvalid').controller("user", function($scope, storage) {
    storage.get("User", function(e) {
      var v;
      console.log("Controller-get", e);
      v = storage.build("Vendor");
      console.log("Controller-built", v);
      return storage.save("Vendor", function(e) {
        var matches;
        console.log("Controller-saved", e);
        matches = storage.find("User", "email", "e@m.ail");
        console.log("Controller-find", matches);
        matches = storage.find("User", "email", "");
        return console.log("Controller-find", matches);
      });
    });
    $scope.step = 0;
    $scope.card = "";
    $scope.pin = "";
    $scope.User = null;
    $scope.next = function() {
      if ($scope.validate()) {
        if ($scope.User !== null) {
          if ($scope.User.activated === 1 && $scope.User.name !== "" && $scope.User.email !== "") {
            $scope.step = 4;
            return storage.save("Client", function(e) {
              return console.log("Saved after reaching step 4...", e);
            });
          } else if ($scope.User.activated === 1 && $scope.User.name === "" && $scope.User.email !== "") {
            return $scope.step = 2;
          } else if ($scope.User.activated === 1 && $scope.User.name !== "" && $scope.User.email === "") {
            return $scope.step = 3;
          }
        } else {
          return $scope.step++;
        }
      } else {
        return alert("Come on, you can't be serious!");
      }
    };
    return $scope.validate = function() {
      var results;
      if ($scope.step === 0) {
        results = storage.find("User", "card", $scope.card);
        if (results.length === 0) {
          return false;
        }
        $scope.User = results.pop();
      } else if ($scope.step === 1) {
        if ($scope.User.pin !== $scope.pin) {
          return false;
        }
      }
      return true;
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
  angular.module('cvalid').service("storage", function($location, $q, $http) {
    var storage;
    storage = {
      _data: {
        "User": [],
        "Vendor": []
      },
      _fakeProtos: {
        "User": '{"_type":"User","activated":0,"card":"", "pin":"", "email":"", "name":""}',
        "Vendor": '{"_type":"Vendor","name":""}'
      },
      find: function(type, field, val) {
        var ent, matches, self, _i, _len, _ref;
        self = this;
        matches = [];
        _ref = self._data[type];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ent = _ref[_i];
          if (ent[field] === val) {
            matches.push(ent);
          }
        }
        return matches;
      },
      build: function(type) {
        var ent;
        ent = JSON.parse(this._fakeProtos[type]);
        this._data[type].push(ent);
        return ent;
      },
      get: function(type, cb) {
        var self, trans;
        trans = {
          "metta": {},
          "entities": [
            {
              "_type": type
            }
          ]
        };
        self = this;
        return this._request("get", trans, function(trans) {
          self._data[type] = trans.entities;
          return cb(self._data[type]);
        });
      },
      save: function(type, cb) {
        var self, trans;
        self = this;
        trans = {
          "metta": {},
          "entities": self._data[type]
        };
        return this._request("persist", trans, function(trans) {
          self._data[type] = trans.entities;
          return cb(self._data[type]);
        });
      },
      _request: function(action, trans, cb) {
        var params;
        params = {
          method: 'POST',
          url: 'http://localhost:3000/' + action,
          data: trans
        };
        return $http(params).success(function(data, status, headers, config) {
          console.log(action, "Success", data, status, headers, config);
          return cb(data);
        }).error(function(data, status, headers, config) {
          return console.log(action, "ERROR!", data, status, headers, config);
        });
      }
    };
    return storage;
  });

}).call(this);


},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9wb3J0YWovZGV2ZWwvc2kvY3ZhbGlkL3NyYy9jbGllbnQvbWFpbi5jb2ZmZWUiLCIvaG9tZS9wb3J0YWovZGV2ZWwvc2kvY3ZhbGlkL3NyYy9jbGllbnQvdXNlci9jb250cm9sbGVyLmNvZmZlZSIsIi9ob21lL3BvcnRhai9kZXZlbC9zaS9jdmFsaWQvc3JjL2NsaWVudC91c2VyL21vZHVsZS5jb2ZmZWUiLCIvaG9tZS9wb3J0YWovZGV2ZWwvc2kvY3ZhbGlkL3NyYy9jbGllbnQvdXNlci9zdG9yYWdlL3NlcnZpY2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtDQUFBLEtBQUE7O0NBQUEsQ0FBQSxDQUFTLEdBQVQsQ0FBUyxlQUFBO0NBQVQ7Ozs7O0FDQUE7Q0FBQSxDQUFBLENBQTRDLEdBQTVDLENBQU8sQ0FBUCxDQUE2QyxDQUE3QztDQUVDLENBQW9CLENBQXBCLENBQUEsRUFBQSxDQUFPLEVBQWM7Q0FDcEIsU0FBQTtDQUFBLENBQThCLENBQTlCLEdBQUEsQ0FBTyxTQUFQO0NBQUEsRUFDSSxFQUFBLENBQUosQ0FBVyxDQUFQO0NBREosQ0FFZ0MsQ0FBaEMsR0FBQSxDQUFPLFdBQVA7Q0FDUSxDQUFlLENBQUEsQ0FBdkIsR0FBTyxDQUFQLENBQXdCLElBQXhCO0NBQ0MsTUFBQSxLQUFBO0NBQUEsQ0FBZ0MsQ0FBaEMsSUFBTyxDQUFQLFVBQUE7Q0FBQSxDQUMrQixDQUFyQixDQUFBLEVBQUEsQ0FBVixDQUFBLENBQVU7Q0FEVixDQUUrQixDQUEvQixJQUFPLENBQVAsU0FBQTtDQUZBLENBRytCLENBQXJCLENBQUEsRUFBQSxDQUFWLENBQUE7Q0FDUSxDQUF1QixDQUEvQixJQUFPLFFBQVAsRUFBQTtDQUxELE1BQXVCO0NBSnhCLElBQW9CO0NBQXBCLEVBV2UsQ0FBZixFQUFNO0NBWE4sQ0FBQSxDQWFlLENBQWYsRUFBTTtDQWJOLENBQUEsQ0FjQSxDQUFBLEVBQU07Q0FkTixFQWdCYyxDQUFkLEVBQU07Q0FoQk4sRUFrQmMsQ0FBZCxFQUFNLEdBQVE7Q0FDYixHQUFHLEVBQUgsRUFBRztDQUNGLEdBQUcsQ0FBaUIsQ0FBWCxFQUFUO0NBQ0MsQ0FBRyxFQUFBLENBQXlCLENBQW5CLEdBQU4sQ0FBSDtDQUNDLEVBQWMsQ0FBZCxFQUFNLE1BQU47Q0FDUSxDQUFlLENBQUEsQ0FBdkIsR0FBTyxDQUFQLENBQXdCLFVBQXhCO0NBQ1MsQ0FBc0MsQ0FBOUMsSUFBTyxjQUFQLFdBQUE7Q0FERCxZQUF1QjtDQUVULENBQVAsRUFBQSxDQUF5QixDQUpqQyxHQUlRLEdBSlI7Q0FLUSxFQUFPLENBQWQsRUFBTSxhQUFOO0NBQ2MsQ0FBUCxFQUFBLENBQXlCLENBTmpDLEdBTVEsR0FOUjtDQU9RLEVBQU8sQ0FBZCxFQUFNLGFBQU47WUFSRjtNQUFBLElBQUE7QUFVQyxDQUFPLEdBQVAsRUFBTSxXQUFOO1VBWEY7TUFBQSxFQUFBO0NBWVcsSUFBTixVQUFBLGlCQUFBO1FBYlE7Q0FsQmQsSUFrQmM7Q0FlUCxFQUFXLEdBQVosRUFBTixDQUFrQixFQUFsQjtDQUNDLE1BQUEsR0FBQTtDQUFBLEdBQUcsQ0FBZSxDQUFsQjtDQUNDLENBQStCLENBQXJCLENBQUEsRUFBQSxDQUFWLENBQUE7Q0FDQSxHQUFHLENBQWtCLENBQWxCLENBQU8sQ0FBVjtDQUE0QixJQUFBLFlBQU87VUFEbkM7Q0FBQSxFQUVjLENBQWQsRUFBTSxDQUFlLENBQXJCO0NBQ2MsR0FBUCxDQUFlLENBSnZCLEVBQUE7Q0FLQyxFQUFHLENBQUEsQ0FBcUIsQ0FBZixFQUFUO0NBQXdDLElBQUEsWUFBTztVQUxoRDtRQUFBO0NBRGlCLFlBT2pCO0NBMUMwQyxJQW1DekI7Q0FuQ25CLEVBQTRDO0NBQTVDOzs7OztBQ0FBO0NBQUEsS0FBQTs7Q0FBQSxDQUFBLENBQWlCLEdBQVgsQ0FBTixDQUEwQjs7Q0FBMUIsQ0FFQSxLQUFBLG1CQUFBOztDQUZBLENBR0EsS0FBQSxjQUFBO0NBSEE7Ozs7O0FDQUE7Q0FBQSxDQUFBLENBQTRDLEVBQUEsQ0FBNUMsQ0FBTyxDQUFQLENBQUE7Q0FDQyxNQUFBLENBQUE7Q0FBQSxFQUNDLENBREQsR0FBQTtDQUNDLENBQU8sR0FBUCxDQUFBO0NBQU8sQ0FDSyxJQUFYLEVBQUE7Q0FETSxDQUVLLE1BQVg7UUFGRDtDQUFBLENBS2EsSUFBYixLQUFBO0NBQWEsQ0FDRCxJQUFYLEVBQUEsbUVBRFk7Q0FBQSxDQUVELE1BQVgsc0JBRlk7UUFMYjtDQUFBLENBVU0sQ0FBQSxDQUFOLENBQU0sQ0FBTixHQUFPO0NBQ04sV0FBQSxzQkFBQTtDQUFBLEVBQU8sQ0FBUCxJQUFBO0NBQUEsQ0FBQSxDQUNVLElBQVYsQ0FBQTtDQUNBO0NBQUEsWUFBQSw4QkFBQTswQkFBQTtDQUFzRCxFQUFBLENBQUosQ0FBSTtDQUF0RCxFQUFBLENBQUEsR0FBTyxLQUFQO1lBQUE7Q0FBQSxRQUZBO0NBREssY0FJTDtDQWRELE1BVU07Q0FWTixDQWdCTyxDQUFBLENBQUEsQ0FBUCxDQUFBLEdBQVE7Q0FDUCxFQUFBLFNBQUE7Q0FBQSxFQUFBLENBQVUsQ0FBSixHQUFOLEdBQWtDO0NBQWxDLEVBQ0EsQ0FBSSxDQUFPLEdBQVg7Q0FGTSxjQUdOO0NBbkJELE1BZ0JPO0NBaEJQLENBcUJLLENBQUwsQ0FBSyxFQUFMLEdBQU07Q0FDTCxVQUFBLENBQUE7Q0FBQSxFQUFRLEVBQVIsR0FBQTtDQUFRLENBQVMsS0FBUixHQUFBO0NBQUQsQ0FBd0IsUUFBWDthQUFZO0NBQUEsQ0FBUyxFQUFULEdBQUMsT0FBQTtjQUFGO1lBQXhCO0NBQVIsU0FBQTtDQUFBLEVBQ08sQ0FBUCxJQUFBO0NBQ0MsQ0FBZ0IsQ0FBTyxDQUF2QixDQUFELEdBQUEsQ0FBeUIsTUFBekI7Q0FDQyxFQUFtQixDQUFmLENBQU8sR0FBWCxFQUFBO0NBQ0csQ0FBSCxFQUFPLENBQU8sWUFBZDtDQUZELFFBQXdCO0NBeEJ6QixNQXFCSztDQXJCTCxDQTRCTSxDQUFBLENBQU4sRUFBQSxHQUFPO0NBQ04sVUFBQSxDQUFBO0NBQUEsRUFBTyxDQUFQLElBQUE7Q0FBQSxFQUNRLEVBQVIsR0FBQTtDQUFRLENBQVMsS0FBUixHQUFBO0NBQUQsQ0FBd0IsRUFBSSxDQUFPLEtBQXRCO0NBRHJCLFNBQUE7Q0FFQyxDQUFvQixDQUFPLENBQTNCLENBQUQsR0FBQSxDQUFBLE1BQUE7Q0FDQyxFQUFtQixDQUFmLENBQU8sR0FBWCxFQUFBO0NBQ0csQ0FBSCxFQUFPLENBQU8sWUFBZDtDQUZELFFBQTRCO0NBL0I3QixNQTRCTTtDQTVCTixDQW1DVSxDQUFBLEVBQUEsQ0FBVixFQUFBLENBQVc7Q0FDVixLQUFBLE1BQUE7Q0FBQSxFQUFTLEdBQVQsRUFBQTtDQUFTLENBQ0MsSUFBVCxJQUFBO0NBRFEsQ0FFQyxDQUFULEdBRlEsSUFFUixjQUFTO0NBRkQsQ0FHQyxFQUFULENBSFEsS0FHUjtDQUhELFNBQUE7Q0FNTSxDQUNVLENBQVAsQ0FBQSxDQURULENBQUEsQ0FBQSxFQUNVLE1BRFY7Q0FFQyxDQUFvQixDQUFwQixDQUFBLEVBQUEsQ0FBTyxFQUFQLENBQUE7Q0FDRyxDQUFILEVBQUEsYUFBQTtDQUhELENBSWMsQ0FBUCxDQUFBLENBSlAsQ0FJTyxDQUFBLEVBSEU7Q0FJQSxDQUFZLENBQXBCLENBQUEsRUFBQSxDQUFPLENBQVAsU0FBQTtDQUxELFFBSU87Q0E5Q1IsTUFtQ1U7Q0FwQ1gsS0FBQTtDQUQyQyxVQW1EM0M7Q0FuREQsRUFBNEM7Q0FBNUMiLCJzb3VyY2VzQ29udGVudCI6WyJjdmFsaWQgPSByZXF1aXJlIFwiLi91c2VyL21vZHVsZS5jb2ZmZWVcIlxuIiwiYW5ndWxhci5tb2R1bGUoJ2N2YWxpZCcpLmNvbnRyb2xsZXIgXCJ1c2VyXCIsICgkc2NvcGUsIHN0b3JhZ2UpLT5cblxuXHRzdG9yYWdlLmdldCBcIlVzZXJcIiwgKGUpLT5cblx0XHRjb25zb2xlLmxvZyBcIkNvbnRyb2xsZXItZ2V0XCIsIGVcblx0XHR2ID0gc3RvcmFnZS5idWlsZCBcIlZlbmRvclwiXG5cdFx0Y29uc29sZS5sb2cgXCJDb250cm9sbGVyLWJ1aWx0XCIsIHZcblx0XHRzdG9yYWdlLnNhdmUgXCJWZW5kb3JcIiwgKGUpLT5cblx0XHRcdGNvbnNvbGUubG9nIFwiQ29udHJvbGxlci1zYXZlZFwiLCBlXG5cdFx0XHRtYXRjaGVzID0gc3RvcmFnZS5maW5kIFwiVXNlclwiLCBcImVtYWlsXCIsIFwiZUBtLmFpbFwiXG5cdFx0XHRjb25zb2xlLmxvZyBcIkNvbnRyb2xsZXItZmluZFwiLCBtYXRjaGVzXG5cdFx0XHRtYXRjaGVzID0gc3RvcmFnZS5maW5kIFwiVXNlclwiLCBcImVtYWlsXCIsIFwiXCJcblx0XHRcdGNvbnNvbGUubG9nIFwiQ29udHJvbGxlci1maW5kXCIsIG1hdGNoZXNcblxuXHQkc2NvcGUuc3RlcCAgPSAwXG5cblx0JHNjb3BlLmNhcmQgID0gXCJcIlxuXHQkc2NvcGUucGluICAgPSBcIlwiXG5cblx0JHNjb3BlLlVzZXIgPSBudWxsXG5cblx0JHNjb3BlLm5leHQgPSAoKS0+XG5cdFx0aWYgJHNjb3BlLnZhbGlkYXRlKClcblx0XHRcdGlmICRzY29wZS5Vc2VyIGlzbnQgbnVsbFxuXHRcdFx0XHRpZiAkc2NvcGUuVXNlci5hY3RpdmF0ZWQgaXMgMSBhbmQgJHNjb3BlLlVzZXIubmFtZSBpc250IFwiXCIgYW5kICRzY29wZS5Vc2VyLmVtYWlsIGlzbnQgXCJcIiAjSWYgdGhlIHBlcnNvbiBoYXMgYWxyZWFkeSBhY3RpdmF0ZWQgYW5kIHdlIGRvbnQgbmVlZCBtb3JlIGluZm8sIHRoZW4gbGV0ICdlbSBpbiFcblx0XHRcdFx0XHQkc2NvcGUuc3RlcCA9IDRcblx0XHRcdFx0XHRzdG9yYWdlLnNhdmUgXCJDbGllbnRcIiwgKGUpLT5cblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nIFwiU2F2ZWQgYWZ0ZXIgcmVhY2hpbmcgc3RlcCA0Li4uXCIsIGVcblx0XHRcdFx0ZWxzZSBpZiAkc2NvcGUuVXNlci5hY3RpdmF0ZWQgaXMgMSBhbmQgJHNjb3BlLlVzZXIubmFtZSBpcyBcIlwiIGFuZCAkc2NvcGUuVXNlci5lbWFpbCBpc250IFwiXCIgI2NoZWNrIGluIG9yZGVyIHNvIGl0IGRvZXNuJ3Qgc2tpcCBhcm91bmQgdGhlIGZvcm0uXG5cdFx0XHRcdFx0JHNjb3BlLnN0ZXAgPSAyXG5cdFx0XHRcdGVsc2UgaWYgJHNjb3BlLlVzZXIuYWN0aXZhdGVkIGlzIDEgYW5kICRzY29wZS5Vc2VyLm5hbWUgaXNudCBcIlwiIGFuZCAkc2NvcGUuVXNlci5lbWFpbCBpcyBcIlwiXG5cdFx0XHRcdFx0JHNjb3BlLnN0ZXAgPSAzXG5cdFx0XHRlbHNlXG5cdFx0XHRcdCRzY29wZS5zdGVwKytcblx0XHRlbHNlIGFsZXJ0IFwiQ29tZSBvbiwgeW91IGNhbid0IGJlIHNlcmlvdXMhXCJcblxuXHQkc2NvcGUudmFsaWRhdGUgPSAoKS0+XG5cdFx0aWYgJHNjb3BlLnN0ZXAgaXMgMFxuXHRcdFx0cmVzdWx0cyA9IHN0b3JhZ2UuZmluZCBcIlVzZXJcIiwgXCJjYXJkXCIsICRzY29wZS5jYXJkXG5cdFx0XHRpZiByZXN1bHRzLmxlbmd0aCBpcyAwIHRoZW4gcmV0dXJuIGZhbHNlXG5cdFx0XHQkc2NvcGUuVXNlciA9IHJlc3VsdHMucG9wKClcblx0XHRlbHNlIGlmICRzY29wZS5zdGVwIGlzIDFcblx0XHRcdGlmICRzY29wZS5Vc2VyLnBpbiBpc250ICRzY29wZS5waW4gdGhlbiByZXR1cm4gZmFsc2Vcblx0XHR0cnVlXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGN2YWxpZCA9IGFuZ3VsYXIubW9kdWxlIFwiY3ZhbGlkXCIsIFtdXG5cbnJlcXVpcmUgXCIuL3N0b3JhZ2Uvc2VydmljZS5jb2ZmZWVcIlxucmVxdWlyZSBcIi4vY29udHJvbGxlci5jb2ZmZWVcIlxuIiwiYW5ndWxhci5tb2R1bGUoJ2N2YWxpZCcpLnNlcnZpY2UgXCJzdG9yYWdlXCIsICgkbG9jYXRpb24sICRxLCAkaHR0cCktPlxuXHRzdG9yYWdlID1cblx0XHRfZGF0YToge1xuXHRcdFx0XCJVc2VyXCIgICA6IFtdXG5cdFx0XHRcIlZlbmRvclwiIDogW11cblx0XHR9XG5cblx0XHRfZmFrZVByb3Rvczoge1xuXHRcdFx0XCJVc2VyXCIgICA6ICd7XCJfdHlwZVwiOlwiVXNlclwiLFwiYWN0aXZhdGVkXCI6MCxcImNhcmRcIjpcIlwiLCBcInBpblwiOlwiXCIsIFwiZW1haWxcIjpcIlwiLCBcIm5hbWVcIjpcIlwifSdcblx0XHRcdFwiVmVuZG9yXCIgOiAne1wiX3R5cGVcIjpcIlZlbmRvclwiLFwibmFtZVwiOlwiXCJ9J1xuXHRcdH1cblxuXHRcdGZpbmQ6ICh0eXBlLCBmaWVsZCwgdmFsKS0+XG5cdFx0XHRzZWxmID0gdGhpc1xuXHRcdFx0bWF0Y2hlcyA9IFtdXG5cdFx0XHRtYXRjaGVzLnB1c2ggZW50IGZvciBlbnQgaW4gc2VsZi5fZGF0YVt0eXBlXSB3aGVuIGVudFtmaWVsZF0gaXMgdmFsXG5cdFx0XHRtYXRjaGVzXG5cblx0XHRidWlsZDogKHR5cGUpLT5cblx0XHRcdGVudCA9IEpTT04ucGFyc2UgdGhpcy5fZmFrZVByb3Rvc1t0eXBlXVxuXHRcdFx0dGhpcy5fZGF0YVt0eXBlXS5wdXNoIGVudFxuXHRcdFx0ZW50XG5cblx0XHRnZXQ6ICh0eXBlLCBjYiktPlxuXHRcdFx0dHJhbnMgPSB7XCJtZXR0YVwiOnt9LCBcImVudGl0aWVzXCI6W3tcIl90eXBlXCI6dHlwZX1dfVxuXHRcdFx0c2VsZiA9IHRoaXNcblx0XHRcdEBfcmVxdWVzdCBcImdldFwiLCB0cmFucywgKHRyYW5zKS0+XG5cdFx0XHRcdHNlbGYuX2RhdGFbdHlwZV0gPSB0cmFucy5lbnRpdGllc1xuXHRcdFx0XHRjYihzZWxmLl9kYXRhW3R5cGVdKVxuXG5cdFx0c2F2ZTogKHR5cGUsIGNiKS0+XG5cdFx0XHRzZWxmID0gdGhpc1xuXHRcdFx0dHJhbnMgPSB7XCJtZXR0YVwiOnt9LCBcImVudGl0aWVzXCI6c2VsZi5fZGF0YVt0eXBlXX1cblx0XHRcdEBfcmVxdWVzdCBcInBlcnNpc3RcIiwgdHJhbnMsICh0cmFucyktPlxuXHRcdFx0XHRzZWxmLl9kYXRhW3R5cGVdID0gdHJhbnMuZW50aXRpZXNcblx0XHRcdFx0Y2Ioc2VsZi5fZGF0YVt0eXBlXSlcblxuXHRcdF9yZXF1ZXN0OiAoYWN0aW9uLCB0cmFucywgY2IpLT5cblx0XHRcdHBhcmFtcyA9IHtcblx0XHRcdFx0bWV0aG9kIDogJ1BPU1QnXG5cdFx0XHRcdHVybCAgICA6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvJythY3Rpb25cblx0XHRcdFx0ZGF0YSAgIDogdHJhbnNcblx0XHRcdH1cblxuXHRcdFx0JGh0dHAocGFyYW1zKVxuXHRcdFx0LnN1Y2Nlc3MgKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKS0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIGFjdGlvbiwgXCJTdWNjZXNzXCIsIGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnXG5cdFx0XHRcdGNiKGRhdGEpXG5cdFx0XHQuZXJyb3IgKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKS0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIGFjdGlvbiwgXCJFUlJPUiFcIiwgZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWdcblxuXHRzdG9yYWdlXG4iXX0=
;