import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const App = () => {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState("");
  const [envKey, setEnvKey] = useState("");
  const [envValue, setEnvValue] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios("https://arunflask.onrender.com/render")
      .then(response => setApps(response.data));
  };

  const handleDropdownChange = (event) => {
    setSelectedApp(event.target.value);
  };

  const handleEnvKeyChange = (event) => {
    setEnvKey(event.target.value);
  };

  const handleEnvValueChange = (event) => {
    setEnvValue(event.target.value);
  };

  const handleReset = () => {
    setSelectedApp("");
    setEnvKey("");
    setEnvValue("");
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
    return displayEnvVars(app.envVar);
  };

  const displayEnvVars = (envVars) => {
    return (<ul>
      {envVars.map(item => <li key={item.key}>{item.key}: {item.value}</li>)}
    </ul>);
  };

  const handleSubmit = () => {
    axios.post("https://arunflask.onrender.com/render", {
      name: selectedApp,
      key: envKey,
      value: envValue
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setApiResponse(response.data);
      fetchData();
    })
    .catch(error => {
      console.error("Error:", error);
      setApiResponse("Error occurred while submitting data");
    });
  };

  if (!apps.length) {
    return (
      <div className="container mt-4">
        <h2 className="heading text-center">Render Manager</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="heading text-center">Render Manager</h2>
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

      <label htmlFor="envkey" className="mt-3">
        Key:
      </label>
      <input
        type="text"
        className="form-control"
        id="envkey"
        value={envKey}
        onChange={handleEnvKeyChange}
      />

      <label htmlFor="envvalue" className="mt-3">
        Value:
      </label>
      <input
        type="text"
        className="form-control"
        id="envvalue"
        value={envValue}
        onChange={handleEnvValueChange}
      />

      <button className="btn btn-secondary mt-3 me-2" onClick={handleReset}>Reset</button>
      <button className="btn btn-primary mt-3" onClick={handleSubmit} disabled={!selectedApp || !envKey || !envValue}>Submit</button>
      {apiResponse && <p className="mt-3">API Response:</p>}
      {apiResponse && Array.isArray(apiResponse) && displayEnvVars(apiResponse)}
      {apiResponse && !Array.isArray(apiResponse) && <p>{JSON.stringify(apiResponse)}</p>}
    </div>
  );
};
export default App;
