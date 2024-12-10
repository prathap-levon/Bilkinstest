import { Avatar, Progress, Tag, Table, Modal, Input, Checkbox, Form } from "antd";
import React, { memo, useEffect, useState } from "react";
import image1 from "../../Assets/Images/profile1.png";
import { TbProgress } from "react-icons/tb";
import { FaRegHandshake } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import Instance from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { useSelector, useDispatch } from "react-redux";
import { formateDate, showErrorAlert, showSuccessAlert } from "../../../globalConstant";
import { setClaimRequests, addClaimRequest, deleteClaimRequest, editClaimRequest } from "../../../features/referralClaimRequestsSlice";

export const ReferalStatus = memo(() => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accountDetail, setAccountDetail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
  const claimRequests = useSelector((state) => state?.referralClaimRequests?.claimRequests);

  const fetchUserWallet = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get("/getUserWallet", {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        }
      });
      if (response.status === 200) {
        setWallet(response?.data?.wallet);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchClaimRequests = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get("/getClaimRequestsByUser", {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      console.log('Rishi', response?.data?.claimRequests);
      if (response.status === 200) {
        dispatch(setClaimRequests(response?.data?.claimRequests));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserWallet();
    fetchClaimRequests();
  }, []);

  const columns = [
    {
      title: 'S.No',
      render: (text, record, index) => (
        <div className="d-flex gap-2">
          {index + 1}
        </div>
      ),
    },
    {
      title: 'Amount',
      render: (text, record) => (
        <>
          <div style={{ color: '#888' }}>$ {record.amount}</div>
        </>
      ),
    },
    {
      title: 'Status',
      render: (text, record) => (
        <div>{record?.status === 'PENDING' ? 'Pending' : record?.status === 'APPROVED' ? 'Approved' : 'Rejected'}</div>
      ),
    },
    {
      title: 'Details Submission',
      render: (text, record) => (
        <div>{record?.detailsSubmission}</div>
      ),
    },
    {
      title: 'Date',
      render: (text, record) => (
        <div>{formateDate(record?.createdAt)}</div>
      ),
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div>
          <button className="btn btn-primary btn-sm">View</button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRequest(record?._id)}>Delete</button>
        </div>
      ),
    }
  ];

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.post("/createClaimRequest", { details: accountDetail }, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 201) {
        dispatch(addClaimRequest(response?.data?.claimRequest));
        handleModalCancel();
        showSuccessAlert('Claim request created successfully');
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteRequest = async (id) => {
    try {
      setIsLoading(true);
      const response = await Instance.delete(`/deleteClaimRequest/${id}`, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(deleteClaimRequest(id));
        showSuccessAlert('Claim request deleted successfully');
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(error?.response?.data?.message || 'An error occured');
    } finally {
      setIsLoading(false);
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setAccountDetail("");
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="refer-earn-status-section">
        <div className="container">
          <div className="row">
            <div className="refer-earn-status-banner ">
              <div>
                <Avatar src={image1} size={90} />
              </div>
              <div>
                <h4>Account Balance</h4>
                <h4></h4>
              </div>
              {/* <div
                className="refer-earn-status-box"
                style={{ backgroundColor: "#0067FF" }}
              >
                <TbProgress
                  className="mb-2"
                  style={{ color: "var(--white-color)" }}
                />
                <h4>2</h4>
                <h4>In Progress</h4>
              </div> */}
              {/* <div
                className="refer-earn-status-box"
                style={{ backgroundColor: "#FF7B6E" }}
              >
                <VscError
                  className="mb-2"
                  style={{ color: "var(--white-color)" }}
                />
                <h4>2</h4>
                <h4>Rejected</h4>
              </div>
              <div
                className="refer-earn-status-box"
                style={{ backgroundColor: "#3BC88D" }}
              >
                <FaRegHandshake
                  className="mb-2"
                  style={{ color: "var(--white-color)" }}
                />
                <h4>2</h4>
                <h4>In Progress</h4>
              </div> */}
              <div className="withdraw-bar-container">
                <div className="withdraw-info">
                  <p>
                    Your account balance is <span className="earn-amount">$ {wallet?.balance || 0}</span>
                  </p>
                  <div className="progress-wrapper">
                    <Progress
                      percent={20}
                      showInfo={false}
                      strokeColor="#38d39f"
                      trailColor="#ccc"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="primary" className="jobseeker-basic-button " onClick={() => setIsModalVisible(true)} disabled={!wallet?.balance}>
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="refarals-list-data">
              <h4>Your bonus claim requests</h4>
              <hr />
              <Table columns={columns} dataSource={claimRequests} pagination={false} />
            </div>
          </div>
          <div className="mt-4">
            <button className="jobseeker-basic-button" onClick={() => navigate('/user/refer-earn')}>
              Back
            </button>
          </div>
          <Modal
            title="Withdraw"
            visible={isModalVisible}
            onCancel={handleModalCancel}
            footer={null}
          >
            <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
              <Form.Item
                label="Enter your account detail"
                name={"accountDetail"}
                rules={[{ required: true, message: "Please enter your account detail" }]}
              >
                <Input
                  placeholder="Enter your detail"
                  value={accountDetail}
                  onChange={(e) => setAccountDetail(e.target.value)}
                />
              </Form.Item>
              {/* <div style={{ textAlign: 'center' }}>Or</div> */}
              {/* <Form.Item label="Request for a cheque">
                <Checkbox
                  checked={isChequeRequested}
                  onChange={(e) => setIsChequeRequested(e.target.checked)}
                >
                  If you don't have a PayPal account, please request a Cheque
                </Checkbox>
              </Form.Item> */}
              <div className="d-flex justify-content-end mt-3">
                <button onClick={handleModalCancel} style={{ marginRight: 10 }} className="jobseeker-send-invitation">
                  Cancel
                </button>
                <button type="primary" htmlType="submit" className="jobseeker-basic-button">
                  Request
                </button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
});
