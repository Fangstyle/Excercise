/**
 * Created by Administrator on 2017/1/10.
 * 使用路由版本
 */
(function () {
	var app = angular.module("MyTodoMvc", ['ngRoute']);
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/:status', {
				controller: "MainController",
				templateUrl: "main_tmpl",
			})
		.otherwise({ redirectTo: '/' });
	}]);
	/*// 路由配置
	myApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		// /asdasda {status:asdasda}
			.when('/:status?', {
				controller: 'MainController',
				templateUrl: 'main_tmpl'
			})
			.otherwise({ redirectTo: '/' });
	}]);*/
	app.controller("MainController", ['$scope','$routeParams', function ($scope,$routeParams) {
		$scope.text = "hahaha";
		$scope.list = [{
			id: 1,
			text: '学习',
			completed: false,
			isEdit: false,
		}, {
			id: 2,
			text: '睡觉',
			completed: false,
			isEdit: false,
		}, {
			id: 3,
			text: '打豆豆',
			completed: true,
			isEdit: false,
		},];
		$scope.add = function () {
			$scope.list.push({
				id: $scope.insertId(),
				text: $scope.text,
				completed: false,
				isEdit: false,
			})
		};
		$scope.insertId = function () {
			var newId = 0;
			if ($scope.list.length) {
				newId = $scope.list[$scope.list.length - 1].id + 1;
			} else {
				newId = 1;
			}
			return newId;
		};
		/*根据传入的id 删除list集合中的某个元素*/
		$scope.removeItem = function (id) {
			var mIndex = $scope.targetIndex(id);
			if (mIndex != -1) {
				$scope.list.splice(mIndex, 1);
			}
			console.log("2222222222");
		};
		/*根据传入的id 找到当前数组中的索引值*/
		$scope.targetIndex = function (target) {
			var index = -1;
			for (var i = 0; i < $scope.list.length; i++) {
				if ($scope.list[i].id == target) {
					index = i;
				}
			}
			console.log("index is " + index);
			return index;
		};
		$scope.editId = -1;
		$scope.toEdit = function (id) {
			$scope.editId = id;
		};
		$scope.save = function (id) {
			$scope.editId = -1;
			var index = $scope.targetIndex(id);
			//$scope.list[index].text ="111";
		};
		/*点击checkbox 根据双向绑定原则 更改它所在列表项的 completed属性值（变为相反）*/
		$scope.tagleCompelted = function (target) {
			var index = $scope.targetIndex(target);
			$scope.list[index].completed = !$scope.list[index].completed;
		};
		/*点击删除已完成任务时，根据双向绑定原理 ， 就是删除当前列表对象中 completed属性值为 true的项 */
		$scope.clearCompelted = function () {
			for (var i = 0; i < $scope.list.length; i++) {
				if ($scope.list[i].completed) {
					$scope.list.splice(i, 1);
				}
			}
		};

		switch ($routeParams.status) {
			case 'active':
				$scope.listConditionSelector = {completed: false};
				break;
			case 'completed':
				$scope.listConditionSelector = {completed: true};
				break;
			default:
				$scope.listConditionSelector = {};
				break;
		}

	}]);
})(angular);
