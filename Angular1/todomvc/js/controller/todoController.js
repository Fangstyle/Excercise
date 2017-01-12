/**
 * Created by baocheng on 2017/1/12.
 */
(function (angular) {
	var controllers = angular.module('app.controller.main',['app.servers.main']);
	controllers.controller('MainController', ['$scope', 'MainServices','$routeParams', function ($scope,MainServices,$routeParams) {
		$scope.text = "hahaha";
		$scope.list = MainServices.getData();
		$scope.add = function () {
			MainServices.add($scope.text);
		};
		/*根据传入的id 删除list集合中的某个元素*/
		$scope.removeItem = function (id) {
			MainServices.removeItem(id);
		};

		$scope.editId = -1;
		$scope.toEdit = function (id) {
			$scope.editId = id;
		};
		$scope.save = function (id) {
			$scope.editId = -1;
		};
		/*点击checkbox 根据双向绑定原则 更改它所在列表项的 completed属性值（变为相反）*/
		$scope.tagleCompelted = function (target) {
			MainServices.tagleCompelted(target);
		};
		/*点击删除已完成任务时，根据双向绑定原理 ， 就是删除当前列表对象中 completed属性值为 true的项 */
		$scope.clearCompelted = function () {
			MainServices.clearCompelted();
		};
		$scope.listConditionSelector = {};
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
})(angular)
