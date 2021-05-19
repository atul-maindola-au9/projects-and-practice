import React, { useEffect, useState } from 'react';
import AdminNav from '../../../component/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
	createCategory,
	getCategories,
	getCategory,
	removeCategory,
} from '../../../functions/category';

const CategoryCreate = () => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () => {
		getCategories().then((c) => setCategories(c.data));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createCategory({ name }, user.token)
			.then((res) => {
				// console.log('res...', res);
				setLoading(false);
				setName('');
				toast.success(`"${res.name}" is created`);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				error.response && error.response.status;
			});
	};

	const categoryForm = () => (
		<form onSubmit={handleSubmit}>
			<label>Name</label>
			<input
				type='text'
				className='form-control'
				value={name}
				onChange={(e) => setName(e.target.value)}
				autoFocus
				required
			/>
			<button className='btn btn-outline-primary'>Save</button>
		</form>
	);
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					<h4>Create Category</h4>
					{categoryForm()}
					<hr />
					{JSON.stringify(categories)}
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
