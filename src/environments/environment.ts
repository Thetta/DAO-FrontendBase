// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	networks: {
		main: {
			devZenDaoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: ""
		},
		ropsten: {
			devZenDaoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: ""
		},
		kovan: {
			devZenDaoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: ""
		},
		rinkeby: {
			devZenDaoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: ""
		},
		private: {
			devZenDaoAddress: "0x0895bce9cb4f65882e9a13599700892b18808e7c",
			devZenTokenAddress: "0x5d41c8fdc3d82a9040a05226a1286fc1abdc378c",
			devZenRepTokenAddress: "0x821bcde359fc379ca59689c87c7533b5a9c41987"
		}
	}
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
