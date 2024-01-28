const zod = require('zod');

const Login_Register = zod.object({
    name : zod.string(),
    lastname: zod.string(),
    password : zod.string()
})

module.exports = {
    Login_Register
}