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
			devZenRepTokenAddress: "",
			daoBaseAddress: ""
		},
		ropsten: {
			devZenDaoAddress: "",
			devZenDaoAutoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: "",
			daoBaseAddress: ""
		},
		kovan: {
			devZenDaoAddress: "0x08544530b359730100cafe3f62b8906584adf8a5",
			devZenDaoAutoAddress: "0xca74e98be84c5f76f41d9369af2e2ba65221a0b0",
			devZenTokenAddress: "0x76299b1bcc36b0aad1ffcd52315a1396823b59a3",
			devZenRepTokenAddress: "0xa872d4d6e8c20d3579a8f2c4727a3454460ab622",
			daoBaseAddress: "0x0b6e6165d1de9d806672d6b240f3004d4fd24f8a"
		},
		rinkeby: {
			devZenDaoAddress: "",
			devZenDaoAutoAddress: "",
			devZenTokenAddress: "",
			devZenRepTokenAddress: "",
			daoBaseAddress: ""
		},
		private: {
			devZenDaoAddress: "0x43f2def404c9d480fe775e858c38f7888bddda88",
			devZenDaoAutoAddress: "0x0e5817fc22c0e5e5e2ec91d7e6f65877911a9947",
			devZenTokenAddress: "0x64890da7ce0f1aa764c3fb12ffd014f80f3048ea",
			devZenRepTokenAddress: "0x6d45e6c38a40aedbb0168cc32facbede0d9d88a8",
			daoBaseAddress: "0xe7524ce9429c2d08440080ea2dbfcb4db138a0e9"
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
