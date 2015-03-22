//Building a basic Synth UI using jQuery
//Uses a 2D synth pad to control frequency and volume of basic additive synthesis
define(["inheritance", "./synthPad"], function(Inheritance, SynthPad){'use strict';
	var basicUI = Class.extend({
		init : function(synth){
			var container = $("#main-container");
			this.pad = new SynthPad(synth.minFreq, synth.maxFreq, 0, 100);
			
			var infoDiv = $('<div />', {
				'id' : 'info'
			});
			var infoTitle = $('<h1 />', {
				'html' : 'Theremin-like Synth Pad'
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
			
			container.append(this.pad.canvasElement);
			container.append(infoDiv);
		},
		
		setupEvents : function(synth){
			// Disables scrolling on touch devices.
    		document.body.addEventListener('touchmove', function(event) {
      			event.preventDefault();
    		}, false);
    		
			var frequency = this.frequency[0]; //expose frequency
			var volume = this.volume[0]; //expose volume
			var pad = this.pad; //expose pad;
			
			//this is where we'll define the various extra functions that a pad calls
			this.pad.update = function(evt){
				var trueYVal = 1 - (evt.yVal / 100);
				synth.updateFrequency(evt.xVal);
				synth.updateVolume(trueYVal);
				frequency.innerHTML = Math.floor(evt.xVal) + " Hz";
				volume.innerHTML = Math.floor(trueYVal * 100) + "%";
			};
			this.pad.startControl = function(evt){
				synth.createOsc();
				//FIXME:force an update position call
				pad.handlers.handleUpdatePosition(evt);
				console.log('freq', synth.getFrequency());
				synth.playSound();
			};
			this.pad.endControl = function(evt){
				synth.stopSound();
			};
			
			console.log('pad', this.pad);
		}
	});
	
	return basicUI;
});
