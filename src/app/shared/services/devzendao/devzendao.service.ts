import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment as env } from '../../../../environments/environment';
import { TxSenderService } from '../tx-sender/tx-sender.service';
import { Web3Service } from '../web3/web3.service';

@Injectable({
	providedIn: 'root'
})
export class DevzendaoService {

	@Output() init: EventEmitter<any> = new EventEmitter();

	GROUP_DEV_ZEN_TEAM = "DevZenTeam";

	contractsData = [];
	devZenDaoContract: any;
	isInitialized = false;

	// abi indexes
	ABI_INDEX_DEV_ZEN_DAO = 0;

	constructor(
		public http: HttpClient,
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
			this.http.get('assets/contracts/DevZenDao.json')
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

	// /**
	//  * Returns dao params
	//  */
	// getParams(): Observable<any> {
	// 	return from(this.daoContract.methods.params().call());
	// }

	// //==============================================
	// // These methods should be called by DevZen team
	// //==============================================

	// /**
	//  * Update DAO params
	//  * @param params 
	//  */
	// updateDaoParams(params): Observable<any> {
	// 	const tupledParams = [this.web3Service.toTuple(params)];
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.updateDaoParams, 
	// 			tupledParams, 
	// 			{ from: accounts[0] },
	// 			"Параметры DAO изменены",
	// 			"Ошибка обновления параметров DAO"
	// 		))
	// 	);
	// }

	// /**
	//  * Withdraw ether to output address
	//  * @param outputAddress 
	//  */
	// withdrawEther(outputAddress): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.withdrawEther, 
	// 			[outputAddress],
	// 			{ from: accounts[0] },
	// 			"Перевод успешно выполнен",
	// 			"Ошибка вывода средств"
	// 		))
	// 	);
	// }

	// /**
	//  * Select next host
	//  * @param nextHostAddress 
	//  */
	// selectNextHost(nextHostAddress): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.selectNextHost,
	// 			[nextHostAddress],
	// 			{ from: accounts[0] },
	// 			"Следующий организатор изменен",
	// 			"Ошибка изменения организатора"
	// 		))
	// 	);
	// }

	// /**
	//  * Burn guest stake
	//  */
	// burnGuestStake(): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.burnGuestStake,
	// 			[],
	// 			{ from: accounts[0] },
	// 			"Токены гостя удалены",
	// 			"Ошибка удаления токенов гостя"
	// 		))
	// 	);
	// }

	// /**
	//  * Change the guest in "legal" way
	//  * @param guestAddress 
	//  */
	// changeTheGuest(guestAddress): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.changeTheGuest,
	// 			[guestAddress],
	// 			{ from: accounts[0] },
	// 			"Гость успешно изменен",
	// 			"Ошибка изменения гостя"
	// 		))
	// 	);
	// }

	// /**
	//  * Change the guest in "emergency" way
	//  * @param guestAddress 
	//  */
	// emergencyChangeTheGuest(guestAddress): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.emergency_ChangeTheGuest,
	// 			[guestAddress],
	// 			{ from: accounts[0] },
	// 			"Гость успешно изменен",
	// 			"Ошибка изменения гостя"
	// 		))
	// 	);
	// }

	// /**
	//  * Move to next episode
	//  * @param guestHasCome whether guest visited the show
	//  */
	// moveToNextEpisode(guestHasCome): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.moveToNextEpisode,
	// 			[guestHasCome],
	// 			{ from: accounts[0] },
	// 			"Новый эпизод успешно создан",
	// 			"Ошибка создания нового эпизода"
	// 		))
	// 	);
	// }

	// //=======================================================
	// // These methods should be called by DevZen token holders
	// //=======================================================

	// /**
	//  * Adds adv slot to the next episode
	//  * @param adText 
	//  */
	// runAdsInTheNextEpisode(adText): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.runAdsInTheNextEpisode,
	// 			[adText],
	// 			{ from: accounts[0] },
	// 			"Рекламное объявление успешно добавлено",
	// 			"Ошибка добавления рекламного объявления"
	// 		))
	// 	);
	// }

	// /**
	//  * Becomes the next show guest
	//  */
	// becomeTheNextShowGuest(): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.becomeTheNextShowGuest,
	// 			[],
	// 			{ from: accounts[0] },
	// 			"Вы стали следующим гостем",
	// 			"Ошибка выбора следующего гостя"
	// 		))
	// 	);
	// }

	// //==============================================
	// // These methods should be called by any address
	// //==============================================

	// /**
	//  * Buy DZT
	//  * @param valueInWei 
	//  */
	// buyTokens(valueInWei): Observable<any> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.buyTokens,
	// 			[],
	// 			{ from: accounts[0], value: valueInWei },
	// 			"Успешная покупка DZT",
	// 			"Ошибка покупки DZT"
	// 		))
	// 	);
	// }

	// /**
	//  * Checks whether 1 week has passed
	//  */
	// isOneWeekPassed(): Observable<boolean> {
	// 	return from(this.daoContract.methods.isOneWeekPassed().call());
	// }

	// //====================
	// // StdDaoToken methods
	// //====================

	// /**
	//  * Approve spending DZT or DZTREP for DAO
	//  * @param amount 
	//  * @param tokenName 
	//  */
	// approve(amount, tokenName) {
	// 	let baseContract = null;
	// 	if(tokenName == 'DZT') baseContract = this.dztTokenContract;
	// 	if(tokenName == 'DZTREP') baseContract = this.dztRepTokenContract;
	// 	if(!baseContract) throw new Error(`token name ${tokenName} not found, available: DZT, DZTREP`);

	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			baseContract.methods.approve,
	// 			[this.daoContract.options.address, amount],
	// 			{ from: accounts[0] },
	// 			"Успешный аппрув DZT",
	// 			"Ошибка аппрува DZT"
	// 		))
	// 	);
	// }

	// /**
	//  * Returns address balance by token name
	//  * @param address 
	//  * @param tokenName 
	//  */
	// balanceOf(address, tokenName): Observable<number> {
	// 	let baseContract = null;
	// 	if(tokenName == 'DZT') baseContract = this.dztTokenContract;
	// 	if(tokenName == 'DZTREP') baseContract = this.dztRepTokenContract;
	// 	if(!baseContract) throw new Error(`token name ${tokenName} not found, available: DZT, DZTREP`);

	// 	return from(baseContract.methods.balanceOf(address).call());
	// }

	// //===================
	// // DaoStorage methods
	// //===================

	// /**
	//  * Adds new group member
	//  * @param groupName 
	//  * @param address 
	//  */
	// addGroupMember(groupName, address): Observable<void> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.addGroupMember,
	// 			[groupName, address],
	// 			{ from: accounts[0] },
	// 			"Успешное добавление участника",
	// 			"Ошибка добавления участника"
	// 		))
	// 	);
	// }

	// /**
	//  * Returns addresses of group members by group name
	//  * @param groupName 
	//  */
	// getGroupMembers(groupName): Observable<string[]> {
	// 	return from(this.daoContract.methods.getGroupMembers(groupName).call());
	// }

	// /**
	//  * Returns proposal address by index
	//  * @param index 
	//  */
	// getProposalAtIndex(index): Observable<string> {
	// 	return from(this.daoContract.methods.getProposalAtIndex(index).call());
	// }

	// /**
	//  * Returns number of proposals
	//  */
	// getProposalsCount(): Observable<number> {
	// 	return from(this.daoContract.methods.getProposalsCount().call());
	// }

	// /**
	//  * Removes address from group
	//  * @param groupName 
	//  * @param address 
	//  */
	// removeGroupMember(groupName, address): Observable<void> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoContract.methods.removeGroupMember,
	// 			[groupName, address],
	// 			{ from: accounts[0] },
	// 			"Участник удален",
	// 			"Ошибка удаления участника"
	// 		))
	// 	);
	// }

	// //====================
	// // DaoBaseAuto methods
	// //====================

	// /**
	//  * Creates a proposal for adding user addres to a group
	//  * @param groupName 
	//  * @param address 
	//  */
	// addGroupMemberAuto(groupName, address): Observable<string> {
	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => this.txSenderService.send(
	// 			this.daoBaseAutoContract.methods.addGroupMemberAuto, 
	// 			[groupName, address], 
	// 			{ from: accounts[0] },
	// 			"Голосование о добавлении нового участника создано",
	// 			"Ошибка создания голосования о добавлении нового участника"
	// 		))
	// 	);
	// }

	// //===============
	// // Voting methods
	// //===============

	// /**
	//  * Returns method signature that should be called if proposal is accepted
	//  * @param proposalAddress 
	//  */
	// getMethodSig(proposalAddress): Observable<string> {
	// 	const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
	// 	return from(proposal.methods.getMethodSig().call());
	// }

	// /**
	//  * Returns params of the method that should be called if proposal is accepted
	//  * @param proposalAddress 
	//  */
	// getProposalParams(proposalAddress): Observable<string> {
	// 	const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
	// 	return from(proposal.methods.getParams().call());
	// }

	// /**
	//  * Returns voting status with counts of yes, no, total
	//  * @param proposalAddress 
	//  */
	// getVotingStats(proposalAddress): Observable<any> {
	// 	const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
	// 	return from(proposal.methods.getVoting().call()).pipe(
	// 		switchMap(votingAddress => {
	// 			const voting = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_VOTING_1P_1V].abi, votingAddress);
	// 			return from(voting.methods.getVotingStats().call());
	// 		})
	// 	)
	// }

	// /**
	//  * Checks whether voting is finished
	//  * @param proposalAddress 
	//  */
	// isFinished(proposalAddress): Observable<boolean> {
	// 	const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
	// 	return from(proposal.methods.getVoting().call()).pipe(
	// 		switchMap(votingAddress => {
	// 			const voting = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_VOTING_1P_1V].abi, votingAddress);
	// 			return from(voting.methods.isFinished().call());
	// 		})
	// 	)
	// }

	// /**
	//  * Returns voting result
	//  * @param proposalAddress 
	//  */
	// isYes(proposalAddress): Observable<boolean> {
	// 	const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
	// 	return from(proposal.methods.getVoting().call()).pipe(
	// 		switchMap(votingAddress => {
	// 			const voting = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_VOTING_1P_1V].abi, votingAddress);
	// 			return from(voting.methods.isYes().call());
	// 		})
	// 	)
	// }

	// /**
	//  * Votes for a proposal
	//  * @param proposalAddress 
	//  * @param vote 
	//  */
	// vote(proposalAddress, vote): Observable<void> {

	// 	return this.web3Service.getAccounts().pipe(
	// 		switchMap(accounts => {
	// 			const proposal = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_GENERIC_PROPOSAL].abi, proposalAddress);
	// 			return from(proposal.methods.getVoting().call()).pipe(
	// 				switchMap(votingAddress => {
	// 					const voting = this.web3Service.getContract(this.contractsData[this.ABI_INDEX_VOTING_1P_1V].abi, votingAddress);
	// 					return this.txSenderService.send(
	// 						voting.methods.vote, 
	// 						[vote, 0], 
	// 						{ from: accounts[0] },
	// 						"Ваш голос добавлен",
	// 						"Ошибка голосования"
	// 					);
	// 				})
	// 			);
	// 		})
	// 	);
	// }

}
