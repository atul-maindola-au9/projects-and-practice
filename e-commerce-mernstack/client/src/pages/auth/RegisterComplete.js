import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	// const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegistration'));
		return () => {};
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		//validation
		if (!email || !password) {
			toast.error('Email and password is required');
			return;
		}
		if (password.length < 6) {
			toast.error('Password must be atleast 6 characters long');
			return;
		}

		try {
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			);
			if (result.user.emailVerified) {
				//remove user email from local storage
				window.localStorage.removeItem('emailForRegistration');

				//get user id token
				const user = auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();

				//reduxstore

				createOrUpdateUser(idTokenResult.token)
					.then((res) =>
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						})
					)
					.catch((err) => console.log(err));

				//redirect
				history.push('/');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const completeRegistrationForm = () => (
		<form>
			<input
				type='email'
				className='form-control'
				value={email}
				disabled
			/>
			<input
				type='password'
				className='form-control'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				autoFocus
			/>

			<br />

			<Button
				type='submit'
				className='btn btn-raised'
				onClick={handleSubmit}
			>
				Complete Registration
			</Button>
		</form>
	);

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Complete Your Registration</h4>
					{completeRegistrationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
