import sgMail from '@sendgrid/mail'
class SendMail {
    sendMail(email,otp) {
        sgMail.setApiKey(process.env.SENDGRID_SECRET)
        const msg = {
            to: email, // Change to your recipient
            from: process.env.SENDGRID_EMAIL, // Change to your verified sender
            subject: 'Account confirmation',
            text: "please don't share it with anybody.",
            html: `<strong>${otp}</strong>`,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

export default new SendMail()