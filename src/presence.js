const { ActivityType } = require("discord.js");
const competingArray = [{ name: "with RTX 4090" }, { name: "with raiders" }, { name: "with best core games" }, { name: "with Black Mesa" }, { name: "with Aperture Science" }];
const listeningArray = [{ name: "Facility Intercom" }, { name: "Surface" }, { name: "Facility Alarms" }, { name: "employee complaints" }];
const playingArray = [{ name: "«CCARF»" }, { name: "«CCARF» - Test Server" }, { name: "Chainsaw Man - Warehouse" }, { name: "Roblox Studio" }, { name: "with 366 friends" }];
const streamingArray = [{ name: "«CCARF»", url: "" }];
const watchingArray = [{ name: "1 servers" }, { name: "security cameras" }, { name: "«APOLLO» Corp. YouTube Channel" }, { name: "raider plans" }];
const videoArray = ["https://www.youtube.com/watch?v=lQnjAkqqrIE", "https://www.youtube.com/watch?v=bS06zjFYA9M&t=194s", "https://www.youtube.com/watch?v=fipq3FSCQtE", "https://www.youtube.com/watch?v=8GNBUnlsR5Y", "https://www.youtube.com/watch?v=9akUfXv5Ma4", "https://www.youtube.com/watch?v=PVNPZ4LrvUk", "https://www.youtube.com/watch?v=wbPu8755syA", "https://www.youtube.com/watch?v=03IXPbbs3u4&t=142s", "https://www.youtube.com/watch?v=MBOyZ-ybKAc", "https://www.youtube.com/watch?v=_nmhf472bro", "https://www.youtube.com/watch?v=RZdmV-b8PSU"];

function changePresence(client) {
    streamingArray[0].url = videoArray[Math.floor(Math.random() * videoArray.length)];
    let statusArray = [
        {
            type: ActivityType.Competing,
            content: competingArray[Math.floor(Math.random() * competingArray.length)],
        },
        {
            type: ActivityType.Listening,
            content: listeningArray[Math.floor(Math.random() * listeningArray.length)],
        },
        {
            type: ActivityType.Playing,
            content: playingArray[Math.floor(Math.random() * playingArray.length)],
        },
        {
            type: ActivityType.Streaming,
            content: streamingArray[Math.floor(Math.random() * streamingArray.length)],
        },
        {
            type: ActivityType.Watching,
            content: watchingArray[Math.floor(Math.random() * watchingArray.length)],
        },
    ];
    const status = statusArray[Math.floor(Math.random() * statusArray.length)];
    client.user.setActivity({
        type: status.type,
        name: status.content.name,
        url: status.content.url,
    });
}

module.exports = changePresence;
