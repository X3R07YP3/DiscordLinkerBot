const { SlashCommandBuilder, Message, EmbedBuilder  } = require('discord.js');
const mysql = require('mysql2');
const config = require('../config.json');
const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DB,
  port: config.MYSQL_PORT,
});

module.exports = {
    data: new SlashCommandBuilder()
    .setName('doges') // Command name
    .setDescription ('Muestra los puntos totales del usuario'),
    async execute(interaction) {
        let discordId = interaction.user.id;

    // Obtenemos el SteamId correspondiente al DiscordId
    connection.query(
      'SELECT SteamId FROM discordsteamlinks WHERE DiscordId = ?',
      [discordId],
      function(err, results) {
        if (err) {
          console.log(err);
          message.reply('Error al obtener los puntos.');
        } else if (results.length > 0) {
          const steamId = results[0].SteamId;

          // Obtenemos los puntos de la tabla Points
          connection.query(
            'SELECT Points, TotalSpent FROM arkshopplayers WHERE SteamId = ?',
            [steamId],
            function(err, results) {
              if (err) {
                console.log(err);
                message.reply('Error al obtener los puntos.');
              } else if (results.length > 0) {
                const points = results[0].Points;
                const totalSpent = results[0].TotalSpent;
                const totalobt = points + totalSpent;

                const embed = new EmbedBuilder()
                  .setColor('#0099ff')
                  .setTitle(`Doges de ${interaction.user.tag}`)
                  .addFields(
                    { name: 'Doges', value: `\`\`\`${points}\`\`\``, inline: true  },
                    { name: 'Gastados', value: `\`\`\`${totalSpent}\`\`\``, inline: true  },
                    { name: 'Total obtenidos', value: `\`\`\`${totalobt}\`\`\``, inline: true  },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'DiscordId', value: `\`\`\`${discordId}\`\`\``, inline: true },
                    { name: 'SteamId', value: `\`\`\`${steamId}\`\`\``, inline: true },
                );
                interaction.reply({ embeds: [embed] });
              } else {
                message.reply('No se encontraron puntos para este usuario.');
              }
            }
          );
        } else {
          message.reply('No se encontró una cuenta de Steam vinculada a este usuario.');
          connection.release();
        }
      }
    );
  }
};
