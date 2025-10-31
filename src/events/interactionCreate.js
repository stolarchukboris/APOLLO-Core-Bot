import { Events, MessageFlags } from 'discord.js';

export const name = Events.InteractionCreate;

export async function execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return console.log(`No command matching ${interaction.commandName} was found.`);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.log(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        }
    }
}
