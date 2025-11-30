import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, GatewayIntentBits, REST, SlashCommandBuilder, SlashCommandSubcommandBuilder, Routes, RESTPutAPIApplicationCommandsResult, ChatInputCommandInteraction } from 'discord.js';
import { config } from 'dotenv';
import { execSync } from 'node:child_process';
const __dirname = import.meta.dirname;

class Bot extends Client {
    commands: Collection<string, { data: SlashCommandBuilder, execute(interaction: ChatInputCommandInteraction): Promise<void> }> = new Collection();
    subcommands: Collection<string, { data: SlashCommandSubcommandBuilder, execute(interaction: ChatInputCommandInteraction): Promise<void> }> = new Collection();
    apiCommands: SlashCommandBuilder[] = [];
    env = config({ quiet: true }).parsed || {};
    commit: string | null;

    async initCommands() {
        const foldersPath = join(__dirname, 'commands');
        const items = readdirSync(foldersPath);

        for (const item of items) { // for each item in commands folder
            if (item.endsWith('.js')) { // if a child is a js file
                const filePath = join(foldersPath, item);
                const command = (await import(`file://${filePath}`));

                if ('data' in command && 'execute' in command) {
                    this.commands.set(command.data.name, command);

                    if (!process.argv.includes('--deploy')) continue;

                    this.apiCommands.push(command.data.toJSON());
                } else console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            } else { // otherwise, if it's a folder
                const command = new SlashCommandBuilder().setName(item).setDescription(item); // make a command with folder name
                const path = join(foldersPath, item);
                const files = readdirSync(path); // grab all subcommands from that folder

                for (const file of files) { // for each subcommand file
                    const subcommand = (await import(`file://${join(path, file)}`));

                    if ('data' in subcommand && 'execute' in subcommand) {
                        command.addSubcommand(subcommand.data);

                        this.subcommands.set(subcommand.data.name, subcommand);
                    } else console.warn(`[WARNING] The subcommand at ${path} is missing a required "data" or "execute" property.`);
                }

                this.commands.set(command.name, { data: command, execute: () => Promise.resolve(undefined) });

                if (!process.argv.includes('--deploy')) continue;

                this.apiCommands.push(command);
            }
        }

        if (process.argv.includes('--deploy')) {
            const rest = new REST().setToken(this.env.TOKEN);

            try {
                console.log(`Started refreshing ${this.apiCommands.length} application (/) commands.`);

                const data = await rest.put(
                    Routes.applicationCommands(this.env.CLIENT_ID),
                    { body: this.apiCommands }
                ) as RESTPutAPIApplicationCommandsResult;

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                console.error(error);

                process.exit(1);
            }
        }

        console.log('Commands initialized successfully.');
    }

    async loadEvents() {
        const eventsPath = join(__dirname, 'events');
        const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = join(eventsPath, file);
            const event = (await import(`file://${filePath}`));

            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args));
            } else {
                this.on(event.name, (...args) => event.execute(...args));
            }
        }

        console.log('Events loaded successfully.');

        if (process.argv.includes('--nologin')) {
            console.log('[CI] Workflow test passed. Shutting down.');
            process.exit(0);
        }
    }

    constructor() {
        super({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

        this.initCommands().then(_ => this.loadEvents());

        try {
            this.commit = execSync('git rev-parse HEAD', { windowsHide: true })
                .toString()
                .trim();
        } catch (_) {
            this.commit = null;
        }

        this.login(this.env.TOKEN);
    }
}

export default new Bot();
