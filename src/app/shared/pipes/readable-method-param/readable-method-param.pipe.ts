import { Pipe, PipeTransform } from '@angular/core';

import { DevzendaoService, Web3Service } from '../../services';

@Pipe({ name: 'readableMethodParam' })
export class ReadableMethodParamPipe implements PipeTransform {

    constructor(
        public devZenDaoService: DevzendaoService,
        public web3Service: Web3Service
    ) {}

	transform(paramHex, methodSign, index) {
		switch(methodSign) {
            case "addGroupMemberGeneric(bytes32[])":
                // group name
                if(index == 0) {
                    const readableGroupOfAddedAddress = this.web3Service.hexToUtf8(paramHex);
                    return `Группа: ${readableGroupOfAddedAddress}`;
                } else {
                    const readableAddressToBeAdded = this.web3Service.bytes32ToAddress(paramHex);
                    return `Адрес: ${readableAddressToBeAdded}`;
                }
            case "changeTheGuestGeneric(bytes32[])":
                const readableGuestAddress = this.web3Service.bytes32ToAddress(paramHex);
                return `Адрес: ${readableGuestAddress}`;
            case "emergency_ChangeTheGuestGeneric(bytes32[])":
                const readableEmergencyGuestAddress = this.web3Service.bytes32ToAddress(paramHex);
                return `Адрес: ${readableEmergencyGuestAddress}`;
            case "moveToNextEpisodeGeneric(bytes32[])":
                const paramValue = this.web3Service.hexToNumberString(paramHex);
                const readableParamValue = paramValue == 1 ? "Да" : "Нет";
                return `Начислить репутацию гостю: ${readableParamValue}`;
            case "removeGroupMemberGeneric(bytes32[])":
                // group name
                if(index == 0) {
                    const readableGroupOfRemovedAddress = this.web3Service.hexToUtf8(paramHex);
                    return `Группа: ${readableGroupOfRemovedAddress}`;
                } else {
                    const readableAddressToBeRemoved = this.web3Service.bytes32ToAddress(paramHex);
                    return `Адрес: ${readableAddressToBeRemoved}`;
                }
            case "selectNextHostGeneric(bytes32[])":
                const readableHostAddress = this.web3Service.bytes32ToAddress(paramHex);
				return `Адрес: ${readableHostAddress}`;
            case "updateDaoParamsGeneric(bytes32[])":
                // param name
                if(index == 0) {
                    const readableParamName = this.devZenDaoService.getParamNameByHash(paramHex);
                    return `Параметр: ${readableParamName}`;
                } else {
                    // param value
                    const paramValueInWei = this.web3Service.hexToNumberString(paramHex);
                    const readableParamValue = this.web3Service.fromWei(paramValueInWei,"ether");
                    return `Значение: ${readableParamValue}`;
                }
            case "withdrawEtherGeneric(bytes32[])":
                const readableWithdrawAddress = this.web3Service.bytes32ToAddress(paramHex);
				return `Адрес: ${readableWithdrawAddress}`;
			default: 
				return "Параметр не найден"
		}
	}

}
