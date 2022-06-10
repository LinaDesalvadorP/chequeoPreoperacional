import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './../components/NavBar';
import checkImg from '../../public/assets/images/cheque.png';
import { ChecksListData } from '../components/ChecksListData'

const API = 'http://api';

const ChecksList = () => {
    // const [checks, setChecks] = useState([]);

	// useEffect(async () => {
	// 	const response = await axios(API);
	// 	setChecks(response.data);
	// }, [])
    return (
		<>
			<Navbar />
			<table class="table">
			<thead>
				<tr>
				<th scope="col">Movil</th>
				<th scope="col">Propietario</th>
				<th scope="col">Placa</th>
				<th scope="col">Fecha</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">951</th>
					<td>Juan Camilo</td>
					<td>ABC-000</td>
					<td>08/06/2022</td>
				</tr>
				<tr>
					<th scope="row">951</th>
					<td>Juan Camilo</td>
					<td>ABC-000</td>
					<td>08/06/2022</td>
				</tr>
				<tr>
					<th scope="row">951</th>
					<td>Juan Camilo</td>
					<td>ABC-000</td>
					<td>08/06/2022</td>
				</tr>
				
			</tbody>
			</table>
			{/* <div className={styles["container-chequeos"]}>
				<div className={styles["total-chequeos"]}>
                    <img src={checkImg}/>
                    <h5>Se han realizado 120 chequeos preoperacionales </h5>
                </div>
				<section className={styles['main-container']}>
				<div className={styles.header}>
					<div className={styles.movil}>
						<h4>Movil</h4>
					</div>
					<div className={styles.propietario}>
						<h4>Propietario</h4>
					</div>
					<div className={styles.placa}>
						<h4>Placa</h4>
					</div>
					<div className={styles.estado}>
						<h4>Estado</h4>
					</div>
				</div>
					<div className={styles.checkList}>
						{ChecksListData.map((item, index) =>(
							<CardCheck movil={item.movil} propietario={item.owner} placa={item.license_plate} fecha={item.date} key={index}/>
						))}
					</div>
				</section>
			</div> */}
		</>
    );
}

export default ChecksList;