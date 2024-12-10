import React, { useState } from "react";
import { Faqs } from "./Faq";
export const HelpSupportOverview = () => {
const [activeTab, setActiveTab] = useState("FAQ");
  const renderTabs = () => {
    switch (activeTab) {
      case "FAQ":
        return <Faqs />;
      default:
        return <Faqs />;
    }
  };
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="tab-group">
            {["FAQ"].map((tab) => (
              <button
                key={tab}
                className={`tabs ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">{renderTabs()}</div>
      </div>
    </>
  );
};
