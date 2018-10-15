// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	networks: {
		main: {
			devZenDaoAddress: "",
			devZenDaoAutoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: ""
		},
		ropsten: {
			devZenDaoAddress: "",
			devZenDaoAutoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: ""
		},
		kovan: {
			devZenDaoAddress: "",
			devZenDaoAutoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: ""
		},
		rinkeby: {
			devZenDaoAddress: "",
			devZenDaoAutoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: ""
		},
		private: {
			devZenDaoAddress: "0x43f2def404c9d480fe775e858c38f7888bddda88",
			devZenDaoAutoAddress: "0x0e5817fc22c0e5e5e2ec91d7e6f65877911a9947",
			devZenTokenAddress: "0x64890da7ce0f1aa764c3fb12ffd014f80f3048ea",
			devZenRepTokenAddress: "0x6d45e6c38a40aedbb0168cc32facbede0d9d88a8"
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
