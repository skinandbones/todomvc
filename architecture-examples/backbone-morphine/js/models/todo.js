var app = app || {};

(function() {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `position`, and `completed` attributes.
	app.Todo = Morphine.Model.extend({

		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false
		},

		// Toggle the `completed` state of this todo item.
		toggle: function() {
			this.save({
				completed: !this.get('completed')
			});
		}
	});

}());
