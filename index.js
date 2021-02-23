const Discord = require('discord.js') 
const bot = new Discord.Client();
const fs = require("fs")
var rpc = require("discord-rpc")
const client2 = new rpc.Client({ transport: 'ipc' })
bot.commands = new Discord.Collection();

bot.on('ready', () => {
    console.log('Bot is now online')

    bot.user.setPresence({
        status: 'online',
        activity: {
            name: '?help',
            type: 'WATCHING',
        }
    })

    client2.on('ready', () => {
    client2.request('SET_ACTIVITY', {
    pid: process.pid,
    activity : {
    details : "The Cozy Campfire",
    assets : {
    large_image : "idk",
    large_text : "A COOL SERVER" // THIS WILL SHOW AS "Playing <Status>" from the outisde
    },
    buttons : [{label : "Corion" , url : "https://discord.com/api/oauth2/authorize?client_id=811263133121380402&permissions=8&scope=bot"},{label : "The Cozy Campfire",url : "https://discord.gg/R3RvyYM9sx"}]
    }
    })
    })
    client2.login({ clientId : "813448521457729536" }).catch(console.error);


    fs.readdir('./moderation', (err, files) => {
        if(err) return console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() == 'js');


        if (jsfile.length <= 0) return console.log("Could not find commands!")

        jsfile.forEach(f => {
            let props = require(`./moderation/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })

    fs.readdir('./fun', (err, files) => {
        if(err) return console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() == 'js');


        if (jsfile.length <= 0) return console.log("Could not find commands!")

        jsfile.forEach(f => {
            let props = require(`./fun/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })

    fs.readdir('./Utility', (err, files) => {
        if(err) return console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() == 'js');


        if (jsfile.length <= 0) return console.log("Could not find commands!")

        jsfile.forEach(f => {
            let props = require(`./Utility/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })
})

bot.on('message', (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
    let prefix = '?';
    // hello there ['hello', 'there']
    // !ban user reason ['user', 'reason']
    // Breaking Rules ['breaking', 'rules'] breaking rules
    // hello
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length)
    let args = MessageArray.slice(1)

    if(!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd);
    if(commandfile) {commandfile.run(bot,message,args)}


})
const discord = require('discord.js')
const client = new discord.Client();
client.on("message" , message => {
if(message.mentions.has("811263133121380402"))
  return  message.channel.send("eee")

})

//if(message.author.bot) return false;
//if(message.content.includes("@here") || message.content.includes("@everyone")) return false;

//if(message.mentions.has(client.user.id)) {
  //  message.channel.send("hi");


bot.login(process.env.token);