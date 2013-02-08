var app = app || {};
var ENTER_KEY = 13;

$(function() {
  Morphine.setup({
    singletons: {
      'todoList': app.TodoList,
      'todoListFilter': app.TodoListFilter
    },
    commands: {
      'command:todos:create': app.CreateTodoCommand,
      'command:todos:clearCompleted': app.ClearCompletedTodosCommand,
      'command:todos:toggleAllComplete': app.ToggleAllCompleteCommand
    }
  });
  
  // Start the router after injections have been configured.
	new app.Router();
	Backbone.history.start();

	// Kick things off by creating the **App**.
	new app.AppView();
});
