//Creates a bank of oscillators that get mixed together for a final output signal.
//It's a poor-man's additive synthesis technique, when I don't want to mess with wavetables

//The browser ends up using an inverse-FFT in order to get the resultant signal.

define(['inheritance', './synthUtil/gainOscillator'], function(Inheritance, GainOscillator){
	var bankSynth = Class.extend({
		
		init : function(bankSize){
			if(bankSize == undefined){
				bankSize = 6; //Web Audio API default for the mixer
			}
			this.ctx = new AudioContext();
			
			this.bankSize = bankSize;
			
			this.merger = this.ctx.createChannelMerger(bankSize);
			this.oscBank = [];
			for(var i = 0; i < bankSize; i++){
				this.oscBank[i] = new GainOscillator(this.ctx);
				this.oscBank[i].connect(this.merger);
			}
			
			//TODO: I'll eventually need to connect the whole thing, but right now this should work
			this.merger.connect(this.ctx.destination);
			
		},
		
		connect : function(AudioNode){
			if(AudioNode.hasOwnProperty('input')){
				this.merger.connect(AudioNode.input);
			}else{
				this.merger.connect(AudioNode);
			}
		},
		
		//========================Getter/Setters=====================
		setFrequency : function(freq, oscNum){
			if(oscNum > this.bankSize){
				throw "Attempting to access outside of the bank";
			}
			this.oscBank[oscNum].setFrequency(freq);
		},
		
		setGain : function(gain, oscNum){
			if(oscNum > this.bankSize){
				throw "Attempting to access outside of the bank";
			}
			this.oscBank[oscNum].setGain(gain);
		},
		
		getFrequency : function(oscNum){
			if(oscNum > this.bankSize){
				throw "Attempting to access outside of the bank";
			}
			return this.oscBank[oscNum].getFrequency();
		},
		
		getGain : function(oscNum){
			if(oscNum > this.bankSize){
				throw "Attempting to access outside of the bank";
			}
			return this.oscBank[oscNum].getGain();
		},
		
		getBankSize : function(){
			return this.bankSize;
		}
	});
	return bankSynth;
});
