const jsonFileName = require("./blacklist.json");
const highLoad = require("./highLoad.json");
const Discord = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const Enmap = require('enmap');
var stdin = process.openStdin();
const nconf = require('nconf');
nconf.file({
    file: __dirname + "/config.json"
});
nconf.save();

class Griffiti extends Discord.Client {
    constructor(options) {
        super(options);
        this.config = require("./config.json");
        this.welcome = require("./data/welcome.json");
        this.guildSettings = new Enmap({
            name: 'settings',
            persistent: true
        });
    }
}
const client = new Griffiti();

let prefix = client.config.prefix;




const defaultSettings = {
    prefix: "g.",
    welcomeMessageEnabled: "true",
    welcomeMessage: "Welcome {{user}} to this fine guild!",
    logging: "false"
}

client.on("guildCreate", guild => {
    client.guildSettings.set(guild.id, defaultSettings);
});

client.on("guildDelete", guild => {
    client.guildSettings.delete(guild.id);
});

client.on("guildMemberAdd", member => {
    const guildConf = client.guildSettings.get(member.guild.id);
    if (!client.guildSettings.get(member.guild.id)) return;
    if (guildConf.welcomeMessageEnabled === "false") return;
    let gmaEmbed = new Discord.RichEmbed();
    const welcomeMessage = guildConf.welcomeMessage.replace(/{{user}}/g, member.user.tag)
    gmaEmbed.setColor("DARK_NAVY");
    gmaEmbed.setAuthor(`${member.user.username} has joined ${member.guild.name}`, `${member.guild.iconURL}`)
    gmaEmbed.setFooter("Use `g.set` to change welcome messages! \n Welcome messages are in early development, to change the channel where welcome messages appear or to disable it for your server, you g.report or message the bot dev with Griffin#1838")
    gmaEmbed.addField("Member:", member.user.tag);
    gmaEmbed.addField("Welcome message.", `${welcomeMessage}`);
    member.guild.channels.filter(c => c.type === 'text' && c.permissionsFor(client.user).has("SEND_MESSAGES")).sort((a, b) => a.position - b.position).first().send("", {
        embed: gmaEmbed
    })
    console.log(`New member joined ${member.guild.name}`)
});





var commandList = [];
var registerCommand = function(command) {
        if (command == null || command.name == null || typeof command.call !== 'function' || command.shortDesc == null) console.error(chalk.red('Tried to add a command that\'s not actually a command!'));
        commandList.push(command);
        if (typeof command.init === 'function') command.init(client, nconf);
        console.log(chalk.green('Command Initiated ') + chalk.underline.bold.green(command.name) + ' ' + chalk.gray(command.shortDesc));
    }
registerCommand(require('./commands/cl.js'));
registerCommand(require('./commands/set.js'));
registerCommand(require('./commands/listroles.js'));
registerCommand(require('./commands/listchannels.js'));
registerCommand(require('./commands/perms.js'));
registerCommand(require('./commands/quote.js'));
registerCommand(require('./commands/whois.js'));
registerCommand(require('./commands/weather.js'));
registerCommand(require('./commands/randphoto.js'));
registerCommand(require('./commands/serverlist.js'));
registerCommand(require('./commands/twitch.js'));
registerCommand(require('./commands/pokemon.js'));
registerCommand(require('./commands/placeholderbank.js'));
registerCommand(require('./commands/bank.js'));
registerCommand(require('./commands/bankbalance.js'));
registerCommand(require('./commands/placeholderbank2.js'));
registerCommand(require('./commands/giphy.js'));
registerCommand(require('./commands/discrim.js'));
registerCommand(require('./commands/dex.js'));
registerCommand(require('./commands/math.js'));
registerCommand(require('./commands/urban.js'));
registerCommand(require('./commands/role.js'));
registerCommand(require('./commands/softban.js'));
//registerCommand(require('./commands/terminate.js'));
registerCommand(require('./commands/report.js'));

registerCommand(require('./commands/encode.js'));
registerCommand(require('./commands/decode.js'));
registerCommand(require('./commands/google.js'));
registerCommand(require('./commands/convert.js'));
registerCommand(require('./commands/credits.js'));
registerCommand(require('./commands/stats.js'));
registerCommand(require('./commands/invite.js'));
registerCommand(require('./commands/info.js'));
registerCommand(require('./commands/uptime.js'));
registerCommand(require('./commands/ping.js'));
registerCommand(require('./commands/purge.js'));
registerCommand(require('./commands/mod.js').kick);
registerCommand(require('./commands/mod.js').mute);
registerCommand(require('./commands/rolldie.js'));
registerCommand(require('./commands/norris.js'));
registerCommand(require('./commands/emojilist.js'));
registerCommand(require('./commands/ocd.js'));
registerCommand(require('./commands/cringe.js').add);
registerCommand(require('./commands/cringe.js').check);
registerCommand(require('./commands/say.js'));
registerCommand(require('./commands/block.js'));
registerCommand(require('./commands/terminate.js'));
registerCommand(require('./commands/blacklist.js'));
registerCommand(require('./commands/lockdown.js'));
registerCommand(require('./commands/suggestion.js'));
registerCommand(require('./commands/toQbert.js'));
registerCommand(require('./commands/voiceCreate.js'));
registerCommand(require('./commands/highload.js'));
registerCommand(require('./commands/test.js'));
registerCommand(require('./commands/warn.js'));

/*
client.on('roleCreate', role => role.guild.channels.get(role.guild.channels.find('name', 'logs').id).send(`A new role was created,  its called ${role}`));

client.on('roleDelete', role => role.guild.channels.get(role.guild.channels.find('name', 'logs').id).send(`the ${role} role was deleted bois`));



client.on('guildMemberAdd', role => role.guild.channels.get(role.guild.channels.find('name', 'logs').id).send(`${member} Just joined the server`));

client.on('emojiCreate    ', role => role.guild.channels.get(role.guild.channels.find('name', 'logs').id).send(`An emoji was created ${emoji} is what it is called`));
*/

const music = require('discord.js-music-v11');

/* No longer works due to youtube API update
client.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
    music(client, {
        prefix: 'g.',
        global: true, 
        maxQueueSize: 10, 
        clearInvoker: false, 
        channel: 'Music Chat' 
    });
});
*/

client.on('ready', () => {
    console.log('The bot is online!');

});

/*
// STUFF BELOW IS for role assignment
client.on('ready', () => {
  console.log('The bot is online!');
  client.user.setGame('g.help to get started');
  // These things do nothing
  client.guilds.get('346568288840450060').channels.find('name', 'colour-assign').fetchMessage('347269053133357058') //orange role
  client.guilds.get('346568288840450060').channels.find('name', 'colour-assign').fetchMessage('347281531087093761') //pumkin role
  client.guilds.get('346568288840450060').channels.find('name', 'colour-assign').fetchMessage('347282955657412610') //Utisol role
  client.guilds.get('346568288840450060').channels.find('name', 'colour-assign').fetchMessage('347283857327915009') //Bloody role
  client.guilds.get('346568288840450060').channels.find('name', 'colour-assign').fetchMessage('347285661491003392') //Concrete role
  client.guilds.get('293997519807971331').channels.find('name', 'bot-commands').fetchMessage('347645333637169163') //Test role

});

client.on('messageReactionAdd', (messageReaction, user) => {
  if (messageReaction.emoji.name === '✅' && messageReaction.message.id === '347269053133357058') { //orange role
    client.guilds.get('346568288840450060').members.get(user.id).addRole('346575458076327946')
    console.log(`Added Orange role to ${user.id}`)
  }
  if (messageReaction.emoji.name === 'woah' && messageReaction.message.id === '347269053133357058') { //orange remove role
    client.guilds.get('346568288840450060').members.get(user.id).removeRole('346575458076327946')
    console.log(`Removed Orange role to ${user.id}`)
  }
  if (messageReaction.emoji.name === '✅' && messageReaction.message.id === '347281531087093761') { //pumpkin role add
    client.guilds.get('346568288840450060').members.get(user.id).addRole('346925908336181248')
    console.log(`Added Pumpkin role to ${user.id}`)
  }
  if (messageReaction.emoji.name === 'woah' && messageReaction.message.id === '347281531087093761') { //pumpkin role remove
    client.guilds.get('346568288840450060').members.get(user.id).removeRole('346925908336181248')
    console.log(`Removed Pumpkin role to ${user.id}`)
  }
  if (messageReaction.emoji.name === '✅' && messageReaction.message.id === '347282955657412610') { //Utisol role
    client.guilds.get('346568288840450060').members.get(user.id).addRole('346926062975844353')
    console.log(`Added Utisol role to ${user.id}`)
  }
  if (messageReaction.emoji.name === 'woah' && messageReaction.message.id === '347282955657412610') { //Utisol role remove
    client.guilds.get('346568288840450060').members.get(user.id).removeRole('346926062975844353')
    console.log(`Removed Utisol role to ${user.id}`)
  }
  if (messageReaction.emoji.name === '✅' && messageReaction.message.id === '347283857327915009') { //Bloody role
    client.guilds.get('346568288840450060').members.get(user.id).addRole('346926167141384194')
    console.log(`Added Bloody role to ${user.id}`)
  }
  if (messageReaction.emoji.name === 'woah' && messageReaction.message.id === '347283857327915009') { //Bloody role remove
    client.guilds.get('346568288840450060').members.get(user.id).removeRole('346926167141384194')
    console.log(`Removed Bloody role to ${user.id}`)
  }
  if (messageReaction.emoji.name === '✅' && messageReaction.message.id === '347285661491003392') { //Concrete role
    client.guilds.get('346568288840450060').members.get(user.id).addRole('346926322410586112')
    console.log(`Added Concrete role to ${user.id}`)
  }
  if (messageReaction.emoji.name === 'woah' && messageReaction.message.id === '347285661491003392') { //Concrete role remove
    client.guilds.get('346568288840450060').members.get(user.id).removeRole('346926322410586112')
    console.log(`Removed Concrete role to ${user.id}`)
  }
  if (messageReaction.emoji.name === '✅' && messageReaction.message.id === '347645333637169163') { //Test role
    client.guilds.get('293997519807971331').members.get(user.id).addRole('299459476162084866')
  }
  if (messageReaction.emoji.name === 'ThumbsDown' && messageReaction.message.id === '347645333637169163') { //Test role remove
    client.guilds.get('293997519807971331').members.get(user.id).removeRole('299459476162084866')
  }
});

*/
//cmd proccesor




client.on("message", message => {
    if (message.author.bot) return;
    else if (message.guild == null) {
        console.log(chalk.blue(`${chalk.white(message.author.username)} (ID: ${chalk.white(message.author.id)}) said to me: ${chalk.white(message.content)}`));
        return;
    }
    let msgcontent = message.content.toLowerCase();
    if (msgcontent.startsWith('g.save') || msgcontent.startsWith('g.bot') || msgcontent.startsWith('g.eval')) {
        if (message.author.id != nconf.get("ownerID"))
            return message.channel.send(`You do not have the perms to use dev commands **${message.author.username}**!`);
        if (msgcontent.startsWith('g.save')) {
            message.channel.send(":ok_hand: Saving " + client.user.username + "'s config...").catch(function(err) {});
            saveConfig(true);
        } else if (msgcontent.startsWith('g.eval')) {
            let silent = false;
            if (msgcontent.startsWith('g.eval silent')) silent = true;
            var code = "";
            if (silent) code = message.content.substring('g.eval silent'.length);
            else code = message.content.substring('g.eval'.length);
            try {
                let evaled = eval(code);
                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
                let embed = new Discord.RichEmbed();
                if (silent) return;
                message.delete();
                embed.setColor("DARK_NAVY");
                embed.setAuthor(message.author.username + "'s eval", message.author.avatarURL);
                if (code.length < 1000) embed.addField(":inbox_tray: Input", "```Javascript\n" + code + "\n```");
                else embed.addField(":inbox_tray: Input", "```Javascript\nToo big! " + code.length + " characters\n```");
                if (evaled.length < 1000) embed.addField(":outbox_tray: Output", "```\n" + evaled + "\n```");
                else embed.addField(":outbox_tray: Output", "```Javascript\nis to big gruffin, fix ok? " + evaled.length + " characters\n```");
                message.channel.send("", {
                    embed: embed
                }).catch(function(err) {});
            } catch (err) {
                if (silent) {
                    message.channel.send("Encountered an error while running eval during silent mode").then(function(errmsg) {
                        setTimeout(function() {
                            errmsg.delete();
                        }, 5000);
                    });
                    return;
                }
                let embed = new Discord.RichEmbed();
                embed.setColor("DARK_NAVY");
                embed.setAuthor(message.author.username + "'s eval", message.author.avatarURL);
                if (code.length < 1000) embed.addField(":inbox_tray: Input", "```Javascript\n" + code + "\n```");
                else embed.addField(":inbox_tray: Input", "```Javascript\nToo big! " + code.length + " characters\n```");
                embed.addField(":x: Error", "```\n" + err + "```\n");
                message.channel.send("", {
                    embed: embed
                }).catch(function(err) {});
            }
        }
        return;
    } else if (msgcontent.startsWith(prefix + "help")) {
        let commandString = "";
        let descString = "";
        let didOnce = false;
        let dmErr = null;
        let pushEmbed = function(finished) {
            if (!finished && commandString.length < 950 && descString.length < 950) return;
            if (commandString === "" || descString === "") return;
            // embed customisation
            let embed = new Discord.RichEmbed()
                .setColor("DARK_NAVY")
            embed.setColor("DARK_NAVY");
            if (!didOnce) embed.addField("__Command List__", "Prefix: `" + prefix + "`\n__Arguments:__\n<> - Required\n[] - Not Required", false)
            embed.addField("__Command__", commandString, true)
                .addField("__Description__", descString, true)
                .setFooter("Griffiti bot. Bot programmed by Griffin | Mostly");
            message.author.send("", {
                embed: embed
            }).catch(function(err) {
                dmErr = err;
            });
            delete embed; 
            didOnce = true;
            commandString = "";
            descString = "";
        }
        for (let i = 0; i < commandList.length; i++) {
            if (typeof commandList[i].executable !== 'function' || commandList[i].executable(message) || message.author.id == nconf.get('ownerID')) {
                let args = "";
                if (commandList[i].args != null) args = " " + commandList[i].args;
                commandString += "`" + commandList[i].name + args + "`\n";
                descString += "`" + commandList[i].shortDesc + "`\n";
                pushEmbed(false);
                delete args;
            }
        }
        if (msgcontent.substring(prefix.length + 5) == "all" && message.author.id != nconf.get('ownerID'))
            for (let i = 0; i < commandList.length; i++) {
                if (!(typeof commandList[i].executable !== 'function' || commandList[i].executable(message))) {



                    let args = "";
                    if (commandList[i].args != null) args = " " + commandList[i].args;
                    commandString += "X `" + commandList[i].name + args + "`\n";
                    descString += "`" + commandList[i].shortDesc + "`\n";
                    pushEmbed(false);
                    delete args;
                }
            }
        pushEmbed(true);
        if (dmErr) {
            message.reply("Are your DMs for this server enabled?");
        } else message.reply("A list of commands has been sent to you");
    } else if (msgcontent.startsWith(prefix)) {
        for (let i = 0; i < commandList.length; i++) {
            if (msgcontent.startsWith(prefix + commandList[i].name)) {
                if (typeof commandList[i].executable !== 'function' || commandList[i].executable(message) || message.author.id == nconf.get('ownerID')) {
                    try {
                        commandList[i].call(message, message.content.substring(prefix.length + commandList[i].name.length + 1), prefix);
                    } catch (e) {
                        message.channel.send(`An error occured while attempting to run **${commandList[i].name}**! The bot owner has been notified.`);
                        console.error(chalk.underline.red(`An error occured while attempting to run ${chalk.bold(commandList[i].name)} ` +
                            `in the server ${chalk.bold(message.guild.name)} (${chalk.bold(message.guild.id)}) in channel ${chalk.bold(message.channel.name)}. ` +
                            `Called by ${chalk.bold(message.author.username)} (${chalk.bold(message.author.id)})`));
                        console.error(e);
                    }
                } else message.reply("insufficient permissions!").catch(function(err) {});
            }
        }
    }
});

var saveTime = 0;
var saveConfig = function(devSave) {
    setTimeout(function() {
        saveTime++;
        if (devSave == false) saveConfig(false);
        if (devSave == true) saveTime = 0;
        else if (saveTime != 90 * 60) return;
        let touse = chalk.red;
        if (devSave) touse = chalk.green.underline;
        console.log("Saving config at " + chalk.yellow(new Date().toString()) + ", Saved by dev: " + touse(devSave));
        nconf.save();
        saveTime = 0;
    }, 1000);
}
saveConfig(false); 

stdin.addListener("data", function(d) { 
    let input = d.toString().trim();
    if (input.toLowerCase().startsWith("eval")) { 
        try {
            let evaled = eval(input.substring("eval".length + 1));
            if (typeof evaled !== 'string')
                require('util').inspect(evaled);
            console.log(chalk.green("Done! Output:") + "\n" + evaled);
        } catch (e) {
            console.log(chalk.red("U wot m8? It crashed!") + "\n", e);
        }
    }
});






client.login(nconf.get("bottoken"));