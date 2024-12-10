import React from 'react'
import DashboardCards from './DashbaordCards'
import { DashboardGraphs } from './DashboardGraphs'
import { DashboardPieChart } from './DashboardPieChart'

export const DashboardOverview = () => {
  return (
    <div className="jobseeker-dashboard-section">
      <div>
        <DashboardCards />
        <DashboardGraphs />
        <DashboardPieChart />
      </div>
    </div>
  )
}
