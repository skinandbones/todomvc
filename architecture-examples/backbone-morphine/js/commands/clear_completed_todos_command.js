var app = app || {};

(function() {
  'use strict';

  app.ClearCompletedTodosCommand = Morphine.Command.extend({
    injections: {
      todos: 'todoList'
    },

    execute: function() {
      _.invoke(this.todos.completed(), 'destroy');
    }
  });

}).call(this);
