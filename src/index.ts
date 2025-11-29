import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, GatewayIntentBits, REST, SlashCommandBuilder, Routes, RESTPutAPIApplicationCommandsResult, ChatInputCommandInteraction } from 'discord.js';
import { config } from 'dotenv';
const __dirname = import.meta.dirname;

class Bot extends Client {
    commands: Collection<string, { data: SlashCommandBuilder, execute(interaction: ChatInputCommandInteraction): Promise<void> }> = new Collection();
    apiCommands: SlashCommandBuilder[] = [];
    env = config({ quiet: true }).parsed || {};

    async initCommands() {
        const foldersPath = join(__dirname, 'commands');
        const commandFolders = readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = join(foldersPath, folder);
            const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = join(commandsPath, file);
                const command = (await import(`file://${filePath}`));

                if ('data' in command && 'execute' in command) {
                    this.commands.set(command.data.name, command);

                    if (!process.argv.includes('--deploy')) continue;

                    this.apiCommands.push(command.data.toJSON());
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
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

        this.login(this.env.TOKEN);
    }
}

export default new Bot();
