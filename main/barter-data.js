/*
	Barter Data
		The semi-global storage of all initialization data needed by barter app.
*/
var barterData = {
	/*==============================================================================================
		RequireJS Main Configuration Data
	*/
	"REQUIREJS_VARIABLES": {
		//================================INITIAL CONFIGURATIONS====================================
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
			//=============================LIBRARY DEPENDENCIES=====================================
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

			//==============================BARTER SCRIPTS==========================================
			"barterMain": "main/barter",
			"barterModule": "script/app/barter-app",

			"controllerWrap": "script/util/controller-wrap-factory",
			"singularData": "script/util/singular-data-service",
			"elementWatcher": "script/util/element-watcher-provider",
			"safeApply": "script/util/safe-apply-factory",
			"registerMultipleEvent": "script/util/register-multiple-event-factory",
			"inspectElement": "script/util/inspect-element-factory",
			"elementPropertyWatcher": "script/util/element-property-watcher-factory",
			"elementProportion": "script/util/element-proportion-provider",
			
			"barterAppDirective": "script/directive/barter-app-directive",
			"barterAppController": "script/controller/barter-app-controller",
			
			"bootShellDirective": "script/directive/boot-shell-directive",
			"bootShellController": "script/controller/boot-shell-controller",

			"bootBodyDirective": "script/directive/boot-body-directive",
			"bootBodyController": "script/controller/boot-body-controller",

			"bootContentDirective": "script/directive/boot-content-directive",
			"bootContentController": "script/controller/boot-content-controller",

			"bootFunctionDirective": "script/directive/boot-function-directive",
			"bootFunctionController": "script/controller/boot-function-controller"//,

			/*"tumblrParserDirective": "script/directive/tumblr-parser-directive",
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
			"barterFunctionController": "script/controller/barter-function-controller"*/
		}
	},


	/*==============================================================================================
		Less Main Configuration.
			This will be loaded based on resource needed.
	*/
	"LESS_VARIABLES": {
		//Boot resources are styles on verification stage.
		"boot": [
		],

		//Core resources are styles needed by the barter application.
		"core": [
		]
	},


	/*==============================================================================================
		Load Order Configuration
			This will state what are the load orders per specific events.
	*/
	"LOAD_ORDER_VARIABLES": {
		//Load order on verification stage.
		"onVerify": [
			"angular",

			"barterModule",
			"barterMain",

			"controllerWrap",
			"safeApply",
			"inspectElement",
			"singularData",
			"elementWatcher",
			"elementPropertyWatcher",
			"elementProportion",

			"bootShellDirective",
			"bootShellController",

			"bootBodyDirective",
			"bootBodyController",

			"bootContentDirective",
			"bootContentController",

			"bootFunctionDirective",
			"bootFunctionController",
			
			"barterAppDirective",
			"barterAppController"
		],

		//Load order on permitted stage.
		"onPermitted": [

		]
	}
};