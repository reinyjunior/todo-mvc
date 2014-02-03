
var storage, model, controller;

module('storage', {
	setup: function() {
		var localStorage = window.localStorage;
		var task = [{id: 1, title: 'title'}];
		task = JSON.stringify(task);
		localStorage.setItem('todo', task);
	}
});

test('test storage object', function() {
	expect(2);
	storage = new app.Storage();
	var task = [{id: 1, title: 'title'}];
	equal(storage.setStorage(task), true, 'set storage data correctly');
 	deepEqual(storage.getStorage(), task, 'get storage data correctly');
});

module('model', {
	setup: function() {
		storage = new app.Storage();
		model = new app.Model(storage);
	}
});

test('test model object', 10, function() {
	ok(model.storage instanceof app.Storage, 'storage object create correctly');
	ok(model.all() instanceof Array, 'return tasks correctly');
	equal(model.create({title: 'task one'}), true, 'task created correctly');
	equal(model.create({title: ''}), false, 'task created error');

	storage.setStorage([{id: 1, title: 'update task test'}]);

	deepEqual(model.find({id: 1}), {id: 1, title: 'update task test'}, 'task find correctly');

	equal(model.find({id: 0}), false, 'task find error');
	equal(model.update({id: 1, title: 'update task test updated'}), true, 'task updated correctly');
	equal(model.update({id: 0, title: 'update task test updated'}), false, 'task update error');
	equal(model.delete({id: 1}), true, 'task delete correctly');
	equal(model.delete({id: 0}), false, 'task delete error');
});

module('controller', {
	setup: function() {
		storage = new app.Storage();
		model = new app.Model(storage);
		controller = new app.Controller(model);
	}
});

test('test controller action', 3, function() {
	equal(controller.create('controller create task test'), true, 'task controller create correctly');
	storage.setStorage([{id: 1, title: 'delete task test'}]);
	equal(controller.delete(1), true, 'task controller delete correctly');
	ok(controller.index() instanceof Array, 'controller index action correctly');
});