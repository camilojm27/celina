import nodemailer, { Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../../.runtimeConfig.json");

// if (Object.keys(functions.config()).length){
//     config = functions.config();
// }
const serverEmail = config.email.email
const serverPass = config.email.password

class Mail {
    private transporter: Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
         this.transporter = nodemailer.createTransport({
             host: "smtp.gmail.com",
             port: 465,
             secure: true, // true for 465, false for other ports
            auth: {
                user: serverEmail, // example@user.com
                pass: serverPass, // 123456
            },
        });
    }
    async sendTest(): Promise<void> {
        const info = await this.transporter.sendMail({
            from: `"Robot en Celina | Tienda 🤖" <${serverEmail}>`, // sender address '"Fred Foo 👻" <foo@example.com>'
            to: "camilo.mezu@correounivalle.edu.co", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
    }
    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const info = await this.transporter.sendMail({
            from: `"Robot en Celina | Tienda 🤖" <${serverEmail}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text: body, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
    }

    async sendPayment(to: string): Promise<void> {
        const info = await this.transporter.sendMail({
            from: `"Robot en Celina | Tienda 🤖" <${serverEmail}>`, // sender address
            to, // list of receivers
            subject: "Pago Realizado", // Subject line
            text: "Su pago se ha acreditado correctamente, gracias por utilizar nuestos CeliServicios. Att: https://celina-tienda.web.app", // plain text body
        });
        console.log("Message sent: %s", info.messageId);
    }

    async sendDeliver(to: string): Promise<void> {
        const info = await this.transporter.sendMail({
            from: `"Robot en Celina | Tienda 🤖" <${serverEmail}>`, // sender address
            to, // list of receivers
            subject: "Envío entregado", // Subject line
            text: "Su pago envío se ha entregado correctamente, gracias por utilizar nuestos CeliServicios. Att: https://celina-tienda.web.app", // plain text body
        });
        console.log("Message sent: %s", info.messageId);
    }



}

export default Mail
