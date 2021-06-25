import nodemailer, { Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const functions = require("firebase-functions");
// eslint-disable-next-line @typescript-eslint/no-var-requires
let config = require("../../.runtimeconfig.json");

if (Object.keys(functions.config()).length){
    config = functions.config();
}

class Mail {
    private transporter: Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
         this.transporter = nodemailer.createTransport({
             service: "gmail",
            auth: {
                user: config.email.mail, // example@user.com
                pass: config.email.password, // 123456
            },
        });
    }
    async sendTest(): Promise<void> {
        const info = await this.transporter.sendMail({
            from: "\"Robot en Celina | Tienda 👻\" ", // sender address
            to: "example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
    }
    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const info = await this.transporter.sendMail({
            from: "\"Robot en Celina | Tienda 👻\" ", // sender address
            to, // list of receivers
            subject, // Subject line
            text: body, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
    }

    async sendPayment(to: string): Promise<void> {
        const info = await this.transporter.sendMail({
            from: "\"Robot en Celina | Tienda 👻\" ", // sender address
            to, // list of receivers
            subject: "Pago Realizado", // Subject line
            text: "Su pago se ha acreditado correctamente, gracias por utilizar nuestos CeliServicios. Att: https://celina-tienda.web.app", // plain text body
        });
        console.log("Message sent: %s", info.messageId);
    }

    async sendDeliver(to: string): Promise<void> {
        const info = await this.transporter.sendMail({
            from: "\"Robot en Celina | Tienda 👻\" ", // sender address
            to, // list of receivers
            subject: "Envío entregado", // Subject line
            text: "Su pago envío se ha entregado correctamente, gracias por utilizar nuestos CeliServicios. Att: https://celina-tienda.web.app", // plain text body
        });
        console.log("Message sent: %s", info.messageId);
    }



}

export default Mail
