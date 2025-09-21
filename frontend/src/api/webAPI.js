const express = require('express');

const BASE_URL = 'http://localhost:3000/spotify-api';

// henter brukerens toppsanger
export async function getTopSongs() {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        await refreshAccessToken();
        return getTopSongs(); // Prøv på nytt
      }
      throw new Error('Failed to fetch top songs');
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching top songs:', error);
    return [];
  }
}
