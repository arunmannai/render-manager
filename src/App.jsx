import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const App = () => {
  const [selectedApp, setSelectedApp] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios("https://arunflask.onrender.com/render")
      .then((response) => response.data)
      .then((data) => {
        setApps(data);
      });
  };

  const handleDropdownChange = (event) => {
    setSelectedApp(event.target.value);
  };

  const handleInput1Change = (event) => {
    setInput1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInput2(event.target.value);
  };

  const handleReset = () => {
    setSelectedApp("");
    setInput1("");
    setInput2("value");
    setApiResponse("");
  };

  const getRepo = () => {
    let app = apps.find(app => app.name === selectedApp);
    if (!app) return "";
    return app.repo.substring(19);
  };

  const getBranch = () => {
    let app = apps.find(app => app.name === selectedApp);
    if (!app) return "";
    return app.branch;
  };

  const getEnvVar = () => {
    let app = apps.find(app => app.name === selectedApp);
    if (!app) return "";
    return (<ul>
       {app.envVar.map(item => <li key={item.key}>{item.key}: {item.value}</li>)}
    </ul>)
  };

  const handleSubmit = async () => {
    try {
      // Make API call using selectedOption, input1, and input2
      const response = await fetch("https://arunflask.onrender.com/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedApp, input1, input2 }),
      });

      // Assuming the API returns JSON data
      const data = await response.json();
      setApiResponse(data.message); // Set the API response in state
    } catch (error) {
      console.error("Error:", error);
      setApiResponse("Error occurred while fetching data");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="heading">Render Manager</h2>
      <label htmlFor="dropdown">Select Your App:</label>
      <select
        className="form-select"
        id="dropdown"
        onChange={handleDropdownChange}
        value={selectedApp}
      >
        <option value=""></option>
        {apps.map((app) => (
          <option value={app.name} key={app.name}>
            {app.name}
          </option>
        ))}
      </select>
      {selectedApp && (
        <>
          <p>
            {getRepo()} ({getBranch()})
          </p>
          {getEnvVar()}
        </>
      )}

      <label htmlFor="input1" className="mt-3">
        Key:
      </label>
      <input
        type="text"
        className="form-control"
        id="input1"
        value={input1}
        onChange={handleInput1Change}
      />

      <label htmlFor="input2" className="mt-3">
        Value:
      </label>
      <input
        type="text"
        className="form-control"
        id="input2"
        value={input2}
        onChange={handleInput2Change}
      />

      <button className="btn btn-secondary mt-3 me-2" onClick={handleReset}>
        Reset
      </button>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>

      {apiResponse && <p className="mt-3">API Response: {apiResponse}</p>}
    </div>
  );
};
export default App;
