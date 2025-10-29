const { EmbedBuilder } = require("discord.js");

function sendEmbedAnswer(color, title, description) {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)

    return { embeds: [embed] }
}

module.exports = sendEmbedAnswer;
