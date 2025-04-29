async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const API_URL = 'https://mzdgxgylkfedgxhiujeu.supabase.co/rest/v1/rpc/authenticateUser';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16ZGd4Z3lsa2ZlZGd4aGl1amV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMjc4MTUsImV4cCI6MjA1NzcwMzgxNX0.A8-KYGKsyWMNvX_1xtkSA_cqy9zKNoBHNx8VwLaBv1E';

export async function authenticate(username, password) {
    const hashedPassword = await sha256(password);

    const payload = {
        p_username: username,
        p_password: hashedPassword
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'apikey': API_KEY,
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0 || !('authenticated' in data[0])) {
            return false;
        }

        if (data[0].authenticated) {
            localStorage.setItem('usernameData', username);
            localStorage.setItem('passwordData', hashedPassword);
            return true;
        } else {
            localStorage.removeItem('usernameData');
            localStorage.removeItem('passwordData');
            return false;
        }

    } catch (error) {
        console.error('Authentication error:', error);
        return false;
    }
}

// Connect to the login form
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('usernameInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value;

    const success = await authenticate(usernameInput, passwordInput);

    if (success) {
        window.location.href = '../mainPages/main.html'; // Go to main page
    } else {
        alert('Incorrect username or password!');
    }
});
