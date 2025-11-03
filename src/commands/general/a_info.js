import { execSync } from 'child_process';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('a_info')
    .setDescription('Know more about the bot.');

export async function execute(interaction) {
    await interaction.deferReply();

    function checkCommit() {
        try {
            return execSync('git rev-parse HEAD', { windowsHide: true }).toString().trim();
        } catch (_) {
            return '-';
        }
    }

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
    Instance uptime: ${Math.floor(interaction.client.uptime / 1000)} seconds
    Instance RAM usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Megabytes
]\`\`\`
\`\`\`yml
Git commit: ${checkCommit()}
\`\`\``)
                .setTimestamp()
                .setFooter({ text: '"APOLLO" Core Bot' })
        ]
    });
}
