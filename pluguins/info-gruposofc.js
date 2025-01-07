let media = './src/Grupo.jpg'
let handler = async (m, { conn, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
   // await conn.sendMessage(m.chat, { react: { text: '⚡️', key: m.key } })
 await m.react('⚡️')
let str = `*📍 GRUPO OFICIAL*

   *_〾̷̸‣⃝⃨⃛⃰⁝̵̓ᝒ̷̸͙🌸̶̩ܻᝒ̷̸꯭͙BILLIE_*
  ┃🧸❏ ${gp4}
   
   *_Grupo de antojar 3.0_*
┃🧸❏ https://chat.whatsapp.com/LJKcR8QBJgu37bVFWuhRVn

   *_Canal Oficial_*
┃❤️‍🔥❏ https://whatsapp.com/channel/0029VaehG4gKmCPX449RbA2T
`
await conn.sendButton(m.chat, str, `͟͞ 𓆩ꪶꪾABRAHAN-Mৎ୭࠱࠭ ͟͞\n` + wm, media, [
['Menu Lista 💖', '/lista']], null, [
['⏤͟͞ू⃪ ፝͜⁞BILLIE⃜✰⃔࿐', `${md}`]], fkontak)}
                      
handler.command = ['grupos','linksk','gruposofc','gruposoficiales']
handler.register = true
handler.exp = 33

export default handler