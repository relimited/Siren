//Creates a wavetable oscillator
//The defaults are to set each wave as a sine wave and add the whole thing together (additive synthesis, yo)

define(['inheritance'], function(Inheritance){
	var wavetableSynth = Class.extend({
		
		init : function(numPartials, maxFreq, minFreq){
			this.maxFreq = maxFreq;
			this.minFreq = minFreq;
			
			this.ctx = new AudioContext();
			
			this.numPartials = numPartials;
			
			//arrays of amplitudes and phases
			this.harmonics = [];
			this.phases = [];
			
			//initialize them as a sine wave
			for(var i = 0; i < this.numPartials + 1; i++){
				this.phases.push(0);
				if(i == 0 || i == 1){
					this.harmonics.push(1);
				}else{
					this.harmonics.push(0);
				}
			}
			
			this.osc = this.ctx.createOscillator();
			this.osc.type = "custom";
			this.osc.frequency.value = 440.0; //initial frequency.  Middle C is a cool place to start, bro.
			this.gainNode = this.ctx.createGain();
			this.osc.connect(this.gainNode);
			this.gainNode.connect(this.ctx.destination);
			
			this.updateWavetable();
			
			this.osc.start(0);		
		},
		
		connect : function(AudioNode){
			if(AudioNode.hasOwnProperty('input')){
				this.gainNode.connect(AudioNode.input);
			}else{
				this.gainNode.connect(AudioNode);
			}
		},
		
		//=============Getters and Setters===============
		setFrequency : function(freq){
			this.osc.frequency.value = freq;
		},
		
		setGain : function(gain){
			this.gainNode.gain.value = gain;
		},
		
		setHarmonics : function(harmonics){
			if(harmonics.length != this.harmonics.length){
				throw "Can't set a different number of partials!";
			}else{
				this.harmonics = harmonics;
			}
			this.updateWavetable();
		},
		
		setPhases : function(phases){
			if(phases.length != this.phases.length){
				throw "Can't set a different number of phases!";
			}else{
				this.phases = phases;
			}
			this.updateWavetable();
		},
		
		//These next two functions are a little insane.  The synth parameter is actually a reference to this object.
		//The 'this' trick doesn't work all the time, as these functions are metaprogramed in as handlers for events on
		//UI objects through a factory method.  That was done to get around a dynamic variable scope problem when 
		//generating lots of UI elements.
		//Look future self, I'm sorry.  Just pass a reference to this object in for the last parameter and don't worry 
		//about why I wrote it the way I did.
		//Have a cookie.  You earned it.
		setSingleHarmonic : function(harm, i, synth){
			console.log("harm", harm, "i", i);
			console.log(synth.harmonics);
			synth.harmonics[i] = harm;
			synth.updateWavetable();	
		},
		
		setSinglePhase : function(phase, i, synth){
			console.log("phase", phase, "i", i);
			console.log(synth.phase);
			synth.phases[i] = phase;
			synth.updateWavetable();
		},
		
		getFrequency : function(){
			return this.osc.frequency.value;
		},
		
		getGain : function(){
			return this.gainNode.gain.value;
		},
		
		getHarmonics : function(){
			return this.harmonics;
		},
		
		getPhases : function(){
			return this.phases;
		},
		
		updateWavetable : function(){
			var sinCurve = new Float32Array(this.numPartials + 1);
			var cosCurve = new Float32Array(this.numPartials + 1);
			
			sinCurve[0] = 0;	//always start in the middle of the waveform, because this is a phase dependent encoding
			cosCurve[0] = 0;
			
			//the first slot of the wavetable curves are taken up by the starting locations
			for (var i = 1; i < this.numPartials + 1; i++){
				sinCurve[i] = this.harmonics[i] * this.harmonics[0] * Math.cos(this.phases[i]);
				cosCurve[i] = this.harmonics[i] * this.harmonics[0] * Math.sin(this.phases[i]);
			}
			
			var waveTable = this.ctx.createPeriodicWave(cosCurve, sinCurve);
			this.osc.setPeriodicWave(waveTable);
		},
		
		//convinence functions needed for the pad
		playSound : function(){
			this.gainNode.gain.value = 1;
		},
		
		stopSound : function(){
			this.gainNode.gain.value = 0;
		}
		
	});
	
	return wavetableSynth;
});
