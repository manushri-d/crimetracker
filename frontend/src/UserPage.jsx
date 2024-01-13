import React, { useState } from "react";

export const UserPage = (given) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [race, setRace] = useState('');
    const [area_name, setAreaName] = useState('');
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState(null);

    const handleSearch = async (e) => {
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
            
            const responseData = await response.json();
  
            if (Array.isArray(responseData) && responseData.length > 0) {
                setUserDetails(responseData); 
            } else {
                setUserDetails([]); 
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    const handleUpdate = async (e) => {
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
            const response = await fetch('http://127.0.0.1:5000/update_user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const formData = {
            userid: userid,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/delete_user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="hello-page">
            <form onSubmit={handleSearch}>
                <div className="column">
                    <h2>Current Log In Info</h2>
                    <label htmlFor="userid">UserId</label>
                    <input onChange={(e) => setUserId(e.target.value)} type="text" placeholder="md38" id="search" />
                    <button type="submit">Enter</button>
                </div>
            </form>
            {userDetails && userDetails.length > 0 ? (
                <div className="table-container1">
                <table>
                    <thead>
                    <tr>
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Race</th>
                        <th>Sex</th>
                        <th>AreaName</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userDetails.map((area, index) => (
                        <tr key={index}>
                        <td>{area.UserId}</td>
                        <td>{area.Name}</td>
                        <td>{area.Age}</td>
                        <td>{area.Race}</td>
                        <td>{area.Sex}</td>
                        <td>{area.AreaName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <div>No data available</div>
            )}
        <button className="back-user-container" onClick={() => given.onPageSwitch('home')}>Go Home</button>
            <form>
                <label htmlFor="name">New Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="ManushriDilipkumar" id="name" name="name" />
                <label htmlFor="age">New Age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="20" id="age" name="age" />
                <label htmlFor="sex">New Sex</label>
                <input value={sex} onChange={(e) => setSex(e.target.value)} type="text" placeholder="F" id="sex" name="sex" />
                <label htmlFor="race">New Race</label>
                <input value={race} onChange={(e) => setRace(e.target.value)} type="text" placeholder="Z" id="race" name="race" />
                <label htmlFor="area_name">New Area Name</label>
                <input value={area_name} onChange={(e) => setAreaName(e.target.value)} type="text" placeholder="VanNuys" id="area_name" name="area_name" />
                <div>
                    <button type="button" onClick={handleUpdate}>Update</button>
                    <button type="button" onClick={handleDelete}>Delete</button>
                </div>
            </form>
        </div>
    )
}
