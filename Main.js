const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")
const fs = require("fs")

client.commands = new discord.Collection()
client.aliases = new discord.Collection

fs.readdir("./Comandos", (err, files) => {
   let jsfile = files.filter(f => f.endsWith(".js"))

   if(jsfile.length <= 0) return console.log(`Nenhum comando encontrado`)

   jsfile.forEach(f => {
     let pull = require(`./Comandos/${f}`)
     console.log(`${f} carregado!`)
     client.commands.set(pull.name, pull)
     pull.aliases.forEach(alias => {
       client.aliases.set(alias, pull.name)
     })
   })
})

client.login(config.token)

client.on("ready", () => {
  console.log(`${client.user.username} LOGADO COM SUCESSO`)
})

let prefix = "."

client.on("message", async(message) => {
  let author = message.author;
  let guild = message.guild;
  let channel = message.channel;

  if(author.bot)return;
  if(channel.type == "dm") return;

  let messageArray = message.content.split(" ")  //.help ajuda
  let cmdName = messageArray[0]
  let args = messageArray.slice(1)
  
  let cmd = client.commands.get(cmdName.slice(prefix.length).toLowerCase()) || client.commands.get(client.aliases.get(cmdName.slice(prefix.length)))

  if(!cmd) return message.channel.send(`Comando não encontrado`)

  cmd.execute(client, message, args)
 
})