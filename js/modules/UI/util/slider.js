//Makes a new slider.  Whee sliders
//The slider is agnostic to what it's actually changing, like any good UI element

define(['inheritance'], function(Inheritance){
	var slider = Class.extend({
		
		init : function(min, max){
			this.max = max;
			this.min = min;
			this.slider = undefined; //start the slider out as undefined
		},
		
		createSlider : function(sliderListener, id){
			this.slider = $("<div />", {
				height : '200px',
				'id' : id,
				'class' : 'audioControl'
			}).slider({
				orientation: "vertical",
      			range: "min",
      			min : this.min,
      			max : this.max,
      			value : this.min,
      			slide : sliderListener.slide
			});
		},
		
		//Return the jQuery object that wraps the knob
		getElement : function(){
			if(this.slider == undefined){
				throw "Knob has yet to be defined!";
			}else{
				return this.slider;
			}
		},
		
		//Get the raw HTML5 input element
		getRawInput : function(){
			if(this.slider == undefined){
				throw "Knob has yet to be defined!";
			}else{
				return this.slider[0];
			}
		}
	});
	
	return slider;
});
