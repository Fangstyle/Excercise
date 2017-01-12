/**
 * Created by baocheng on 2017/1/12.
 */
(function(angular) {
	'use strict';


	// 1. 为应用程序创建一个模块，用来管理界面的结构
	var myApp = angular.module('MyTodoMvc', ['ngRoute', 'app.controller.main']);

	// 路由配置
	myApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		// /asdasda {status:asdasda}
			.when('/:status?', {
				controller: 'MainController',
				templateUrl: 'main_tmpl'
			})
			.otherwise({ redirectTo: '/' });
	}]);

})(angular);
