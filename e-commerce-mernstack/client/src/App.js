import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './component/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from './pages/auth/RegisterComplete';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';
import History from './pages/user/History';
import UserRoute from './component/routes/UserRoute';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';

const App = () => {
	const dispatch = useDispatch();

	//to check firebase auth state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				currentUser(idTokenResult.token)
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
			}
		});

		//cleanup
		return () => unsubscribe();
	}, []);
	return (
		<>
			<Header />
			<ToastContainer />

			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route path='/register/complete' component={RegisterComplete} />
				<Route path='/forgot/password' component={ForgotPassword} />
				<UserRoute exact path='/user/history' component={History} />
				<UserRoute path='/user/password' component={Password} />
				<UserRoute path='/user/wishlist' component={Wishlist} />
			</Switch>
		</>
	);
};

export default App;
