import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('a_ping')
    .setDescription('Check the websocket heartbeat.');

export async function execute(interaction) {
    const embed = new EmbedBuilder().setDescription("Pinging...").setColor('Yellow');
    const response = await interaction.reply({ embeds: [embed], withResponse: true });
    const timestamp = interaction.createdTimestamp;
    const msg = response.resource.message;

    embed.setColor('Green')
        .setTitle(`Pong!`)
        .setDescription(null)
        .addFields(
            { name: "Latency", value: `${Math.floor(msg.createdTimestamp - timestamp)} ms`, inline: true },
            { name: "API latency", value: `${Math.round(interaction.client.ws.ping)} ms`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: "APOLLO Core Bot" });

    await msg.edit({ embeds: [embed] });
}
