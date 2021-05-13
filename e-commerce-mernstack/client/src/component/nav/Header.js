import React, { useState } from 'react';
import { Menu } from 'antd';
import {
	HomeOutlined,
	LoginOutlined,
	LogoutOutlined,
	UserAddOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';

const { SubMenu, Item } = Menu;

const Header = () => {
	const history = useHistory();
	const [current, setCurrent] = useState('home');
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state })); //gets state from redux

	const handleClick = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};

	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: 'LOGOUT',
			payload: null,
		});
		history.push('/login');
	};

	return (
		<Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
			<Item key='login' className='primary'>
				<Link to='/'>
					<h4
						style={{
							fontFamily: 'unset',
							fontWeight: '800',
							fontStyle: 'italic',
							marginTop: '10px',
						}}
					>
						ShopIt
					</h4>
				</Link>
			</Item>
			{!user && (
				<>
					<Item
						key='login'
						icon={<LoginOutlined />}
						className='float-right'
					>
						<Link to='/login'>Login</Link>
					</Item>

					<Item
						key='register'
						icon={<UserAddOutlined />}
						className='float-right'
					>
						<Link to='/register'>Register</Link>
					</Item>
				</>
			)}
			{user && (
				<>
					<Item key='home' icon={<HomeOutlined />}>
						<Link to='/'>Home</Link>
					</Item>
					<SubMenu
						key='SubMenu'
						className='float-right'
						icon={<UserAddOutlined />}
						title={user.email && user.email.split('@')[0]}
					>
						{user && user.role === 'subscriber' && (
							<Item>
								<Link to='/user/history'>Dashboard</Link>
							</Item>
						)}
						{user && user.role === 'admin' && (
							<Item>
								<Link to='/admin/dashboard'>Dashboard</Link>
							</Item>
						)}
						<Item icon={<LogoutOutlined />} onClick={logout}>
							Logout
						</Item>
					</SubMenu>
				</>
			)}
		</Menu>
	);
};

export default Header;
