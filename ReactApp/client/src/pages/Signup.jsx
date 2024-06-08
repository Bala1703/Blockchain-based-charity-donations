import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import Verification from "./SignupValidation";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({
    username: "",
    emailid: "",
    password: "",
    typeofuser: "donor", 
  });

  const nav = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Verification(data));

    if (errors.username === "" && errors.emailid === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/signup", data)
        .then((res) => {
          console.log(res.data);
          if (res.data === "Duplicate") {
            alert("Email already registered");
          } else if (res.data === "Error") {
            alert("Internal Server Error");
          } else {
            nav("/login");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInput = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 " style={{ backgroundColor: "#000" }}>
      <div className=" p-5  w-25 rounded-lg " style={{ backgroundColor: "#fff" }}>
        <h2 className="m-2  text-center text-[#000] text-[20px] font-bold">Create Account</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="m-3">
            <label style={{ color: "black" }} htmlFor="username">Username</label>
            <input type="text" style={{ backgroundColor: "#FFFFFF", color: "black" }} onChange={handleInput} name="username" className="form-control -[10px]"></input>
            {errors.username && <span className="text-danger">{errors.username}</span>}
          </div>
          <div className="m-3">
            <label style={{ color: "black" }} htmlFor="emailid">Email</label>
            <input type="email" style={{ backgroundColor: "#FFFFFF", color: "black" }} onChange={handleInput} name="emailid" className="form-control -[10px]"></input>
            {errors.emailid && <span className="text-danger">{errors.emailid}</span>}
          </div>
          <div className="m-3">
            <label style={{ color: "black" }} htmlFor="password">Password</label>
            <input type="password" style={{ backgroundColor: "#FFFFFF", color: "black" }} onChange={handleInput} name="password" className="form-control -[10px]"></input>
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <div className="m-3">
            <label style={{ color: "black" }} htmlFor="typeofuser">Type of user</label>
            <select style={{ backgroundColor: "#FFFFFF", color: "black" }} name="typeofuser" onChange={handleInput} className="form-control -[10px]">
              <option value="beneficiary">Needy</option>
              <option value="donor">Donor</option>
              <option value="charity">Charity</option>
            </select>
          </div>
          <div className="flex justify-center items-center">
            <button type="submit" className="btn btn-success w-3/5  " style={{ backgroundColor: "#fff", border: "2px solid #000",color:"black" }}>Sign Up</button>
          </div>
          <div className="flex justify-center items-center">
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
