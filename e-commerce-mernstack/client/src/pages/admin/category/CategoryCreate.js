import React, { useEffect, useState } from 'react';
import AdminNav from '../../../component/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
	createCategory,
	getCategory,
	removeCategory,
} from '../../../functions/category';

const CategoryCreate = () => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {});

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createCategory({ name }, user.token)
			.then((res) => {
				setName('');
				toast.success(`"${res.data.name}" is created`);
			})
			.catch((err) => {
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
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
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
