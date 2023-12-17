import {allFruits} from './index.js'


let sell = {
    reply_markup: {

        inline_keyboard: [
            [
                {text: 'sell 🍓', callback_data: 'sell 🍓'},
                {text: 'sell 🍒', callback_data: 'sell 🍒'},
                {text: 'sell 🍎', callback_data: 'sell 🍎'}
            ],
            [
                {text: 'sell 🥕', callback_data: 'sell 🥕'},
                {text: 'sell 🥑', callback_data: 'sell 🥑'},
                {text: 'sell 🫐', callback_data: 'sell 🫐'}
            ]
        ]
    }
}


let shop = {
    reply_markup: {

        inline_keyboard: [
             [ {text: 'поле (750$)', callback_data: 'купити поле'},],
              [  {text: 'вітаміни росту (1150$)', callback_data: 'купити вітаміни росту'},],
               [ {text: 'покращення для трактора (2000$)', callback_data: 'купити покращення для трактора'}],
               [ {text: 'купити трактор 🚜 (250$)', callback_data: 'buytraktor'}]
            ],
    }
}
let buyTraktor  = {
    reply_markup: {

        inline_keyboard: [
            [
                {text: 'купити трактор 🚜', callback_data: 'buytraktor'}
            ]
        ]
    }
}

function mainKeyboard (vitamins, pole){
    let newallFruits = [...allFruits]
    
    for(let j = 0; j < vitamins; j++) {
        met: for(let i = 0; i < newallFruits.length; i++){
            if(newallFruits[i] == ' ' ){
                newallFruits.splice(i, 1)
                break met;
            }    
        } 
    }
    console.log('newallFruits length ', newallFruits.length)

    let kb = []
    for (let i = 0;i<pole;i++){
        let kb1 = []
        for (let j = 0;j<5;j++){
            let fruitRandom = newallFruits[(Math.random()*(newallFruits.length-1)).toFixed(0)] 
           kb1.push({text: fruitRandom, callback_data: fruitRandom})
        } 
        kb.push(kb1)  
    }
    kb.push([{text: "🚜 викоростоти трактор ", callback_data: "useTraktor"}])  

    return {
        reply_markup: {
            inline_keyboard: kb
        }
    }
}

export {buyTraktor, shop, sell, mainKeyboard}