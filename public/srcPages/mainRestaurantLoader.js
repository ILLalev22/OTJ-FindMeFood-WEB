const API_URL = 'https://mzdgxgylkfedgxhiujeu.supabase.co/rest/v1/restaurantDataBase';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16ZGd4Z3lsa2ZlZGd4aGl1amV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMjc4MTUsImV4cCI6MjA1NzcwMzgxNX0.A8-KYGKsyWMNvX_1xtkSA_cqy9zKNoBHNx8VwLaBv1E';

export async function loadRestaurants(map)
{
    try
    {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'apikey': API_KEY,
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const restaurants = await response.json();

        for (const item of restaurants)
        {
            if (!item.location)
            {
                continue;
            }

            const locationParts = item.location.split(',');
            if (locationParts.length !== 2)
            {
                continue;
            }

            const latitude = parseFloat(locationParts[0]);
            const longitude = parseFloat(locationParts[1]);

            if (isNaN(latitude) || isNaN(longitude))
            {
                continue;
            }

            const restaurantName = item.name || "Unknown";

            const marker = L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup(`<b>${restaurantName}</b>`);
        }
    }
    catch (error)
    {
        console.error('Failed to load restaurants:', error);
    }
}
