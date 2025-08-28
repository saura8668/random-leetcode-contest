import { client } from '../../model/db.js';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { getLatestContest } from '../utils/scrapeContest.js';

// Replace with your email config
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendContestEmails() {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
        const db = client.db(process.env.DB_SCHEMA);
        const users = await db.collection(process.env.DB_COLLECTION).find({}).toArray();
        const questions = await getLatestContest();

        for (const user of users) {
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Last LeetCode Contest Questions',
                text: questions.url
            });
        }
        console.log('Contest emails sent!');
    } catch (err) {
        console.error('Error sending contest emails:', err);
    }
}

// Schedule to run every Monday at 10:00 AM
cron.schedule('22 12 * * *', sendContestEmails);