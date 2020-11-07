require('dotenv').config()
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')

class DowntimeClient extends AkairoClient {
  constructor() {
    super({
      ownerID: [process.env.OWNER_ID],
    }, {
      disableMentions: 'everyone',
      partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE','REACTION', 'USER']
    })

    this.commandHandler = new CommandHandler(this, {
      directory: './commands/',
      prefix: '!',
      defaultCooldown: 1000,
      ignoreCooldown: [process.env.OWNER_ID]
    })
    this.commandHandler.loadAll()

    this.listenerHandler = new ListenerHandler(this, {
      directory: './listeners/'
    })

    this.commandHandler.useListenerHandler(this.listenerHandler)
    this.listenerHandler.loadAll()
  }
}

const client = new DowntimeClient()
client.login(process.env.DISCORD_TOKEN)