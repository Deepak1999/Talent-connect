import React from 'react';
import { Link } from 'react-router-dom';
import "../CommonCss/style.css";
import altLogo from '../Images/AltLogo.png';
import image2 from '../Images/416a8b2e84db41d0e311602e6443d17d.png';
import image3 from '../Images/0d4957626ec61f10cf2cfff20ef6b53d.png';
import image4 from '../Images/78eeec2639a8297681a4abd1c5196da9.png';
import image5 from '../Images/de08d8b663a3a89a5f9557e7b9d5d51a.png';

const Sidebar = () => {
    return (
        <section className="sidebar" id="sidebar">
            <div className="header-left header_left_1 w-100 d-flex text-center d-none d-md-block h-auto float-none order-md-0 order-1">
                <img
                    src={altLogo}
                    className="img-fluid d-block m-auto"
                    alt="Logo"
                />
                <h5 className="text-white text-center m-0 mt-3">
                    Talent Connect <br />HR Portal
                </h5>
            </div>

            <div className="menu_scrollbar">
                <div className="dropdown">
                    <Link to="/dashboard" className="btn d-flex align-items-center">
                        <i className="fas fa-home"></i><span>Dashboard</span>
                    </Link>

                    <Link
                        to="/single-message-sent"
                        className="btn d-flex align-items-center dropdown-toggle"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-auto-close="outside"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            className="img-fluid d-block sidebar_icn"
                            src={image2}
                            alt="Send Message"
                        />
                        <span>Send Message</span>
                    </Link>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <Link className="dropdown-item" to="/single-message-sent">
                            <img
                                className="img-fluid d-block sidebar_icn"
                                src={image3}
                                alt="Single Person"
                            />
                            <span>Single Person</span>
                        </Link>
                        <Link className="dropdown-item" to="/bulk-message-sent">
                            <img
                                className="img-fluid d-block sidebar_icn"
                                src={image4}
                                alt="Multiple Person"
                            />
                            <span>Multiple Person</span>
                        </Link>
                    </div>
                </div>
                <div className="dropdown">
                    <Link to="/message-history" className="btn d-flex align-items-center">
                        <img
                            className="img-fluid d-block sidebar_icn"
                            src={image5}
                            alt="Message History"
                        />
                        <span>Message History</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;
