import WebPush from "web-push"
import { FastifyInstance } from "fastify"
import { z } from 'zod'

const publicKey = 'BE7ZUi8mMYz8v0SAU0WX4iazzRm49Egty7hS07IOvDBNhZBuLm2LOeKcnNrXIsYooLFAE_7xVapSS2fmHztA9BI';
const privateKey = 'OMe031H4khG5ah2Ysp7_2V4RPywQTGwvcNe8vj2eJ7E';

WebPush.setVapidDetails('mailto:victorgoecking96@gmail.com', publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
    app.get('/push/public_key', () => {
        return{
            publicKey,
        }
    });

    app.post('/push/register', (request, reply) => {
        return reply.status(201).send();
    });

    app.post('/push/send', async (request, reply) => {
        const sendPushBody = z.object({
            subscription: z.object({
                endpoint: z.string(),
                keys: z.object({
                    p256dh: z.string(),
                    auth: z.string()
                })
            })
        });

        const { subscription } = sendPushBody.parse(request.body);

        setTimeout(() => {
            WebPush.sendNotification(subscription, 'Hello do backend!')
        }, 5000);

        return reply.status(201).send();
    });
}
