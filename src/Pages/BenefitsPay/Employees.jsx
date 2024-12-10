import React from 'react';
import BannerSickLeave from '../../Components/BenefitsPay/Employees/BannerSickLeave';
import ContentSickLeave from '../../Components/BenefitsPay/Employees/ContentSickLeave';

const Employees = () => {
  return (
    <div className="container-xxl">
    <BannerSickLeave />
    <ContentSickLeave />
    </div>
  )
}

export default Employees;