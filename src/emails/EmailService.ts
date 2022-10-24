import { Injectable } from "@nestjs/common";
import { Order } from "../orders/order.entity";
import { User } from "../auth/user.entity";
const Email = require('email-templates');

@Injectable()
export class EmailService {
    email = new Email({
        views: {
            root: 'src/emails/',
        },
        message: {
            from: 'books-shop@books-r-us.com'
        },
        send: true,
        preview: false,

        transport: {
            host: 'smtp.mailtrap.io',
            port: 2525,
            ssl: false,
            tls: true,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        }
    });
    sendOnOrderCreated(order: Order) {

        this.email
            .send({
                template: 'order-created',
                message: {
                    to: order.user.email
                },
                locals: {
                    order
                }
            })
            .then(console.log)
            .catch(console.error);
    }

    sendOrderRefund(order: Order) {
        this.email
            .send({
                template: 'order-refund',
                message: {
                    to: order.user.email
                },
                locals: {
                    order
                }
            })
            .then(console.log)
            .catch(console.error);
    }
    
}