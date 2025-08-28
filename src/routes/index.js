import { subscribeUser } from '../controllers/index.js';

export default function setRoutes(app) {
    app.post('/subscribe', subscribeUser);
}