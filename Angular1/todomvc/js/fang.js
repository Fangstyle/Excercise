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
			completed: false
		}, {
			id: 2,
			text: '睡觉',
			completed: false
		}, {
			id: 3,
			text: '打豆豆',
			completed: true
		},];
		$scope.add = function () {
			$scope.list.push({
				id:$scope.list.length+1,
				text: $scope.text,
				completed:false
			})
		}
		$scope.removeItem = function (id) {
			var mIndex  = $scope.deleteIndex(id);
			if(mIndex!=-1){
				$scope.list.splice(mIndex,1);
			}
		}
		$scope.deleteIndex = function (target) {
			var index = -1;
			for (var i = 0 ;i<$scope.list.length ; i++){
				if ($scope.list[i].id == target){
					index =  i;
				}
			}
			console.log("index is "+index);
			return index;
		}
	}]);
})(angular);
