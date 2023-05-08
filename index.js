require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const changePresence = require("./src/presence.js")
const onProfile = require("./src/profile-command.js")
const onMonthlyReport = require("./src/monthly-report-command.js")
const onMessageDelete = require("./src/message-delete.js");
const getRandomInt = require("./src/random-integer.js");

function changePresenceLoop() {
    changePresence(client);
    let randomDelay = getRandomInt(1, 5) * 60 * 1000;
    setTimeout(changePresenceLoop, randomDelay);
}

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

console.log("POWERING ON");
client.login(process.env.TOKEN);
client.on("ready", (c) => {
    console.log("ONLINE");
    changePresenceLoop();  
})

client.on("messageCreate", (message) => {
    if (message.author.bot) {
        return;
    }

    //message.reply(message.content);
});

client.on("messageDelete", message => {
    onMessageDelete(message,  client);
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName == "a_hey") {
        interaction.reply("hey!");
    }
    if (interaction.commandName == "a_ping") {
        interaction.reply("pong!");
    }
    if (interaction.commandName == "a_profile") {
        onProfile(interaction);
    }
    if (interaction.commandName == "a_monthly_report") {
        onMonthlyReport(interaction, client);
    }
    if (interaction.commandName == "a_calc") {
        const num1 = interaction.options.get("first-number").value;
        const sign = interaction.options.get("sign").value;
        const num2 = interaction.options.get("second-number").value;

        let result = eval(num1 + sign + num2);
        interaction.reply(`Result: ${result}`);
    }
    if (interaction.commandName == "a_consultation") {
        const question = interaction.options.get("question").value;

        if (question == "What are you?") {
            interaction.reply("Computer Core «APOLLO» - Supercomputer that manages all the systems of this and other «APOLLO» corporation facilities.");
        }
        if (question == "What is the [APOLLO Corporation]?") {
            interaction.reply("«APOLLO» Corporation - is a large corporation that conducts research in the field of innovations of various kinds. You can witness amazing developments and maybe something else... [Computer Core «APOLLO» - Research Facility] - is the largest research facility of the «APOLLO» corporation.");
        }
        if (question == "What time is it now?") {
            const now = new Date();
            interaction.reply(`Today is: ${now.toUTCString()}`);
        }
        if (question == "What is the Central Reactor Core?") {
            interaction.reply("This reactor feeds «APOLLO» Corp. facilities. Main feature - correct energy distribution. Reactor based on the principle of a Zero Point Energy Field. The rest data is classified.");
        }
        if (question == "Why is it raining in the CRC chamber?") {
            interaction.reply("It's not rain, in simple words, it's condensation that falls from the ceiling.");
        }
        if (question == "What is T.N.E.R.?") {
            interaction.reply("Thermo Nuclear Experimental Reactor - it uses tritium-based fuel for work, when the reactor is overloaded, a huge amount of energy is generated. Note, as a consequence of overload is the production of dark matter. The rest data is classified.");
        }
        if (question == "How many CCARF sectors?") {
            interaction.reply("4 - A, B, C, D.");
        }
        if (question == "Sector A?") {
            interaction.reply("Sector A - office complex, entrance zone. A free zone for visiting, calculations, orders, communications.");
        }
        if (question == "Sector B?") {
            interaction.reply("Sector B - maintenance sector, engineering decks, the rest data is classified.");
        }
        if (question == "Sector D?") {
            interaction.reply("Sector D - adminstation complex, management.");
        }
        if (question == "Sector C?") {
            interaction.reply("Sector C - Research & Development. Contains: Laboratory A Category, Laboratory B Category, Laboratory C Category, Laboratory D Category.");
        }
        if (question == "Laboratory A Category?") {
            interaction.reply("Laboratory A Category - new technologies development.");
        }
        if (question == "Laboratory B Category?") {
            interaction.reply("Laboratory B Category - weapons developments.");
        }
        if (question == "Laboratory C Category?") {
            interaction.reply("Laboratory C Category - research anomalies nature.");
        }
        if (question == "Laboratory D Category?") {
            interaction.reply("Laboratory D Category - useless developments, for example - washing machine 2.0.");
        }
    }
});