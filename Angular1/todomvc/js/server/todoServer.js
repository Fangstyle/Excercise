/**
 * Created by baocheng on 2017/1/12.
 */
(function (angular) {
	angular.module('app.servers.main',[])
		.service('MainServices',['$window', function($window) {
			var list = [{
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
			}];
			this.add = function (text) {
				   list.push({
					id: this.insertId(),
					text: text,
					completed: false,
					isEdit: false,
				})
			};
			this.getData = function () {
				return list;
			};
			this.insertId = function () {
				var newId = 0;
				if (list.length) {
					newId = list[list.length - 1].id + 1;
				} else {
					newId = 1;
				}
				return newId;
			};
			/*根据传入的id 删除list集合中的某个元素*/
			this.removeItem = function (id) {
				var mIndex = this.targetIndex(id);
				if (mIndex != -1) {
					list.splice(mIndex, 1);
				}
			};
			/*根据传入的id 找到当前数组中的索引值*/
			this.targetIndex = function (target) {
				var index = -1;
				for (var i = 0; i < list.length; i++) {
					if (list[i].id == target) {
						index = i;
					}
				}
				console.log("index is " + index);
				return index;
			};
			/*点击checkbox 根据双向绑定原则 更改它所在列表项的 completed属性值（变为相反）*/
			this.tagleCompelted = function (target) {
				var index = this.targetIndex(target);
				list[index].completed = !list[index].completed;
			};
			/*点击删除已完成任务时，根据双向绑定原理 ， 就是删除当前列表对象中 completed属性值为 true的项 */
			this.clearCompelted = function () {
				for (var i = 0; i < list.length; i++) {
					if (list[i].completed) {
						list.splice(i, 1);
					}
				}
			};
		}]);
})(angular);
