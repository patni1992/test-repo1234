import nodemailer from "nodemailer";
const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user:  process.env.GMAIL_USER,
        pass:  process.env.GMAIL_PASSWORD
    }
});

class Mail {
    constructor(from) {
        this.from = from;
    }

    send(subject, html, to) {
        return new Promise((resolve, reject) => {
            smtpTransport.sendMail({
                from: this.from,
                to,
                subject,
                html
            }, (error, info) => {
                if (error) {
                    return reject(error)
                }
                resolve(info);
            })
        });

    }
}

export default Mail;