import { Users } from "./db.js"


async function createNewUser(id){
    await Users.insertMany({
        userId: Number(id),
        dollars: 0,
        my: [],
        pole: 1,
        vitamins: 0,
        liveTractor: 5,
        maxliveTractor: 5,
        money: {
            '🍎': 0,
            '🍒': 0,
            '🍓': 0,
            '🥑': 0,
            '🥕': 0,
            '🫐': 0,
    }
})
    return true
}

export {createNewUser}