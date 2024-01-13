import React, { useState } from "react";

export const Specifics = (given) => {
  const [userid, setUserId] = useState("");
  const [occurrences, setOccurrences] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
        try {
            const response = await fetch(`http://127.0.0.1:5000/specifics_data?userid=${encodeURIComponent(userid)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
              }
            
  
      
      const data = await response.json();
      if (data.occurrences== null)
        setOccurrences(0 );
    else
        setOccurrences(data.occurrences);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  return (
    <div className="home-container">
      <h1>Crime Tracker</h1>
      <form className="search-container" onSubmit={handleSubmit}>
        <h2>Enter userID to Display Specifics</h2>
        <label htmlFor="userid">UserId</label>
        <input value={userid} onChange={(e) => setUserId(e.target.value)}type="text" placeholder="md38" id="userid" name="userid"/>     
        <button type="submit">Submit</button>
        <button className="back-container" onClick={() => given.onPageSwitch('home')}>Go Home</button>
      </form>
      {occurrences !== null && (
        <div className="spec-container">
          <h3>Crimes commited in your area matching your biodata: {occurrences}</h3>
          {}
        </div>
      )}
    </div>
  );
};
