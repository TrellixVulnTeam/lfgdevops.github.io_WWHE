require('babel-register');
require('babel-polyfill');
require("dotenv").config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*", // Match any network id,
		},

		live: {
			provider: function () {
				return new HDWalletProvider(
					[process.env.DEPLOYER_PRIVATE_KEY],
					`wss://mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY}` 
				)
			},
			network_id: 1
		  },
		rinkeby: {
			provider: function () {
				return new HDWalletProvider(
					[process.env.DEPLOYER_PRIVATE_KEY],
					`wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_API_KEY}` // URL to Ethereum Node
				)
			},
			network_id: 4
		},

		matic: {
			provider: function () {
				return new HDWalletProvider(
					[process.env.DEPLOYER_PRIVATE_KEY],
					// `https://polygon-rpc.com`
					'wss://rpc-mainnet.maticvigil.com/ws/v1/457e6d41e7952c8313ba7c49dd7505fddca0a8d4'
				)
			},
			network_id: 137
		}
	},

	contracts_directory: './src/contracts/',
	contracts_build_directory: './src/abis/',

	compilers: {
		solc: {
			version: '^0.8.10',
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			}
			
		}
	}
}
