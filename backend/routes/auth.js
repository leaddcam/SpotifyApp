const express = require('express');
const router = express.Router();
const db = require('../db');
require('dotenv').config();
const axios = require('axios');
//
// svarer på http://localhost:3000/auth
//

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

// from spotify 
const auth_url = 'https://accounts.spotify.com/authorize';
const token_url = 'https://accounts.spotify.com/api/token';

// sender en Spotify-login url til frontend
router.get('/start-auth', (req, res) => {
    const scope = 'user-read-private user-read-email user-read-playback-state user-top-read';
    const authURL = `${auth_url}?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}&show_dialog=true`;

    res.json({url: authURL});
});

// henter auth code fra frontend og bytter code mot token
router.post('/get-token', async (req, res) => {
    const code = req.body.code; // henter fra frontend

    if (!code) {
        return res.status(400).json({ error: 'Missing auth code'});
    }

    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', redirect_uri);

        const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

        const response = await axios.post(token_url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authHeader}`
            }
        });

        const { access_token, refresh_token, expires_in } = response.data;

        res.json({ access_token, refresh_token, expires_in });

    } catch (err) {
        console.error('Token exchange failed: ', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to exchange token' });
    }
});

module.exports = router;