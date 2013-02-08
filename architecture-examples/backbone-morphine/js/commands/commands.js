var app = app || {};

(function() {
  'use strict';

  app.CreateTodoCommand = Morphine.Command.extend({
    injections: {
      todos: 'todoList'
    },

    execute: function(title) {
      this.todos.create({
        title: title,
        position: this.todos.nextPosition(),
        completed: false
      });
    }
  });

  app.ClearCompletedTodosCommand = Morphine.Command.extend({
    injections: {
      todos: 'todoList'
    },

    execute: function() {
      _.invoke(this.todos.completed(), 'destroy');
    }
  });

  app.ToggleAllCompleteCommand = Morphine.Command.extend({
    injections: {
      todos: 'todoList'
    },

    execute: function(completed) {
      this.todos.each(function( todo ) {
        todo.save({
         'completed': completed
        });
      });
    }
  });

}).call(this);
