const {CedilleAI} = require("../../../../core/utils/CedilleAI");
const {botConfig} = require("../../../../core/bot");

module.exports.commandInfo = {
	name: "cedilleai",
	commandFormat: "<prompt>",
	typeWaited: {
		prompt: typeVariable.STRING
	},
	ignoreFormat: true,
	messageWhenExecuted: "",
	description: "Commande pour cedille.ai"
};

const cedilleAITestCommand = (language, message, args) => {
	if (args.length === 0) {
		throw new Error("You must provide a sentence to complete");
	}
	return CedilleAI.completeSentence(botConfig.CEDILLE_API_KEY, args.join(" "));
};

module.exports.execute = cedilleAITestCommand;