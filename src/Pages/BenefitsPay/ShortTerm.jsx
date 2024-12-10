import React from 'react';

import BannerShort from '../../Components/BenefitsPay/ShortTerm/BannerSickLeave';
import ContentSickLeave from '../../Components/BenefitsPay/ShortTerm/ContentSickLeave';

const ShortTerm = () => {
  return (
    <div className="container-xxl">
    <BannerShort />
    <ContentSickLeave />
    </div>
  )
}

export default ShortTerm;