
// The following code will be enclosed within an anonymous function
var animate_func 	= function()
{
	var main 		= this;

	main.init 		= function()
	{
		main.animationStartEvent();
		main.animationEndEvent();

		main.updateAnimate("anim_envelop_out");
		main.updateAnimate("anim_card_out");
	}

	main.animationStartEvent 	= function()
	{
		jQuery("#btn_start").click(function()
		{
			jQuery("#btn_start").fadeOut();

			main.animationStart("Envelop_Rotate");
		});

		jQuery("#btn_view").click(function()
		{
			jQuery(".card_area").css("display","block");
			main.animationStart("Envelop_Cover");
		});
	}

	main.animationEndEvent 		= function()
	{
		jQuery('#main_area .back_top_cover').on('transitionend', function(e)
		{
			main.isCoverFinished = 1;
			main.animationStart("Card_Move_Out");
		});

		jQuery('#main_area .card_area').bind('webkitAnimationEnd', function(e)
		{
			var mgn_left 	= jQuery(".card_area").css("margin-left").replace("px","");
			var curr_width 	= jQuery(".card_area").width();
				
			mgn_left = (mgn_left - curr_width) / 2;

			if(jQuery(".card_area").hasClass("inside_card_move_front"))
			{
				jQuery("#main_area 	 .card_area").appendTo("#main_area");
				jQuery("#reflect_body .card_area").appendTo("#reflect_body");

				jQuery(".card_area").removeClass("inside_card_move_front");
				jQuery(".card_area").css({"webkit-transform":"rotateZ(0deg)"});
				jQuery(".card_area").css({"margin-left":mgn_left + "px"});

				setTimeout(function()
				{
					jQuery("#envelope_area").css("display","none");
					jQuery("#envelope_area").css("display","none");

					main.animationStart("Card_Full_Show");
				},500);
			}
		});

		jQuery('#main_area .card_1st').bind('webkitAnimationEnd', function(e)
		{
			if(jQuery(".card_1st").hasClass("front_card_full_show"))
			{
				jQuery("#left_btns").fadeIn();
				jQuery("#right_btns").fadeIn();
			}
		});
	}

	main.animationStart 		= function(name)
	{
		switch(name)
		{
			case "Envelop_Rotate" :
				jQuery("#envelope_area").attr("class","envelope_body_animate");
				jQuery("#reflect_envelope_area").attr("class","envelope_body_animate");
			break;

			case "Envelop_Cover" :
				jQuery(".back_top_cover").addClass("envelope_cover_animation");
				jQuery("#btn_view").css('display','none');
			break;

			case "Card_Move_Out" :
				jQuery(".card_area").addClass("inside_card_move_front");
				jQuery("#envelope_back").addClass("envelope_slide_out");
				jQuery("#reflect_envelope_back").addClass("envelope_slide_out");
			break;

			case "Card_Full_Show" :
				jQuery(".card_1st").addClass("front_card_full_show");
				jQuery(".card_2nd").addClass("back_card_full_show");
			break;

			case "Card_Body_X" :
				jQuery(".card_area").addClass("card_body_x_show");
			break;

			case "Card_Body_Hold" :
				jQuery(".card_1st").addClass("card_front_hold");
				jQuery(".card_2nd").addClass("card_front_hold");
			break;

			case "Card_Inner_View" :
				jQuery(".card_1st").addClass("front_card_inner_view");
				jQuery(".card_2nd").addClass("back_card_inner_view");
			break;

			case "Card_Back_View" :
				jQuery(".card_1st").addClass("front_card_back_view");
				jQuery(".card_2nd").addClass("back_card_back_view");
			break;
		}
	}

	main.updateAnimate 		= function(anim_name)
	{
		var keyframes 	= findKeyframesRule(anim_name);
		var moveLeft 	= jQuery("#envelope_area").offset().left + jQuery("#envelope_area").width();
		var cardLeft 	= (jQuery(window).width() - jQuery("#envelope_area").height()) / 2;

		switch(anim_name)
		{
			case "anim_envelop_out" :
				keyframes.deleteRule("100%");
				keyframes.insertRule("100% { -webkit-transform 	: translateX(" + moveLeft + "px) rotateY(180deg);}");

				jQuery(".envelope_slide_out").css("webkitAnimationName",anim_name);
				break;

			case "anim_card_out"  	:
				keyframes.deleteRule("66%");
				keyframes.deleteRule("100%");

				keyframes.insertRule("66%  { -webkit-transform 	: rotateZ(0deg) translateX(" + ( moveLeft * 1 + 100) + "px);}");
				keyframes.insertRule("100% { -webkit-transform 	: rotateZ(0deg) translateX(" + ( cardLeft ) + "px);}");

				jQuery(".inside_card_move_front").css("webkitAnimationName",anim_name);
				break;
		}
	}
}

function findKeyframesRule(rule)
{
	// gather all stylesheets into an array
	var ss = document.styleSheets;
	
	console.log(ss);

	// loop through the stylesheets
	for (var i = 0; i < ss.length; ++i)
	{
		// loop through all the rules
		/* for (var j = 0; j < ss[i].cssRules.length; ++j)
		{
			// find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
			//if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule)
			//	return ss[i].cssRules[j];
			
			if (ss[i].cssRules[j].type == window.CSSRule.STYLE_RULE && ss[i].cssRules[j].selectorText == '#'+rule)
                return ss[i].cssRules[j];
		} */
		
		
		
	var rules = ss[i].cssRules;
    if (!rules)
        rules = ss[i].rules;

    for (var j = 0; j < rules.length; ++j)
    {
        if (rules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && rules[j].name == rule)
            return rules[j];
    }
	}

	// rule not found
	return null;
}

