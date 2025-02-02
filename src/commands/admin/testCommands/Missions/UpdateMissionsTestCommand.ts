import {MissionsController} from "../../../../core/missions/MissionsController";
import {format} from "../../../../core/utils/StringFormatter";
import {Missions} from "../../../../core/database/game/models/Mission";
import {CommandInteraction} from "discord.js";
import {Constants} from "../../../../core/Constants";
import {ITestCommand} from "../../../../core/CommandsTest";
import {Players} from "../../../../core/database/game/models/Player";

export const commandInfo: ITestCommand = {
	name: "updateMissions",
	aliases: ["updateMission", "um"],
	commandFormat: "<mission id> <count>",
	typeWaited: {
		"mission id": Constants.TEST_VAR_TYPES.STRING,
		count: Constants.TEST_VAR_TYPES.INTEGER
	},
	messageWhenExecuted: "Vous avez avancé de {count} vos missions {missionId}",
	description: "Avance les missions",
	commandTestShouldReply: true,
	execute: null // Defined later
};

/**
 * Update les missions du joueur d'un montant donné
 * @param language
 * @param interaction
 * @param args
 */
const updateMissionsTestCommand = async (language: string, interaction: CommandInteraction, args: string[]): Promise<string> => {
	const [player] = await Players.getOrRegister(interaction.user.id);
	const mission = await Missions.getById(args[0]);
	if (!mission) {
		throw new Error("mission id inconnu");
	}
	const count = parseInt(args[1], 10);
	await MissionsController.update(player, interaction.channel, language, {missionId: args[0], count});

	return format(commandInfo.messageWhenExecuted, {
		missionId: args[0],
		count
	});
};

commandInfo.execute = updateMissionsTestCommand;