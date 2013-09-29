angular.module('cvalid').service "storage", ($location, $q, $http)->
	storage =
		_data: {
			"User"   : []
			"Vendor" : []
		}

		_fakeProtos: {
			"User"   : '{"_type":"User","activated":0,"card":"", "pin":"", "email":"", "name":""}'
			"Vendor" : '{"_type":"Vendor","name":""}'
		}

		find: (type, field, val)->
			self = this
			matches = []
			matches.push ent for ent in self._data[type] when ent[field] is val
			matches

		build: (type)->
			ent = JSON.parse this._fakeProtos[type]
			this._data[type].push ent
			ent

		get: (type, cb)->
			trans = {"metta":{}, "entities":[{"_type":type}]}
			self = this
			@_request "get", trans, (trans)->
				self._data[type] = trans.entities
				cb(self._data[type])

		save: (type, cb)->
			self = this
			trans = {"metta":{}, "entities":self._data[type]}
			@_request "persist", trans, (trans)->
				self._data[type] = trans.entities
				cb(self._data[type])

		_request: (action, trans, cb)->
			params = {
				method : 'POST'
				url    : 'http://localhost:3000/'+action
				data   : trans
			}

			$http(params)
			.success (data, status, headers, config)->
				console.log action, "Success", data, status, headers, config
				cb(data)
			.error (data, status, headers, config)->
				console.log action, "ERROR!", data, status, headers, config

	storage
