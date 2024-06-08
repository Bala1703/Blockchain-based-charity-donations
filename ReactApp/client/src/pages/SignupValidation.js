function Verification(data) {
    let exception = {}
    const pattern_e = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pattern_p = /^.*$/;
    if (data.emailid === "")
        exception.emailid = "Please enter your email"
    else if (!pattern_e.test(data.emailid))
        exception.emailid = "Email did not match";
    else
        exception.emailid = "";
    if (data.username === "")
        exception.username = "Please enter your name"
    else
        exception.username = "";
    if (data.password === "")
        exception.password = "Please enter your password";
    else if (!pattern_p.test(data.password))
        exception.password = "Password did not match";
    else
        exception.password = "";
    return exception;

}

export default Verification
