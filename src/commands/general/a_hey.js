import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('a_hey')
    .setDescription('Make the bot say "Hey!"');

export async function execute(interaction) {
    await interaction.deferReply();
    
    await interaction.editReply({ content: 'Hey!', flags: 'Ephemeral' });
}
