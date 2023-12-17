import mongoose, {Schema} from 'mongoose'

mongoose.connect('mongodb+srv://user:user@cluster0.lxjyeq3.mongodb.net/?retryWrites=true&w=majority')


let users = new Schema(
    {
        userId: Number,
        dollars: Number,
        my: Array,
        pole: Number,
        vitamins: Number,
        liveTractor: Number,
        maxliveTractor: Number,
        money: {
            '🍎': Number,
            '🍒': Number,
            '🍓': Number,
            '🥑': Number,
            '🥕': Number,
            '🫐': Number,
        },
    })



let Users = mongoose.model('user', users)

export {Users}