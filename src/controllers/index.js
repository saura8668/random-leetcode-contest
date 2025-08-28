import { client } from '../../model/db.js';

export const subscribeUser = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }
    try {
        // Ensure client is connected
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
        const db = client.db('leetcode');
        const collection = db.collection('users');
        await collection.insertOne({ email });
        res.send('User subscribed successfully!');
    } catch (err) {
        res.status(500).json({ error: 'Failed to subscribe user.' });
    }
};