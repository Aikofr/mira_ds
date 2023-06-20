const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Prêt! connecté en tant que ${client.user.tag}`);
	},
};