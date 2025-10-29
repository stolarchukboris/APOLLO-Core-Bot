import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('a_profile')
    .setDescription('Display your Discord profile.');

export async function execute(interaction) {
    await interaction.deferReply();
    
    await interaction.editReply({
        flags: 'Ephemeral',
        embeds: [
            new EmbedBuilder()
                .setColor("Random")
                .setTitle(interaction.user.username)
                .setThumbnail(interaction.user.avatarURL())
                .addFields(
                    { name: "Discord ID", value: interaction.user.id },
                    { name: "Account creation date", value: interaction.user.createdAt.toLocaleDateString(), inline: true },
                    { name: "Server login date", value: interaction.member.joinedAt.toLocaleDateString(), inline: true }
                )
        ]
    });
}
