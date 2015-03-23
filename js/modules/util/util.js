//utility functions!
define([], function(){
	var util = {};
	
	function calculateMapping(val, max, offset, mappedMin, mappedMax){

		var mapRange = mappedMax - mappedMin;
		var finalOffset = (mapRange / max) * (val - offset);
		console.log('mapped value', mappedMin + finalOffset);
		return mappedMin + finalOffset;
	}
	
	function genListeners(knobFunct, sliderFunct, index, ctx){
		var knobListeners;
		var sliderListeners;		
		switch(index){
			case 0:
			knobListeners = {
				'change' : function (v){
					knobFunct(v, 0, ctx);
				},
				'release' : function (v){
					knobFunct(v, 0, ctx);
				}
			};
			
			sliderListeners = {
				'slide' : function(event, ui){
					sliderFunct(ui.value, 0, ctx);					}
				};
			break;
			case 1:
			knobListeners = {
				'change' : function (v){
					knobFunct(v, 1, ctx);
				},
				'release' : function (v){
					knobFunct(v, 1, ctx);
				}
			};
				
			sliderListeners = {
				'slide' : function(event, ui){
					sliderFunct(ui.value, 1, ctx);
				}
			};
			break;
			case 2:
			knobListeners = {
				'change' : function (v){
					knobFunct(v, 2, ctx);
				},
				'release' : function (v){
					knobFunct(v, 2, ctx);
				}
			};
			
			sliderListeners = {
				'slide' : function(event, ui){
					sliderFunct(ui.value, 2, ctx);
				}
			};
			break;
			case 3:
			knobListeners = {
				'change' : function (v){
					knobFunct(v, 3, ctx);
				},
				'release' : function (v){
					knobFunct(v, 3, ctx);
				}
			};
			
			sliderListeners = {
				'slide' : function(event, ui){
					sliderFunct(ui.value, 3, ctx);
				}
			};
			break;
			case 4:
			knobListeners = {
				'change' : function (v){
					knobFunct(v, 4, ctx);
				},
				'release' : function (v){
					knobFunct(v, 4, ctx);
				}
			};
				
			sliderListeners = {
				'slide' : function(event, ui){
					sliderFunct(ui.value, 4, ctx);
				}
			};
			break;
			case 5:
			knobListeners = {
				'change' : function (v){
					knobFunct(v, 5, ctx);
				},
				'release' : function (v){
					knobFunct(v, 5, ctx);
				}
			};
			
			sliderListeners = {
				'slide' : function(event, ui){
					sliderFunct(ui.value, 5, ctx);
				}
			};
			break;
			case 6:
			knobListeners = {
				'change' : function (v){
					knobFunct(v, 6, ctx);
				},
				'release' : function (v){
					knobFunct(v, 6, ctx);
				}
			};
			
			sliderListeners = {
				'slide' : function(event, ui){
					sliderFunct(ui.value, 6, ctx);
				}
			};
			break;
		}		
		return {'knobListeners' : knobListeners, 'sliderListeners' : sliderListeners};
	}
	
	util.calculateMapping = calculateMapping;
	util.genListeners = genListeners;
	
	return util;
});
