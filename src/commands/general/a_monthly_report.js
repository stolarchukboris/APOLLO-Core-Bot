import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('a_monthly_report')
    .setDescription('[OWNER] Publish monthly project statistics.');

export async function execute(interaction) {
    await interaction.deferReply();
    
    if (interaction.user.id !== process.env.OWNER_ID) return await interaction.editReply({
        flags: 'Ephemeral',
        embeds: [
            new EmbedBuilder()
                .setColor('Red')
                .setTitle('__*NEGATIVE*__')
                .setDescription('YOUR ACCESS LEVEL DOES NOT ALLOW YOU TO PERFORM THIS OPERATION.')
        ]
    });

    await interaction.client.channels.cache.get(process.env.ANNOUNCEMENTS_CHANNEL_ID).send({
        embeds: [
            new EmbedBuilder()
                .setTitle("Monthly Report")
                .setColor("White")
                .setImage(process.env.MONTHLY_REPORT_IMAGE_LINK)
                .setTimestamp()
        ]
    });

    await interaction.editReply({
        flags: 'Ephemeral',
        embeds: [
            new EmbedBuilder()
                .setColor('Green')
                .setTitle('__*AFFIRMATIVE*__')
                .setDescription('THE OPERATION HAS BEEN COMPLETED SUCCESSFULLY.')
        ]
    });
}
