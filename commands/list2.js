const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { RCONClient } = require('rcon.js');
const config = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Show list of players on all servers'),
  async execute(interaction) {
    try {
      const servers = config.servers;
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`Lista de servidores`);
      for (const server of servers) {
        const client = new RCONClient({
          host: server.host,
          port: server.port,
        });
        try {
          await client.login(server.password);
          const response = await client.command('ListPlayers');
          const players = response.body.trim().split(/\r?\n/);
          const playerCount = players.length;
          if (playerCount === 0) {
            embed.addFields({ name: `${server.name}: Servidor vacío.`, value: `\`\`\`js\n Sin Jugadores\`\`\`` });
          } else if (response.body.trim() === 'No Players Connected') {
            embed.addFields({ name: `${server.name}: 0 Jugadores`, value: `\`\`\`js\n Sin Jugadores\`\`\`` });
          } else {
            let playerList = '';
            for (let i = 0; i < players.length; i++) {
              const match = players[i].match(/^\d+\.\s.+,\s(\d+)$/);
              if (match) {
                const id = match[1];
                console.log("id= ",id);
                const nameResponse = await client.command(`GetPlayerName ${id}`);
                const name = nameResponse.body.trim().replace(/^Playername - /, '');
                playerList += `${name}\n`;
              }
            }
            embed.addFields({ name: `${server.name}: ${playerCount} Jugador${playerCount === 1 ? '' : 'es'}`, value: `\`\`\`js\n${playerList}\`\`\`` });
          }
          console.log(`[${server.name}] Response: ${response.body.trim()}`);
        } catch (err) {
          console.log(`[${server.name}] Error: ${err}`);
          embed.addFields({ name: `${server.name}: Servidor apagado.`, value: `\`\`\`js\n Sin Jugadores\`\`\`` });
        }
      }
      interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      interaction.reply('Error getting player list from servers.');
    }
  },
};
