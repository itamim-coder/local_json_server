import React, { useState } from "react";


function EditForm(props) {
  const [companyData, setcompanyData] = useState({});
  const [companyLogo, setcompanyLogo] = useState(null);
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...companyData, companyLogo };
    newData[field] = value;
    setcompanyData(newData);

    console.log(newData);
  };
  const id = props.id;
  console.log(id);
  console.log(companyData);
  
  const handleSubmit = (e) => {
    console.log(props.id);
    fetch(`http://localhost:3001/data/${id}`, {
      method: "PUT",
      body: JSON.stringify(companyData),
      headers: { "content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        companyData({});
        e.preventDefault();
      })
      .catch(console.log);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Company Name"
            name="company_name"
            onBlur={handleOnBlur}
            required=""
            autofocus=""
            className="form-control rounded-pill border-0 shadow-sm px-4"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Enter Nationality"
            name="nationality"
            onBlur={handleOnBlur}
            required=""
            autofocus=""
            className="form-control rounded-pill border-0 shadow-sm px-4"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Ownership"
            name="ownership"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4"
          />
        </div>
        <div className="col-md-2">
          <label for="formFile" className="form-label">
            Upload Image
          </label>
          <input
            className="form-control"
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => setcompanyLogo(e.target.files[0])}
            id="formFile"
          />
        </div>
        <button
          type="submit"
          className="btn btn-warning fw-bold btn-block text-uppercase mb-2 rounded-pill shadow-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditForm;
