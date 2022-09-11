const Discord = require('discord.js');
const client = new Discord.Client({
  bot: false,
  autoReconnect: true
});
const colors = require('colors');

client.on('ready', () => {
  client.user.setGame('Sup');
  console.log(`I am online and ready in ${client.guilds.size} guilds and ${client.channels.size} channels with ${client.users.size} users.`.green);
});

client.on('debug', debug => console.log(debug.grey));

client.on('message', message => {
  if(message.mentions.users.size !== 0 && message.mentions.users.first().id === client.user.id) console.log(message.author.username, 'mentioned you in', message.guild.name);
  if(message.author.id !== client.user.id) return;
  if(!message.content.startsWith('gg')) return;
  let args = message.content.split(" ").slice(1);

  switch(message.content.split(" ")[0].toLowerCase().slice(2)) {
    case 'embed':
      message.edit('', {embed: new Discord.RichEmbed()
      .setColor('#' + Math.round(Math.random() * 16777215).toString(16))
      .setDescription(args.join(' '))
      });
      break;
    case 'eval':
      try {
        let evaled = eval(args.join(" "));
        if(typeof(evaled) !== "string") evaled = require("util").inspect(evaled);
        message.edit(`\`\`\`js\n${args.join(' ')}\`\`\`\`\`\`x1\n${clean(evaled)}\`\`\``);
      } catch(err) {
        message.edit(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
      break;
  }

  function clean(text) {
    if(typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
});

client.login(nicetry);
