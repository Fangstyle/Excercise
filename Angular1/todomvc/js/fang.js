/**
 * Created by Administrator on 2017/1/10.
 */
(function (){
	var app = angular.module("MyTodoMvc",[]);
	app.controller("MainController",['$scope',function ($scope) {
		$scope.text = "hahaha";
		$scope.list = [{
			id: 1,
			text: '学习',
			completed: false,
			isEdit:false,
		}, {
			id: 2,
			text: '睡觉',
			completed: false,
			isEdit:false,
		}, {
			id: 3,
			text: '打豆豆',
			completed: false,
			isEdit:false,
		},];
		$scope.add = function () {
			$scope.list.push({
				id:$scope.insertId(),
				text: $scope.text,
				completed: false,
				isEdit:false,
			})
		}
		$scope.insertId = function () {
			var newId = 0;
			if ($scope.list.length){
				newId = $scope.list[$scope.list.length-1].id+1;
			}else{
				newId = 1;
			}
			return newId;
		}
		$scope.removeItem = function (id) {
			var mIndex  = $scope.targetIndex(id);
			if(mIndex!=-1){
				$scope.list.splice(mIndex,1);
			}
			console.log("2222222222");
		}
		$scope.targetIndex = function (target) {
			var index = -1;
			for (var i = 0 ;i<$scope.list.length; i++){
				if ($scope.list[i].id == target){
					index =  i;
				}
			}
			console.log("index is "+index);
			return index;
		}
		$scope.editId = -1;
		$scope.toEdit = function (id) {
			$scope.editId  = id;
		}
		$scope.save = function (id) {
			$scope.editId  = -1;
			var index = $scope.targetIndex(id);
			//$scope.list[index].text ="111";
		}
	}]);
})(angular);
