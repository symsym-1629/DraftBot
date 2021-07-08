/**
 * Displays information about the profile of the player who sent the command
 * @param {("fr"|"en")} language - Language to use in the response
 * @param {module:"discord.js".Message} message - Message from the discord server
 * @param {String[]} args=[] - Additional arguments sent with the command
 */
const LimiterCommand = async function (language, message, args) {
	let limiters = await FightLimiter.getforUser(message.author.id);
	let description = "";
	let count = 0;
	let adv = 0;
	for (let i = 0; i < limiters.length; i++) {
		let id;
		if (limiters[i].smallid === message.author.id) {
			id = limiters[i].bigid;
		} else {
			id = limiters[i].smallid;
		}
		[entity] = await Entities.getOrRegister(id);
		let pseudo = await entity.Player.getPseudo(language);
		adv++;
		count+=limiters[i].amount;
		description += "**" + pseudo + "** : " + limiters[i].amount + "/3\n";
	}

	if (description.length === 0) {
		description = "Aucun combat n'a été réalisé pour le moment.";
	}else{
		description += "\n**Nombre total de combats :** `" + count+
			"`\n**Nombre théorique de combats possibles restants :** `" + (61*3 -count)+
			"`\n**Nombre d'adversaires rencontrés :** `" + adv+
			"`\n**Nombre d'adversaires jamais combattus :** `" + (62 - adv)+"`";
	}

	const limiterEmbed = new discord.MessageEmbed()
		.setDescription(description)
		.setAuthor(format("{pseudo}, Liste des combats effectués :", {
			pseudo: message.author.username,
		}), message.author.displayAvatarURL())
		.setColor(JsonReader.bot.embed.default);
	message.channel.send(limiterEmbed);
};

module.exports = {
	commands: [
		{
			name: 'limiter',
			func: LimiterCommand,
			aliases: ['l', 'limit']
		}
	]
};
