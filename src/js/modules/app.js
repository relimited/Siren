//Main file for Siren.js

define(["inheritance", "./synth/basicSynth", "./UI/basicSynthUI"], function(Inheritance, BasicSynth, BasicSynthUI){'use strict';
	var app = Class.extend({
		init : function(){
			this.synth;
			this.ui;
		},
		
		start : function(){
			console.log("Creating synth...");
			//create the synth
			this.synth = new BasicSynth();
			console.log("Synth", this.synth);
			//and the UI
			console.log("building UI for ", this.synth);
			this.ui = new BasicSynthUI(this.synth);
			console.log("App built, starting...");
		}
	});
	
	return app;
});
