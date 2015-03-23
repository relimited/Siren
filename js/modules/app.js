//Main file for Siren.js

define(["inheritance", "./synth/gainWavetableSynth", "./UI/additiveWavetableUI"], function(Inheritance, Synth, SynthUI){'use strict';
	var app = Class.extend({
		init : function(){
			this.synth;
			this.ui;
		},
		
		start : function(){
			console.log("Creating synth...");
			//create the synth
			this.synth = new Synth(6, 493.88, 261.63);
			console.log("Synth", this.synth);
			
			//and the UI
			console.log("building UI for ", this.synth);
			this.ui = new SynthUI(this.synth);
			console.log("App built, starting...");
		}
	});
	
	return app;
});
