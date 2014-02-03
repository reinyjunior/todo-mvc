;(function () {
	'use strict';
	function Todo() {
		this.storage = new app.Storage();
		this.model = new app.Model(this.storage);
		this.controller = new app.Controller(this.model);
		this.view = new app.View(this.controller);
	}
	var todo = new Todo();
})();
