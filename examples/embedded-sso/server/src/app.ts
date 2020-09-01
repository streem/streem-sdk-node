import express from 'express';
import path from 'path';
import cors from 'cors';
import { config } from 'dotenv';
import Streem from '@streem/sdk-node';

const app = express();
const PORT = 3000;

config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.post('/token', async (req, res, next) => {
    const body = req.body;
    const token = await createToken(body.userId, body.name, body.email, body.avatarUrl);
    res.json({ token: token });
});


const apiKeyId = process.env.API_KEY_ID || '';
const apiKeySecret = process.env.API_KEY_SECRET || '';
const apiEnvironment = process.env.API_ENVIRONMENT || 'prod-us';
const oneHour = 60 * 60 * 1000;

if (!apiKeyId || !apiKeySecret) {
    console.log('Please copy .env.template to .env, and process your API Key ID and Secreet');
    process.exit(1);
}

Streem.init(apiKeyId, apiKeySecret, apiEnvironment);

async function createToken(userId: string, name: string, email: string, avatarUrl: string): Promise<string> {
    const builder = new Streem.TokenBuilder();
    builder.userId = userId;
    builder.name = name;
    builder.email = email;
    builder.avatarUrl = avatarUrl;
    builder.expirationMs = oneHour;

    return await builder.build();
}

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});