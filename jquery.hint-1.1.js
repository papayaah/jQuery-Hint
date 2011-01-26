/*
 * jQuery Hint plugin 1.1
 *
 * http://programmingmind.com
 *
 * Copyright (c) 2007 Original written by Remy Sharp - http://remysharp.com/2007/01/25/jquery-tutorial-text-box-hints/
 * Copyright (c) 2010 David Ang
 *
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *   
 */

(function ($) {
	
	$.fn.hint = function (options) {
	  var origFontStyle = null;
	  var origColor = null;
		
      var settings = $.extend({}, $.fn.hint.defaults, options);		

	  return this.each(function () {
	    // get jQuery version of 'this'
	    var $input = $(this),

	    // capture the rest of the variable to allow for reuse
	      title = $input.attr('title'),
	      $form = $(this.form),
	      $win = $(window);

	    function remove() {
	      if ($input.val() === title && $input.hasClass(settings.blurClass)) {
	        $input.val('').removeClass(settings.blurClass);
		    $input.css('fontStyle', origFontStyle);
		    $input.css('color', origColor);
	      }
	    }

	    // only apply logic if the element has the attribute
	    if (title) { 
		  origFontStyle = $input.css('fontStyle');
		  origColor = $input.css('color');		

	      // on blur, set value to title attr if text is blank
	      $input.blur(function () {
	        if (this.value === '') {
	          $input.val(title).addClass(settings.blurClass);
			  $input.css('fontStyle', settings.fontStyle);
			  $input.css('color', settings.color);
	        }
	      }).focus(remove).blur(); // now change all inputs to title

	      // clear the pre-defined text when form is submitted
	      $form.submit(remove);
	      $win.unload(remove); // handles Firefox's autocomplete
	    }
	  });
	};
	
	$.fn.hint.defaults = {
        color: 'gray',
		fontStyle: 'italic',
		blurClass: 'blur'
     };	
	
})(jQuery);