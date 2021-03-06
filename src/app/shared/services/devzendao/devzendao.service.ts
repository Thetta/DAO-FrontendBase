import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, from, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment as env } from '../../../../environments/environment';
import { TxSenderService } from '../tx-sender/tx-sender.service';
import { Web3Service } from '../web3/web3.service';

@Injectable({
	providedIn: 'root'
})
export class DevzendaoService {

	@Output() init: EventEmitter<any> = new EventEmitter();

	// params
	PARAM_MINT_TOKENS_PER_WEEK_AMOUNT = "0xc9b51a76ddd807905ae4f432305a7941a6eeed3018a217456051bf48a64b23cc";
	PARAM_MINT_REPUTATION_TOKENS_PER_WEEK_AMOUNT = "0xf62293a5f827624aae2cb3ccf2a626acfb00192eb976ac25c0b6fcfe9099f109";
	PARAM_ONE_AD_SLOT_PRICE = "0x2fc30c0260b9c2120dbb43e5716b23b323cb0059511c89856fe497bcaf93cbe0";
	PARAM_ONE_TOKEN_PRICE_IN_WEI = "0x1d18f55c54a96a26d4aaa596d526372f95c7cef9f217e9bbe766cea168596907";
	PARAM_BECOME_GUEST_STAKE = "0x3016d4c48f6a1e0a92b321085915d5914a9ab2c36783443e2b6066054b37f7c4";
	PARAM_REP_TOKENS_REWARD_HOST = "0x91a208a4a1aa03cdcf19de90fdf6add60ea8d103a63e151f2b189cc77dfc8cf7";
	PARAM_REP_TOKENS_REWARD_GUEST = "0x9cf4c579edc10b766d99450c69f14a06144239d4923ded8d12e0a7d6ec69a048";
	PARAM_REP_TOKENS_REWARD_TEAM_MEMBERS = "0x8097db39df04019c8a72c19c6369ebda43741c8e2a45d27badc3e4ff8ecc3d0b";

	// available groups
	GROUP_DEV_ZEN_TEAM = "DevZenTeam";

	// abi indexes
	ABI_INDEX_DEV_ZEN_DAO = 0;
	ABI_INDEX_STD_DAO_TOKEN = 1;
	ABI_INDEX_DEV_ZEN_DAO_AUTO = 2;
	ABI_INDEX_DAO_BASE = 3;
	ABI_INDEX_GENERIC_PROPOSAL = 4;
	ABI_INDEX_VOTING = 5;

	contractsData = [];
	daoBaseContract: any;
	devZenDaoContract: any;
	devZenDaoAutoContract: any;
	devZenRepTokenContract: any;
	devZenTokenContract: any;
	isInitialized = false;

	constructor(
		public http: HttpClient,
		public messageService: MessageService,
		public txSenderService: TxSenderService,
		public web3Service: Web3Service
	) {
		this.initContracts();
	}

	/**
	 * Initializes contracts
	 */
	initContracts() {
		forkJoin(
			this.http.get('assets/contracts/DevZenDao.json'),
			this.http.get('assets/contracts/StdDaoToken.json'),
			this.http.get('assets/contracts/DevZenDaoAuto.json'),
			this.http.get('assets/contracts/DaoBase.json'),
			this.http.get('assets/contracts/GenericProposal.json'),
			this.http.get('assets/contracts/Voting.json')
		).pipe(
			// load contracts data
			switchMap(contractsData => {
				this.contractsData = contractsData;
				return this.web3Service.getNetwork()
			})
		).subscribe(
			networkName => {
				// load contracts by network name
				this.devZenDaoContract = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_DEV_ZEN_DAO].abi, env.networks[networkName].devZenDaoAddress);
				this.devZenTokenContract = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_STD_DAO_TOKEN].abi, env.networks[networkName].devZenTokenAddress);
				this.devZenRepTokenContract = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_STD_DAO_TOKEN].abi, env.networks[networkName].devZenRepTokenAddress);
				this.devZenDaoAutoContract = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_DEV_ZEN_DAO_AUTO].abi, env.networks[networkName].devZenDaoAutoAddress);
				this.daoBaseContract = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_DAO_BASE].abi, env.networks[networkName].daoBaseAddress);
				this.init.emit();
				this.isInitialized = true;
			},
			err => { console.error(err); }
		);
	}

	//====================
	// Contract properties
	//====================

	/**
	 * Returns next episode details
	 */
	nextEpisode(): Observable<any> {
		return from(this.devZenDaoContract.methods.nextEpisode().call());
	}

	/**
	 * Returns dao params
	 */
	params(hexName): Observable<any> {
		return from(this.devZenDaoContract.methods.params(hexName).call());
	}

	//=======================================================
	// These methods should be called by DevZen token holders
	//=======================================================

	/**
	 * Adds adv slot to the next episode
	 * @param adText 
	 */
	runAdsInTheNextEpisode(adText): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoContract.methods.runAdsInTheNextEpisode,
				[adText],
				{ from: accounts[0] },
				"Commercial added",
				"Error on adding a commercial"
			))
		);
	}

	/**
	 * Becomes the next show guest
	 */
	becomeTheNextShowGuest(): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoContract.methods.becomeTheNextShowGuest,
				[],
				{ from: accounts[0] },
				"You became the next guest",
				"Error on selecting the next guest"
			))
		);
	}

	//==============================================
	// These methods should be called by any address
	//==============================================

	/**
	 * Buy DZT
	 * @param valueInWei 
	 */
	buyTokens(valueInWei): Observable<any> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoContract.methods.buyTokens,
				[],
				{ from: accounts[0], value: valueInWei },
				"You bought DZT",
				"Error on buying DZT"
			))
		);
	}

	/**
	 * Checks whether 1 week has passed
	 */
	isOneWeekPassed(): Observable<boolean> {
		return from(this.devZenDaoContract.methods.isOneWeekPassed().call());
	}

	//====================
	// StdDaoToken methods
	//====================

	/**
	 * Approve spending DZT or DZTREP for DAO
	 * @param amount 
	 * @param tokenName 
	 */
	approve(amount, tokenName) {
		let baseContract = null;
		if(tokenName == 'DZT') baseContract = this.devZenTokenContract;
		if(tokenName == 'DZTREP') baseContract = this.devZenRepTokenContract;
		if(!baseContract) throw new Error(`token name ${tokenName} not found, available: DZT, DZTREP`);

		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.txSenderService.send(
				baseContract.methods.approve,
				[this.devZenDaoContract.options.address, amount],
				{ from: accounts[0] },
				`Approved ${tokenName}`,
				`Error on approving ${tokenName}`
			))
		);
	}

	/**
	 * Returns address balance by token name
	 * @param address 
	 * @param tokenName 
	 */
	balanceOf(address, tokenName): Observable<number> {
		let baseContract = null;
		if(tokenName == 'DZT') baseContract = this.devZenTokenContract;
		if(tokenName == 'DZTREP') baseContract = this.devZenRepTokenContract;
		if(!baseContract) throw new Error(`token name ${tokenName} not found, available: DZT, DZTREP`);

		return from(baseContract.methods.balanceOf(address).call());
	}

	//===================
	// DaoBase methods
	//===================

	/**
	 * Returns addresses of group members by group name
	 * @param groupName 
	 */
	getGroupMembers(groupName): Observable<string[]> {
		return from(this.daoBaseContract.methods.getGroupMembers(groupName).call());
	}

	/**
	 * Returns proposal address by index
	 * @param index 
	 */
	getProposalAtIndex(index): Observable<string> {
		return from(this.daoBaseContract.methods.getProposalAtIndex(index).call());
	}

	/**
	 * Returns number of proposals
	 */
	getProposalsCount(): Observable<number> {
		return from(this.daoBaseContract.methods.getProposalsCount().call());
	}

	/**
	 * Checks whether user is in group
	 * @param groupName
	 * @param userAddress
	 */
	isGroupMember(groupName, userAddress): Observable<boolean> {
		return from(this.daoBaseContract.methods.isGroupMember(groupName, userAddress).call());
	}

	//====================
	// DevZenDaoAuto methods
	//====================

	/**
	 * Creates a proposal for adding user addres to a group
	 * @param groupName 
	 * @param address 
	 */
	addGroupMemberAuto(groupName, address): Observable<string> {
		return this.hasActiveVoting().pipe(
			switchMap(hasActiveVoting => this.hasActiveVotingHandler(hasActiveVoting)),
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoAutoContract.methods.addGroupMemberAuto, 
				[groupName, address], 
				{ from: accounts[0] },
				"Voting 'Adding a new group member' created",
				"Error on creating a voting 'Adding a new group member'"
			))
		);
	}

	/**
	 * Changes the guest in "legal" way and creates a voting
	 * @param guestAddress 
	 */
	changeTheGuestAuto(guestAddress): Observable<any> {
		return this.hasActiveVoting().pipe(
			switchMap(hasActiveVoting => this.hasActiveVotingHandler(hasActiveVoting)),
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoAutoContract.methods.changeTheGuestAuto,
				[guestAddress],
				{ from: accounts[0] },
				"Voting 'Change the guest' created",
				"Error on creating a voting 'Change the guest'"
			))
		);
	}

	/**
	 * Changes the guest in "emergency" way and creates a voting
	 * @param guestAddress 
	 */
	emergencyChangeTheGuestAuto(guestAddress): Observable<any> {
		return this.hasActiveVoting().pipe(
			switchMap(hasActiveVoting => this.hasActiveVotingHandler(hasActiveVoting)),
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoAutoContract.methods.emergency_ChangeTheGuestAuto,
				[guestAddress],
				{ from: accounts[0] },
				"Voting 'Emergency change the guest' created",
				"Error on creating a voting 'Emergency change the guest'"
			))
		);
	}

	/**
	 * Moves to next episode and creates a voting
	 * @param guestHasCome whether guest visited the show
	 */
	moveToNextEpisodeAuto(guestHasCome): Observable<any> {
		return this.hasActiveVoting().pipe(
			switchMap(hasActiveVoting => this.hasActiveVotingHandler(hasActiveVoting)),
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoAutoContract.methods.moveToNextEpisodeAuto,
				[guestHasCome],
				{ from: accounts[0] },
				"Voting 'Move to next episode' created",
				"Error on creating a voting 'Move to next episode'"
			))
		);
	}

	/**
	 * Removes address from group
	 * @param groupName 
	 * @param address 
	 */
	removeGroupMemberAuto(groupName, address): Observable<void> {
		return this.hasActiveVoting().pipe(
			switchMap(hasActiveVoting => this.hasActiveVotingHandler(hasActiveVoting)),
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoAutoContract.methods.removeGroupMemberAuto,
				[groupName, address],
				{ from: accounts[0] },
				"Voting 'Removing group member' created",
				"Error on creating a voting 'Removing group member'"
			))
		);
	}

	/**
	 * Selects next host and creates a voting
	 * @param nextHostAddress 
	 */
	selectNextHostAuto(nextHostAddress): Observable<any> {
		return this.hasActiveVoting().pipe(
			switchMap(hasActiveVoting => this.hasActiveVotingHandler(hasActiveVoting)),
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoAutoContract.methods.selectNextHostAuto,
				[nextHostAddress],
				{ from: accounts[0] },
				"Voting 'Change the next host' created",
				"Error on creating a voting 'Change the next host'"
			))
		);
	}

	/**
	 * Updates DAO param and creates a voting
	 * @param paramHash
	 * @param value
	 */
	updateDaoParamsAuto(paramHash, value): Observable<string> {
		return this.hasActiveVoting().pipe(
			switchMap(hasActiveVoting => this.hasActiveVotingHandler(hasActiveVoting)),
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoAutoContract.methods.updateDaoParamsAuto, 
				[paramHash, value],
				{ from: accounts[0] },
				"Voting 'Updating DAO params' created",
				"Error on creating a voting 'Updating DAO params'"
			))
		);
	}

	/**
	 * Withdraws ether to output address and creates a voting
	 * @param outputAddress 
	 */
	withdrawEtherAuto(outputAddress): Observable<any> {
		return this.hasActiveVoting().pipe(
			switchMap(hasActiveVoting => this.hasActiveVotingHandler(hasActiveVoting)),
			switchMap(accounts => this.txSenderService.send(
				this.devZenDaoAutoContract.methods.withdrawEtherAuto, 
				[outputAddress],
				{ from: accounts[0] },
				"Voting 'Withdraw all ETH' created",
				"Error on creating a voting 'Withdraw all ETH'"
			))
		);
	}

	//===============
	// Voting methods
	//===============

	/**
	 * Returns method signature that should be called if proposal is accepted
	 * @param proposalAddress 
	 */
	getMethodSig(proposalAddress): Observable<string> {
		const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
		return from(proposal.methods.getMethodSig().call());
	}

	/**
	 * Returns params of the method that should be called if proposal is accepted
	 * @param proposalAddress 
	 */
	getProposalParams(proposalAddress): Observable<string> {
		const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
		return from(proposal.methods.getParams().call());
	}

	/**
	 * Returns voting info with creator address and created at timestamp
	 * @param proposalAddress 
	 */
	getVotingInfo(proposalAddress): Observable<any> {
		const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
		return from(proposal.methods.getVoting().call()).pipe(
			switchMap(votingAddress => {
				const voting = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_VOTING].abi, votingAddress);
				return from(voting.methods.getVotingInfo().call());
			})
		)
	}

	/**
	 * Returns voting status with counts of yes, no, total
	 * @param proposalAddress 
	 */
	getVotingStats(proposalAddress): Observable<any> {
		const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
		return from(proposal.methods.getVoting().call()).pipe(
			switchMap(votingAddress => {
				const voting = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_VOTING].abi, votingAddress);
				return from(voting.methods.getVotingStats().call());
			})
		)
	}

	/**
	 * Checks whether voting is finished
	 * @param proposalAddress 
	 */
	isFinished(proposalAddress): Observable<boolean> {
		const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
		return from(proposal.methods.getVoting().call()).pipe(
			switchMap(votingAddress => {
				const voting = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_VOTING].abi, votingAddress);
				return from(voting.methods.isFinished().call());
			})
		)
	}

	/**
	 * Returns voting result
	 * @param proposalAddress 
	 */
	isYes(proposalAddress): Observable<boolean> {
		const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
		return from(proposal.methods.getVoting().call()).pipe(
			switchMap(votingAddress => {
				const voting = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_VOTING].abi, votingAddress);
				return from(voting.methods.isYes().call());
			})
		)
	}

	/**
	 * Votes for a proposal
	 * @param proposalAddress 
	 * @param vote 
	 */
	vote(proposalAddress, vote): Observable<void> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => {
				const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
				return from(proposal.methods.getVoting().call()).pipe(
					switchMap(votingAddress => {
						const voting = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_VOTING].abi, votingAddress);
						return this.txSenderService.send(
							voting.methods.vote, 
							[vote], 
							{ from: accounts[0] },
							"Your vote was added",
							"Error on voting"
						);
					})
				);
			})
		);
	}

	//===============
	// Helper methods
	//===============

	/**
	 * Returns all DAO parameters
	 */
	getAllParams(): Observable<any> {
		return forkJoin(
			this.params(this.PARAM_MINT_TOKENS_PER_WEEK_AMOUNT),
			this.params(this.PARAM_MINT_REPUTATION_TOKENS_PER_WEEK_AMOUNT),
			this.params(this.PARAM_ONE_AD_SLOT_PRICE),
			this.params(this.PARAM_ONE_TOKEN_PRICE_IN_WEI),
			this.params(this.PARAM_BECOME_GUEST_STAKE),
			this.params(this.PARAM_REP_TOKENS_REWARD_HOST),
			this.params(this.PARAM_REP_TOKENS_REWARD_GUEST),
			this.params(this.PARAM_REP_TOKENS_REWARD_TEAM_MEMBERS)
		).pipe(switchMap(
			params => {
				const result = {
					mintTokensPerWeekAmount: params[0],
					mintReputationTokensPerWeekAmount: params[1],
					oneAdSlotPrice: params[2],
					oneTokenPriceInWei: params[3],
					becomeGuestStake: params[4],
					repTokensRewardHost: params[5],
					repTokensRewardGuest: params[6],
					repTokensRewardTeamMembers: params[7]
				};
				return of(result);
			}
		));
	}

	/**
	 * Returns parameter name by hash
	 */
	getParamInfoByHash(hash) {
		let name = null;
		let desc = null;

		if(hash == this.PARAM_MINT_TOKENS_PER_WEEK_AMOUNT) {
			name = "mintTokensPerWeekAmount";
			desc = "Amount of DZT created each week";
		}
		if(hash == this.PARAM_MINT_REPUTATION_TOKENS_PER_WEEK_AMOUNT) {
			name = "mintReputationTokensPerWeekAmount";
			desc = "Amount of DZTREP created each week";
		}
		if(hash == this.PARAM_ONE_AD_SLOT_PRICE) {
			name = "oneAdSlotPrice";
			desc = "Price for 1 ad slot in DZT";
		}
		if(hash == this.PARAM_ONE_TOKEN_PRICE_IN_WEI) {
			name = "oneTokenPriceInWei";
			desc = "Price for 1 DZT in ETH";
		}
		if(hash == this.PARAM_BECOME_GUEST_STAKE) {
			name = "becomeGuestStake";
			desc = "Guest stake in DZT";
		}
		if(hash == this.PARAM_REP_TOKENS_REWARD_HOST) {
			name = "repTokensRewardHost";
			desc = "Host reward for episode in DZTREP";
		}
		if(hash == this.PARAM_REP_TOKENS_REWARD_GUEST) {
			name = "repTokensRewardGuest";
			desc = "Guest reward for episode in DZTREP";
		}
		if(hash == this.PARAM_REP_TOKENS_REWARD_TEAM_MEMBERS) {
			name = "repTokensRewardTeamMembers";
			desc = "Reward of all team members for episode in DZTREP";
		}

		if(!name) throw Error(`param name not found for hash ${hash}`);
		if(!desc) throw Error(`param desc not found for hash ${hash}`);

		return {
			name: name,
			desc: desc
		};
	}

	/**
	 * Checks whether there are active votings
	 */
	hasActiveVoting() {
		return this.getProposalsCount().pipe(
			switchMap(proposalsCount => {
				if(proposalsCount == 0) return of([]);
				let requests = [];
				for(let i = 0; i < proposalsCount; i++) {
					requests.push(this.getProposalAtIndex(i));
				}
				return forkJoin(requests);
			}),
			switchMap(proposalAddresses => {
				if(proposalAddresses.length == 0) return of([]);
				let requests = [];
				for(let i = 0; i < proposalAddresses.length; i++) {
					requests.push(this.isFinished(proposalAddresses[i]));
				}
				return forkJoin(requests);
			}),
			switchMap(isFinishedArray => {
				return isFinishedArray.includes(false) ? of(true) : of(false);
			})
		)
	}

	/**
	 * Has active voting handler for auto methods
	 */
	hasActiveVotingHandler(hasActiveVoting) {
		if(hasActiveVoting) {
			this.messageService.add({severity:'error', summary:'Error', detail:'You can\'t start a new voting while there is at least one active voting'});
			throw new Error('You can\'t start a new voting while there is at least one active voting');
		}
		return this.web3Service.getAccounts();
	}

	/**
	 * Checks whether current user is DevZenTeam member
	 */
	isTeamMember(): Observable<boolean> {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => this.isGroupMember(this.GROUP_DEV_ZEN_TEAM, accounts[0])),
			switchMap(isTeamMember => isTeamMember ? of(true) : of(false))
		);
	}

}
