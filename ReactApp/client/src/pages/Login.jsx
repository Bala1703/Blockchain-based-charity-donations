    import React, { useState } from "react";
    import {useNavigate } from "react-router-dom";
    import Verification from "./LoginValidation";
    import axios from "axios";

    function Login() {
        const [data, setData] = useState({
            emailid: "",
            password: "",
        });
        const [fieldWarnings, setFieldWarnings] = useState({});
        const nav = useNavigate();

        const handleSubmit = (event) => {
            event.preventDefault();
            const invalidFields = Verification(data);
            setFieldWarnings(invalidFields);

            if (!invalidFields.emailid && !invalidFields.password) {
                axios
                    .post("http://localhost:8081/login", data)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data === "beneficiary") {
                            nav("/beneficiary-dashboard/");
                        } else if (res.data === "donor") {
                            nav("/Donator-homepage/");
                        } else if (res.data === "charity") {
                            nav("/charityorg-dashboard/");
                        } else {
                            alert("Invalid username or password");
                        }
                    })
                    .catch((err) => console.log(err));
            }
        };

        const handleInput = (event) => {
            setData({
                ...data,
                [event.target.name]: event.target.value,
            });
        };

        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#000" }}>
                <div className="p-5 w-25" style={{ backgroundColor: "#fff" }}>
                    <h2 style={{ color: "#000" }} className="m-2 text-center text-[#4ACD8D] text-[20px] font-bold">Log In</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="m-3">
                            <label style={{ color: "black" }} htmlFor="email">Email</label>
                            <input
                                type="email"
                                style={{ backgroundColor: "#FFFFFF", color: "black" }}
                                onChange={handleInput}
                                name="emailid"
                                className="form-control "
                            ></input>
                            {fieldWarnings.emailid && <span className="text-danger">{fieldWarnings.emailid}</span>}
                        </div>
                        <div className="m-3">
                            <label style={{ color: "black" }} htmlFor="password">Password</label>
                            <input
                                type="password"
                                style={{ backgroundColor: "#FFFFFF", color: "black" }}
                                onChange={handleInput}
                                name="password"
                                className="form-control "
                            ></input>
                            {fieldWarnings.password && <span className="text-danger">{fieldWarnings.password}</span>}
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="btn btn-success w-3/5 "
                                style={{ backgroundColor: "#fff", border: "2px solid #000",color:"#000" }}
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    export default Login;
