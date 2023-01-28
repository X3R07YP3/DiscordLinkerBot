## Como crear un bot

Para crear un bot de discord necesitas ir a la web de [discord developers](https://discord.com/developers/applications) una vez dentro haremos click en **New Aplication**

![logo](https://img001.prntscr.com/file/img001/EdEQIbJORSCihSCfgyvaHQ.png ':size=200%')

Le ponemos un nombre y aceptamos los terminos. Una vez echo nos dirigimos al apartado **Bot** y pulsamos en **Add Bot**

![logo](https://img001.prntscr.com/file/img001/mFSn92z1SEG4wsnqZJbiDw.png ':size=200%')
Aquí debemos apuntarnos el **Token** de nuestro bot para poder usarlo en el archivo `.env`

## Intents
Para que nuestro bot pueda funcionar correctamente tenemos que activar estas opciones dentro del apartado del bot creado:
![logo](https://img001.prntscr.com/file/img001/9iEPPQInTh-suGEOTH8jfw.png ':size=200%')
**Si no se activan estas intents el bot enviara un error todo el tiempo.**
## clientId

Para obtener el **clientId** de nuestro bot tenemos que dirigirnos a **OAuth2** y dentro veremos en el apartado **Client information** la **CLIENT ID** de nuestro bot.
![logo](https://i.imgur.com/8zsgYhD.png ':size=200%')

## guildId
- Para obtener la **guildId** de nuestro servidor de discord primero tenemos que tener activado el **Modo desarrollador**. Dirigete a los ajustes de tu cuenta>Avanzado y activa el modo desarollador.
![logo](https://i.imgur.com/aOF6jjR.png ':size=200%')
- Una vez activada esta funcion ahora solo necesitamos irnos a la imagen de nuestro servidor de discord, hacer click derecho sobre ella y darle donde pone **Copiar ID**
![logo](https://i.imgur.com/QfMW0zz.png ':size=60%')
