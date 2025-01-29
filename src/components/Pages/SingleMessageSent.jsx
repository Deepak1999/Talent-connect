import React from 'react'
import "../CommonCss/style.css";
import firstname from "../Images/firstname.png";
import lastname from "../Images/lastname.png";
import mobile from "../Images/mobile.png";
import city from "../Images/city.png";
import sendmessage from "../Images/sendmessage.png";
import clear from "../Images/clear.png";
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const SingleMessageSent = () => {
    return (
        <section class="right_panel" id="talent_connect">
            <Header />
            <section className="main_body py-3">
                <h5 className="select_channel fw-bold py-2 px-xl-5 px-3 m-0">Select Channel</h5>

                <section className="py-3 px-xl-5 px-3">
                    <div className="d-flex flex-wrap gap-3">
                        <div className="form-check mb-0">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                <i className="fas fa-envelope-open-text"></i> <strong>Text Message</strong>
                            </label>
                        </div>
                        <div className="form-check mb-0">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                checked
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                <i className="fab fa-whatsapp"></i> <strong>What's App</strong>
                            </label>
                        </div>
                        <div className="form-check mb-0">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault3"
                                checked
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                <i className="far fa-envelope"></i> <strong>Email</strong>
                            </label>
                        </div>
                    </div>
                </section>

                <h5 className="select_channel fw-bold py-2 px-xl-5 px-3 m-0">
                    Candidate Information
                </h5>

                <form className="py-3 px-xl-5 px-3 m-0">
                    <div className="row">
                        <div className="col-sm-3 col-6 my-3">
                            <div className="input_box input-container mt-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputUserName1"
                                    aria-describedby="usernameHelp"
                                    placeholder="First Name"
                                />
                                <label className="d-block AxOyFc snByac">First Name</label>
                                <img
                                    className="img-fluid d-block icn_img"
                                    src={firstname}
                                    alt="First Name Icon"
                                />
                            </div>
                        </div>

                        <div className="col-sm-3 col-6 my-3">
                            <div className="input_box input-container mt-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputUserName2"
                                    aria-describedby="usernameHelp"
                                    placeholder="Last Name"
                                />
                                <label className="d-block AxOyFc snByac">Last Name</label>
                                <img
                                    className="img-fluid d-block icn_img"
                                    src={lastname}
                                    alt="Last Name Icon"
                                />
                            </div>
                        </div>

                        <div className="col-sm-3 col-6 my-3">
                            <div className="input_box input-container mt-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputMobNum1"
                                    aria-describedby="usernameHelp"
                                    placeholder="Mobile Number"
                                />
                                <label className="d-block AxOyFc snByac">Mobile Number</label>
                                <img
                                    className="img-fluid d-block icn_img"
                                    src={mobile}
                                    alt="Mobile Number Icon"
                                />
                            </div>
                        </div>

                        <div className="col-sm-3 col-6 my-3">
                            <div className="input_box input-container mt-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputUserCity1"
                                    aria-describedby="usernameHelp"
                                    placeholder="City"
                                />
                                <label className="d-block AxOyFc snByac">City</label>
                                <img
                                    className="img-fluid d-block icn_img"
                                    src={city}
                                    alt="City Icon"
                                />
                            </div>
                        </div>

                        <div className="my-3">
                            <select className="form-select select_menu" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">
                                    <b>pre-onboard:</b> 123 is the OTP for Altruist Location Tracker registration. Valid for 10 min
                                    only. Altruist NRM.
                                </option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <div className="my-3">
                            <textarea
                                className="form-control text_area"
                                placeholder="Leave a comment here"
                                id="floatingTextarea"
                            />
                        </div>

                        <div className="d-flex justify-content-center align-items-center flex-wrap gap-4 mt-4">
                            <button type="button" className="btn btn-success d-flex align-items-center px-4 gap-1">
                                <img
                                    className="img-fluid d-block icn_img"
                                    src={sendmessage}
                                    alt="Send Icon"
                                />
                                <span>Send Message</span>
                            </button>
                            <button type="button" className="btn btn-danger d-flex align-items-center px-4 gap-1">
                                <img
                                    className="img-fluid d-block icn_img"
                                    src={clear}
                                    alt="Clear Icon"
                                />
                                <span>Clear Message</span>
                            </button>
                        </div>
                    </div>
                </form>
            </section>
            <Sidebar />
            <Footer />
        </section>
    );
};

export default SingleMessageSent;