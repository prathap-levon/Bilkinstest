import React, { useState, useEffect } from "react";
import { Collapse, Space } from "antd";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Loader from "../../../Loader";
import Instance from "../../../AxiosConfig";
import { showErrorAlert } from "../../../globalConstant";

export const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeKey, setActiveKey] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  const fetchFaqs = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get("/getAllWebFQAs", {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        setFaqs(response?.data?.webFQAs);
      }
    } catch (error) {
      console.error(error);
      showErrorAlert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onCollapseChange = (key) => {
    setActiveKey(key);
  };

  const genExtra = (key) => (
    activeKey.includes(key) ? (
      <CiCircleMinus
        className="faq-plus-icon"
      />
    ) : (
      <CiCirclePlus
        className="faq-plus-icon"
      />
    )
  );

  const renderHeaderWithNumber = (faq, index) => {
    const isExpanded = activeKey.includes(faq.key);
    return (
      <div className="faq-header">
        <span className={isExpanded ? "faq-number expanded" : "faq-number"}>{index + 1}.</span>
        <span className={isExpanded ? "faq-question expanded" : "faq-question"}>
          {faq.question}
        </span>
      </div>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="faq-section">
        <div className="row">
          <h3>Frequently Asked Questions</h3>
        </div>
        <div className="mt-4">
          <Space direction="vertical" className="faq-collapse" size={20}>
            <Collapse
              onChange={onCollapseChange}
              activeKey={activeKey}
              accordion={false}
              bordered={false}
              expandIconPosition={null}
            >
              {faqs?.map((faq, index) => (
                <Collapse.Panel
                  key={faq._id}
                  header={renderHeaderWithNumber(faq, index)}
                  extra={genExtra(faq._id)}
                  className="faq-panel"
                  style={{ border: "1px solid #ddd", borderRadius: "5px", marginBottom: "10px" }}
                  showArrow={false}
                >
                  <p>{faq.answer}</p>
                </Collapse.Panel>
              ))}
            </Collapse>
          </Space>
        </div>
      </div>
    </>
  );
};
