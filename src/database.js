import mongoose from 'mongoose'

(async() => {
    const db = await mongoose.connect('mongodb://localhost/restapitasks', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('database name:', db.connection.name);
})()