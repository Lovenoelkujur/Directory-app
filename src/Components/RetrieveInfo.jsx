/* eslint-disable react/no-unknown-property */
import { useState } from "react";

const RetrieveInfo = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [result, setResult] = useState(null);

  // Function to handle form submission and search for Aadhar Number in local storage
  const handleSearch = () => {
    if (!aadharNumber || aadharNumber.length !== 12 || isNaN(aadharNumber)) {
      alert("Please enter a valid 12-digit Aadhar Number.");
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("people")) || [];
    const found = storedData.find((person) => person.aadhar === aadharNumber);

    if (found) {
      setResult(found);
    } else {
      setResult("No match found");
    }
  };

  return (
    <div className="retrieve-info-page">
      <h3 className="page-head">Retrieve Information</h3>

      {/* Input Form */}
      <div className="search-form">
        <label htmlFor="aadharInput">Enter Aadhar Number:</label>
        <input
          type="text"
          id="aadharInput"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          placeholder="Enter 12-digit Aadhar Number"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Result Section */}
      <div className="result-section">
        {result ? (
          typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <table frame="box" rules="all">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Aadhar Number</th>
                  <th>Mobile Number</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{result.name}</td>
                  <td>{result.dob}</td>
                  <td>{result.aadhar}</td>
                  <td>{result.mobile}</td>
                  <td>{result.age}</td>
                </tr>
              </tbody>
            </table>
          )
        ) : (
          <p>Enter an Aadhar Number to search.</p>
        )}
      </div>
    </div>
  );
};

export default RetrieveInfo;
