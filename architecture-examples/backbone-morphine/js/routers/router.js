var app = app || {};

(function() {
	'use strict';

	// Todo Router
	// ----------

	var Workspace = Morphine.Router.extend({
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

	var todoRouter = new Workspace();
  Morphine.Injector.instance().mapValue('router', todoRouter);
	Backbone.history.start();
}());
