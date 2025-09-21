
const BASE_URL = 'http://localhost:3000/auth';

// henter login-url fra backend og tar bruker til Spotifys innloggingssides
export async function startAuth() {
    try {
        const res = await fetch(`${BASE_URL}/start-auth`);
        if (!res.ok) throw new Error('Failed to get auth url from routes/auth.js');
        const {url} = await res.json();
        window.location.href = url;
    } catch (err) {
        console.error('startAuth error: ', err);
        throw err;
    }
}

// henter auth code fra url for å få access token 
export function getAuthCode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
}

// bruker code for å få access token
export async function fetchAccessToken(code) {
    try {
        const res = await fetch(`${BASE_URL}/get-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({code})
        });

        if (!res.ok) throw new Error('Failed to fetch access token');
        const data = await res.json();

        localStorage.setItem('acces_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        return data;
    } catch (err) {
        console.error('Error fetching access token: ', err);
        throw err;
    }
}

// refreshing the token
export async function refreshAccessToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) throw new Error('No refresh token stored');

    try {
        const res = await fetch(`${BASE_URL}/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token })
        });

        if (!res.ok) throw new Error('Failed to refresh token');
        const { access_token } = await res.json();
        localStorage.setItem('acces_token', access_token);
        return access_token;
    } catch (err) {
        console.error('Error refreshing token:', err);
        throw err;
    }
}
