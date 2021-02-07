const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")
const fs = require("fs")

const firebase = require("firebase")


var firebaseConfig = {
  apiKey: "AIzaSyC1TD8Aso-DuvX2IJZCJZNAGCMYWy4jmfE",
  authDomain: "tutorialyt-667c3.firebaseapp.com",
  projectId: "tutorialyt-667c3",
  storageBucket: "tutorialyt-667c3.appspot.com",
  messagingSenderId: "170275184050",
  appId: "1:170275184050:web:2ae95a28c779eb6a2898ab",
  measurementId: "G-DWRQ37J22X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database()

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

let defaultprefix = "."

client.on("message", async(message) => {
  let author = message.author;
  let guild = message.guild;
  let channel = message.channel;

  if(author.bot)return;
  if(channel.type == "dm") return;

  let prefix = "";

  let local = db.ref(`Guilds/${message.guild.id}`)

  local.once("value").then(async function(data){
    if(!data.val()){
      local.set({
        prefix: defaultprefix
      })
    }

    prefix = data.val() ? data.val().prefix : defaultprefix
  })

  if(!prefix) prefix = defaultprefix

  let messageArray = message.content.split(" ")  //.help ajuda
  let cmdName = messageArray[0]
  let args = messageArray.slice(1)
  
  let cmd = client.commands.get(cmdName.slice(prefix.length).toLowerCase()) || client.commands.get(client.aliases.get(cmdName.slice(prefix.length)))

  if(!cmd) return message.channel.send(`Comando não encontrado`)

  cmd.execute(client, message, args, db)
 
})