import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import "../CommonCss/style.css";
import Header from '../Header/Header';

const BulkMessageSent = () => {
    return (
        <section class="right_panel" id="talent_connect">
            <div>
                <Header />
                <Sidebar />
                <Footer />
            </div>
        </section>
    )
}

export default BulkMessageSent;