(function($, undefined) {

	var div = function() {
		return $('<div />');
	}

	var _name = "animationPlayer";

	$.fn[_name] = function(options) {
		this.displaySelector = $("#" + options.displaySelector);
		this.controlSelector = $(this);
		this.images = options.images;
		this.player_border_color = "#808080" || options.player_border_color;
		this.animation_id = options.animation_id || "flipAnimation";

		var self = this;
		

		/**
		 *	Initialization
		 */
		this.init = function() {

			$(document).ready(function() {
				self.displaySelector.css({
					"width": "100%",
					"height": self.displaySelector.parent().height() - self.controlSelector.height() - 10 + "px",
					"margin-bottom": "10px",
					"border": "solid 2px " + self.player_border_color
				});
			});

			this.controlSelector.on("click", this.start_animation);
		}

		/**
		 *	Selecting animation
		 */
		this.start_animation = function(event) {
			event.preventDefault();
			switch(self.animation_id) {
				case "flipAnimation":
					alert(self.animation_id);
					break;
				default:
					alert(self.animation_id);
					break;

			}
		}

		this.init();
	};
})($);