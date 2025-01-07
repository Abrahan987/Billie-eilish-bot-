// código echo por Abrahan-m

let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'))

let handler = m => m
handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
    let media, msg, type
    const { antiver, isBanned } = global.db.data.chats[m.chat]
    if (!antiver || isBanned || !(m.mtype == 'viewOnceMessageV2' || m.mtype == 'viewOnceMessageV2Extension')) return
    if (m.mtype == 'viewOnceMessageV2' || m.mtype == 'viewOnceMessageV2Extension') {
        msg = m.mtype == 'viewOnceMessageV2' ? m.message.viewOnceMessageV2.message : m.message.viewOnceMessageV2Extension.message 
        type = Object.keys(msg)[0]
        media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : type == 'videoMessage' ? 'video' : 'audio')
        let buffer = Buffer.from([])
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk])
        }
        const fileSize = formatFileSize(msg[type].fileLength)
        const description = `
        ╭───────────────╮
        │    🛡️ ANTI VER UNA VEZ 🛡️    │
        ├───────────────┤
        │ ✅ *ACTIVADO* ✅ │
        │ 📁 *Tipo:* ${type === 'imageMessage' ? 'Imagen 📷' : type === 'videoMessage' ? 'Vídeo 🎥' : 'Voz 🎤'} │
        │ 📦 *Tamaño:* ${fileSize} │
        │ 🧑‍💻 *Usuario:* @${m.sender.split('@')[0]} │
        ${msg[type].caption ? `│ ✏️ *Texto:* ${msg[type].caption} │` : ''}
        │ 📥 *Estado:* Enviando... │
        ╰───────────────╯
        `.trim()
        if (/image|video/.test(type)) {
            return await conn.sendFile(m.chat, buffer, type == 'imageMessage' ? 'image.jpg' : 'video.mp4', description, m, false, { mentions: [m.sender] })
        }
        if (/audio/.test(type)) { 
            await conn.reply(m.chat, description, m, { mentions: [m.sender] }) 
            await conn.sendMessage(m.chat, { audio: buffer, fileName: 'audio.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
        }
    }
}
export default handler

function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'TY', 'EY']
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + ' ' + sizes[i]
}