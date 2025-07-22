//
// kommuniserer med backend router auth.js på http://localhost:3000/auth
//
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