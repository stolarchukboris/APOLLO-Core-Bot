import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const qna = {
    "What are you?": "Computer Core «APOLLO» - Supercomputer that manages all the systems of this and other «APOLLO» corporation facilities.",
    "What is the [APOLLO Corporation]?": "«APOLLO» Corporation - is a large corporation that conducts research in the field of innovations of various kinds. You can witness amazing developments and maybe something else... [Computer Core «APOLLO» - Research Facility] - is the largest research facility of the «APOLLO» corporation.",
    "What time is it now?": `Today is: ${new Date().toUTCString()}`,
    "What is the Central Reactor Core?": "This reactor feeds «APOLLO» Corp. facilities. Main feature - correct energy distribution. Reactor based on the principle of a Zero Point Energy Field. The rest data is classified.",
    "Why is it raining in the CRC chamber?": "It's not rain, in simple words, it's condensation that falls from the ceiling.",
    "What is T.N.E.R.?": "Thermo Nuclear Experimental Reactor - it uses tritium-based fuel for work, when the reactor is overloaded, a huge amount of energy is generated. Note, as a consequence of overload is the production of dark matter. The rest data is classified.",
    "How many CCARF sectors?": "4 - A, B, C, D.",
    "Sector A?": "Sector A - office complex, entrance zone. A free zone for visiting, calculations, orders, communications.",
    "Sector B?": "Sector B - maintenance sector, engineering decks, the rest data is classified.",
    "Sector D?": "Sector D - adminstation complex, management.",
    "Sector C?": "Sector C - Research & Development. Contains: Laboratory A Category, Laboratory B Category, Laboratory C Category, Laboratory D Category.",
    "Laboratory A Category?": "Laboratory A Category - new technologies development.",
    "Laboratory B Category?": "Laboratory B Category - weapons developments.",
    "Laboratory C Category?": "Laboratory C Category - research anomalies nature.",
    "Laboratory D Category?": "Laboratory D Category - useless developments, for example - washing machine 2.0."
} as const;

const choices: { name: string, value: string }[] = [];

for (const question of Object.keys(qna)) choices.push({ name: question, value: question });

export const data = new SlashCommandBuilder()
    .setName('a_consultation')
    .setDescription('Talk to "APOLLO".')
    .addStringOption(option => option
        .setName('question')
        .setDescription('The question to "APOLLO".')
        .setChoices(choices)
        .setRequired(true)
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    
    const question = interaction.options.getString('question', true) as keyof typeof qna;
    
    await interaction.editReply({ content: qna[question] });
}
