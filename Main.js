const discord = require("discord.js")
const client = new discord.Client({ws: {intents: ["GUILDS", "GUILD_MEMBERS"]}})
const config = require("./config.json")

client.login(config.token)

client.on("ready", () => {
  console.log(`${client.user.username} LOGADO COM SUCESSO`)
})