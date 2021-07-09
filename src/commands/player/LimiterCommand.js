/**
 * Displays information about the profile of the player who sent the command
 * @param {("fr"|"en")} language - Language to use in the response
 * @param {module:"discord.js".Message} message - Message from the discord server
 * @param {String[]} args=[] - Additional arguments sent with the command
 */
const LimiterCommand = async function (language, message, args) {
	let total = 0;
	let userid;
	let [author] = await Entities.getByArgs(args, message);
	if (author === null) {
		[author] = await Entities.getOrRegister(message.author.id);
		userid = message.author.id;
	} else {
		userid = author.discordUser_id;
	}

	let all = await FightLimiter.findAllLimiters();
	for (let k = 0; k < all.length; k++) {
		total += all[k].amount;
	}
	let limiters = await FightLimiter.getforUser(userid);
	let description = "";
	let count = 0;
	let adv = 0;
	for (let i = 0; i < limiters.length; i++) {
		let id;
		if (limiters[i].smallid === userid) {
			id = limiters[i].bigid;
		} else {
			id = limiters[i].smallid;
		}
		[entity] = await Entities.getOrRegister(id);
		let pseudo = await entity.Player.getPseudo(language);
		adv++;
		count += limiters[i].amount;
		description += "**" + pseudo + "** : " + limiters[i].amount + "/3\n";
	}

	if (description.length === 0) {
		description = "Aucun combat n'a été réalisé pour le moment.";
	} else {
		description += "\n**Nombre total de combats :** `" + count +
			"`\n**Combats possibles effectués :** `" + (Math.round((count / (62 * 3)) * 1000000) / 10000) +
			" %`\n**Combats possibles effectués pour tous les joueurs :** `" + (Math.round((total / 5859) * 1000000) / 10000) +
			" %`\n**Nombre d'adversaires rencontrés :** `" + adv +
			"`\n**Nombre d'adversaires jamais combattus :** `" + (62 - adv) + "`";

	}

	const limiterEmbed = new discord.MessageEmbed()
		.setDescription(description)
		.setAuthor(format("{pseudo}, statistiques de " +await author.Player.getPseudo(language) + " :", {
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
