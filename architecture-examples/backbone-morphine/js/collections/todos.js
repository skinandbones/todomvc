var app = app || {};

(function() {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	app.TodoList = Morphine.Collection.extend({

		// Reference to this collection's model.
		model: app.Todo,

		// Save all of the todo items under the `"todos"` namespace.
		localStorage: new Store('todos-backbone'),

		// Filter down the list of all todo items that are finished.
		completed: function() {
			return this.filter(function( todo ) {
				return todo.get('completed');
			});
		},

		// Filter down the list to only todo items that are still not finished.
		remaining: function() {
			return this.without.apply( this, this.completed() );
		},

		nextPosition: function() {
			if ( !this.length ) {
				return 1;
			}
			return this.last().get('position') + 1;
		},

		// Todos are sorted by their original insertion order.
		comparator: function( todo ) {
			return todo.get('position');
		}
	});

}).call(this);
