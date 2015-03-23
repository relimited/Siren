//Make a UI for an oscilator bank synth!

define(['inheritance', './util/knob', './util/slider', '../util/util'], function(Inheritance, Knob, Slider, Util){
	var oscillatorBankUI = Class.extend({
		init : function(synth){
			var container = $("#main-container");
			var bank = $("<div />", {
				'id':'bank'
			});
			this.knobList = [];
			this.sliderList = [];
			
			for(var i = 0; i < synth.bankSize; i++){
				//create the knobs
				this.knobList.push(new Knob(0, 100));
				//TODO: this is a pretty gross hack, and won't work for large numbers, but I don't know how else to force a constant based on a variable
				var listeners = Util.genListeners(function(gain, i){synth.setGain(gain/100, i);}, synth.setFrequency, i);
				
				this.knobList[i].createKnob(listeners.knobListeners, "Gain " + i);
				
				//create the sliders
				//TODO: Settling on arbitrary constants, yay!
				this.sliderList.push(new Slider(261.63, 493.88));
				
				this.sliderList[i].createSlider(listeners.sliderListeners, "Frequency " + i);
				bank.append(this.sliderList[i].getElement());
				bank.append(this.knobList[i].getElement());
			}
			container.append(bank);
		},
	});
	return oscillatorBankUI;
});
