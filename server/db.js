const mongoose = require('mongoose')

    mongoose.connect(`mongodb+srv://root:root1234@cluster0.sbffd4h.mongodb.net/auth?retryWrites=true&w=majority`).then(()=>{
        console.log("DATABASE HAS BEEN CONACTED");
    })
