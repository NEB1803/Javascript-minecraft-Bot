
                let Discord;
                let Database;
                if(typeof window !== "undefined"){
                    Discord = DiscordJS;
                    Database = EasyDatabase;
                } else {
                    Discord = require("discord.js");
                    Database = require("easy-json-database");
                }
                const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
                const s4d = {
                    Discord,
                    client: null,
                    tokenInvalid: false,
                    reply: null,
                    joiningMember: null,
                    database: new Database("./db.json"),
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    fetchAllMembers: true
                });
                s4d.client.on('raw', async (packet) => {
                    if(['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)){
                        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
                        if(!guild) return;
                        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
                        if(!member) return;
                        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
                        if(!channel) return;
                        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
                        if(!message) return;
                        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
                    }
                });
                s4d.client.login(process.env.TOKEN).catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

s4d.client.on('ready', async () => {

          while(s4d.client && s4d.client.token) {
              await delay(50);
                s4d.client.user.setActivity(String('Server Tickering'));
    await delay(Number(60)*1000);
    s4d.client.user.setActivity(String('PIXELHEIM'));
    await delay(Number(60)*1000);

              console.log('ran')
          }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == '.ip') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: "**IP**",
                    color: 6711680,
                    image: { url: "https://imgur.com/nCHb5gV.png" },

                    description: (String(String('MAIN' + '**play.pixel-heim.com**') + '') + String(String(String('Germany' + '**ge.pixel-heim.com**') + '') + String('Backup' + '**173.249.49.122:25952**'))),
                    footer: { text: null },
                    thumbnail: { url: "https://i.imgur.com/oPdS1DB.png"}

                }
            }
        );
  }

});
s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == '.format') {
    s4dmessage.react('✅');s4dmessage.channel.send(
            {
                embed: {
                    title: "Hello Pixels our staff will be here soon to help you, In the meantime please follow the format and describe your concern:",
                    color: 16711680,
                    image: { url: null },
                    thumbnail: { url: "https://i.imgur.com/oPdS1DB.png"},
                    description: (String(String('Your In Game Name : ' + '\n') + String('Concern :' + String('\n' + 'Proof :'))))
                }
            }
        );
  }
  if ((s4dmessage.content) == '.ticket') {
    s4dmessage.react('✅');s4dmessage.channel.send(
            {
                embed: {
                    title: "**How to File a Ticket.**",
                    color: 16711680,
                    image: { url: "https://i.imgur.com/2nR55qk.png" },
                    thumbnail: { url: "https://i.imgur.com/oPdS1DB.png"},
                    description: ('Go to <#834520977694130226> and click on the :tickets: emoji.' + '\n')
                }
            }
        );
  }
  if ((s4dmessage.content) == '.appeal') {
    s4dmessage.react('✅');s4dmessage.channel.send(
            {
                embed: {
                    title: "**Hello Pixels please follow the following format to appeal for your ban**",
                    color: 16711680,
                    image: { url: null },
                    thumbnail: { url: "https://i.imgur.com/oPdS1DB.png"},
                    description: (String(String('1. Your Name in-game:' + '\n') + String('2. Name of staff who banned you:' + '\n')) + String(String(String('3.Reason for ban:' + '\n') + String('4.Is your ban reasonable:' + '\n')) + String(String('5.How long is your ban:' + '\n') + String('6.Why should we unban you:' + '\n'))))
                }
            }
        );
  }
  if ((s4dmessage.content) == '.report') {
    s4dmessage.react('✅');s4dmessage.channel.send(
            {
                embed: {
                    title: "Format For Reporting A Player:-",
                    color: 16711680,
                    image: { url: null },
                    thumbnail: { url: "https://i.imgur.com/oPdS1DB.png"},
                    description: (String('Your Name:' + '\n') + String(String('Name of the player your reporting:' + '\n') + String(String('Reason:' + '\n') + String('Proof:' + '\n'))))
                }
            }
        );
  }

});

                s4d;
            
