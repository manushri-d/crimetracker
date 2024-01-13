import React, { useState } from "react"
export const Register = (given) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [race, setRace] = useState('');
    const [area_name, setAreaName] = useState('');
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const formData = {
            userid: userid,
            name: name,
            age: age,
            race: race,
            sex: sex,
            area_name: area_name,
        };
    
        try {
            const response = await fetch('http://127.0.0.1:5000/add_user', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
    
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    

    return (
        <div className="login-container">
            <h2>Register</h2>
            <form className="register-specifics" onSubmit={handleRegister}>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}type="text" placeholder="ManushriDilipkumar" id="name" name="name"/>
                <label htmlFor="age">Age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)}type="number" placeholder="20" id="age" name="age"/>
                <label htmlFor="sex">Sex</label>
                <input value={sex} onChange={(e) => setSex(e.target.value)}type="text" placeholder="F" id="sex" name="sex"/>
                <label htmlFor="race">Race</label>
                <input value={race} onChange={(e) => setRace(e.target.value)}type="text" placeholder="Z" id="race" name="race"/>
                <label htmlFor="area_name">Area Name</label>
                <input value={area_name} onChange={(e) => setAreaName(e.target.value)}type="text" placeholder="Van Nuys" id="area_name" name="area_name"/>
                <label htmlFor="userid">UserId</label>
                <input value={userid} onChange={(e) => setUserId(e.target.value)}type="text" placeholder="md38" id="userid" name="userid"/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="ilove411" id="password" name="password"/>
                <button type="submit">Create</button>
            </form>
            <button className="reglogin-specifics" onClick={() => given.onPageSwitch('login')}>Have an Account? Login here</button>
        </div>
    )
}