;(function(window){
	function Model(storage){
		this.data = storage.getStorage();
		this.storage = storage;
	}
	
	Model.prototype = {
		all: function() {
			return this.storage.getStorage();
		},

		create: function(task) {
			if(task.title.length == 0){
				return false;
			}
			var object = {
				"id": Math.floor(Math.random()*123456),
				"title": task.title
			}
			var key = this.data.length;
			this.data[key] = object;
			this.storage.setStorage(this.data);
			return true;
		},

		update: function(task) {
			return this.search(task, function(key, task){
				this.data[key] = merge(this.data[key], task);
				this.storage.setStorage(this.data);
				return true;
			});
		},

		find: function(task) {
			return this.search(task, function(key, task){
				return this.data[key];
			});
		},

		delete: function(task) {
			return this.search(task, function(key, task){
				this.data.splice(key, 1);
				this.storage.setStorage(this.data);
				return true;
			});
		},

		search: function(task, func){
			this.data = this.storage.getStorage();
			for (var key = 0; this.data.length > key; key++) {
				if(this.data[key].id == task.id) {
					return func.apply(this, [key, task]);
				}
			}
			return false;
		}
	}
	window.app = window.app || {};
	window.app.Model = Model;
})(window);