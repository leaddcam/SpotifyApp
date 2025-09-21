import { useEffect } from 'react';
import { getAuthCode, fetchAccessToken } from '../api/auth';

function Home() {
  useEffect(() => {
    const code = getAuthCode();
    console.log(code);

    if (code) {
      fetchAccessToken(code)
        .then((data) => {
          console.log('Access token mottatt:', data.access_token);
          
          // rydder opp i url-en
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch((err) => {
          console.error('Feil ved henting av token:', err);
        });
    }
  }, []);

  return (
    <div>
      <h1>Velkommen!</h1>
      <p>Du er logget inn med Spotify </p>
    </div>
  );
}

export default Home;
