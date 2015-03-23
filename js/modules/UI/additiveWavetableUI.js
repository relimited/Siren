//A UI for an additive wavetable synth, handling 11 partials.
//Here.  We.  Go.  This is going to be rough.
define(['inheritance', './util/knob', './util/slider', "./util/synthPad", "../util/util"], function(Inhertiance, Knob, Slider, SynthPad, Util){
	var additiveUI = Class.extend({
		
		init : function(synth){
			var container = $("#main-container");
			var bank = $("<div />", {
				'id':'bank'
			});
			
			//create a pad to control the overall gain and frequency
			this.pad = new SynthPad(synth.minFreq, synth.maxFreq, 0, 100);
			
			//the UI is going to keep track of amplitudes/phases and bank the entire chunk on the synth
			this.amplitudes = [];
			this.phases = [];
			
			//get initial values for the amplitudes and phases
			this.amplitudes = synth.getHarmonics();
			this.phases = synth.getPhases();
			
			//the list of knobs and sliders
			this.knobList = [];
			this.sliderList = [];
			
			//gonna finish setup of knobs and sliders here
			for(var i = 1; i < this.amplitudes.length; i++){
				this.knobList.push(new Knob(0, 2 * Math.PI));
				this.sliderList.push(new Slider(0, 100));
				var listeners = Util.genListeners(synth.setSinglePhase, synth.setSingleHarmonic, i, synth);
				
				this.knobList[i - 1].createKnob(listeners.knobListeners, "Phase " + i);
				this.sliderList[i - 1].createSlider(listeners.sliderListeners, "Amplitude " + i);
				
				bank.append(this.sliderList[i - 1].getElement());
				bank.append(this.knobList[i - 1].getElement());
			}
			
			var infoDiv = $('<div />', {
				'id' : 'info'
			});
			var infoTitle = $('<h1 />', {
				'html' : 'Addative Synth Pad'
			});
			var description = $('<p />', {
				'html' : "Click and drag the mouse over the synth pad to control frequency and volume.  Each knob controls the phase of a partial and each slider controls the amplitude."
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
			
			//put all the magics together
			frequencyLabel.append(this.frequency);
			volumeLabel.append(this.volume);
			
			infoDiv.append(infoTitle);
			infoDiv.append(description);
			infoDiv.append(frequencyLabel);
			infoDiv.append(volumeLabel);
			
			container.append(this.pad.canvasElement);
			container.append(infoDiv);
			container.append(bank);
			
			this.setupEvents(synth);
		},
		
		//this is mostly for the pad.
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
				synth.setFrequency(evt.xVal);
				synth.setGain(trueYVal);
				frequency.innerHTML = Math.floor(evt.xVal) + " Hz";
				volume.innerHTML = Math.floor(trueYVal * 100) + "%";
			};
			this.pad.startControl = function(evt){
				//FIXME:force an update position call
				pad.handlers.handleUpdatePosition(evt);
				synth.playSound();
			};
			this.pad.endControl = function(evt){
				synth.stopSound();
			};
		}
		
	});
	
	return additiveUI;
});
