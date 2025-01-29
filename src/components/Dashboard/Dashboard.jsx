import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import "../CommonCss/style.css";

const Dashboard = () => {
    return (
        <section class="right_panel" id="talent_connect">
            <div >
                <Header />
                <Sidebar />
            </div>
        </section>
    );
};

export default Dashboard;
