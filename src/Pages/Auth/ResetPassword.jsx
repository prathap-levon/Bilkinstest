import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Error404 from '../../Components/404Error/Error404';
import Instance from '../../AxiosConfig';

const ResetPassword = () => {
  const { token } = useParams();
  const [isValidToken, setIsValidToken] = useState(false);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await Instance.get('/validateResetPasswordToken', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsValidToken(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await Instance.post('/reset-password', {
        password: values?.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        navigate('/sign-in');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isValidToken && <Error404 />}
      {isValidToken && <div className="forgot-password-section">
        <div className="forgot-password">
          <Form
            name="forgot-password-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div className="labels">
              <h2>Reset Password</h2>
              <hr />
              <h3>Enter New Password</h3>
            </div>
            <Form.Item
              name="newPassword"
              className="mt-3"
              rules={[
                {
                  required: true,
                  message: 'Please enter new password!',
                },
              ]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>
            <div className="labels">
              <h3>Confirm New Password</h3>
            </div>
            <Form.Item
              name="confirmPassword"
              className="mt-3"
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
              <button type="submit" className="btn-forgot-password">
                Reset
              </button>
            </Form.Item>
            <span style={{ fontFamily: 'Poppins' }}>
              Have an account already? <Link to="/sign-in">Sign In</Link>
            </span>
          </Form>
        </div>
      </div>}
    </>
  )

}
export default ResetPassword