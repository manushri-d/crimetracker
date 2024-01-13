import React, { useState } from "react"
export const Login = (given) => {
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');
 
    const handleLogin = async (e) => {
        e.preventDefault();
        const url = new URL('http://127.0.0.1:5000/search_user');
        url.search = new URLSearchParams({ userid: userid }).toString();
    
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
              }
            
            const searchData = await response.json();
    
            if (!searchData || searchData.length === 0) {
                given.onPageSwitch('register');
                return;
            }
            else
            {
                given.onPageSwitch('home');

            }
        } catch (error) {
            console.error('Error:', error);
        }
      };
         return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-specifics" onSubmit={handleLogin}>
                <label htmlFor="userid">UserId</label>
                <input value={userid} onChange={(e) => setUserId(e.target.value)}type="userid" placeholder="md38" id="userid" name="userid"/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="ilove411" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button className="reglogin-specifics" onClick={() => given.onPageSwitch('register')}>No Account? Register here</button>
        </div>
    )
}