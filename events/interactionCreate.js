const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Aucune correspondance de commande ${interaction.commandName} a été trouvé.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Erreur d'exécution ${interaction.commandName}`);
			console.error(error);
		}
	},
};