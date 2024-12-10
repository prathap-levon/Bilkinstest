import { SearchOutlined } from "@ant-design/icons";
import { Input, Table, Button } from "antd";
import React, { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { TbArrowsSort } from "react-icons/tb";
import { DownloadOutlined } from "@ant-design/icons"; // Ant Design download icon
import { useNavigate } from "react-router-dom";
export const Payroll = () => {
    const [searchText, setSearchText] = useState("");
const navigate=useNavigate();
    const columns = [
        {
            title: "Employee ID",
            dataIndex: "employeeId",
            key: "employeeId",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Employer",
            dataIndex: "employer",
            key: "employer",
        },
        {
            title: "Salary",
            dataIndex: "salary",
            key: "salary",
            render: (text) => `$ ${text}`, // Format salary with dollar sign
        },
        {
            title: "Payment details",
            dataIndex: "paymentDetails",
            key: "paymentDetails",
        },
        {
            title: "Email ID",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Actions",
            key: "actions",
            render: () => (
                <DownloadOutlined style={{color:"var(--maroon-color)"}}/>
            ),
        },
    ];

    const data = [
        {
            key: "1",
            employeeId: "001",
            name: "Steven Stake",
            employer: "BGS Hospital",
            salary: "240.00",
            paymentDetails: "Jan, 2025",
            email: "StevenSt@gmail.com",
        },
        {
            key: "2",
            employeeId: "001",
            name: "Steven Stake",
            employer: "BGS Hospital",
            salary: "240.00",
            paymentDetails: "Dec, 2024",
            email: "StevenSt@gmail.com",
        },
        {
            key: "3",
            employeeId: "001",
            name: "Steven Stake",
            employer: "BGS Hospital",
            salary: "240.00",
            paymentDetails: "Nov, 2024",
            email: "StevenSt@gmail.com",
        },
        {
            key: "4",
            employeeId: "001",
            name: "Steven Stake",
            employer: "BGS Hospital",
            salary: "240.00",
            paymentDetails: "Oct, 2024",
            email: "StevenSt@gmail.com",
        },
        {
            key: "5",
            employeeId: "001",
            name: "Steven Stake",
            employer: "BGS Hospital",
            salary: "240.00",
            paymentDetails: "Sep, 2024",
            email: "StevenSt@gmail.com",
        },
    ];

    return (
        <div className="container">
            <div className="row mt-2">
                <h4>Payroll</h4>
                <div className="d-flex justify-content-between mt-2">
                    <Input
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="search-input-table"
                        prefix={<SearchOutlined />}
                    />
                    <div className="d-flex gap-4">
                        <button className="jobseeker-basic-button">
                            <span>Sort</span>{" "}
                            <TbArrowsSort style={{ fontWeight: "bold", fontSize: "16px" }} />
                        </button>
                        <button className="jobseeker-basic-button">
                            <LuFilter /> Filter
                        </button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="payroll-table mt-4"
                />
                <div>
                    <button className="jobseeker-basic-button" onClick={()=>navigate('/user/profile')}>Back</button>
                </div>
            </div>
        </div>
    );
};
