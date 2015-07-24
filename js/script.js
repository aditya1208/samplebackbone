$(function(){

	// Creating a model
	var Service = Backbone.Model.extend({

		// Default values if anything goes wrong
		defaults:{
			title: 'My service',
			price: 100,
			checked: false
		},

		// Toggle function to check/uncheck a skill
		toggle: function(){
			this.set('checked', !this.get('checked'));
		}
	});


	// Creating a Collection of available skills. Can add more.
	var ServiceList = Backbone.Collection.extend({

		// Objects of checked values
		model: Service,

		// Return an array only with the checked services
		getChecked: function(){
			return this.where({checked:true});
		}
	});

	//Dummy list of available skills
	var services = new ServiceList([
		new Service({ title: 'Front End Service(UX/UI)', price: 200}),
		new Service({ title: 'Full Stack Service', price: 450}),
		new Service({ title: 'Content Management Sites', price: 100}),
		new Service({ title: 'Tableau', price: 150}),
		new Service({ title: 'SalesForce', price: 200}),
		new Service({ title: 'NoSQL Database Tutorials', price: 250}),
		new Service({ title: 'Ruby on Rails', price: 400}),
		new Service({ title: 'Python', price: 300}),
		new Service({ title: 'Java', price: 300}),
		new Service({ title: 'Android App Development', price: 250})
		// Add more here
	]);

	//View to change service to html
	var ServiceView = Backbone.View.extend({
		tagName: 'li',

		events:{
			'click': 'toggleService'
		},

		initialize: function(){
				//Shows any changes
			this.listenTo(this.model, 'change', this.render);
		},

		render: function(){

			// Create the HTML with "el"

			this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
			this.$('input').prop('checked', this.model.get('checked'));

			return this;
		},

		toggleService: function(){
			this.model.toggle();
		}
	});

	//View part 
	var App = Backbone.View.extend({

		//Position the view to the display in html
		el: $('#main'),

		initialize: function(){

			this.total = $('#total span');
			this.list = $('#services');
			
			this.listenTo(services, 'change', this.render);
				//adds all services to view
			services.each(function(service){

				var view = new ServiceView({ model: service });
				this.list.append(view.render().el);

			}, this);
		},

		render: function(){
			//Sum of selected 
			var total = 0;

			_.each(services.getChecked(), function(elem){
				total += elem.get('price');
			});

			// Update the total for every selection
			this.total.text('$'+total);

			return this;

		}

	});

	new App();

});
