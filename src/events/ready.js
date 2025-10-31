import { Events, ActivityType } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const activities = {
        [ActivityType.Competing]: [
            "with RTX 4090",
            "with raiders",
            "with best core games",
            "with Black Mesa",
            "with Aperture Science",
        ],
        [ActivityType.Listening]: [
            "Facility Intercom",
            "Surface",
            "Facility Alarms",
            "employee complaints",
        ],
        [ActivityType.Playing]: [
            "«CCARF»",
            "«CCARF» - Test Server",
            "Chainsaw Man - Warehouse",
            "Roblox Studio",
            "with 366 friends",
        ],
        [ActivityType.Streaming]: [
            "«CCARF»",
        ],
        [ActivityType.Watching]: [
            "1 servers",
            "security cameras",
            "«APOLLO» Corp. YouTube Channel",
            "raider plans",
        ],
    };

    const videoArray = [
        "https://www.youtube.com/watch?v=lQnjAkqqrIE",
        "https://www.youtube.com/watch?v=bS06zjFYA9M&t=194s",
        "https://www.youtube.com/watch?v=fipq3FSCQtE",
        "https://www.youtube.com/watch?v=8GNBUnlsR5Y",
        "https://www.youtube.com/watch?v=9akUfXv5Ma4",
        "https://www.youtube.com/watch?v=PVNPZ4LrvUk",
        "https://www.youtube.com/watch?v=wbPu8755syA",
        "https://www.youtube.com/watch?v=03IXPbbs3u4&t=142s",
        "https://www.youtube.com/watch?v=MBOyZ-ybKAc",
        "https://www.youtube.com/watch?v=_nmhf472bro",
        "https://www.youtube.com/watch?v=RZdmV-b8PSU",
    ];

    function randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    while (true) {
        const type = randomItem(Object.keys(activities));
        const name = randomItem(activities[type]);
        const url = type === ActivityType.Streaming ? randomItem(videoArray) : undefined;

        await client.user.setActivity({ name: name, type: Number(type), url: url });

        await new Promise(resolve => setTimeout(resolve, Math.random() * 300_000));
    }
}
