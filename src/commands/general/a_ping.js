import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('a_ping')
    .setDescription('Check the websocket heartbeat.');

export async function execute(interaction) {
    const embed = new EmbedBuilder().setDescription("Pinging...").setColor('Yellow');
    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    const timestamp = interaction.createdTimestamp;

    embed.setTitle(`Pong!`)
        .addFields(
            { name: "Latency", value: `${Math.floor(msg.createdTimestamp - timestamp)} ms`, inline: true },
            { name: "API latency", value: `${Math.round(interaction.client.ws.ping)} ms`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: "APOLLO Core Bot" });

    await msg.edit({ embeds: [embed] });
}
