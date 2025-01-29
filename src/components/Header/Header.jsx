import React from 'react';
import "../CommonCss/style.css";
import image1 from '../Images/Group55.png';
import image2 from '../Images/us.png';
import image3 from '../Images/de.png';

const Header = () => {
    return (
        <header className="header_1" id="header_1">
            <div className="container-fluid d-flex header_box justify-content-between gap-2 w-100 my-auto align-items-center py-2 p-">
                <h4 className="text-capitalize fw-bold m-0">HR Portal</h4>

                <div className="dropdown mx-3" id="country">
                    <a
                        className="btn dropdown-toggle d-flex align-items-center p-0"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img src={image1} className="img-fluid d-block user_img" alt="User" />
                        <span className="d-block text-capitalize mx-2">User1234</span>
                    </a>

                    <div className="dropdown-menu">
                        <div className="dropdown-item d-flex align-items-center" href="#">
                            <img src={image2} className="img-fluid d-block" alt="English" />
                            <span>English</span>
                        </div>

                        <div className="dropdown-item d-flex align-items-center" href="#">
                            <img src={image3} className="img-fluid d-block" alt="German" />
                            <span>German</span>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
