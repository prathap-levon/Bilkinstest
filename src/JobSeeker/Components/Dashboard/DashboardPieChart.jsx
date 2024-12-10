import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Dropdown, Menu, Space } from "antd";
import DefaultUser from "../../Assets/Images/DefaultUser.png";
import { FaRegThumbsUp } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
export const DashboardPieChart = () => {
  const jobData = [
    { name: "Surgeons", value: 34.9, color: "#ce1b28" },
    { name: "Nurse", value: 23.8, color: "#F0B8BC" },
    { name: "Lab Techs", value: 24, color: "#F8DDDF" },
    { name: "Doctor", value: 30, color: "#FAE8EA" },
  ];
  const filter = (
    <Menu>
      <Menu.Item key="1">Filter 1</Menu.Item>
      <Menu.Item key="2">Filter 2</Menu.Item>
    </Menu>
  );
  const renderLegend = (data) => {
    if (!data || data.length === 0) return null;
    return (
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {data.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: "var(--text-color)" }}>
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: entry.color,
                borderRadius: "50%",
                marginRight: "8px",
              }}
            ></span>
            {entry.name} - {entry.value}%
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dashboard-piechart-section">
      <div className="row mt-4">
        <div className="col-lg-7 mb-4">
          <div className="jobseeker-dashboard-card">
            <div className="jobseeker-dashboard-title mb-2">
              <h2>Overall Jobs</h2>
            </div>
            <div className="jobseeker-horizontal-line mb-3"></div>
            <div
              className="d-flex align-items-center jobseeker-piechart "
              style={{ position: "relative" }}
            >
              <PieChart width={300} height={200} className="w-200 h-200">
                <Pie
                  data={jobData}
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="80%"
                  innerRadius={100}
                  outerRadius={120}
                  dataKey="value"
                  paddingAngle={5}
                >
                  {jobData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <p>Updated Sep 01, 2024</p>
              <div style={{ marginLeft: "16px" }}>
                {renderLegend(jobData)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 mb-4">
          <div className="jobseeker-dashboard-card">
            <div className="d-flex justify-content-between">
              <div className="jobseeker-dashboard-title mb-2">
                <h2>Latest Activity</h2>
              </div>
              <div>
                <Dropdown overlay={filter} placement="bottomLeft">
                  <button className="jobseeker-dashboard-filter">
                    <Space>See All</Space>
                  </button>
                </Dropdown>
              </div>
            </div>
            <div className="jobseeker-horizontal-line mb-3"></div>
            <div className="d-flex flex-column gap-2 jobseeker-latest-activities ">
              <div className="d-flex dashboard-latest-activity justify-content-between ">
                <div className="d-flex gap-2 align-items-center">
                  <img src={DefaultUser} alt="" />
                  <div>
                    <h4>Applied to Job</h4>
                    <p>
                      <FaRegThumbsUp /> &nbsp; Pathology Surgeon | 2h ago
                    </p>
                  </div>
                </div>
                <div>
                  <IoEllipsisHorizontal />
                </div>
              </div>
              <div className="d-flex dashboard-latest-activity justify-content-between ">
                <div className="d-flex gap-2 align-items-center">
                  <img src={DefaultUser} alt="" />
                  <div>
                    <h4>Applied to Job</h4>
                    <p>
                      <FaRegThumbsUp /> &nbsp; Pathology Surgeon | 2h ago
                    </p>
                  </div>
                </div>
                <div>
                  <IoEllipsisHorizontal />
                </div>
              </div>
              <div className="d-flex dashboard-latest-activity justify-content-between ">
                <div className="d-flex gap-2 align-items-center">
                  <img src={DefaultUser} alt="" />
                  <div>
                    <h4>Applied to Job</h4>
                    <p>
                      <FaRegThumbsUp /> &nbsp; Pathology Surgeon | 2h ago
                    </p>
                  </div>
                </div>
                <div>
                  <IoEllipsisHorizontal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
