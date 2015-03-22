//utility functions!
define([], function(){
	var util = {};
	
	function calculateMapping(val, max, offset, mappedMin, mappedMax){

		var mapRange = mappedMax - mappedMin;
		var finalOffset = (mapRange / max) * (val - offset);
		console.log('mapped value', mappedMin + finalOffset);
		return mappedMin + finalOffset;
	}
	
	util.calculateMapping = calculateMapping;
	return util;
});
