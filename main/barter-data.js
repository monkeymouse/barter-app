var barterData = {
	"REQUIREJS_VARIABLES": {
		"baseUrl": "../",
		"packages": [
			{
				"name": "css",
				"location": "library/require-css",
				"main": "css"
			},
			{
				"name": "less",
				"location": "library/require-less",
				"main": "less"
			}
		],
		"paths": {
			"jquery": [
				"http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
				"library/jquery/jquery.min",
				"library/jquery/jquery"
			],
			"angular": [
				"http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min",
				"library/angular/angular.min",
				"library/angular/angular"
			],
			"bootstrap": [
				"http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min",
				"library/bootstrap/js/bootstrap.min",
				"library/bootstrap/js/bootstrap"
			],
			"async": [
				"http://cdnjs.cloudflare.com/ajax/libs/async/0.2.7/async.min",
				"library/async/async"
			],
			/*"less": [
				"http://cdnjs.cloudflare.com/ajax/libs/less.js/1.4.1/less.min",
				"library/less/less.min"
			],*/
			"string": [
				"http://cdnjs.cloudflare.com/ajax/libs/string.js/1.2.0/string.min",
				"library/string/string"
			],
			"underscore": [
				"http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min",
				"library/underscore/underscore"
			],

			"barterModule": "script/app/barter-app",

			"controllerWrap": "script/util/controller-wrap-factory",
			"singularData": "script/util/singular-data-service",
			"elementWatcher": "script/util/element-watcher-provider",
			"safeApply": "script/util/safe-apply-factory",
			
			"barterAppDirective": "script/directive/barter-app-directive",
			"barterAppController": "script/controller/barter-app-controller",
			
			"tumblrParserDirective": "script/directive/tumblr-parser-directive",
			"tumblrParserController": "script/controller/tumblr-parser-controller",

			"commandCenterDirective": "script/directive/command-center-directive",
			"commandCenterController": "script/controller/command-center-controller",

			"barterShellDirective": "script/directive/barter-shell-directive",
			"barterShellController": "script/controller/barter-shell-controller",
			
			"barterHeaderDirective": "script/directive/barter-header-directive",
			"barterHeaderController": "script/controller/barter-header-controller",

			"barterBodyDirective": "script/directive/barter-body-directive",
			"barterBodyController": "script/controller/barter-body-controller",

			"barterFooterDirective": "script/directive/barter-footer-directive",
			"barterFooterController": "script/controller/barter-footer-controller",

			"barterContentDirective": "script/directive/barter-content-directive",
			"barterContentController": "script/controller/barter-content-controller",

			"barterFunctionDirective": "script/directive/barter-function-directive",
			"barterFunctionController": "script/controller/barter-function-controller"
		}
	}
};