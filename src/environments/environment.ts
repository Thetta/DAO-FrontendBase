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
			devZenDaoAddress: "0xa1f250429fe35b27a2b4c8e2d02052b4af84758e",
			devZenDaoAutoAddress: "0xd3172248a5c0ec9797cd839fda12ca90faad5d65",
			devZenTokenAddress: "0x04a5e44478e2e958aa6b4d8bbcefa5b5ad29bd62",
			devZenRepTokenAddress: "0xce5e1272f927f02f7c83a25082f8dac07066e440",
			daoBaseAddress: "0x47e2c904863791944071347c47efa0257d7843f0"
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
