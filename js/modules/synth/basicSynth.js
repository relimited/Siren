//A basic addivity synthesizer for the WAA
//Might end up being the basis for the more complicated synths I'm going to create.

define(["inheritance"], function(Inhertiance){'use strict';
	var basicSynth = Class.extend({
		//create basic context objects
		init : function(){
			//static min/max frequency in Hz
			this.minFreq = 261.63; // C4
			this.maxFreq = 493.88; // B4
			
			//get an audio context
			this.ctx = new AudioContext();
			
			//create a gain node for volume control
			this.gainNode = this.ctx.createGain();
			
			//connect gain node to the destination (your speakers)
			this.gainNode.connect(this.ctx.destination);
		},
		
		createOsc : function(){
			//create an oscillator for sound production
			this.oscillator = this.ctx.createOscillator();
			//using a basic sine wave here
			this.oscillator.type = 'sine';
			this.oscillator.connect(this.gainNode);
		},
		
		//============================EVENT DRIVEN FUNCTIONS=====================
		//Play a sound
		//in this case, it's a sine wave with the correct feqency and volume
		playSound : function(evt){			
			this.oscillator.start(0); //start ASAP, no delay
		},
		
		//Stop a sound
		stopSound : function(evt){
			if(this.oscillator){
				this.oscillator.stop(0); //stop ASAP, no delay
			}
		},
		
		//changes a note's frequency
		updateFrequency : function(freq){			
			this.oscillator.frequency.value = freq;
		},
		
		updateVolume : function(vol){
			this.gainNode.gain.value = vol;
		},
		//============================END EVENT DRIVEN FUNCTIONS====================
		
		getFrequency : function(){
			return this.oscillator.frequency.value;
		},
		
		getVolume : function(){
			return this.gainNode.gain.value = vol;
		}
	});
	
	return basicSynth;
});
