const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription("Fournit des informations sur l'utilisateur."),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Cette commande a été exécutée par ${interaction.user.username}, qui a rejoint ${interaction.member.joinedAt}.`);
	},
};