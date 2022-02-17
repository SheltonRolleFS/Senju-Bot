require("dotenv").config();
const { Client, Intents } = require("discord.js");
const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});
const welcome = require("./welcome");
const roleClaim = require("./role-claim");

bot.once("ready", () => {
  console.log("Senju clan online.");
  welcome(bot);
  roleClaim(bot);
});

bot.login(process.env.BOT_TOKEN);
