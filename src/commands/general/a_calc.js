import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('a_calc')
    .setDescription('Execute math operations.')
    .addNumberOption(option => option
        .setName('first_number')
        .setDescription('The first number.')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('operator')
        .setDescription('Select an operator.')
        .setChoices(
            { name: '+', value: '+' },
            { name: '-', value: '-' },
            { name: '*', value: '*' },
            { name: '/', value: '/' }
        )
        .setRequired(true)
    )
    .addNumberOption(option => option
        .setName('second_number')
        .setDescription('The second number.')
        .setRequired(true)
    );

export async function execute(interaction) {
    await interaction.deferReply();
    
    const num1 = interaction.options.getNumber("first_number", true);
    const op = interaction.options.getString("operator", true);
    const num2 = interaction.options.get("second_number", true);

    await interaction.editReply({ message: `Result: ${eval(num1 + op + num2)}`, flags: 'Ephemeral' });
}
