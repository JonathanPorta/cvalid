angular.module('cvalid').controller "user", ($scope, storage)->

	storage.get "User", (e)->
		console.log "Controller-get", e
		v = storage.build "Vendor"
		console.log "Controller-built", v
		storage.save "Vendor", (e)->
			console.log "Controller-saved", e
			matches = storage.find "User", "email", "e@m.ail"
			console.log "Controller-find", matches
			matches = storage.find "User", "email", ""
			console.log "Controller-find", matches

	$scope.step  = 0

	$scope.card  = ""
	$scope.pin   = ""

	$scope.User = null

	$scope.next = ()->
		if $scope.validate()
			if $scope.User isnt null
				if $scope.User.activated is 1 and $scope.User.name isnt "" and $scope.User.email isnt "" #If the person has already activated and we dont need more info, then let 'em in!
					$scope.step = 4
					storage.save "Client", (e)->
						console.log "Saved after reaching step 4...", e
				else if $scope.User.activated is 1 and $scope.User.name is "" and $scope.User.email isnt "" #check in order so it doesn't skip around the form.
					$scope.step = 2
				else if $scope.User.activated is 1 and $scope.User.name isnt "" and $scope.User.email is ""
					$scope.step = 3
			else
				$scope.step++
		else alert "Come on, you can't be serious!"

	$scope.validate = ()->
		if $scope.step is 0
			results = storage.find "User", "card", $scope.card
			if results.length is 0 then return false
			$scope.User = results.pop()
		else if $scope.step is 1
			if $scope.User.pin isnt $scope.pin then return false
		true
