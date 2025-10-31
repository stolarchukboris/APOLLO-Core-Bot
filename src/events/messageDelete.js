import { Events, EmbedBuilder } from 'discord.js';

export const name = Events.MessageDelete;

export async function execute(message) {
    const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("A message has been deleted!")
        .addFields(
            { name: "Author", value: `${message.author.tag} (${message.author})`, inline: true },
            { name: "Channel", value: `${message.channel}`, inline: true },
            { name: "Message Content", value: message.content || "No text content" }
        )
        .setTimestamp()
        .setFooter({ text: " - ", iconURL: message.author.avatarURL() });

    if (message.attachments.size > 0) {
        const attachments = message.attachments.map(a => a.url).join("\n");

        embed.addFields({ name: "Attachments", value: attachments });
    }

    await message.client.channels.cache.get(process.env.APOLLO_OUTPUT_CHANNEL_ID).send({ embeds: [embed] });
}
