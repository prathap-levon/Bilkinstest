import React from 'react';
import { Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Instance from '../../AxiosConfig';


const ForgotPassword = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await Instance.post('/forgot-password', {
        email: values.email
      });
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="forgot-password-section">
      <div className="forgot-password">
        <Form
          name="forgot-password-form"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <div className="labels">
            <h2>Forgot your password?</h2>
            <hr />
            <h3>
              Please enter your registered Email-Id.  Reset password Link will sent to your email
            </h3>
          </div>
          <Form.Item
            name="email"
            className='mt-3'
            rules={[
              {
                required: true,
                message: 'Please insert your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address.',
              },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <button type="submit" className="btn-forgot-password">
              Submit
            </button>
          </Form.Item>

          <span style={{ fontFamily: "Poppins" }}>
            Have an account already? <Link to="/sign-in">Sign In</Link>
          </span>
        </Form>

      </div>
    </div>
  );
};

export default ForgotPassword;