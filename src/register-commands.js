require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        name: "a_hey",
        description: "Replies with hey!",
    },
    {
        name: "a_ping",
        description: "Replies with pong!",
    },
    {
        name: "a_profile",
        description: "Shows your profile info to everyone.",
    },
    {
        name: "a_monthly_report",
        description: "If you are the owner of the server, you can publish monthly statistics of the project.",
    },
    {
        name: "a_calc",
        description: "Executes mathematical operations.",
        options: [
            {
                name: "first-number",
                description: "The first number.",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "sign",
                description: "The math operation.",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "+",
                        value: "+",
                    },
                    {
                        name: "-",
                        value: "-",
                    },
                    {
                        name: "*",
                        value: "*",
                    },
                    {
                        name: "/",
                        value: "/",
                    },
                ],
                required: true,
            },
            {
                name: "second-number",
                description: "The second number.",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ]
    },
    {
        name: "a_consultation",
        description: "You can talk to «APOLLO».",
        options: [
            {
                name: "question",
                description: "The question to «APOLLO».",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "What are you?",
                        value: "What are you?",
                    },
                    {
                        name: "What is the [APOLLO Corporation]?",
                        value: "What is the [APOLLO Corporation]?",
                    },
                    {
                        name: "What time is it now?",
                        value: "What time is it now?",
                    },
                    {
                        name: "What is the Central Reactor Core?",
                        value: "What is the Central Reactor Core?",
                    },
                    {
                        name: "Why is it raining in the CRC chamber?",
                        value: "Why is it raining in the CRC chamber?",
                    },
                    {
                        name: "What is T.N.E.R.?",
                        value: "What is T.N.E.R.?",
                    },
                    {
                        name: "How many CCARF sectors?",
                        value: "How many CCARF sectors?",
                    },
                    {
                        name: "Sector A?",
                        value: "Sector A?",
                    },
                    {
                        name: "Sector B?",
                        value: "Sector B?",
                    },
                    {
                        name: "Sector D?",
                        value: "Sector D?",
                    },
                    {
                        name: "Sector C?",
                        value: "Sector C?",
                    },
                    {
                        name: "Laboratory A Category?",
                        value: "Laboratory A Category?",
                    },
                    {
                        name: "Laboratory B Category?",
                        value: "Laboratory B Category?",
                    },
                    {
                        name: "Laboratory C Category?",
                        value: "Laboratory C Category?",
                    },
                    {
                        name: "Laboratory D Category?",
                        value: "Laboratory D Category?",
                    },
                ],
                required: true,
            },
        ]
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("Slash commands were registered successfully!");
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();