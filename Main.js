const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")

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

  if(message.content.startsWith(prefix+"ping")){
    channel.send(`${Math.floor(client.ws.ping)}ms`)
  }
})