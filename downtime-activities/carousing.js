const Activity = require("./activity")
const Discord = require('discord.js')

class CarousingActivty extends Activity {
  static name = 'Carousing'

  static CAROUSING1 = {
    type: 'integer',
    prompt: {
      start: `Carousing covers a workweek of fine food, strong drink, and socializing. A character can attempt to carouse among lower-, middle-, or upper-class folk. A character can carouse with the lower class for 10 gp to cover expenses, or 50 gp for the middle class. Carousing with the upper class requires 250 gp for the workweek and access to the local nobility.\nA character with the noble background can mingle with the upper class, but other characters can do so only if you judge that the character has made sufficient contacts. Alternatively, a character might use a disguise kit and the Deception skill to pass as a noble visiting from a distant city.\n` + 
        [  
          `[1] Lower class (10GP)`,
          `[2] Middle class (50GP)`,
          `[3] Upper class (250GP)`,
        ].join('\n')
      ,
      retry: 'Please select a number!'
    }
  }

  static CAROUSING2 = {
    type: 'integer',
    prompt: {
      start: `What is your character's relevant Persuasion OR Deception skill?`,
      retry: `This should be a number (next to the skill).`
    }
  }

  static CAROUSING3 = {
    type: 'integer',
    prompt: {
      start: `Are you using a tool, we can add your proficiency bonus?\n[1] No\n[2] Disguise Kit`,
      retry: `This should be a number.`
    }
  }

  static CAROUSING4 = {
    type: 'integer',
    prompt: {
      start: `What is you proficiency bonus?`,
      retry: `This should be a number.`
    }
  }

  exec(message, args) {
    const d20 = this.d20Roll()
    const roll = d20 + args.skill + args.proficiencyBonus
    let classType = 'lower class'
    let classCost = '10GP'
    if (args.carousingActivity === 2) {
      classType = 'middle class'
      classCost = '50GP'
    } else if (args.carousingActivity === 3) {
      classType = 'high class'
      classCost = '250GP'
    }

    let resultMessage = ``
    if (roll >= 1 && roll <= 5) {
      resultMessage = `${args.characterName} has made **a hostile contact**`
    } else if (roll >= 6 && roll <= 10) {
      resultMessage = `${args.characterName} has made **no new contacts**`
    } else if (roll >= 11 && roll <= 15) {
      resultMessage = `${args.characterName} has made **an allied contact**`
    } else if (roll >= 16 && roll <= 20) {
      resultMessage = `${args.characterName} has made **two allied contacts**`
    } else if (roll >= 21) {
      resultMessage = `${args.characterName} has made **three allied contacts**`
    }

    if (args.isUsingTool === 2) {
      resultMessage += ` using a Disguise Kit`
    }

    const complicationRoll = this.d20Roll(1, 100)
    

    const messageEmbed = new Discord.MessageEmbed()
      .setColor(this.randomColor())
      .setTitle('Downtime: Carousing Activity')
      .setURL('https://5e.tools/variantrules.html#downtime%20activity%3a%20carousing_xge')
      .setAuthor(message.member.displayName, message.author.avatarURL())
      .setDescription(`${resultMessage} while carousing for **5 downtime days** with *${classType}* folk spending **${classCost}**.`)
      .addFields(
        { name: 'Persuasion Roll', value: roll, inline: true},
        { name: 'Complication Roll', value: complicationRoll, inline: true },
      )
      .setFooter(`Roll: ${d20} | Skill: ${args.skill} | PB: ${args.proficiencyBonus} | DD: 5 | GP: ${classCost}`)

    if (complicationRoll <= 10) {
      messageEmbed.addField('Complication', this.d20Roll(1,8), true)
    }

    return message.channel.send(messageEmbed)
  }
}

module.exports = CarousingActivty