import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Instance from '../../../AxiosConfig';

const ProtectUser = ({ Component }) => {
    const navigate = useNavigate();
    const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

    const isLogin = async () => {
        try {
            const response = await Instance.get('/validateToken', {
                headers: {
                    Authorization: `Bearer ${loggedInUserInfo?.token}`
                }
            });
            if (response.status === 200 && response?.data?.role === 'JOBSEEKER') {
            }else throw new Error('Unauthorized access');
        } catch (error) {
            localStorage.removeItem('loggedInUserInfo');
            navigate('/user/login');
        }
    }

    useEffect(() => {
        isLogin();
    }, []);

    return (
        <Component />
    );
};

export default ProtectUser;