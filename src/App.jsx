import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AppManager = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInput1Change = (event) => {
    setInput1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInput2(event.target.value);
  };

  const handleReset = () => {
    setSelectedOption('');
    setInput1('');
    setInput2('');
    setApiResponse('');
  };

  const handleSubmit = async () => {
    try {
      // Make API call using selectedOption, input1, and input2
      const response = await fetch('your_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedOption, input1, input2 }),
      });

      // Assuming the API returns JSON data
      const data = await response.json();
      setApiResponse(data.message); // Set the API response in state
    } catch (error) {
      console.error('Error:', error);
      setApiResponse('Error occurred while fetching data');
    }
  };

  return (
    <div className="container mt-4">
      <label htmlFor="dropdown">Select Your App:</label>
      <select className="form-select" id="dropdown" onChange={handleDropdownChange} value={selectedOption}>
        <option value="option1">Arun CMS</option>
        <option value="option2">Arun ISP</option>
        {/* Add more options as needed */}
      </select>

      <label htmlFor="input1" className="mt-3">NODE_VERSION:</label>
      <input type="text" className="form-control" id="input1" value={input1} onChange={handleInput1Change} />

      <label htmlFor="input2" className="mt-3">Value</label>
      <input type="text" className="form-control" id="input2" value={input2} onChange={handleInput2Change} />

      <button className="btn btn-secondary mt-3 me-2" onClick={handleReset}>Reset</button>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>

      {apiResponse && <p className="mt-3">API Response: {apiResponse}</p>}
    </div>
  );
};

export default AppManager;