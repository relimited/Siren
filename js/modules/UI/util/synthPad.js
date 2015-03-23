//defines a synthpad UI element, where the x and y axis corrispond to some sort of synth parameters
//uses a html5 canvas to capture mouse events and define where the valid parts of the pad are

//synth pads don't define, but do call, the start control, end control and update functions.
//this lets a containing UI define these functions and access stuff that might not be in the pad's scope

//So, make sure to define these controls.  Start control is when the synth pad starts paying attention to mouse position, so when the pad is clicked on.
//update fires as long as the pad is clicked on and the mouse moves
//endControl is fired when the mouse is released

define(['inheritance', "../../util/util"], function(Inheritance, Util){'use strict';
	var pad = Class.extend({
		/**
		 * Creates a new synth pad
		 * @param {Object} parent the class that "owns" this synth pad.  Said parent class should have a way to modify a synth
		 * @param {number} xMin the minimum value of the x mapping for this pad
		 * @param {Number} xMax the maximum value of the x mapping for this pad
		 * @param {Number} yMin the minimum value of the y mapping for this pad
		 * @param {Number} yMax the maximum value of the y mapping for this pad
		 */
		init : function(xMin, xMax, yMin, yMax){			
			this.xMin = xMin;
			this.yMin = yMin;
			this.xMax = xMax;
			this.yMax = yMax;
		
			console.log(xMin, xMax, yMin, yMax);
			this.canvasElement = $("<canvas />", {
				'id' : 'synth-pad'
			});
			
			this.canvas = this.canvasElement[0];
			
			this.setupEventHandlers(this.parent, this.xMin, this.yMin, this.xMax, this.yMax);
		},
		
		//configure event handlers
		//event handlers are local functions, to keep them anonymous and prevent other classes from calling them
		setupEventHandlers : function(parent, xMin, yMin, xMax, yMax){
			var pad = this; //expose the pad for use in internal functions
			
			var handleUpdatePosition = function(evt){
				var x , y;
				if(evt.type == 'mousedown' || evt.type == 'mousemove'){
					x = evt.x;
					y = evt.y;
				}else if(evt.type == 'touchstart' || evt.type == 'touchmove'){
					var touch = evt.touches[0];
					x = touch.pageX;
					y = touch.pageY;
				}
				
				console.log('x values: ');
				console.log('x', x, 'offsetWidth', pad.canvas.offsetWidth, 'offsetLeft',  pad.canvas.offsetLeft, 'noteMin', xMin, 'noteMax', xMax);
				var xVal = Util.calculateMapping(x, pad.canvas.offsetWidth, pad.canvas.offsetLeft, xMin, xMax);
				var yVal = Util.calculateMapping(y, pad.canvas.offsetHeight, pad.canvas.offsetTop, yMin, yMax);
				var values = {'xVal' : xVal, 'yVal' : yVal};
				pad.update(values);
			};
			
			var handleStartControl = function(evt){
				pad.startControl(evt);
				
				pad.canvas.addEventListener('mousemove', handleUpdatePosition);
				pad.canvas.addEventListener('touchmove', handleUpdatePosition);
				pad.canvas.addEventListener('mouseout', handleStopControl);
			};
			
			var handleStopControl = function(evt){
				pad.endControl(evt);
				
				pad.canvas.removeEventListener('mousemove', handleUpdatePosition);
				pad.canvas.removeEventListener('touchmove', handleUpdatePosition);
				pad.canvas.removeEventListener('mouseout', handleStopControl);
			};
			
			pad.canvas.addEventListener('mousedown', handleStartControl);
			pad.canvas.addEventListener('touchstart', handleStartControl);
			
			pad.canvas.addEventListener('mouseup', handleStopControl);
  			pad.canvas.addEventListener('touchend', handleStopControl);
  			 
    		document.addEventListener('mouseleave', handleStopControl);
    		
    		//FIXME kinda dangerous but eh.  Expose the local event handlers under the context of this.handlers
    		this.handlers = {
    			'handleUpdatePosition' : handleUpdatePosition,
    			'handleStartControl' : handleStartControl,
    			'handleStopControl' : handleStopControl
    		};
    		
		}
	});
	
	return pad;
});
