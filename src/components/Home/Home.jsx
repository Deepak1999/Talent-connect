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
    const [selectedFilter, setSelectedFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const tableData = [
        { firstName: "Mark", lastName: "Otto", handle: "@mdo" },
        { firstName: "Jacob", lastName: "Thornton", handle: "@fat" },
        { firstName: "Jacob", lastName: "Thornton", handle: "@fat" },
        { firstName: "Jacob", lastName: "Thornton", handle: "@fat" },
        { firstName: "Jacob", lastName: "Thornton", handle: "@fat" },
        { firstName: "John", lastName: "Doe", handle: "@johndoe" },
        { firstName: "Jane", lastName: "Doe", handle: "@janedoe" },
        { firstName: "Michael", lastName: "Smith", handle: "@mikesmith" },
        { firstName: "Sarah", lastName: "Lee", handle: "@sarahlee" },
        { firstName: "Anna", lastName: "Kim", handle: "@annakim" }
    ];

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

    const handleFilterChange = (id) => {
        setSelectedFilter(id);
      };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    return (
        <div className="container py-3">
            <div className="content-box p-4">
                <div className="row">
                    <div className="col-12">
                        <h3>Welcome To Talent Connect</h3>
                        <ul className="nav nav-pills justify-content-cente gap-3 mb-4" id="pills-tab" role="tablist">
                            <li className="nav-item m-" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                                    id="pills-home-tab"
                                    onClick={() => handleTabClick("home")}
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected={activeTab === "home"}
                                >
                                    Send Message
                                </button>
                            </li>
                            <li className="nav-item m-" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                                    id="pills-profile-tab"
                                    onClick={() => handleTabClick("profile")}
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected={activeTab === "profile"}
                                >
                                    View Sent Messages
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
                                <div className="">
                                    {/* Channel Selection */}
                                    <div className="d-flex align-items-center flex-wrap gap-4 mb-4">
                                        <h4 className="m-0">Select Channel</h4>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="channel"
                                                id="channel-text"
                                                value="text"
                                                checked={selectedChannel === "text"}
                                                onChange={() => handleChannelChange("text")}
                                                onClick={() => handleFilterChange("1")}
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
                                                onClick={() => handleFilterChange("2")}
                                            />
                                            <label className="form-check-label" htmlFor="channel-whatsapp">
                                                WhatsApp
                                            </label>
                                        </div>
                                    </div>

                                    <div className="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                            Messages
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <li><button className="dropdown-item" type="button"><i class="fas fa-envelope"></i> Action</button></li>
                                            <li><button className="dropdown-item" type="button"><i class="fas fa-envelope"></i> Action</button></li>
                                            <li><button className="dropdown-item" type="button"><i class="fas fa-envelope"></i> Action</button></li>
                                        </ul>
                                    </div>

                                    {/* Display Candidate Information for Selected Channel */}
                                    {selectedChannel === "text" && (
                                        <>
                                            <h4>Candidate Information</h4>
                                            <form>
                                                <div className="row generate_btn_row gap-">
                                                    <div className="col-md-3 mb-3">
                                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="firstName"
                                                            value={firstName}
                                                            onChange={handleFirstNameChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="lastName"
                                                            value={lastName}
                                                            onChange={handleLastNameChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            id="mobileNumber"
                                                            value={mobileNumber}
                                                            onChange={handleMobileNumberChange}
                                                            maxLength="10"
                                                            minLength="10"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <label htmlFor="location" className="form-label">City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="location"
                                                            value={city}
                                                            onChange={handleCityChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-3 d-flex flex-column align-items-start text-end mb-3"><button type="submit" className="btn btn-primary mt-auto">Generate</button></div></div>
                                                <div className="row generate_box">
                                                    <div className="col-md-6">
                                                        <div className="form-floating">
                                                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md- d-flex justify-content-center align-items-center gap-3">
                                                        <button type="submit" className="btn btn-success">Send</button>
                                                        <button type="submit" className="btn btn-danger">Cancel</button>
                                                    </div>
                                                </div>
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
                                <div className="">
                                    <h3>Your Profile</h3>
                                    <p>This is the content for the Profile tab. You can add profile details here.</p>

                                    {/* Profile Table */}
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">S No.</th>
                                                <th scope="col">First</th>
                                                <th scope="col">Last</th>
                                                <th scope="col">Handle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRows.map((data, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1 + (currentPage - 1) * rowsPerPage}</th>
                                                    <td>{data.firstName}</td>
                                                    <td>{data.lastName}</td>
                                                    <td>{data.handle}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Pagination Controls */}
                                    <div>
                                        <ul className="pagination justify-content-center gap-2">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                                                    Previous
                                                </button>
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link">{currentPage}</span>
                                            </li>
                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;