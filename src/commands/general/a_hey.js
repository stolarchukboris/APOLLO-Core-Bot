import { SlashCommandBuilder } from 'discord.js';
throw new Error();
export const data = new SlashCommandBuilder()
    .setName('a_hey')
    .setDescription('Make the bot say "Hey!"');

export async function execute(interaction) {
    await interaction.deferReply();
    
    await interaction.editReply({ content: 'Heyy!' });
}
