import {Users} from './db.js'
import {bot} from './index.js'
import {sell, buyTraktor, mainKeyboard, shop} from './keyboards.js'

async function controlerCommands (text, id, money, lvl) {


if  (text == '/balance') {
    let currentUser = await Users.findOne({
        userId: id
    })
    console.log(currentUser)
   let amauntTraktor = 0   
    for(let i = 0;i<currentUser.my.length; i++ ){
        if (currentUser.my[i] == 'tractor') {
            amauntTraktor++
        }
    } 

    let template = `
🍎 - ${money['🍎']}   🍒 - ${money['🍒']}
🍓 - ${money['🍓']}   🥑 - ${money['🥑']}
🥕 - ${money['🥕']}   🫐 - ${money['🫐']}
    `
    
    bot.sendMessage(id, template )
    bot.sendMessage(id, 'dollars: '+currentUser.dollars, )
    bot.sendMessage(id,'у вас ' + amauntTraktor + ' тракторів')
    bot.sendMessage(id, 'зараз у вашого трактора ' + currentUser.liveTractor + ' житів')
    bot.sendMessage(id,'у вас '  + currentUser.vitamins +  ' вітамінів росту')
}
if  (text == '/sell') {
       let template = `
🍎 - ${money['🍎']}   🍒 - ${money['🍒']}
🍓 - ${money['🍓']}   🥑 - ${money['🥑']}
🥕 - ${money['🥕']}   🫐 - ${money['🫐']}
    `
    
    bot.sendMessage(id, template, sell )
}
if  (text == '/help') {
    bot.sendMessage(id, `
    🍎 - 15  
    🍒 - 20
    🍓 - 30 
    `, {parse_mode: 'HTML'})
}

if (text == '/shop'){
    bot.sendMessage(id,'👇 оберіть що ви хочете купити 👇',shop)
}

if (text == '/info'){
    bot.sendMessage(id, 'ваш рівень ' + lvl)
    let allUsers = await Users.find({})
    let textsAllUsers = []
    for (let i = 0; i < allUsers.length; i++) {
        textsAllUsers.push(` ${allUsers[i].userId}`)
    }
     bot.sendMessage(id, 'в гру грають ' + textsAllUsers.length + ' людей ')
}
}


export {controlerCommands}