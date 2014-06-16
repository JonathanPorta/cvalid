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
          url: 'http://dev.rurd4me.com:3000/' + action,
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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9wb3J0YWovZGV2ZWwvY3ZhbGlkL3NyYy9jbGllbnQvbWFpbi5jb2ZmZWUiLCIvaG9tZS9wb3J0YWovZGV2ZWwvY3ZhbGlkL3NyYy9jbGllbnQvdXNlci9jb250cm9sbGVyLmNvZmZlZSIsIi9ob21lL3BvcnRhai9kZXZlbC9jdmFsaWQvc3JjL2NsaWVudC91c2VyL21vZHVsZS5jb2ZmZWUiLCIvaG9tZS9wb3J0YWovZGV2ZWwvY3ZhbGlkL3NyYy9jbGllbnQvdXNlci9zdG9yYWdlL3NlcnZpY2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtDQUFBLEtBQUE7O0NBQUEsQ0FBQSxDQUFTLEdBQVQsQ0FBUyxlQUFBO0NBQVQ7Ozs7O0FDQUE7Q0FBQSxDQUFBLENBQTRDLEdBQTVDLENBQU8sQ0FBUCxDQUE2QyxDQUE3QztDQUVDLENBQW9CLENBQXBCLENBQUEsRUFBQSxDQUFPLEVBQWM7Q0FDcEIsU0FBQTtDQUFBLENBQThCLENBQTlCLEdBQUEsQ0FBTyxTQUFQO0NBQUEsRUFDSSxFQUFBLENBQUosQ0FBVyxDQUFQO0NBREosQ0FFZ0MsQ0FBaEMsR0FBQSxDQUFPLFdBQVA7Q0FDUSxDQUFlLENBQUEsQ0FBdkIsR0FBTyxDQUFQLENBQXdCLElBQXhCO0NBQ0MsTUFBQSxLQUFBO0NBQUEsQ0FBZ0MsQ0FBaEMsSUFBTyxDQUFQLFVBQUE7Q0FBQSxDQUMrQixDQUFyQixDQUFBLEVBQUEsQ0FBVixDQUFBLENBQVU7Q0FEVixDQUUrQixDQUEvQixJQUFPLENBQVAsU0FBQTtDQUZBLENBRytCLENBQXJCLENBQUEsRUFBQSxDQUFWLENBQUE7Q0FDUSxDQUF1QixDQUEvQixJQUFPLFFBQVAsRUFBQTtDQUxELE1BQXVCO0NBSnhCLElBQW9CO0NBQXBCLEVBV2UsQ0FBZixFQUFNO0NBWE4sQ0FBQSxDQWFlLENBQWYsRUFBTTtDQWJOLENBQUEsQ0FjQSxDQUFBLEVBQU07Q0FkTixFQWdCYyxDQUFkLEVB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QUFRLENBQVMsS0FBUixHQUFBO0NBQUQsQ0FBd0IsRUFBSSxDQUFPLEtBQXRCO0NBRHJCLFNBQUE7Q0FFQyxDQUFvQixDQUFPLENBQTNCLENBQUQsR0FBQSxDQUFBLE1BQUE7Q0FDQyxFQUFtQixDQUFmLENBQU8sR0FBWCxFQUFBO0NBQ0csQ0FBSCxFQUFPLENBQU8sWUFBZDtDQUZELFFBQTRCO0NBL0I3QixNQTRCTTtDQTVCTixDQW1DVSxDQUFBLEVBQUEsQ0FBVixFQUFBLENBQVc7Q0FDVixLQUFBLE1BQUE7Q0FBQSxFQUFTLEdBQVQsRUFBQTtDQUFTLENBQ0MsSUFBVCxJQUFBO0NBRFEsQ0FFQyxDQUFULEdBRlEsSUFFUixvQkFBUztDQUZELENBR0MsRUFBVCxDQUhRLEtBR1I7Q0FIRCxTQUFBO0NBTU0sQ0FDVSxDQUFQLENBQUEsQ0FEVCxDQUFBLENBQUEsRUFDVSxNQURWO0NBRUMsQ0FBb0IsQ0FBcEIsQ0FBQSxFQUFBLENBQU8sRUFBUCxDQUFBO0NBQ0csQ0FBSCxFQUFBLGFBQUE7Q0FIRCxDQUljLENBQVAsQ0FBQSxDQUpQLENBSU8sQ0FBQSxFQUhFO0NBSUEsQ0FBWSxDQUFwQixDQUFBLEVBQUEsQ0FBTyxDQUFQLFNBQUE7Q0FMRCxRQUlPO0NBOUNSLE1BbUNVO0NBcENYLEtBQUE7Q0FEMkMsVUFtRDNDO0NBbkRELEVBQTRDO0NBQTVDIiwic291cmNlc0NvbnRlbnQiOlsiY3ZhbGlkID0gcmVxdWlyZSBcIi4vdXNlci9tb2R1bGUuY29mZmVlXCJcbiIsImFuZ3VsYXIubW9kdWxlKCdjdmFsaWQnKS5jb250cm9sbGVyIFwidXNlclwiLCAoJHNjb3BlLCBzdG9yYWdlKS0+XG5cblx0c3RvcmFnZS5nZXQgXCJVc2VyXCIsIChlKS0+XG5cdFx0Y29uc29sZS5sb2cgXCJDb250cm9sbGVyLWdldFwiLCBlXG5cdFx0diA9IHN0b3JhZ2UuYnVpbGQgXCJWZW5kb3JcIlxuXHRcdGNvbnNvbGUubG9nIFwiQ29udHJvbGxlci1idWlsdFwiLCB2XG5cdFx0c3RvcmFnZS5zYXZlIFwiVmVuZG9yXCIsIChlKS0+XG5cdFx0XHRjb25zb2xlLmxvZyBcIkNvbnRyb2xsZXItc2F2ZWRcIiwgZVxuXHRcdFx0bWF0Y2hlcyA9IHN0b3JhZ2UuZmluZCBcIlVzZXJcIiwgXCJlbWFpbFwiLCBcImVAbS5haWxcIlxuXHRcdFx0Y29uc29sZS5sb2cgXCJDb250cm9sbGVyLWZpbmRcIiwgbWF0Y2hlc1xuXHRcdFx0bWF0Y2hlcyA9IHN0b3JhZ2UuZmluZCBcIlVzZXJcIiwgXCJlbWFpbFwiLCBcIlwiXG5cdFx0XHRjb25zb2xlLmxvZyBcIkNvbnRyb2xsZXItZmluZFwiLCBtYXRjaGVzXG5cblx0JHNjb3BlLnN0ZXAgID0gMFxuXG5cdCRzY29wZS5jYXJkICA9IFwiXCJcblx0JHNjb3BlLnBpbiAgID0gXCJcIlxuXG5cdCRzY29wZS5Vc2VyID0gbnVsbFxuXG5cdCRzY29wZS5uZXh0ID0gKCktPlxuXHRcdGlmICRzY29wZS52YWxpZGF0ZSgpXG5cdFx0XHRpZiAkc2NvcGUuVXNlciBpc250IG51bGxcblx0XHRcdFx0aWYgJHNjb3BlLlVzZXIuYWN0aXZhdGVkIGlzIDEgYW5kICRzY29wZS5Vc2VyLm5hbWUgaXNudCBcIlwiIGFuZCAkc2NvcGUuVXNlci5lbWFpbCBpc250IFwiXCIgI0lmIHRoZSBwZXJzb24gaGFzIGFscmVhZHkgYWN0aXZhdGVkIGFuZCB3ZSBkb250IG5lZWQgbW9yZSBpbmZvLCB0aGVuIGxldCAnZW0gaW4hXG5cdFx0XHRcdFx0JHNjb3BlLnN0ZXAgPSA0XG5cdFx0XHRcdFx0c3RvcmFnZS5zYXZlIFwiQ2xpZW50XCIsIChlKS0+XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyBcIlNhdmVkIGFmdGVyIHJlYWNoaW5nIHN0ZXAgNC4uLlwiLCBlXG5cdFx0XHRcdGVsc2UgaWYgJHNjb3BlLlVzZXIuYWN0aXZhdGVkIGlzIDEgYW5kICRzY29wZS5Vc2VyLm5hbWUgaXMgXCJcIiBhbmQgJHNjb3BlLlVzZXIuZW1haWwgaXNudCBcIlwiICNjaGVjayBpbiBvcmRlciBzbyBpdCBkb2Vzbid0IHNraXAgYXJvdW5kIHRoZSBmb3JtLlxuXHRcdFx0XHRcdCRzY29wZS5zdGVwID0gMlxuXHRcdFx0XHRlbHNlIGlmICRzY29wZS5Vc2VyLmFjdGl2YXRlZCBpcyAxIGFuZCAkc2NvcGUuVXNlci5uYW1lIGlzbnQgXCJcIiBhbmQgJHNjb3BlLlVzZXIuZW1haWwgaXMgXCJcIlxuXHRcdFx0XHRcdCRzY29wZS5zdGVwID0gM1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHQkc2NvcGUuc3RlcCsrXG5cdFx0ZWxzZSBhbGVydCBcIkNvbWUgb24sIHlvdSBjYW4ndCBiZSBzZXJpb3VzIVwiXG5cblx0JHNjb3BlLnZhbGlkYXRlID0gKCktPlxuXHRcdGlmICRzY29wZS5zdGVwIGlzIDBcblx0XHRcdHJlc3VsdHMgPSBzdG9yYWdlLmZpbmQgXCJVc2VyXCIsIFwiY2FyZFwiLCAkc2NvcGUuY2FyZFxuXHRcdFx0aWYgcmVzdWx0cy5sZW5ndGggaXMgMCB0aGVuIHJldHVybiBmYWxzZVxuXHRcdFx0JHNjb3BlLlVzZXIgPSByZXN1bHRzLnBvcCgpXG5cdFx0ZWxzZSBpZiAkc2NvcGUuc3RlcCBpcyAxXG5cdFx0XHRpZiAkc2NvcGUuVXNlci5waW4gaXNudCAkc2NvcGUucGluIHRoZW4gcmV0dXJuIGZhbHNlXG5cdFx0dHJ1ZVxuIiwibW9kdWxlLmV4cG9ydHMgPSBjdmFsaWQgPSBhbmd1bGFyLm1vZHVsZSBcImN2YWxpZFwiLCBbXVxuXG5yZXF1aXJlIFwiLi9zdG9yYWdlL3NlcnZpY2UuY29mZmVlXCJcbnJlcXVpcmUgXCIuL2NvbnRyb2xsZXIuY29mZmVlXCJcbiIsImFuZ3VsYXIubW9kdWxlKCdjdmFsaWQnKS5zZXJ2aWNlIFwic3RvcmFnZVwiLCAoJGxvY2F0aW9uLCAkcSwgJGh0dHApLT5cblx0c3RvcmFnZSA9XG5cdFx0X2RhdGE6IHtcblx0XHRcdFwiVXNlclwiICAgOiBbXVxuXHRcdFx0XCJWZW5kb3JcIiA6IFtdXG5cdFx0fVxuXG5cdFx0X2Zha2VQcm90b3M6IHtcblx0XHRcdFwiVXNlclwiICAgOiAne1wiX3R5cGVcIjpcIlVzZXJcIixcImFjdGl2YXRlZFwiOjAsXCJjYXJkXCI6XCJcIiwgXCJwaW5cIjpcIlwiLCBcImVtYWlsXCI6XCJcIiwgXCJuYW1lXCI6XCJcIn0nXG5cdFx0XHRcIlZlbmRvclwiIDogJ3tcIl90eXBlXCI6XCJWZW5kb3JcIixcIm5hbWVcIjpcIlwifSdcblx0XHR9XG5cblx0XHRmaW5kOiAodHlwZSwgZmllbGQsIHZhbCktPlxuXHRcdFx0c2VsZiA9IHRoaXNcblx0XHRcdG1hdGNoZXMgPSBbXVxuXHRcdFx0bWF0Y2hlcy5wdXNoIGVudCBmb3IgZW50IGluIHNlbGYuX2RhdGFbdHlwZV0gd2hlbiBlbnRbZmllbGRdIGlzIHZhbFxuXHRcdFx0bWF0Y2hlc1xuXG5cdFx0YnVpbGQ6ICh0eXBlKS0+XG5cdFx0XHRlbnQgPSBKU09OLnBhcnNlIHRoaXMuX2Zha2VQcm90b3NbdHlwZV1cblx0XHRcdHRoaXMuX2RhdGFbdHlwZV0ucHVzaCBlbnRcblx0XHRcdGVudFxuXG5cdFx0Z2V0OiAodHlwZSwgY2IpLT5cblx0XHRcdHRyYW5zID0ge1wibWV0dGFcIjp7fSwgXCJlbnRpdGllc1wiOlt7XCJfdHlwZVwiOnR5cGV9XX1cblx0XHRcdHNlbGYgPSB0aGlzXG5cdFx0XHRAX3JlcXVlc3QgXCJnZXRcIiwgdHJhbnMsICh0cmFucyktPlxuXHRcdFx0XHRzZWxmLl9kYXRhW3R5cGVdID0gdHJhbnMuZW50aXRpZXNcblx0XHRcdFx0Y2Ioc2VsZi5fZGF0YVt0eXBlXSlcblxuXHRcdHNhdmU6ICh0eXBlLCBjYiktPlxuXHRcdFx0c2VsZiA9IHRoaXNcblx0XHRcdHRyYW5zID0ge1wibWV0dGFcIjp7fSwgXCJlbnRpdGllc1wiOnNlbGYuX2RhdGFbdHlwZV19XG5cdFx0XHRAX3JlcXVlc3QgXCJwZXJzaXN0XCIsIHRyYW5zLCAodHJhbnMpLT5cblx0XHRcdFx0c2VsZi5fZGF0YVt0eXBlXSA9IHRyYW5zLmVudGl0aWVzXG5cdFx0XHRcdGNiKHNlbGYuX2RhdGFbdHlwZV0pXG5cblx0XHRfcmVxdWVzdDogKGFjdGlvbiwgdHJhbnMsIGNiKS0+XG5cdFx0XHRwYXJhbXMgPSB7XG5cdFx0XHRcdG1ldGhvZCA6ICdQT1NUJ1xuXHRcdFx0XHR1cmwgICAgOiAnaHR0cDovL2Rldi5ydXJkNG1lLmNvbTozMDAwLycrYWN0aW9uXG5cdFx0XHRcdGRhdGEgICA6IHRyYW5zXG5cdFx0XHR9XG5cblx0XHRcdCRodHRwKHBhcmFtcylcblx0XHRcdC5zdWNjZXNzIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZyktPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBhY3Rpb24sIFwiU3VjY2Vzc1wiLCBkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZ1xuXHRcdFx0XHRjYihkYXRhKVxuXHRcdFx0LmVycm9yIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZyktPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBhY3Rpb24sIFwiRVJST1IhXCIsIGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnXG5cblx0c3RvcmFnZVxuIl19
;