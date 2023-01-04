export default {
    jwt:{
        secret: process.env.HASH_APP,
        expiresIn: '30d'
    }
}