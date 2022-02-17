const firstMessage = require("./first-message");

module.exports = (client) => {
  const channel = "942747663806373898";

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => {
      if (emoji.name === emojiName) return emoji;
    });

  const emojis = {
    warrior: "Warrior",
    martial_artist: "Martial Artist",
    gunner: "Gunner",
    mage: "Mage",
    assassin: "Assassin",
  };

  const reactions = [];
  let emojiText = "React to this message to claim your class role!\n\n";

  for (const key in emojis) {
    const emoji = getEmoji(key);
    reactions.push(emoji);

    const role = emojis[key];
    emojiText += `${emoji} = ${role}\n`;
  }

  firstMessage(client, channel, emojiText, reactions);

  const handleReaction = (reaction, user, add) => {
    if (user.id === "942739987860975636") return;

    const emoji = reaction._emoji.name;
    const { guild } = reaction.message;
    const roleName = emojis[emoji];

    if (!roleName) return;

    const role = guild.roles.cache.find((role) => {
      if (role.name === roleName) {
        return role;
      }
    });

    const member = guild.members.cache.find((member) => {
      if (member.id === user.id) {
        return member;
      }
    });

    if (add) {
      member.roles.add(role);
    } else {
      member.roles.remove(role);
    }
  };

  client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.channel.id === channel) {
      handleReaction(reaction, user, true);
    }
  });

  client.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.channel.id === channel) {
      handleReaction(reaction, user, false);
    }
  });
};
