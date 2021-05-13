import React from 'react';
import AdminNav from '../../component/nav/UserNav';

const AdminDashboard = () => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;