require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

function onServerInfo(interaction) {
    const guild = interaction.guild

    let baseVerification = guild.verificationLevel;
    if (baseVerification == 0) baseVerification = "None";
    if (baseVerification == 1) baseVerification = "Low";
    if (baseVerification == 2) baseVerification = "Medium";
    if (baseVerification == 3) baseVerification = "High";
    if (baseVerification == 4) baseVerification = "Very High";

    const embed = new EmbedBuilder()
        .setColor("White")
        .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
        .setThumbnail(process.env.APOLLO_CORP_IMAGE_LINK)
        .addFields(
            { name: "Server Owner", value: `<@${guild.ownerId}>`, inline: true },
            { name: "Date Created", value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R> (hover for complete date)`, inline: true },
            { name: "Server Members", value: `${guild.memberCount}`, inline: true },
            { name: "Role Number", value: `${guild.roles.cache.size}`, inline: true },
            { name: "Emoji Number", value: `${guild.emojis.cache.size}`, inline: true },
            { name: "Verification Level", value: `${baseVerification}`, inline: true },
            { name: "Server Boosts", value: `${guild.premiumSubscriptionCount}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: `ServerID: ${guild.id}` });

    interaction.reply({ embeds: [embed] });
}

module.exports = onServerInfo;