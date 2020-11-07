const { Command } = require('discord-akairo')
const CarousingActivity = require('../downtime-activities/carousing')

class DowntimeCommand extends Command {
  constructor() {
    super('downtime', {
      aliases: [ 'q' ],
    })
  }

  *args() {
    const characterName = yield {
      type: 'text',
      prompt: {
        start: `What character is this for?`
      }
    }

    const activity = yield {
      type: 'integer',
      prompt: {
        start: `What downtime activity are you doing for ${characterName}?\n` +
          [
            `[1] Carousing - Between adventures, who doesn't want to relax with a few drinks and a group of friends at a tavern?`,
            `[2] Crime`,
            `[3] Gambling`,
            `[4] Pit Fighting`,
            `[5] Relaxtion`,
            `[6] Religious Service`,
            `[7] Research`,
            `[8] Scribing a Spell`,
            `[9] Work`,
          ].join('\n')
        ,
        retry: 'Please select a number!'
      }
    }

    if (activity === 1) {
      const carousingActivity = yield CarousingActivity.CAROUSING1
      const skill = yield CarousingActivity.CAROUSING2
      const isUsingTool = yield CarousingActivity.CAROUSING3
      let proficiencyBonus = 0
      if (isUsingTool === 2) {
        proficiencyBonus = yield CarousingActivity.CAROUSING4
      }

      return {
        characterName,
        activity,
        carousingActivity,
        skill,
        isUsingTool,
        proficiencyBonus,
      }
    }

    // When finished.
    return {
      characterName,
      activity,
    }
  }
  
  async exec(message, args) {
    if (message.author.bot) {
      return
    }
    
    if (args.activity === 1) {
      const activity = new CarousingActivity()
      return activity.exec(message, args)
    }
  }
}

module.exports = DowntimeCommand