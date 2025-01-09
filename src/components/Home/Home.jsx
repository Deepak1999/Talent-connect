import React, { useEffect, useState } from "react";
import './Home.css';
import ApiBaseUrl from "../Api_base_url/ApiBaseUrl";
import Swal from 'sweetalert2';
import { useTable } from "react-table";

const Home = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [mobileNumber, setMobileNumber] = useState("");
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const PageSize = 5;
    const userId = '1';
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [generateMessages, setGenerateMessages] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState('');
    const [selectedFilter, setSelectedFilter] = useState("");
    const [tempId, setTempId] = useState(null);


    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSelectMessage = (message) => {
        setTempId(message.id);
        setSelectedMessage(message);
    };

    const handleChannelChange = (id) => {
        setSelectedChannel(id);
    };

    const handleMobileNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value);
        }
    };

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {
            setFirstName(value);
            setError('');
        } else {
            setError('Only alphabetic characters are allowed');
        }
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {
            setLastName(value);
            setError('');
        } else {
            setError('Only alphabetic characters are allowed');
        }
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {
            setCity(value);
            setError('');
        } else {
            setError('Only alphabetic characters are allowed');
        }
    };

    const handleFilterChange = (id) => {
        setSelectedFilter(id);
    };

    const handleFormClear = () => {
        setFirstName('');
        setLastName('');
        setMobileNumber('');
        setCity('');
        setSelectedMessage('');
        setGenerateMessages('');
        setSelectedFilter('');
        setMessages('');
        setSelectedChannel('');
    }

    const fetchTemplates = async () => {
        try {
            const response = await fetch(`${ApiBaseUrl}/get-templates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'userId': userId,
                },
                body: JSON.stringify({ channel: selectedFilter })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const data = await response.json();

            setMessages(data.response);
        } catch (err) {
            setError('Failed to fetch messages');
        }
    };

    useEffect(() => {
        if (selectedFilter) {
            fetchTemplates();
        }
    }, [selectedFilter]);

    const generateMessage = async () => {
        try {
            const response = await fetch(`${ApiBaseUrl}/gen-message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "userId": userId,
                },
                body: JSON.stringify({
                    candidateFirstName: firstName,
                    candidateLastName: lastName,
                    candidateContact: mobileNumber,
                    candidateLocation: city,
                    channel: selectedFilter,
                    template: tempId,
                })
            });

            if (!response.ok) {
                throw new Error("Failed to generate message");
            }

            const data = await response.json();
            setGenerateMessages(data.response);

        } catch (error) {
            setError("Error generating message");
        }
    };

    const SendMessage = async () => {
        try {
            const response = await fetch(`${ApiBaseUrl}/send-message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "userId": userId,
                },
                body: JSON.stringify({
                    candidateFirstName: firstName,
                    candidateLastName: lastName,
                    candidateContact: mobileNumber,
                    candidateLocation: city,
                    channel: selectedFilter,
                    template: tempId,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();

            if (data.statusCode === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent Successful',
                    text: data.statusMessage || 'Message Sent Successful.',
                });
                handleFormClear();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'failed to sent message',
                    text: data.statusMessage || 'Error to sent message.',
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'An error occurred while sending the message.',
            });
        }
    };


    const handleSendClick = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to send this message?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, send it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                SendMessage();
                setActiveTab('profile');
            }
        });
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Candidate Contact',
                accessor: 'candidateContact',
            },
            {
                Header: 'Channel',
                accessor: 'channel',
            },
            {
                Header: 'Sent Date Time',
                accessor: 'responseDateTime',
            },
            {
                Header: 'Messages Sent',
                accessor: 'messageSent',
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    `${ApiBaseUrl}/messages-list`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            userId: userId,
                            pageNo: currentPage,
                            pageSize: PageSize,
                        },
                    }
                );

                const result = await response.json();
                // console.log("message _list", result);

                setData(result.response.content || []);
                setTotalPages(result.response.totalPages || 0);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [userId, currentPage]);

    return (
        <div className="container py-3">
            <div className="content-box p-4">
                <div className="row">
                    <div className="col-12">
                        <h3>Talent Connect</h3>
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
                                    Sent Messages
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
                                <div>
                                    <div className="d-flex align-items-center flex-wrap gap-4 mb-4">
                                        <h4 className="m-0">Select Channel</h4>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="channel"
                                                id="channel-text"
                                                value="text"
                                                checked={selectedChannel === "SMS"}
                                                onChange={() => {
                                                    handleChannelChange("SMS");
                                                }}
                                                onClick={() => handleFilterChange("1")}
                                            />
                                            <label className="form-check-label" htmlFor="channel-text">
                                                SMS
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
                                                onChange={() => {
                                                    handleChannelChange("whatsapp");
                                                }}
                                                onClick={() => handleFilterChange("2")}
                                            />
                                            <label className="form-check-label" htmlFor="channel-whatsapp">
                                                WhatsApp
                                            </label>
                                        </div>
                                    </div>

                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                            Messages
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {error ? (
                                                <li><button className="dropdown-item" type="button">{error}</button></li>
                                            ) : (
                                                messages && messages.length > 0 ? (
                                                    messages.map((message) => (
                                                        <li key={message.id}>
                                                            <button
                                                                className="dropdown-item"
                                                                type="button"
                                                                onClick={() => handleSelectMessage(message)}
                                                            >
                                                                <strong>{message.templateKey}</strong>: {message.templateValue}
                                                            </button>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li><button className="dropdown-item" type="button">No Messages</button></li>
                                                )
                                            )}
                                        </ul>
                                        {selectedMessage && (
                                            <div className="mt-3">
                                                <p><strong>Selected Message:</strong></p>
                                                <p><strong>{selectedMessage.templateKey}</strong>: {selectedMessage.templateValue}</p>
                                            </div>
                                        )}
                                    </div>
                                    {selectedChannel === "SMS" && (
                                        <>
                                            <h4>Candidate Information SMS</h4>
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
                                                    <div className="col-md-3 d-flex flex-column align-items-start text-end mb-3">
                                                        <button type="button" className="btn btn-primary mt-auto" onClick={generateMessage}>Generate</button>
                                                    </div>
                                                </div>
                                                <div className="row generate_box">
                                                    <div className="col-md-6">
                                                        <div className="form-floating">
                                                            <textarea className="form-control" value={generateMessages} style={{ height: "90px" }} readOnly></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md- d-flex justify-content-center align-items-center gap-3">
                                                        <button type="submit" className="btn btn-success" onClick={handleSendClick}>Send</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    )}
                                    {selectedChannel === "whatsapp" && (
                                        <>
                                            <h4>Candidate Information WhatsApp</h4>
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
                                                    <div className="col-md-3 d-flex flex-column align-items-start text-end mb-3">
                                                        <button type="button" className="btn btn-primary mt-auto" onClick={generateMessage}>Generate</button>
                                                    </div>
                                                </div>
                                                <div className="row generate_box">
                                                    <div className="col-md-6">
                                                        <div className="form-floating">
                                                            <textarea className="form-control" value={generateMessages} style={{ height: "90px" }} readOnly></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md- d-flex justify-content-center align-items-center gap-3">
                                                        <button type="submit" className="btn btn-success" onClick={handleSendClick}>Send</button>
                                                        {/* <button type="submit" className="btn btn-success" onClick={handleFormClear}>Clear all</button> */}

                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    )}

                                </div>
                            </div>
                            <div
                                className={`tab-pane fade ${activeTab === "profile" ? "show active" : ""}`}
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                            >
                                <div>
                                    <table {...getTableProps()} style={{ width: '100%', border: '1px solid black' }}>
                                        <thead style={{ textAlign: "center" }}>
                                            {headerGroups.map(headerGroup => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map(column => (
                                                        <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '10px' }}>
                                                            {column.render('Header')}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody {...getTableBodyProps()} style={{ textAlign: "center" }}>
                                            {rows.map(row => {
                                                prepareRow(row);
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {row.cells.map(cell => {
                                                            return (
                                                                <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '10px' }}>
                                                                    {cell.render('Cell')}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                    {/* Pagination Controls */}
                                    <div style={{ textAlign: "center" }} className="mt-3">
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                            Previous
                                        </button>
                                        <span> Page {currentPage} of {totalPages} </span>
                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                            Next
                                        </button>
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