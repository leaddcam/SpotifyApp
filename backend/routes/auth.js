const express = require('express');
const router = express.Router();
const db = require('../db');
require('dotenv').config();
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

module.exports = router;