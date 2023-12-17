/*   - - - -   IMPORTS   - - - - - */
import TelegramApi from "node-telegram-bot-api"
import { createNewUser } from "./createNewUser.js"
import { Users } from "./db.js"
import { controlerCommands } from "./commands.js"
import { buyTraktor, sell, shop, mainKeyboard } from "./keyboards.js"


/*   - - - -   GLOBAL VARIABLES   - - - - - */
// await Users.deleteMany({})
let token = '6170958866:AAGSAAxqlpHKIaq3SBotTYuAWuaJ1LiBEKk'
let bot = new TelegramApi(token, {polling: true})
let idAdmin = 5645593884
let amauntUseTraktor = 0
let liveTractor = 0
let dollars = 0
let pole = 1;
let money = {}
let lvl = 10
let my = []

let priceFruits = {
    '🍎': 8, 
    '🍒': 12, 
    '🍓': 10,
    '🫐':16,
    '🥕':27,
    '🥑':21   
}

let allFruits = [
    '🍎',
    '🍎',
    '🍎',
    '🍎',
    '🍓',
    '🍓',
    '🍓',
    '🍒',
    
]


for (let j = 0;j<35;j++){
    allFruits.push(' ')
} 




 

function getLvl (){

    let lvl = 1;

    if (dollars > 100){
       lvl = 2
    } 
   
    if (dollars > 150){
       lvl = 3
    } 
   
    if (dollars > 250){
       lvl = 4
    } 
   
    if (dollars > 375){
       lvl = 5
    } 
   
   
   

   
  
   
   
   console.log(lvl)
   
if  (lvl >= 2){
    allFruits.push('🫐')  
   }
  
  if (lvl >= 3){
    allFruits.push('🥑')  
   }
  
  if (lvl >= 4){
    allFruits.push('🥕')  
   }
  
}


bot.on('message', async function(message) {
     if  (message.text == '/start'){ 
        let res = await Users.find({
            userId: Number(message.chat.id)
        })

        // if user not found
        if (res.length == 0) {
             await createNewUser(message.chat.id)
            await bot.sendMessage(message.chat.id,'ви зарегеструвались в гру')

        }

        // if user found
        else {
            let currentUser = await Users.findOne({userId: message.chat.id})
            liveTractor  = currentUser.liveTractor
            dollars = currentUser.dollars
            pole = currentUser.pole
            my = currentUser.my

            let allAvailableFruits = []
            for(let i=0;i<allFruits.length;i++){
            if(allFruits[i] != ' '   && !allAvailableFruits.includes(allFruits[i]) ){
                allAvailableFruits.push(allFruits[i])
            }    
            } 
             let text = `
<b>Your level:</b> ${lvl}
<b>Available fruits:</b>
        ${allAvailableFruits}
             `
            bot.sendMessage(message.chat.id,text, {...mainKeyboard(currentUser.vitamins, pole), parse_mode: 'HTML'})
    
        }

      



    }

    let currentUser = await Users.findOne({userId: message.chat.id})
    liveTractor  = currentUser.liveTractor
    dollars = currentUser.dollars
    pole = currentUser.pole
    my = currentUser.my
    money = currentUser.money
    let maxliveTractor = currentUser.maxliveTractor

    if (message.text == '100000' ){

            dollars += 100000

             await Users.findOneAndUpdate({
            userId: message.chat.id
        },
            { $set: {
                dollars: dollars,
            }
            })
           

            bot.sendMessage(message.chat.id, '+100000')
    

    }

    controlerCommands(message.text, message.chat.id, money, lvl)

})



bot.on('callback_query',async function(message){
    let currentUser = await Users.findOne({userId: message.message.chat.id})
    liveTractor  = currentUser.liveTractor
    dollars = currentUser.dollars
    pole = currentUser.pole
    my = currentUser.my
    money = currentUser.money
    let maxliveTractor = currentUser.maxliveTractor

    if (message.data == ' '){
        let template = `
🍎 - ${money['🍎']}   🍒 - ${money['🍒']}
🍓 - ${money['🍓']}   🥑 - ${money['🥑']}
🥕 - ${money['🥕']}   🫐 - ${money['🫐']}
        `
        
        bot.sendMessage(message.message.chat.id, template, mainKeyboard(currentUser.vitamins, pole))

    }

    if (message.data == 'купити поле'){

        if (dollars >=750){
            dollars -= 750
             await Users.findOneAndUpdate({
            userId: message.message.chat.id
        },
            { $set: {
                dollars: dollars,
            }
            })

        pole++
         await Users.findOneAndUpdate({
            userId: message.message.chat.id
        },
            { $set: {
                pole: pole,
            }
            }
        )
        bot.sendMessage(message.message.chat.id, '<b>у вас ' + pole + ' рядів</b>',{ parse_mode: 'HTML'})
    }

    else{
        bot.sendMessage(message.message.chat.id, 'у вас не висточае коштів') 
    }


    }

    if (message.data == 'купити покращення для трактора'){
        if (dollars >=2000){
            
            bot.sendMessage(message.message.chat.id, 'зараз у ваих інших тракторів максимально: ' + (maxliveTractor+1) + ' житів')
            dollars -= 2000
             await Users.findOneAndUpdate({
            userId: message.message.chat.id
        },
            { $set: {
                dollars: dollars,
            }
           
            
            })


            await Users.findOneAndUpdate({
                userId: message.message.chat.id
            },
                { $set: {
                    maxliveTractor:maxliveTractor+1
                }
                })



            currentUser.liveTractor = liveTractor
        }
    }
  
    if (message.data == 'купити вітаміни росту'){

      

       if (currentUser.vitamins >= 35){
            bot.sendMessage(message.message.chat.id,'у вас максимальна кількість вітамінів росту')
       } 
        else if (dollars >=1150){
            dollars -= 1150



          

             await Users.findOneAndUpdate({
            userId: message.message.chat.id
        },
            { $set: {
                dollars: dollars,
            }
            })

            await Users.findOneAndUpdate({
                userId: message.message.chat.id
            },
                { $set: {
                    vitamins: currentUser.vitamins+1,
                }
                })


            bot.sendMessage(message.message.chat.id,'успішно')
        }
        else {

            bot.sendMessage(message.message.chat.id,'не вистачае коштів')
        }
    }
 


    if (message.data.startsWith('sell')){
        let fruitEmoji = message.data.slice(5)
        dollars += money[fruitEmoji]*priceFruits[fruitEmoji]
        await Users.findOneAndUpdate({
            userId: message.message.chat.id
        },
            { $set: {
                dollars: dollars,
            }
            }
        )
        bot.sendMessage(message.message.chat.id, 'ви заробили '+money[fruitEmoji]*priceFruits[fruitEmoji]+'$')
        let a = `money.${fruitEmoji}`
        await Users.findOneAndUpdate({
            userId: message.message.chat.id
        },
            { $set: {
                [a]: 0,
            }
            }
        )
    }

    if (message.data.startsWith('sell')) {
        
    }
if (message.data == 'buytraktor'){
    if (dollars >=250){
        my.push('трактор')
        currentUser.my.push('tractor')
        await Users.findOneAndUpdate({
            userId: message.message.chat.id
        },
            { $set: {
                my: currentUser.my,
            }
            }
        )
        dollars -= 250
        await Users.findOneAndUpdate({
            userId: message.message.chat.id
        },
            { $set: {
                dollars: dollars,
            }
            })
        bot.sendMessage(message.message.chat.id, 'ви купили трактор 🚜', mainKeyboard(currentUser.vitamins, pole))
    }
        
    if (dollars <25){
        bot.sendMessage(message.message.chat.id, 'у вас не висточае коштів ', mainKeyboard(currentUser.vitamins, pole))
    }

    }


    

    if (message.data == 'useTraktor'){
        let amountTractors = 0
        for (let i = 0; i < currentUser.my.length; i++) {
            if(currentUser.my[i]=='tractor'  ){
                amountTractors++
            } 

        }

        if(amountTractors == 0){
            return bot.sendMessage(message.message.chat.id, 'у вас нема тракторів')

        } 
        console.log (message.message.reply_markup.inline_keyboard) 
        for(let i =0;i<5;i++){

             for(let j =0;j<pole;j++){

                try {
                if (message.message.reply_markup.inline_keyboard[i][j].text=='🍓' ){
                    money['🍓'] ++
                    await db.insertMany([
                        money
                    ])
                }
          


                if (message.message.reply_markup.inline_keyboard[i][j].text=='🍎' ){
                    money['🍎'] ++
                    await db.insertMany([
                        money
                    ])
                }

                if (message.message.reply_markup.inline_keyboard[i][j].text=='🍒' ){
                    money['🍒'] ++
                    await db.insertMany([
                        money
                    ])
                }

                if (message.message.reply_markup.inline_keyboard[i][j].text=='🫐' ){
                    money['🫐'] ++
                    await db.insertMany([
                        money
                    ])
                }

                if (message.message.reply_markup.inline_keyboard[i][j].text=='🥕' ){
                    money['🥕'] ++
                    await db.insertMany([
                        money
                    ])
                }


                if (message.message.reply_markup.inline_keyboard[i][j].text=='🥑' ){
                    money['🥑'] ++
                    await db.insertMany([
                        money
                    ])
                }
                  } catch (e) {}

            }
        }

        if( liveTractor < 1){
            bot.sendMessage(message.message.chat.id, 'у вас -1 трактор',)
            bot.sendMessage(message.message.chat.id, liveTractor,)
            let index = my.indexOf('tractor')
            console.log('index', index)
            if (index != -1) {
                my.splice(index, 1)
            }
            await Users.findOneAndUpdate({userId: message.message.chat.id}, {$set: {liveTractor: currentUser.maxliveTractor}})
            await Users.findOneAndUpdate({userId: message.message.chat.id}, {$set: {my: my}})
            liveTractor = maxliveTractor 
 
        } 
        else{
            await Users.findOneAndUpdate({userId: message.message.chat.id}, {$set: {liveTractor: liveTractor - 1}})
            bot.sendMessage(message.message.chat.id, '<b>Super</b> you have: ' + liveTractor, {parse_mode: 'HTML', ...mainKeyboard(currentUser.vitamins, pole)}) 
        }
  

    }
    if (['🍎',  '🍒', '🍓', '🥕', '🥑', '🫐' ].includes (message.data)){
        console.log(money[message.data]+1)
        console.log('-------')
        let key = `money.${message.data}`
        Users.findOneAndUpdate({
            userId: message.message.chat.id
        },
            { $set: {
                [key]: money[message.data]+1,
            }
            })
            .then(async () => {
                let currentUser = await Users.findOne({userId: message.message.chat.id})
                let money = currentUser.money
                let template = `
🍎 - ${money['🍎']}   🍒 - ${money['🍒']}
🍓 - ${money['🍓']}   🥑 - ${money['🥑']}
🥕 - ${money['🥕']}   🫐 - ${money['🫐']}
                ` 
                 bot.sendMessage(message.message.chat.id,template, mainKeyboard(currentUser.vitamins, pole))
            })
    

    }

} ) 


export {allFruits, bot}