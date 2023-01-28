# Install
Breve guía de instalación y puesta en marcha del bot.


## Requisitos
- [NodeJs](https://nodejs.org/es/download/)

## Dependencias
para instalar las dependencias y que el bot pueda funcionar solo tienes que escribir este comando en la consola: `npm install` y automaticamente se instalaran las dependencias mencionadas en package.json

## Configuracion .env
En el archivo `.env` necesitas poner todos los datos de tu bot, servidor de discord y base de datos:

- **TOKEN:** El [token](discordbot.md) de tu bot de discord.
- **MYSQL_HOST:** la ip de tu base de datos, si se ejecuta en el mismo ordenador/servidor puedes dejarlo en `localhost`.
- **MYSQL_PORT:** Este apartado es por si no usas el puerto normal de mysql (3306).
- **MYSQL_USER:** El usuario configurado en el plugin.
- **MYSQL_PASSWORD:** La contraseña configurada en el plugin.
- **MYSQL_DB:** El nombre de la base de datos configurada en el plugin.
- **clientId:** El [clientId](discordbot.md) se encuentra en la pagina de discord developer.
- **guildId:** La [id](discordbot.md) de tu servidor de discord.

![logo](https://img001.prntscr.com/file/img001/As4LBtPnRS6pkjP98Bvr2w.png ':size=70%')