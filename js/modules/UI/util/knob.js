//Basic controller to make an angonstic knob that controls... something
define(["inheritance", "jqKnob"], function(Inheritance, jqKnobg){
	var knob = Class.extend({
		
		init : function(min, max){
			this.max = max;
			this.min = min;
			this.knob = undefined; //explicitly set to undefined at the start
		},
		
		//seperate from initialization because we need to create a seperate listener for what this knob conrols external to this knob
		//the listener is passed in
		createKnob : function(knobListener, id){
			this.knob =  $("<input />", {
				'type' : 'text',
				'data-min' : this.min,
				'data-max' : this.max,
				'data-displayPrevious' : true,
				'id' : id,
				'class' : 'audioControl',
				'data-width' : 130,
				'data-rotation' : 'clockwise',
				'value' : this.min
			//Append listeners to the knob
			}).knob(knobListener);
		},
		
		//Return the jQuery object that wraps the knob
		getElement : function(){
			if(this.knob == undefined){
				throw "Knob has yet to be defined!";
			}else{
				return this.knob;
			}
		},
		
		//Get the raw HTML5 input element
		getRawInput : function(){
			if(this.knob == undefined){
				throw "Knob has yet to be defined!";
			}else{
				return this.knob[0];
			}
		}
	});
	
	return knob;
});
