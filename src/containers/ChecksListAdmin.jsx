import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './../components/NavBar';
import checkImg from '../../public/assets/images/cheque.png';
import ChecksTable from './ChecksTable';

// const API = 'http://api';

const ChecksList = () => {
    // const [checks, setChecks] = useState([]);

	// useEffect(async () => {
	// 	const response = await axios(API);
	// 	setChecks(response.data);
	// }, [])
    return (
		<>
			<Navbar />
			<div className="m-5">
				<h2>Chequeos realizados</h2>
				<ChecksTable />
			</div>
		</>
    );
}

export default ChecksList;