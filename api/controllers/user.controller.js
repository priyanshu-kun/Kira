class AuthController {
    async sendOTP(req,res) {
        const {Email} = req.body;
        if(!Email) {
            // handle error
            res.status(500)
        }
        res.send(200)
    }
}


module.exports = new AuthController()