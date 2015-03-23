//A basic addivity synthesizer for the WAA
//Might end up being the basis for the more complicated synths I'm going to create.

define(["inheritance", "./synthUtil/gainOscillator"], function(Inhertiance, GainOscillator){'use strict';
	var basicSynth = Class.extend({
		//create basic context objects
		init : function(){
			//static min/max frequency in Hz
			this.minFreq = 261.63; // C4
			this.maxFreq = 493.88; // B4
			
			//get an audio context
			this.ctx = new AudioContext();
			
			this.gen = new GainOscillator(this.ctx);
			this.gen.connect(this.ctx.destination);
		},
		
		//============================EVENT DRIVEN FUNCTIONS=====================
		//Play a sound
		//in this case, it's a sine wave with the correct feqency and volume
		playSound : function(evt){			
			this.gen.start(); //start ASAP, no delay
		},
		
		//Stop a sound
		stopSound : function(evt){
			if(this.gen){
				this.gen.stop(); //stop ASAP, no delay
			}
		},
		
		//changes a note's frequency
		updateFrequency : function(freq){			
			this.gen.setFrequency(freq);
		},
		
		updateVolume : function(vol){
			this.gen.setGain(vol);
		},
		//============================END EVENT DRIVEN FUNCTIONS====================
		
		getFrequency : function(){
			return this.gen.getFrequency();
		},
		
		getVolume : function(){
			return this.gen.getGain();
		}
	});
	
	return basicSynth;
});
