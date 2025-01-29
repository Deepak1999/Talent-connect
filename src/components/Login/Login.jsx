import React, { useState } from 'react';
import "../CommonCss/style.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(true);

    // Initialize useNavigate hook
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Use navigate to redirect to the dashboard
        navigate('/single-message-sent'); // Correct way to navigate
    };

    return (
        <section className="log_in position-relative px_15 p- pb- d-flex bg_18 h_vh" id="log_in">
            <form className="bg_8 w_46 position-relative pxy_5 m-auto ms-auto me-0" onSubmit={handleSubmit}>
                <h3 className="text-center fw-bold text-dark m-0">Log In</h3>
                <div className="my-4">
                    <div className="input_box input-container mt-0">
                        <input
                            type="email"
                            className="form-control border-"
                            id="exampleInputUserName1"
                            aria-describedby="usernameHelp"
                            placeholder="Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="d-block AxOyFc snByac">Enter user ID</label>
                        <i className="fas fa-user d-block"></i>
                    </div>
                    <div className="input_box input-container mb-">
                        <input
                            type="password"
                            className="form-control border-"
                            id="exampleInputPassword1"
                            aria-describedby="passwordHelp"
                            placeholder="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="d-block AxOyFc snByac">Enter ID Password</label>
                        <i className="fas fa-lock d-block"></i>
                    </div>
                    <div className="form-check justify-content-en">
                        <input
                            className="form-check-input bg-transparen"
                            type="checkbox"
                            value={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            id="flexCheckDefault"
                            checked={termsAccepted}
                        />
                        <label className="form-check-label text-whit" htmlFor="flexCheckDefault">
                            I agree to the Terms of Service.
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="input_box text-white text-capitalize rounded-pill fw-bold border-0 btn btn_primary bg-whit fs-5 d-block w-100 py-3 m-0 mx-auto"
                >
                    Login
                </button>
                <hr className="mt-5 my-4" />
                <span className="d-block text-center">Do you have an Account?</span>
            </form>
        </section>
    );
};

export default Login;
