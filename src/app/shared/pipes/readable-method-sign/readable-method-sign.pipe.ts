import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readableMethodSign' })
export class ReadableMethodSignPipe implements PipeTransform {

	transform(methodSign: string) {

		let result = "Перевод не найден";
		
		switch(methodSign) {
			// standard dao base methods
			case "addGroupMemberGeneric(bytes32[])":
				return "Добавление участника";
			case "removeGroupMemberGeneric(bytes32[])":
				return "Удаление участника";
			// DevZenDao methods
			case "updateDaoParamsGeneric(bytes32[])":
				return "Обновление параметров DAO";
			case "withdrawEtherGeneric(bytes32[])":
				return "Вывод всех ETH";
			case "selectNextHostGeneric(bytes32[])":
				return "Выбор следующего организатора";
			case "changeTheGuestGeneric(bytes32[])":
				return "Смена гостя";
			case "emergency_ChangeTheGuestGeneric(bytes32[])":
				return "Экстренная смена гостя";
			case "moveToNextEpisodeGeneric(bytes32[])":
				return "Выпуск нового эпизода";
			default: 
				return "Перевод не найден"
		}
	}

}
