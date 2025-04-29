import { sha256 } from '../srcPages/FMFHASH.js';

const apiUrl = 'https://mzdgxgylkfedgxhiujeu.supabase.co/rest/v1/rpc/authenticateUser';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16ZGd4Z3lsa2ZlZGd4aGl1amV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMjc4MTUsImV4cCI6MjA1NzcwMzgxNX0.A8-KYGKsyWMNvX_1xtkSA_cqy9zKNoBHNx8VwLaBv1E';

export async function authenticate(username, password)
{
    const hashedPassword = await sha256(password);

    const payload = {
        p_username: username,
        p_password: hashedPassword
    };

    try
    {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                apikey: apiKey,
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0 || !('authenticated' in data[0]))
        {
            return false;
        }

        if (data[0].authenticated)
        {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('usernameData', username);
            localStorage.setItem('passwordData', hashedPassword);
            return true;
        }
        else
        {
            localStorage.setItem('loggedIn', 'false');
            localStorage.removeItem('usernameData');
            localStorage.removeItem('passwordData');
            return false;
        }

    }
    catch (error)
    {
        console.error('Authentication error:', error);
        return false;
    }
}

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) =>
{
    e.preventDefault();

    const usernameInput = document.getElementById('usernameInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();

    const success = await authenticate(usernameInput, passwordInput);

    if (success)
    {
        window.location.href = '../mainPages/main.html';
    }
    else
    {
        alert('Incorrect username or password!');
    }
});
