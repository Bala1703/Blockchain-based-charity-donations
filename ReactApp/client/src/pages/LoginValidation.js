function Verification(data) {
    let exceptions = {};
    const pattern_e = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pattern_p = /^.*$/;

    if (!data.emailid || data.emailid.trim() === "")
        exceptions.emailid = "Please provide an email address";
    else if (!pattern_e.test(data.emailid))
        exceptions.emailid = "Email did not match";
    else
        exceptions.emailid = "";

    if (!data.password || data.password.trim() === "")
        exceptions.password = "Password should not be empty";
    else if (!pattern_p.test(data.password))
        exceptions.password = "Password did not match ";
    else
        exceptions.password = "";

    return exceptions;
}

export default Verification;
