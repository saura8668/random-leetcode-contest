import { client } from '../../model/db.js';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { getLatestContest } from '../utils/scrapeContest.js';

// Replace with your email config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saurajit.nandi1996@gmail.com',
        pass: 'ihha ozpq brls rqud'
    }
});

async function sendContestEmails() {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
        const db = client.db('leetcode');
        const users = await db.collection('users').find({}).toArray();
        const questions = await getLatestContest();

        for (const user of users) {
            transporter.sendMail({
                from: 'saurajit.nandi1996@gmail.com',
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
cron.schedule('41 11 * * *', sendContestEmails);