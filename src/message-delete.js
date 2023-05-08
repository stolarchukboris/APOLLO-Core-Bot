require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

function onMessageDelete(message, client) {
    const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("A message was deleted!")
        .addFields(
            { name: "Author", value: `${message.author.tag} (${message.author})`, inline: true },
            { name: "Channel", value: `${message.channel}`, inline: true },
            { name: "Message Content", value: message.content || "No text content", inline: false },
        )
        .setTimestamp()
        .setFooter({ text: " - ", iconURL: message.author.avatarURL() });

    if (message.attachments.size > 0) {
        const attachments = message.attachments.map(a => a.url).join("\n");
        embed.addFields(
            { name: "Attachments", value: attachments, inline: false }
        );
    }

    client.channels.cache.get(process.env.APOLLO_OUTPUT_CHANNEL_ID).send({ embeds: [embed] });
}

module.exports = onMessageDelete;