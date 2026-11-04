const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('البوت شغال ✅');
});

const hikam = [
    "الصبر مفتاح الفرج",
    "من جد وجد ومن زرع حصد",
    "العقل زينة",
    "خير الكلام ما قل ودل",
    "الصديق وقت الضيق",
    "القناعة كنز لا يفنى",
    "لا تؤجل عمل اليوم الى الغد"
];

const nokat = [
    "مرة واحد كسلان قال لصاحبو: عليك الله لو صحيت صحيني 😂",
    "مرة واحد غبي سألوه بتفهم في الكمبيوتر؟ قال ايوة بفهم اضغط على اي زرار 😂",
    "محشش قال لصاحبو: امبارح حلمت اني بمشي، صحيت لقيت نفسي لسه نايم 😂"
];

client.on('message', async (msg) => {
    const body = msg.body.trim();
    const chat = await msg.getChat();

    // 1. مضاد الروابط - شغال تلقائي
    if (body.includes('http://') || body.includes('https://') || body.includes('www.') || body.includes('.com')) {
        if (chat.isGroup) {
            try {
                await msg.delete(true);
                msg.reply('🚫 ممنوع ارسال الروابط في القروب!');
                return;
            } catch (e) {
                msg.reply('🚫 ممنوع الروابط! خلي البوت مشرف عشان يمسحها');
                return;
            }
        }
    }

    // 2. حكمة
    if (body === '!حكمة' || body === '!حكمه' || body === '!hikma') {
        const r = hikam[Math.floor(Math.random() * hikam.length)];
        msg.reply('📜 *حكمة اليوم:*\n\n' + r);
    }

    // 3. زوجتي
    if (body.startsWith('!زوجتي')) {
        const mentions = await msg.getMentions();
        if (mentions.length > 0) {
            const wife = mentions[0].pushname || mentions[0].number;
            msg.reply('❤️ مبروك الزواج!\n\n💍 ' + msg._data.notifyName + ' ❤️ ' + wife + '\n\nالله يسعدكم 😍');
        } else {
            msg.reply('عشان تتزوج اكتب:\n!زوجتي @منشن البت');
        }
    }

    // 4. نكتة
    if (body === '!نكتة' || body === '!نكته') {
        const r = nokat[Math.floor(Math.random() * nokat.length)];
        msg.reply('😂 ' + r);
    }

    // 5. الاوامر
    if (body === '!اوامر' || body === '!menu' || body === '!help') {
        msg.reply(`🤖 *قائمة اوامر البوت:*

📜 !حكمة - حكمة
😂 !نكتة - نكتة
💍 !زوجتي @منشن - يزوجك
🚫 مضاد الروابط - شغال تلقائي
👋 !hi - يسلم عليك
🏓 !ping - pong`);
    }

    if (body === '!hi') {
        msg.reply('اهلا بيك 🔥 اكتب !اوامر');
    }

    if (body === '!ping') {
        msg.reply('pong 🏓');
    }
});


client.initialize();
