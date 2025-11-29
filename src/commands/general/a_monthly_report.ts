import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('a_monthly_report')
    .setDescription('[OWNER] Publish monthly project statistics.');

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    
    if (interaction.user.id !== process.env.OWNER_ID) return await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor('Red')
                .setTitle('__*NEGATIVE*__')
                .setDescription('YOUR ACCESS LEVEL DOES NOT ALLOW YOU TO PERFORM THIS OPERATION.')
        ]
    });

    if (!process.env.ANNOUNCEMENTS_CHANNEL_ID) return await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor('Red')
                .setTitle('__*NEGATIVE*__')
                .setDescription('ANNOUNCEMENTS CHANNEL HAS NOT BEEN CONFIGURED IN THE BOT\'S ENVIRONMENT.')
        ]
    });

    await (interaction.client.channels.cache.get(process.env.ANNOUNCEMENTS_CHANNEL_ID) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setTitle("Monthly Report")
                .setColor("White")
                .setImage(process.env.MONTHLY_REPORT_IMAGE_LINK || null)
                .setTimestamp()
        ]
    });

    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor('Green')
                .setTitle('__*AFFIRMATIVE*__')
                .setDescription('THE OPERATION HAS BEEN COMPLETED SUCCESSFULLY.')
        ]
    });
}
