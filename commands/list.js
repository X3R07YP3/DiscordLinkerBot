const { SlashCommandBuilder } = require('discord.js');
const { RCONClient } = require('rcon.js');
const config = require('../config.json');

const client = new RCONClient({
    host: config.RCON_HOST,
    port: config.RCON_PORT
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playerlist')
    .setDescription('Show list of players on the server'),
  async execute(interaction) {
    try {
        client.login(config.RCON_PASSWORD)
            .then(() => {
                return client.command(`ListPlayers`);
            })
            .then((response) => {
                const players = response.body.trim().split('\n');
                const playerCount = players.length;
                const playerList = players.map(player => {
                    const playerData = player.split(',');
                    const playerName = playerData[0].trim().split('. ')[1].trim();
                    console.log(playerData);
                    return playerName;
                }).join(', ');
                interaction.reply(`There are ${playerCount} players on the server:\n${playerList}`);
            })
            .catch(err => {
                console.log(err);
                interaction.reply('Failed to connect to Rcon server.');
            });
    } catch (err) {
        console.error(err);
        interaction.reply('Error getting player list from server.');
    }
  }
};
