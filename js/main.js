//Siren.js: A spectral moduling synthsizer for the web, using the web audio API
//The dream is to attach some low-level AI code to help users with digital insturment creation


//configure requre stuff, and also start the app.

require.config({
    paths : {
        'inheritance' : 'js/vendor/inheritance',
        'jqKnob' : 'js/vendor/jquery.knob'
    }
});

require(["./js/modules/app"], function(App){'use strict';
	var app = new App();  //app object.
	//TODO: preprocessing goes here
	
	app.start();
	
	//TODO: postprocessing goes here
});
