import { Events, Interaction, MessageFlags } from 'discord.js';
import bot from '../index.js';

export const name = Events.InteractionCreate;

export async function execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) return console.log(`No command matching ${interaction.commandName} was found.`);

    try {
        const subcommandOption = interaction.options.getSubcommand();

        if (subcommandOption) {
            const subcommand = bot.subcommands.get(subcommandOption);

            if (!subcommand) return console.log(`No subcommand matching ${interaction.commandName} was found.`);

            await subcommand.execute(interaction);
        } else await command.execute(interaction);
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
