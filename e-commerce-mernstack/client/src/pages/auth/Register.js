import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Register = ({ history }) => {
	const [email, setEmail] = useState('');
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [history, user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('handle submit');
		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};

		await auth.sendSignInLinkToEmail(email, config);
		toast.success(
			`Email is sent to ${email}.  Click the link to complete your registration`
		);

		//save user email in local storage

		window.localStorage.setItem('emailForRegistration', email);

		//clear useState
		setEmail('');
	};

	const registerForm = () => (
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
				className='mb-3'
				shape='round'
				block
				icon={<UserAddOutlined />}
				size='large'
				disabled={!email}
			>
				Register
			</Button>
		</form>
	);

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Register</h4>
					{registerForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
