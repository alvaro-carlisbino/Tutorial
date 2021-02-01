module.exports = {
    name: "ping",
    aliases: ["pong"],
    async execute(client, message, args){
        return message.channel.send(`${Math.floor(client.ws.ping)}ms`)
    }
}