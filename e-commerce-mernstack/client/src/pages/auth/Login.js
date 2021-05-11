import React, { useEffect, useState } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { GoogleOutlined, LoginOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';

const Login = ({ history }) => {
	const [email, setEmail] = useState('atulmaindola1210@gmail.com');
	const [password, setPassword] = useState('121212');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const { user } = useSelector((state) => ({ ...state }));

	const roleBasedRedirect = (res) => {
		if (res.data.role === 'subscriber') {
			history.push('/user/history');
		} else {
			history.push('/admin/dashboard');
		}
	};

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [history, user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await auth.signInWithEmailAndPassword(
				email,
				password
			);
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();

			createOrUpdateUser(idTokenResult.token)
				.then((res) => {
					dispatch({
						type: 'LOGGED_IN_USER',
						payload: {
							name: res.data.name,
							email: res.data.email,
							token: idTokenResult.token,
							role: res.data.role,
							_id: res.data._id,
						},
					});
					roleBasedRedirect(res);
				})
				.catch((err) => console.log(err));
		} catch (error) {
			console.log(error);
			toast.error('Login Failed');
			setLoading(false);
		}
	};

	const googleLogin = async () => {
		await auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				createOrUpdateUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						});
						roleBasedRedirect(res);
					})
					.catch((err) => console.log(err));

				history.push('/');
			})
			.catch((err) => {
				console.log(err);
				toast.error('Login Failed');
			});
	};

	const loginForm = () => (
		<form>
			<input
				type='email'
				className='form-control'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				autoFocus
				placeholder='Email'
				style={{ marginBottom: '10px' }}
			/>
			<input
				type='password'
				className='form-control'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				autoFocus
				placeholder='Password'
				style={{ marginBottom: '30px' }}
			/>

			<Button
				type='primary'
				className='mb-3'
				onClick={handleSubmit}
				shape='round'
				block
				icon={<LoginOutlined />}
				size='large'
				disabled={!email || password.length < 6}
			>
				Login with email
			</Button>
			<Button
				type='danger'
				className='mb-3'
				onClick={googleLogin}
				shape='round'
				block
				icon={<GoogleOutlined />}
				size='large'
				disabled={!email || password.length < 6}
			>
				Login with Google
			</Button>
			<Link to='/forgot/password' className='float-right text-primary'>
				Forgot password
			</Link>
		</form>
	);

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					{!loading ? (
						<h4>Login</h4>
					) : (
						<h4 className='text-primary'>Loading...</h4>
					)}
					{loginForm()}
				</div>
			</div>
		</div>
	);
};

export default Login;
