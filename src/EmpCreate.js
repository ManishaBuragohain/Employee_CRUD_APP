import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Validator } from "validator";

function EmpCreate() {
  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [active, activeChange] = useState(true);
  const [validation, valChange] = useState(false);
  // const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { email, name, phone, active };

    const phoneRegex = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;

    if (!phoneRegex.test(phone)) {
      setIsValidPhoneNumber(false);
      return;
    }

    fetch("http://localhost:4000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("saved successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee create</h2>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <lable>ID</lable>
                      <input
                        disabled="disabled"
                        value={id}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <lable>Name</lable>
                      <input
                        required
                        value={name}
                        placeholder="Enter Name"
                        onChange={(e) => nameChange(e.target.value)}
                        onMouseDown={(e) => valChange(true)}
                        className="form-control"
                      ></input>
                      {name.length === 0 && validation && (
                        <span className="text-danger"> Please enter name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <lable>Email</lable>
                      <input
                        value={email}
                        onChange={(e) => emailChange(e.target.value)}
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <lable>Phone</lable>
                      <input
                        id="input"
                        value={phone}
                        onChange={(e) => phoneChange(e.target.value)}
                        className="form-control"
                        placeholder="enter phone number"
                      ></input>
                      {!isValidPhoneNumber && (
                        <span className="text-danger">
                          {" "}
                          Please Enter Valid Phone number
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => activeChange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <lable className="form-check-label">Is Active</lable>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        {" "}
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmpCreate;
