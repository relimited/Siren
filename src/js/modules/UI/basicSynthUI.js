//Building a basic Synth UI using jQuery
//Uses a 2D synth pad to control frequency and volume of basic additive synthesis
define(["inheritance"], function(Inheritance){'use strict';
	var basicUI = Class.extend({
		init : function(synth){
			var container = $("#main-container");
			this.canvas = $("<canvas />", {
				'id' : 'synth-pad'
			});
			var infoDiv = $('<div />', {
				'id' : 'info'
			});
			var infoTitle = $('<h1 />', {
				'html' : 'Basic Synth Pad'
			});
			var description = $('<p />', {
				'html' : "Click and drag the mouse over the synth pad to generate a sound"
			});
			var frequencyLabel = $('<p />', {
				'html' : 'Frequency '
			});
			var volumeLabel = $('<p />', {
				'html' : 'Volume '
			});
			this.frequency = $("<span />",{
				'html' : 'n/a'
			});
			this.volume = $("<span />", {
				'html' : 'n/a'
			});
			
			this.setupEvents(synth);
			
			frequencyLabel.append(this.frequency);
			volumeLabel.append(this.volume);
			
			infoDiv.append(infoTitle);
			infoDiv.append(description);
			infoDiv.append(frequencyLabel);
			infoDiv.append(volumeLabel);
			
			container.append(this.canvas);
			container.append(infoDiv);
		},
		
		setupEvents : function(synth){
			//define a set of annon functions that'll handle events
			//event handler that's called whenever we want to play a new sound
			var ui = this; //expose UI
			var canvas = this.canvas[0]; //expose the canvas
			var frequency = this.frequency[0]; //expose frequency
			var volume = this.volume[0]; //expose volume
			
			var handleUpdateFrequency = function(evt){
				var x , y;
				if(evt.type == 'mousedown' || evt.type == 'mousemove'){
					x = evt.x;
					y = evt.y;
				}else if(evt.type == 'touchstart' || evt.type == 'touchmove'){
					var touch = evt.touches[0];
					x = touch.pageX;
					y = touch.pageY;
				}
				
				var freq = ui.calculateMapping(x, canvas.offsetWidth, canvas.offsetLeft, synth.minFreq, synth.maxFreq);
				var vol = ui.calculateMapping(y, canvas.offsetHeight, canvas.offsetTop, 0, 100);
				
				synth.updateFrequency(freq);
				synth.updateVolume(vol);
				
				frequency.innerHTML = freq;
				volume.innerHTML = vol;
			};
			
			var handlePlaySound = function(evt){
				synth.createOsc();
				handleUpdateFrequency(evt);
				synth.playSound(evt);
				
				canvas.addEventListener('mousemove', handleUpdateFrequency);
				canvas.addEventListener('touchmove', handleUpdateFrequency);
				canvas.addEventListener('mouseout', handleStopSound);
			};
			
			var handleStopSound = function(evt){
				synth.stopSound();
				canvas.removeEventListener('mousemove', handleUpdateFrequency);
				canvas.removeEventListener('touchmove', handleUpdateFrequency);
				canvas.removeEventListener('mouseout', handleStopSound);
			};
			
			canvas.addEventListener('mousedown', handlePlaySound);
			canvas.addEventListener('touchstart', handlePlaySound);
			
			canvas.addEventListener('mouseup', handleStopSound);
  			canvas.addEventListener('touchend', handleStopSound);
  			 
    		document.addEventListener('mouseleave', handleStopSound);
		},
		
		//==========================HELPER FUNCTION=============================
		calculateMapping : function(val, max, offset, mappedMin, mappedMax){
			var mapRange = mappedMax - mappedMin;
			var offset = (mapRange / max) * (val - offset);
			return mappedMin + offset;
		}
	});
	
	return basicUI;
});
