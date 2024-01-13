import React, { useState } from "react"
export const Report = (given) => {
    const [DR_NO, setDRNO] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [race, setRace] = useState('');
    const [area_name, setAreaName] = useState('');
    const [area_code, setAreaCode] = useState('');

    const handleReport = async (e) => {
        e.preventDefault();
    
        const formData = {
            DR_NO: DR_NO,
            area_code: area_code,
            age: age,
            race: race,
            sex: sex,
            area_name: area_name,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/report_crime', {
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
            <h2>Report</h2>
            <form className="report-specifics" onSubmit={handleReport}>
                <button className="back-container1" onClick={() => given.onPageSwitch('home')}>Go Home</button>
                <label htmlFor="DR_NO">DR_NO</label>
                <input value={DR_NO} onChange={(e) => setDRNO(e.target.value)}type="text" placeholder="900" id="DR_NO" name="DR_NO"/>
                <label htmlFor="age">Age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)}type="number" placeholder="20" id="age" name="age"/>
                <label htmlFor="sex">Sex</label>
                <input value={sex} onChange={(e) => setSex(e.target.value)}type="text" placeholder="F" id="sex" name="sex"/>
                <label htmlFor="race">Race</label>
                <input value={race} onChange={(e) => setRace(e.target.value)}type="text" placeholder="Z" id="race" name="race"/>
                <label htmlFor="area_name">Area Name</label>
                <input value={area_name} onChange={(e) => setAreaName(e.target.value)}type="text" placeholder="Van Nuys" id="area_name" name="area_name"/>
                <label htmlFor="area_code">Area Code</label>
                <input value={area_code} onChange={(e) => setAreaCode(e.target.value)}type="text" placeholder="000" id="area_code" name="area_code"/>
                <button type="submit">Create</button>
                {}
            </form>
            {}
        </div>
    )
}