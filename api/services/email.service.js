import sgMail from '@sendgrid/mail'

class SendMail {
    sendMail(email, otp) {
        sgMail.setApiKey(process.env.SENDGRID_SECRET)
        const msg = {
            to: email, // Change to your recipient
            from: process.env.SENDGRID_EMAIL, // Change to your verified sender
            subject: 'Account confirmation',
            text: "please don't share it with anybody.",
            html: `<strong>
                Please don't share it with anybody.
                <h1>-> ${otp}</h1>
            </strong>`,
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
    sendMailForTroubleShooting(email, payload) {
        sgMail.setApiKey(process.env.SENDGRID_SECRET)
        const msg = {
            to: email, // Change to your recipient
            from: process.env.SENDGRID_EMAIL, // Change to your verified sender
            subject: 'Troubleshoot your account',
            text: "please follow procedure patientely.",
            html: `
                <h3 style="color: orange;">Username: @${payload.username}</h3>
                <h3 style="color: orange;">Email: ${payload.email}</h3>
                <h3 style="color: orange;">Reset Password: ${process.env.FRONT_URL}/forgot-password/${payload.id}</h3>
           `,
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