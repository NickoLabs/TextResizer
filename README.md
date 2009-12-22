TextResizer
===========

TextResizer is an easy to setup plugin... The goal of this script is to provide quick Text Resizing options.

![Screenshot](http://nickolabs.com/image/text_resizer_shot.jpg)

Installation
----------

Simply add the script to your page, and use:
	### Javascript
	window.addEvent('domready',function(){	
		var text_resizer = new TextResizer();
	});

Usage
----------

For an element to be recognized by the script, it has to contain the CSS class: "text-resize-me".
Example: 

	### HTML
	<div id="news" class="text-resize-me">
	  <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	</div>


Options
----------

There are few options that can be specified.
The container for the tool can either be a div of your own choice or, by default, the document body itself.
You can also specify the sizes available.

	### Javascript
	var text_resizer = new TextResizer({
		container: 'text_resizer_holder',
		sizes: $H({normal: "15px",
		 	big: "22px"})
	});

The goal I want to achieve (and it will be down in future development) is to be able to set size specifically to a resizable element. For exemple, be able to set a normal size state that would set the font-size to X pixel and Y pixel to this other elements.