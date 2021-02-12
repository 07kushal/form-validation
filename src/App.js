import "./App.css";
import React, { Component } from "react";

const formValid = (allFormData) => {
    const { formErrors, firstName, lastName, email, password } = allFormData;
    let valid = true;
    Object.values(formErrors).forEach((value) => {
        value.length > 0 && (valid = false);
    });
    if (!firstName) {
        formErrors["firstName"] = "First Name is requirer!";
    }
    if (!lastName) {
        formErrors["lastName"] = "Last Name is requirer!";
    }
    if (!email) {
        formErrors["email"] = "Email is requirer!";
    }
    if (!password) {
        formErrors["password"] = "Password is requirer!";
    }
    return { valid, formErrors };
};
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit");
        const { valid, formErrors } = formValid(this.state);
        if (valid) {
            console.log(`
          --SUBMITTING--
          First Name : ${this.state.firstName}
          Last Name : ${this.state.lastName}
          Email : ${this.state.email}
          Password : ${this.state.password}
          `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE.");
        }
        this.setState({ formErrors });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characters required." : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 3 characters required." : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address.";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characters required." : "";
                break;
            default:
                break;
        }
        // console.log(name, value, "handleChange");
        this.setState({ formErrors, [name]: value }, () => {
            console.log(this.state);
        });
    };
    render() {
        const { formErrors } = this.state;
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Create Account</h1>
                    <form
                        autoComplete="off"
                        noValidate
                        onSubmit={this.handleSubmit}
                    >
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className={
                                    formErrors.firstName.length > 0
                                        ? "error"
                                        : ""
                                }
                                placeholder="First Name"
                                name={"firstName"}
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.firstName.length > 0 && (
                                <span className="errorMessage">
                                    {formErrors.firstName}
                                </span>
                            )}
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className={
                                    formErrors.lastName.length > 0
                                        ? "error"
                                        : ""
                                }
                                placeholder="Last Name"
                                name={"lastName"}
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.lastName.length > 0 && (
                                <span className="errorMessage">
                                    {formErrors.lastName}
                                </span>
                            )}
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className={
                                    formErrors.email.length > 0 ? "error" : ""
                                }
                                placeholder="Email"
                                name={"email"}
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">
                                    {formErrors.email}
                                </span>
                            )}
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                className={
                                    formErrors.password.length > 0
                                        ? "error"
                                        : ""
                                }
                                placeholder="Password"
                                name={"password"}
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">
                                    {formErrors.password}
                                </span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit">Create Account</button>
                            <small>Already have an account?</small>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
