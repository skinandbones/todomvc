var app = app || {};

(function() {
	'use strict';

	// TodoListFilter Model
	// ----------
	app.TodoListFilter = Morphine.Model.extend({
		defaults: {
			value: ''
		},

    isCompleted: function() {
      return this.get('value') === 'completed';
    },

    isActive: function() {
      return this.get('value') === 'active';
    }
	});

  Morphine.Injector.instance().mapSingleton('todoListFilter', app.TodoListFilter);
}());
