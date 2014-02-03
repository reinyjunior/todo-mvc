;(function(window){

	function View(controller){
		this.controller = controller;
		this.template = $("#task-template").innerHTML;
		this.field = $("#task-field");
		this.counter = $("#task-counter");
		this.container = $("#task-container");
		this.item = $("#task-container");
		this.initialize();
	}
	
	View.prototype = {
		index: function() {
			var html = "";
			var self = this;
			tasks = this.controller.index();
			tasks.forEach(function(task){
				html += self.render(task);
			});
			this.container.innerHTML = html;
			this.counter.innerHTML = tasks.length;
			this.events(self);
		},
		events: function(self){
			var elements = document.getElementsByTagName("li");
			for (var index = 0; index < elements.length; index++){
				var element = elements[index];
				element.getElementsByTagName("a")[0].onclick = function(){
					self.delete(this.getAttribute("id"));
				}
			}
		},
		create: function(){
			this.controller.create(this.field.value);
			this.index();
		},
		delete: function(id){
			console.log(id);
			this.controller.delete(id);
			this.index();
		},
		render: function(task){
			return this.template
			.replace("{{title}}", task.title)
			.replace("{{id}}", task.id);
		},
		initialize: function() {
			var self = this;
			window.addEventListener("load", function(event){
				self.index(self);
			});
			this.field.addEventListener("keypress", function(event){
				if(event.keyCode == 13){
					self.create(self);
					this.value = "";
				}
			});
		}
	}
	window.app = window.app || {};
	window.app.View = View;
})(window);