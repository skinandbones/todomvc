var app = app || {};

(function() {
	'use strict';

	// Todo Router
	// ----------

	app.Router = Morphine.Router.extend({
		routes:{
			'*filter': 'setFilter'
		},

    injections: {
      todos: 'todoList',
      currentFilter: 'todoListFilter'
    },

		setFilter: function( param ) {
      this.currentFilter.set('value', (param.trim() || ''));
		}
	});

}).call(this);
