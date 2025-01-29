import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import ApiBaseUrl from '../Api_base_url/ApiBaseUrl';

const ViewSentMessages = () => {
    const [data, setData] = useState([]);
    const userId = '1';
    const [currentPage, setCurrentPage] = useState(0);
    const PageSize = 10;
    const [totalPages, setTotalPages] = useState(0);


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
            setTotalPages(result.response.totalPages || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [userId, currentPage]);

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

    return (
        <section className="right_panel" id="talent_connect">
            <Header />

            <section className="main_body py-3">
                <h5 className="select_channel fw-bold py-2 px-xl-5 px-3 m-0">Message Sent History</h5>
                <div className="table-responsive py-3 px-xl-5 px-3 m-0">
                    <table {...getTableProps()} className="table table-striped table-bordered dataTable table-sm m-0">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div style={{ textAlign: "center" }} className="mt-3">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                            Previous
                        </button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </section>

            <Sidebar />

            <Footer />
        </section>
    );
};

export default ViewSentMessages;
