import React from 'react'
import { HealthCareBanner } from '../../Components/HealthCareStaffing/HealthCareBanner'
import { HealthCareDetails } from '../../Components/HealthCareStaffing/HealthCareDetails'
import Clientele from '../../Components/Career/clientele'

export const HealthCare = () => {
  return (
    <div className="container-xxl">
        <HealthCareBanner/>
        <HealthCareDetails/>
        <Clientele/>
    </div>
  )
}
