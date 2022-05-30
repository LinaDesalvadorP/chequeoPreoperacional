import React, { useEffect, useState } from 'react';
import CardCheck from '../components/CardCheck';
import axios from 'axios';

const API = 'http://api';

const ChecksList = () => {
    const [checks, setChecks] = useState([]);

	useEffect(async () => {
		const response = await axios(API);
		setChecks(response.data);
	}, [])
    return (
        <section className='main-container'>
			<div className="checkList">
				{checks.map(check => (
					<CardCheck />
				))}
			</div>
		</section>
    );
}

export default ChecksList;