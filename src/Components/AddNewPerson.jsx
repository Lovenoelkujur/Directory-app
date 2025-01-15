/* eslint-disable react/no-unknown-property */

import { useState, useEffect } from "react";

const AddNewPerson = () => {
  const [rows, setRows] = useState([]);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("people")) || [];
    setRows(storedData);
  }, []);

  // Calculate Age from Date of Birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Add Row
  const addRow = () => {
    setRows([...rows, { name: "", dob: "", aadhar: "", mobile: "", age: "", saved: false }]);
  };

  // Handle Input Change
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index
        ? { ...row, [field]: value, age: field === "dob" ? calculateAge(value) : row.age }
        : row
    );
    setRows(updatedRows);
  };

  // Save Row to local storage
  const saveRow = (index) => {
    const row = rows[index];

    // Validation
    if (!row.name || !row.dob || !row.aadhar || !row.mobile) {
      alert("All fields are required");
      return;
    }

    if (row.aadhar.length !== 12 || isNaN(row.aadhar)) {
      alert("Aadhar Number must be a 12-digit number.");
      return;
    }

    if (row.mobile.length !== 10 || isNaN(row.mobile)) {
      alert("Mobile Number must be a 10-digit number.");
      return;
    }

    // Update the row's saved state
    const updatedRows = rows.map((row, i) => (i === index ? { ...row, saved: true } : row));
    setRows(updatedRows);

    // Save all rows to local storage
    localStorage.setItem("people", JSON.stringify(updatedRows));
    alert("Row Saved Successfully!");
  };

  // Delete Row
  const deleteRow = (index) => {
    const row = rows[index];
    const updatedRows = rows.filter((_, i) => i !== index);

    if (row.saved) {
      const storedData = JSON.parse(localStorage.getItem("people")) || [];
      const updatedStoredData = storedData.filter((_, i) => i !== index);
      localStorage.setItem("people", JSON.stringify(updatedStoredData));
    }

    setRows(updatedRows);
  };

  return (
    <div className="add-new-person-page">
      <h3 className="page-head">Add New Person</h3>

      {/*------- Table  -----------*/}
      <table frame="box" rules="all">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                  disabled={row.saved}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.dob}
                  onChange={(e) => handleInputChange(index, "dob", e.target.value)}
                  disabled={row.saved}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Aadhar Number"
                  value={row.aadhar}
                  onChange={(e) => handleInputChange(index, "aadhar", e.target.value)}
                  disabled={row.saved}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={row.mobile}
                  onChange={(e) => handleInputChange(index, "mobile", e.target.value)}
                  disabled={row.saved}
                />
              </td>
              <td>{row.age || "-"}</td>
              <td>
                {!row.saved && <button onClick={() => saveRow(index)}>Save</button>}
                <button onClick={() => deleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*----------- Button to Add a New Person Row ---------*/}
      <button onClick={addRow} className="add-row-btn">
        Add Row
      </button>
    </div>
  );
};

export default AddNewPerson;
