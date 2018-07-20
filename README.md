# DevzendaoFrontend

DAO frontend for DevZen podcast

## How to run on your local machine

1. Intall project dependencies `npm install`
3. Run ganache instance `ganache-cli -l 0xfffffffffff -p 8555`
4. Deploy via `truffle migrate` [DevZenDaoFactoryTestable](https://github.com/Thetta/DAO-Templates/blob/master/contracts/3-DevZenDao/DevZenDaoFactoryTestable.sol)
5. Set address of the newly deployed DevZenDaoFactoryTestable contract in `/src/environments/environment.ts` in `devZenDaoFactoryAddress` field
6. Run frontend `ng serve`
7. Login to MetaMask and connect to custom rpc at `http://127.0.0.1:8555`
