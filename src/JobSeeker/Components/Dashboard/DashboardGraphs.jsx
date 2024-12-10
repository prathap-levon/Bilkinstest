import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BsEmojiFrown, BsEmojiNeutral, BsEmojiSmile } from "react-icons/bs";
import { LuFilter } from "react-icons/lu";

const data = [
  { name: "Quarter 1", Applications: 50, Applications2: 75 },
  { name: "Quarter 2", Applications: 80, Applications2: 60 },
  { name: "Quarter 3", Applications: 100, Applications2: 85 },
  { name: "Quarter 4", Applications: 30, Applications2: 10 },
];
const reviewCounts = {
  negative: 400,
  neutral: 800,
  positive: 2113
};
const totalReviews = reviewCounts.negative + reviewCounts.neutral + reviewCounts.positive;
export const DashboardGraphs = () => {
  return (
    <div className="jobseeker-dashboard-graph-section">
        <div className="row mt-4">
          <div className="col-lg-7">
            <div className="jobseeker-dashboard-card">
              <div className="jobseeker-dashboard-title mb-2">
                <h2>Overall Job Applications</h2>
              </div>
              <div className="jobseeker-horizontal-line"></div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Applications"
                    fill="#ce1b28"
                    name="Applications"
                    barSize={20}
                    radius={4}
                  />
                  <Bar
                    dataKey="Applications2"
                    fill="#000000"
                    name="Applications2"
                    barSize={20}
                    radius={4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-lg-5 mt-4 mt-lg-0 mt-xl-0 ">
            <div className="jobseeker-dashboard-card">
              <div className="jobseeker-dashboard-title mb-2 ">
                <h2>Reviews</h2>
              </div>
              <div className="jobseeker-horizontal-line"></div>
              <div className="review-bars my-5">
                <div
                  className="review-bar negative"
                  style={{ width: `${(reviewCounts.negative / totalReviews) * 100}%` }}
                ></div>
                <div
                  className="review-bar neutral"
                  style={{ width: `${(reviewCounts.neutral / totalReviews) * 100}%` }}
                ></div>
                <div
                  className="review-bar positive"
                  style={{ width: `${(reviewCounts.positive / totalReviews) * 100}%` }}
                ></div>
              </div>
              <div className="review-labels ">

                <div className="review-label">
                  <p>Negative</p>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="icon-negative"><BsEmojiFrown /></span>
                    <span className="count">{reviewCounts.negative}</span>
                  </div>
                </div>
                <div className="review-label">
                  <p>Neutral</p>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="icon-neutral"><BsEmojiNeutral /></span>
                    <span className="count">{reviewCounts.neutral}</span>
                  </div>
                </div>
                <div className="review-label">
                  <p>Positive</p>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="icon-positive"><BsEmojiSmile /></span>
                    <span className="count">{reviewCounts.positive}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
