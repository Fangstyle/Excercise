/**
 * Created by Administrator on 2017/1/10.
 */
(function (){
	var app = angular.module("MyTodoMvc",[]);
	app.controller("MainController",['$scope',"$location",function ($scope,$location) {
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
			completed: true,
			isEdit:false,
		},];
		$scope.add = function () {
			$scope.list.push({
				id:$scope.insertId(),
				text: $scope.text,
				completed: false,
				isEdit:false,
			})
		};
		$scope.insertId = function () {
			var newId = 0;
			if ($scope.list.length){
				newId = $scope.list[$scope.list.length-1].id+1;
			}else{
				newId = 1;
			}
			return newId;
		};
		/*根据传入的id 删除list集合中的某个元素*/
		$scope.removeItem = function (id) {
			var mIndex  = $scope.targetIndex(id);
			if(mIndex!=-1){
				$scope.list.splice(mIndex,1);
			}
			console.log("2222222222");
		};
		/*根据传入的id 找到当前数组中的索引值*/
		$scope.targetIndex = function (target) {
			var index = -1;
			for (var i = 0 ;i<$scope.list.length; i++){
				if ($scope.list[i].id == target){
					index =  i;
				}
			}
			console.log("index is "+index);
			return index;
		};
		$scope.editId = -1;
		$scope.toEdit = function (id) {
			$scope.editId  = id;
		};
		$scope.save = function (id) {
			$scope.editId  = -1;
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
			for (var i = 0 ;i<$scope.list.length;i++){
				if($scope.list[i].completed){
					$scope.list.splice(i,1);
				}
			}
		};
		/*此处为模糊的筛选 ， 筛选的内容只是列表中的某些属性 而此处将筛选的结果变成对象方便筛选
		*  这个模版 当我点击 all active completed 这个a链接的时候进行锚点的跳转（不刷新浏览器） 地址栏后有#all or#active 。。
		*  而此处 我们只需要修改 completed: 后的true or false 所以我们想到
		*  利用浏览器锚点的性质处理
		*  当浏览器的锚点为http：// xxx...#/active 时 让completed : false (点击正在进行中任务的按钮)
		*  当浏览器的锚点为http：// xxx...#/completed时 让completed : true(点击正在已经完成任务的按钮)
		* */
		$scope.listConditionSelector = {};
		/* 这样写就要求执行环境必须要有window对象 而根据软件设计的原理 应该低耦合 所以不用这种方式
		 * var loction = window.location;//拿到当前浏览器的网址对象
		 * var hash  = window.location.hash();//拿到当前浏览器的锚点
		*/
		/*angular的controller api中提供了 （封装）一种拿到window.location对象的方法
		* 这样就可以使用内部的变量  实现软件工程的 高内聚，低耦合
		* app.controller("",['$scope',"$location",function ($scope,$location) { }]);
		* */
		//$location.path(); window的location的hash()--> $location.path()
		console.log($location);
		/*网站描点的跳转 不会刷新页面， 所以不会重新执行一次 switch case 语句 所以我们要 watch
		* 而 $scope 中的watch方法只能 watch $scope中的对象 而我们需要watch $location
		* 所以要进行一下操作
		* */
		$scope.location = $location;
		$scope.$watch('location.path()',function (now,old) {
			switch (/*$location.path()*/now){
				case '/active':
					$scope.listConditionSelector = { completed: false };
					break;
				case '/completed':
					$scope.listConditionSelector = { completed: true };
					break;
				default:
					$scope.listConditionSelector = {};
					break;
			}
		})

	}]);
})(angular);
