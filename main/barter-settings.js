/*
	Barter Settings
		This is loaded when a barter client is verified.
		This includes barter's core features and extended features.
		Other clients contains settings similar to this 
			and can override the core settings but not the feature settings.
			However, they can disable feature settings.
*/
var barterSettings = {
	"DATA": {

	},
	"BOOT": {
		"bootBody": [
		],
		"bootContent": [
		],
		"bootFunction": [
		]
	}
	"DEFAULT": {
		"barterHeader": [ 
		],
		"barterBody": [
		],
		"barterFooter": [
		],
		"barterContent": [
		],
		"barterFunction": [
		]
	},
	"FEATURES": {
		/*
			Each feature is an array of sub features.
			The features are divided into these sections.
			A feature can only do the following:
				1. Replace default features.
				2. Add to default features.
				3. Modify default features.
				4. Disable default features.
					Disabling the feature only needs the feature name
						and the action: disable

			Note that replacing and modifying default features
				requires extreme consideration before deploying.

			Each feature can affect the following:
				1. Directives.
				2. Controllers.
				3. Styles.
				4. Services.
				5. Factories.
				6. Templates.
				7. Providers.

			Format:
				{
					"name": "feature name",
					"author": "feature author name",
					"action": "add|replace|modify|disable",
					"baseURL": "this url will be appended before every location if given",
					"":
					"directives": [
						{
							"name": "the same name you assign to your directive script",
							"location": "url|path",
							"dependencies": [ 
								"list of dependencies",
								{
									"name": "this will be used by requirejs"
									"location": "url|path"
								}
							]
						}
					],
					"controllers": [
						{
							"name": "the same name you assign to your controller script",
							"location": "url|path",
							"dependencies": [ "list of dependencies" ]
						}
					],
					"styles": [
						{
							"name": "this name will be used on the require part",
							"location": "url|path",
							"dependencies": [ "list of dependencies" ]
						}
					],
					"services": [
						{
							"name": "the same name you assign to your service script",
							"location": "url|path",
							"dependencies": [ "list of dependencies" ]
						}
					],
					"factories": [
						{
							"name": "the same name you assign to your factory script",
							"location": "url|path",
							"dependencies": [ "list of dependencies" ]
						}
					],
					"templates": [
						{
							"name": "the same name you assign to your service script",
							"location": "url|path",
						}
					],
					"providers": [
						{
							"name": "the same name you assign to your provider script",
							"location": "url|path",
							"dependencies": [ "list of dependencies" ]
						}
					]
				}
		*/
		"barterHeader": [ ],
		"barterBody": [ ],
		"barterFooter": [ ],
		"barterContent": [ ],
		"barterFunction": [ ]
	}
};