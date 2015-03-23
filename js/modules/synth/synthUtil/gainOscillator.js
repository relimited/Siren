//Basic utility oscillator with volume control.

//Trades space complexity for time complexity-- when the oscillator is "turned off", the gain is set to 0.
//FIXME: the base OSC/GAIN pair has no input setup.  This is because, usually, oscilators are first in the bank.
//FIXME: it'll be a more complex setup where I load the osc with some data and make custom wave forms and such.

define(["inheritance"], function(Inheritance){
	var gainOsc = Class.extend({
		init : function(ctx){
			this.osc = ctx.createOscillator();
			this.gainNode = ctx.createGain();
			
			//internal wiring and starting settings
			this.osc.type = 'type';
			this.osc.connect(this.gainNode);
			this.gainNode.gain.value = 0;
			this.osc.start(0);
		},
		
		//==========================GETTERS AND SETTERS============================
		setFrequency : function(freq){
			this.osc.frequency.value = freq;
		},
		
		setGain : function(gain){
			this.gainNode.gain.value = gain;
		},
		
		setType : function(type){
			this.osc.type = type;	
		},
		
		getFrequency : function(){
			return this.osc.frequency.value;
		},
		
		getGain : function(){
			return this.osc.gain.value;
		},
		
		getType : function(){
			return this.osc.type;
		},
		
		//=========================END GET AND SET======================================
		
		connect : function(AudioNode){
			if(AudioNode.hasOwnProperty('input')){
				this.gainNode.connect(AudioNode.input);
			}else{
				this.gainNode.connect(AudioNode);
			}
		},
		
		//convinence method to set the gain to 0 and stop everything coming out of this node
		stop : function(){
			this.gainNode.gain.value = 0;
		},
		
		//convinence method to set the gain to 1 and start sound coming from this node
		start : function(){
			this.gainNode.gain.value = 1;
		}
		
	});
	return gainOsc;
});
