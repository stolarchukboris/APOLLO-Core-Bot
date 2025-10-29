const { EmbedBuilder } = require("discord.js");

function onProfile(interaction) {
    const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(interaction.user.username)
        .setThumbnail(interaction.user.avatarURL())
        .addFields(
            { name: "Your discord id", value: interaction.user.id, inline: false },
            { name: "Account creation date", value: interaction.user.createdAt.toLocaleDateString(), inline: true },
            { name: "Server login date", value: interaction.member.joinedAt.toLocaleDateString(), inline: true }
        )

    interaction.reply({ embeds: [embed] });
}

module.exports = onProfile;
