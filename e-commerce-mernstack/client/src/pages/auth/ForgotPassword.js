import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [history, user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
			handleCodeInApp: true,
		};
		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail('');
				setLoading(false);
				toast.success('Password reset link sent to your email');
			})
			.catch((error) => {
				setLoading(false);
				toast.error(error.message);
				console.log('error in forgot password', error);
			});
	};

	return (
		<div className='container col-md-6 offset-md-3 p-5'>
			{loading ? (
				<h4 classname='text-danger'>Loading...</h4>
			) : (
				<h4>Forgot Password</h4>
			)}
			<form>
				<input
					type='email'
					className='form-control'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
					placeholder='Email'
				/>
				<br />
				<Button
					type='primary'
					onClick={handleSubmit}
					className='btn btn-raised mb-3'
					shape='round'
					block
					icon={<MailOutlined />}
					size='large'
					disabled={!email}
				>
					Send Password Reset Link
				</Button>
			</form>
		</div>
	);
};

export default ForgotPassword;
