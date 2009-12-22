/*
---
script: TextResizer.js

description: TextResizer class

license: MIT-style

authors: 
- Nickolas Simard (http://blog.nickolabs.com/)

requires: 
  core/1.2.4: '*'

provides: 
- TextResizer
...
*/
var TextResizer = new Class ({
	// Implements
	Implements: [Options, Events],
	
	// Options
	options: {
		sizes: null,
		container: null,
		// Set the default Size status to normal for the moment
		size_status: $H({normal: "12px"})/*,
		buildController: $empty,
		addSizeButton: $empty,
		setSize: $empty,
		onClick: $empty,
		setCookie: $empty
		*/
	},
	
	// Initialization
	initialize: function(options){
		// Set Options
		this.setOptions(options);
		// Get the container OR the default Body
		this.container = $(this.options.container) || $(document.body);
		// Get the default size settings
		this.sizes = this.options.sizes || $H({normal: "12px",
											   big: "14px",
											   bigger: "16px",
											   huge: "18px",
											   humongous: "22px"
											   });
		
		// Grab the Elements with the class "text-resize-me"
		if ($$(".text-resize-me").length != 0)
		{
			this.text_zones = $$(".text-resize-me");
		}
		else
		{
			this.text_zones = $$(document.body);
		}
		// Set the sizes for the text_zones
		this.text_zones.each(function(text_zone){
			text_zone.store('sizes', this.sizes);
		}, this);
		
		// Grab the cookie OR the default size
		// Check if the user defined his own sizes and if there is a "normal" state
		if (this.sizes.get("normal"))
		{
			var normal_size_hash = new Hash();
			this.options.size_status = normal_size_hash.set('normal', this.sizes.get("normal"));
		}
		var cookie_hash = new Hash();
		cookie_hash.set(Cookie.read('size_status_key'), Cookie.read('size_status_value'));
		this.size_status =  cookie_hash || this.options.size_status;
		
		// Set the starting size
		this.setSize(this.size_status);
		
		// Inject the controllers in the container
		this.buildController();
	},
	
	// buildController
	// Create the div, the label and the size switching ul/li
	buildController: function(){
		// Generate the Size list
		var font_sizes = new Element('div', {'style': 'display: inline'});
		this.sizes.each(function(size, index){
			this.addSizeButton(size, index, font_sizes);
		}, this);
		
		// Create the controller and add the newly create size list to it
		var controller = new Element('div', {'id': 'TextResizerController'}).adopt(
			new Element('span', {
				'html': 'Text size : '/*,
				'style': 'float: left;'*/
			}).adopt(font_sizes)
		);
		
		// Inject the HTML into the container
		controller.inject(this.container, 'top');
	},
	
	// addSizeButton
	addSizeButton: function(size, index, holder){
		var param_hash = new Hash();
		param_hash.set(index, size);
		holder.adopt(new Element('span', {
			'html': 'A', 
			'style': 'cursor: pointer; padding: 0; margin: 3px; font-size:' + size,
			'title': "Change font size to " + size +" (" + index + ")"/*,
			events: {
				click: function() {
					setSize(index);
				}
			}*/
		}).addEvent('click', this.onClick.bindWithEvent(this, param_hash)));
	},
	
	onClick: function(evt, param) {
		this.setSize(param);
		return false;
	},
	
	// setSize
	setSize: function(size){
		// If the "size" format is an hash, keep going
		if ($type(size) == 'hash')
		{
			var selected_size_key = size.getKeys();
			var selected_size_value = size.getValues();
			this.text_zones.each(function(text_zone){
				
				var size_hash = text_zone.retrieve('sizes');
				//alert(size_hash);
				size_hash.each(function(value, key){
					// If the element has a corresponding size value for the specified size name
					if (key == selected_size_key)
					{
						// Redefined the size setting
						selected_size_value = value;
						selected_size_key = key;
					}
				}, this);
				
				// Set the size using either the default or the redefined size
				text_zone.setStyle('font-size', selected_size_value);
			}, this);
		}
		this.setCookie(selected_size_key, selected_size_value);
	},
	
	// setCookie to save the current settings
	setCookie: function(key, value){
		Cookie.write('size_status_key', key);
		Cookie.write('size_status_value', value);
	}
});