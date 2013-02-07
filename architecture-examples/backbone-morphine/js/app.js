var app = app || {};
var ENTER_KEY = 13;

$(function() {

  // Morphine Setup
  injector = Morphine.Injector.instance();
  injector.mapSingleton('todoList', app.TodoList);
  injector.mapSingleton('todoListFilter', app.TodoListFilter);
  
  // Start the router after injections have been configured.
	new app.Router();
	Backbone.history.start();

	// Kick things off by creating the **App**.
	new app.AppView();

});
