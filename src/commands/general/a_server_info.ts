import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, Guild } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('a_server_info')
    .setDescription('View information about this server.');

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    
    const guild = interaction.guild as Guild;
    const verificationLevels = {
        0: 'None',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Very high'
    };

    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor("White")
                .setAuthor({ name: guild.name, iconURL: guild.iconURL() || undefined })
                .setThumbnail(process.env.APOLLO_CORP_IMAGE_LINK || null)
                .addFields(
                    { name: "Server Owner", value: `<@${guild.ownerId}>`, inline: true },
                    { name: "Date Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R> (hover for full date)`, inline: true },
                    { name: "Server Members", value: `${guild.memberCount}`, inline: true },
                    { name: "Role Number", value: `${guild.roles.cache.size}`, inline: true },
                    { name: "Emoji Number", value: `${guild.emojis.cache.size}`, inline: true },
                    { name: "Verification Level", value: verificationLevels[guild.verificationLevel], inline: true },
                    { name: "Server Boosts", value: `${guild.premiumSubscriptionCount}`, inline: true },
                )
                .setTimestamp()
                .setFooter({ text: `Server ID: ${guild.id}` })
        ]
    });
}
