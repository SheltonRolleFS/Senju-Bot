module.exports = (client) => {
  const channelId = "943816465059045376"; // welcome channel ID

  client.on("guildMemberAdd", (member) => {
    console.log(member.guild.members);
    const message = `Welcome <@${member.id}> to House Senju!`;
    const channel = member.guild.channels.cache.get(channelId);
    channel.send(message);
  });
};
