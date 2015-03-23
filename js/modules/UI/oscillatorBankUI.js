//Make a UI for an oscilator bank synth!

define(['inheritance', './util/knob', './util/slider'], function(Inheritance, Knob, Slider){
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
				var listeners = this.genListeners(synth, i);
				
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
		
		genListeners : function(synth, index){
			var knobListeners;
			var sliderListeners;		
			switch(index){
				case 0:
				knobListeners = {
					'change' : function (v){
						synth.setGain(v / 100, 0);
					},
					'release' : function (v){
						synth.setGain(v / 100, 0);
					}
				};
				
				sliderListeners = {
					'slide' : function(event, ui){
						synth.setFrequency(ui.value, 0);
					}
				};
				break;
				case 1:
				knobListeners = {
					'change' : function (v){
						synth.setGain(v / 100, 1);
					},
					'release' : function (v){
						synth.setGain(v / 100, 1);
					}
				};
				
				sliderListeners = {
					'slide' : function(event, ui){
						synth.setFrequency(ui.value, 1);
					}
				};
				break;
				case 2:
				knobListeners = {
					'change' : function (v){
						synth.setGain(v / 100, 2);
					},
					'release' : function (v){
						synth.setGain(v / 100, 2);
					}
				};
				
				sliderListeners = {
					'slide' : function(event, ui){
						synth.setFrequency(ui.value, 2);
					}
				};
				break;
				case 3:
				knobListeners = {
					'change' : function (v){
						synth.setGain(v / 100, 3);
					},
					'release' : function (v){
						synth.setGain(v / 100, 3);
					}
				};
				
				sliderListeners = {
					'slide' : function(event, ui){
						synth.setFrequency(ui.value, 3);
					}
				};
				break;
				case 4:
				knobListeners = {
					'change' : function (v){
						synth.setGain(v / 100, 4);
					},
					'release' : function (v){
						synth.setGain(v / 100, 4);
					}
				};
				
				sliderListeners = {
					'slide' : function(event, ui){
						synth.setFrequency(ui.value, 4);
					}
				};
				break;
				case 5:
				knobListeners = {
					'change' : function (v){
						synth.setGain(v / 100, 5);
					},
					'release' : function (v){
						synth.setGain(v / 100, 5);
					}
				};
				
				sliderListeners = {
					'slide' : function(event, ui){
						synth.setFrequency(ui.value, 5);
					}
				};
				break;
			}		
			return {'knobListeners' : knobListeners, 'sliderListeners' : sliderListeners};
		}
	});
	return oscillatorBankUI;
});
