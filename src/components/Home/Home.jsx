import React, { useState } from "react";
import './Home.css';

const Home = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [selectedChannel, setSelectedChannel] = useState();
    const [mobileNumber, setMobileNumber] = useState("");
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleChannelChange = (channel) => {
        setSelectedChannel(channel);
    };

    const handleMobileNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value);
        }
    };

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z]*$/.test(value)) {
            setFirstName(value);
            setError('');
        } else {
            setError('Only alphabetic characters are allowed');
        }
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z]*$/.test(value)) {
            setLastName(value);
            setError('');
        } else {
            setError('Only alphabetic characters are allowed');
        }
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z]*$/.test(value)) {
            setCity(value);
            setError('');
        } else {
            setError('Only alphabetic characters are allowed');
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <ul className="nav nav-pills justify-content-center mb-4" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                                id="pills-home-tab"
                                onClick={() => handleTabClick("home")}
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected={activeTab === "home"}
                            >
                                Home
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                                id="pills-profile-tab"
                                onClick={() => handleTabClick("profile")}
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected={activeTab === "profile"}
                            >
                                Profile
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="col-12">
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className={`tab-pane fade ${activeTab === "home" ? "show active" : ""}`}
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                        >
                            <div className="content-box p-4">
                                {/* Channel Selection */}
                                <div className="mb-4">
                                    <h4>Select Channel</h4>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="channel"
                                            id="channel-text"
                                            value="text"
                                            checked={selectedChannel === "text"}
                                            onChange={() => handleChannelChange("text")}
                                        />
                                        <label className="form-check-label" htmlFor="channel-text">
                                            Text
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="channel"
                                            id="channel-whatsapp"
                                            value="whatsapp"
                                            checked={selectedChannel === "whatsapp"}
                                            onChange={() => handleChannelChange("whatsapp")}
                                        />
                                        <label className="form-check-label" htmlFor="channel-whatsapp">
                                            WhatsApp
                                        </label>
                                    </div>
                                </div>

                                {/* Display Candidate Information for Selected Channel */}
                                {selectedChannel === "text" && (
                                    <>
                                        <h4>Candidate Information</h4>
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstName"
                                                    placeholder="Enter first name"
                                                    value={firstName}
                                                    onChange={handleFirstNameChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    placeholder="Enter last name"
                                                    value={lastName}
                                                    onChange={handleLastNameChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="mobileNumber"
                                                    placeholder="Enter mobile number"
                                                    value={mobileNumber}
                                                    onChange={handleMobileNumberChange}
                                                    maxLength="10"
                                                    minLength="10"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="location" className="form-label">City</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="location"
                                                    placeholder="Enter City"
                                                    value={city}
                                                    onChange={handleCityChange}
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </>
                                )}

                                {selectedChannel === "whatsapp" && (
                                    <>
                                        <h4>Candidate Information for WhatsApp</h4>
                                        <p>WhatsApp-specific content here.</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Profile Tab with Table */}
                        <div
                            className={`tab-pane fade ${activeTab === "profile" ? "show active" : ""}`}
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                        >
                            <div className="content-box p-4">
                                <h3>Your Profile</h3>
                                <p>This is the content for the Profile tab. You can add profile details here.</p>

                                {/* Profile Table */}
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
