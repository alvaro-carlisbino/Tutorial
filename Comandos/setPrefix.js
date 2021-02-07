module.exports = {
    name: "setprefix",
    aliases: ["newprefix"],
    async execute(client, message, args = [""], db){
        let author = message.member;

        if(!author.hasPermission("ADMINISTRATOR")) return message.channel.send(`❌ Você não tem permissão para executar esse comando :(`)

        let prefix = args[0]

        if(!prefix) return message.channel.send(`❌ Você se esqueceu de especificar o prefix`)

        db.ref(`Guilds/${message.guild.id}`).update({
           prefix: prefix
        })

        return message.channel.send(`✅ Prefix alterado para *${prefix}*`)
    }
}