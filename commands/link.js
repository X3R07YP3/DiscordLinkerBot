const { SlashCommandBuilder, Message } = require('discord.js');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    supportBigNumbers: true,
    bigNumberStrings: true
});

module.exports = {
    data: new SlashCommandBuilder()
    .setName('link') // Command name
    .setDescription ('Generate a code to link a Steam account with a Discord account'),
    async execute(interaction) {
        let discordId = interaction.user.id;

        // First we check if the user is already linked
        connection.query(
            'SELECT SteamId, linkcode FROM discordgamelinker WHERE DiscordId = ?',
            [discordId],
            function(err, results) {
                if (err) {
                    console.log(err);
                    interaction.reply('Failed to verify linking.');
                } else if (results.length > 0) {
                    let SteamId = results[0].SteamId;
                    let linkcode = results[0].linkcode;
                    if(SteamId === null || SteamId === "0"){
                        // If the SteamId is empty we check if it has a generated code
                        if(linkcode !=null || linkcode !=""){
                            interaction.reply(`You already have a previous generated link, link using it: \`/linkgame ${linkcode}\``);
                        }else{
                            // If the user does not have a code and is not bound, we generate a new code
                            let linkcode = generateLinkCode();
                            connection.query(
                                'INSERT INTO discordgamelinker (DiscordId, linkcode) VALUES (?, ?)',
                                [discordId, linkcode],
                                function(err, results) {
                                    if (err) {
                                        console.log(err);
                                        interaction.reply('Failed to generate link code.');
                                    } else {
                                        interaction.reply(`Use this in-game command to link your account: \`/linkgame ${linkcode}\``);
                                    }
                                }
                            );
                        }
                    }else{
                        interaction.reply(`Your discord account is linked with this SteamId: ${SteamId}`);
                    }
                } else {
                    // If the user does not have a code and is not bound, we generate a new code
                    let linkcode = generateLinkCode();
                    connection.query(
                        'INSERT INTO discordgamelinker (DiscordId, linkcode) VALUES (?, ?)',
                        [discordId, linkcode],
                        function(err, results) {
                            if (err) {
                                console.log(err);
                                interaction.reply('Failed to generate link code.');
                            } else {
                                interaction.reply(`Use this in-game command to link your account: \`/linkgame ${linkcode}\``);
                            }
                        }
                    );
                    }
            }
        )
    }
};
function generateLinkCode() {
    let code = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    while (true) {
        code = '';
        for (let i = 0; i < 13; i++) {
            code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        }
        // Check if the code already exists in the database
        connection.query(
            'SELECT linkcode FROM discordgamelinker WHERE linkcode = ?',
            [code],
            function (err, results) {
                if (err) {
                    console.log(err);
                } else if (results.length === 0) {
                    // Code does not exist in the database, return it
                    return code;
                }
            }
        );
    }
}