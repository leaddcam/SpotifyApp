import { startAuth } from '../api/auth'; // Sørg for at denne peker riktig

export default function Login() {
  const handleLogin = () => {
    startAuth(); // tar bruker til Spotifys innloggingsside og starter OAuth-flowen
  };

  return (
    <div className="login-page">
      <h1>Velkommen</h1>
      <button onClick={handleLogin}>
        Logg inn med Spotify
      </button>
    </div>
  );
}
