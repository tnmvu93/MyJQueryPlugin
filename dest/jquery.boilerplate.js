// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "vCarousel",
			defaults = {
				action: '',
				numberImage: 3,
				width: 748,
				milestone: '.vcarousel ul',
				dotIconContainer: '.photo-paging ',
				initFunction: function () {},
				otherFunction: function () {}
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
				this.settings.initFunction();

				if ($(this.settings.milestone).data('position') == undefined) {
					$(this.settings.milestone).data('position', 0);
				}
				
				switch(this.settings.action) {
					case 'goLeft': 
						this.goLeft();
						break;
					case 'goRight':
						this.goRight();
						break;
					case 'chooseImage':
						this.chooseImage();
						break;
				}

				this.settings.otherFunction();
			},

			goLeft: function() {
				var self = this;
				$(this.element).click(function() {
					var oldPosition = $(self.settings.milestone).data('position');
					var newPosition = oldPosition - 1;

					if (newPosition < 0) {
						newPosition = self.settings.numberImage - 1;
					}

					self.goToImage(oldPosition, newPosition);
				})
			},

			goRight: function() {
				var self = this;
				$(this.element).click(function() {
					var oldPosition = $(self.settings.milestone).data('position');
					var newPosition = oldPosition + 1;

					if (newPosition >= self.settings.numberImage) {
						newPosition = 0;
					}

					self.goToImage(oldPosition, newPosition);
				});
			},

			chooseImage: function() {
				var self = this;
				$(this.element).click(function() {
					var oldPosition = $(self.settings.milestone).data('position');
					var newPosition = $(this).index();

					self.goToImage(oldPosition, newPosition);
				})
			},

			goToImage: function (oldPosition, newPosition) {
				if (oldPosition == newPosition) return;
				
				var milestone = $(this.settings.milestone);
				milestone.css('left', -(newPosition * this.settings.width) + 'px');

				this.updateDotIcon(oldPosition, newPosition);

				milestone.data('position', newPosition);
			},

			updateDotIcon: function(oldPosition, newPosition) {
				this.removeActiveClass(oldPosition);
				this.addActiveClass(newPosition);
			},

			addActiveClass: function(newPosition) {
				$(this.settings.dotIconContainer + ' a').eq(newPosition).addClass('active-img');
			},

			removeActiveClass: function(oldPosition) {
				$(this.settings.dotIconContainer + ' a').eq(oldPosition).removeClass('active-img');
			},
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );