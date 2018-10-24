import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readableMethodSign' })
export class ReadableMethodSignPipe implements PipeTransform {

	transform(methodSign: string) {
		switch(methodSign) {
			// standard dao base methods
			case "addGroupMemberGeneric(bytes32[])":
				return "Adding a new group member";
			case "removeGroupMemberGeneric(bytes32[])":
				return "Removing group member";
			// DevZenDao methods
			case "updateDaoParamsGeneric(bytes32[])":
				return "Updating DAO params";
			case "withdrawEtherGeneric(bytes32[])":
				return "Withdraw all ETH";
			case "selectNextHostGeneric(bytes32[])":
				return "Select the next host";
			case "changeTheGuestGeneric(bytes32[])":
				return "Change the guest";
			case "emergency_ChangeTheGuestGeneric(bytes32[])":
				return "Emergency change the guest";
			case "moveToNextEpisodeGeneric(bytes32[])":
				return "Move to next episode";
			default: 
				return "Translation not found"
		}
	}

}
