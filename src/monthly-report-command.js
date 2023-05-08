require("dotenv").config();
const sendEmbedAnswer = require("./operation-answer.js");
const { EmbedBuilder } = require("discord.js");

function onMonthlyReport(interaction, client) {
    if (interaction.user.id == process.env.OWNER_ID) {
        const embed = new EmbedBuilder()
            .setTitle("Monthly Report")
            .setColor("White")
            .setImage(process.env.MONTHLY_REPORT_IMAGE_LINK)
            .setTimestamp()

        client.channels.cache.get(process.env.ANNOUNCEMENTS_CHANNEL_ID).send({ embeds: [embed] });
        interaction.reply(sendEmbedAnswer("Green", "__*AFFIRMATIVE*__", "THE OPERATION WAS COMPLETED SUCCESSFULLY."));
    } else {
        interaction.reply(sendEmbedAnswer("Red", "__*NEGATIVE*__", "YOUR ACCESS LEVEL DOES NOT ALLOW YOU TO PERFORM THIS OPERATION."));
    }
}

module.exports = onMonthlyReport;