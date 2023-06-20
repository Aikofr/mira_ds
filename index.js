// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Lorsque le client est prêt, exécutez ce code (une seule fois)
// Nous utilisons 'c' pour le paramètre d'événement afin de le séparer du 'client' déjà défini
client.once(Events.ClientReady, c => {
	console.log(`Prêt! connecté en tant que ${c.user.tag}`);
});

//Commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands'); //Chemin vers repertoire
const commandFolders = fs.readdirSync(foldersPath); //Boucle sur tout les fichiers

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] Commande : ${filePath} - il manque une propriété "data" ou "execute" requise.`);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: "Une erreur s'est produite lors de l'exécution de cette commande !", ephemeral: true });
		} else {
			await interaction.reply({ content: "Une erreur s'est produite lors de l'exécution de cette commande !", ephemeral: true });
		}
	}
});


// Connectez-vous à Discord avec le token de votre client
client.login(token);