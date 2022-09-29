class AuthController {
    async sendOTP(req,res) {
        console.log(req.body)
        // const {email} = req.body;
        // if(!email) {
        //     // handle error
        //     res.status(500)
        // }
        // console.log(email)
        res.send(200)
    }
}


module.exports = new AuthController()