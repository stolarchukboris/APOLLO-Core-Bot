import { execSync } from 'child_process';
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ms from 'ms';
import bot from '../../index.js';

export const data = new SlashCommandBuilder()
    .setName('a_info')
    .setDescription('Know more about the bot.');

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor('Blurple')
                .setTitle('"APOLLO" Core Bot information.')
                .setDescription(`Below is plenty of miscellaneous information about this bot instance.
Credit for the original bot idea goes to [THEBESTol0ch](https://github.com/THEBESTol0ch).\n
\`\`\`ini
[
    Instance username: ${interaction.client.user.username}#${interaction.client.user.discriminator}
    Instance ID: ${interaction.client.user.id}
    Instance uptime: ${ms(interaction.client.uptime, { long: true })}
    Instance RAM usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Megabytes
]\`\`\`
\`\`\`yml
Git commit: ${bot.commit ?? '-'}
\`\`\``)
                .setTimestamp()
                .setFooter({ text: '"APOLLO" Core Bot' })
        ]
    });
}
