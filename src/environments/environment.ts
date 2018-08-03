// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	// NOTICE: change this address to your local DevZenDaoFactoryTestable address
  	devZenDaoFactoryAddress: {
		"main": "",
		"ropsten": "",
		"kovan": "",
		"rinkeby": "",
		"private": "0xf1ed2addd25f10deb1c8d94b129579376557c62d"
	}
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
