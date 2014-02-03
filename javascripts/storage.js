;(function(window){
	function Storage(){
		this.initialize();
	}
	Storage.prototype = {
		initialize: function() {
			if(window.localStorage) {
				this.storage = window.localStorage;
				if(this.storage.getItem("todo") == null){
					this.storage.setItem("todo", "[]");
				}
			} else {
				console.error("Local Storage unsupport!");
			}
		},
		setStorage: function(data) {
			var data = JSON.stringify(data);
			this.storage.setItem("todo", data);
			return true;
		},
		getStorage: function() {
			var data = this.storage.getItem("todo");
			return JSON.parse(data);
		}
	}
	window.app = window.app || {};
	window.app.Storage = Storage;
})(window);