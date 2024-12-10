import React from 'react';
import { IoBagRemove } from "react-icons/io5";
import { TbFiles } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
const cardData = [
    { icon: IoBagRemove, title: 'Total Recruiters', value: 150 },
    { icon: TbFiles, title: 'Total Applicants', value: 250 },
    { icon: FaRegHeart, title: 'Total Clients', value: 180 },
    { icon: GrAnnounce, title: 'Total No. of jobs', value: 150 },
];

const DashboardCards = () => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
            {cardData.map(({ icon: Icon, title, value }, index) => (
                <div key={index} className="col">
                    <div className="jobseeker-dashboard-card">
                        <div className="card-body d-flex align-items-center">
                            <div className="icon-wrapper bg-danger bg-opacity-10 p-3 rounded-circle me-3">
                                <Icon className="text-danger" size={24} />
                            </div>
                            <div>
                                <h6 className="card-subtitle mb-1">{title}</h6>
                                <h2 className="card-title mb-0">{value}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardCards;
