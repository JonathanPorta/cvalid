$scope = null
loadScope = inject ($rootScope, $controller)->
	$scope = $rootScope.$new()
	$controller "user", {$scope}

describe "user controller", ->
	beforeEach module "cvalid"
	beforeEach loadScope
	afterEach -> delete window.localStorage.clear()   #######THIS MIGHT BE DESTRUCTIVE.....SHRUG.....SHRUG!

	it "exposes user info", ->
		expect($scope.step).toEqual(0, "should start at step 0")
		expect($scope.card).toBeDefined("card number should exist")
		expect($scope.pin).toBeDefined("pin number should exist")
		expect($scope.name).toBeDefined("name should exist")
		expect($scope.email).toBeDefined("email should exist")

	it "advances the step", ->
		expect($scope.step).toEqual(0, "should start at step 0")
		$scope.next()
		expect($scope.step).toEqual(1, "step should be 1 after one entry")

#	it "can remove todo", ->
#		$scope.Todos.current = "Todo 1"
#		$scope.Todos.add()
#		$scope.Todos.current = "Todo 2"
#		$scope.Todos.add()
#		$scope.Todos.remove("Todo 1")
#		expect($scope.todos).toEqual(["Todo 2"], "One todo left.")
#		#expect(true).toEqual(false, "never is")
#
#	describe "localStorage", ->
#		it "saves to, uh,  local storage", ->
#			$scope.Todos.current = "Todo 1"
#			$scope.Todos.add()
#			expect(window.localStorage.getItem('TDD-ToDos')).toBeDefined("TDD-ToDos were created on localStorage")
#			stored = window.localStorage.getItem 'TDD-ToDos'
#			expect(stored).toEqual('["Todo 1"]', "Saves array of todos")
#
#		describe "load", ->
#			beforeEach ->
#				window.localStorage.setItem 'TDD-ToDos', '["Todo 1"]'
#				loadScope()
#
#			it "restores from local storage", ->
#				expect($scope.todos).toEqual(["Todo 1"], "Loaded one saved todo")#
