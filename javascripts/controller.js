;(function(window){
	function Controller(model){
		this.model = model;
	}
	Controller.prototype = {
		index: function() {
			var tasks = this.model.all();
			return tasks.reverse();
		},
		create: function(title) {
			var task = {title: title};
			return this.model.create(task);
		},
		delete: function(id){
			var task = {id: id};
			return this.model.delete(task);
		}
	}
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);