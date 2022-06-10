import React, {useRef }  from 'react';
import AccordionComp from '../components/AccordionComp';
import styles from '../styles/DailyCheck.module.scss';
import logo from '../../public/assets/images/main_logo_yellow.png';

const DailyCheck = () => {
    const form = useRef(null);
    const handleSubmit = (event) =>{
        event.preventDefault();
        // const formData = new FormData(form.current);
        // axios({
        //     method: 'post',
        //     url: API,
        //     data:{
        //         username: formData.get('usuario'),
        //         password: formData.get('contrasena')
        //     }
        // }).then((response) =>{
        //     localStorage.setItem('auth', "yes")
        //     navigate('/validate-owner');
        //     console.log(response.statusText)
        // }).catch((error) =>{
        //     console.log(error.response.data.message)
        // })
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles['identidad-corp-container']}>
                    <img src={logo} alt="logo de la aplicacion" /> <br></br>
                    <h1><span>CHECK</span>CAR</h1><br></br>
                </div>
            </div>
            <div className="row py-4 title text-center">
                <span className="fs-2 fw-bold"> Móvil 351</span>
            </div>
            {/* <div className="row justify-content-center">
                <div className="mb-3 col-sm-12 col-lg-8 px-4">
                <div className="row">
                    <div className="form-label col-sm-12 fs-5 col-lg-1  me-5">
                        <span htmlFor="km-input" className="form-label">Kilometraje: </span>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <input type="text" className="form-control border-1 km-input" id="km-input"
                            placeholder="Ingrese el kilometraje actual de su vehiculo"/>
                    </div>
                </div>
                </div>
            </div> */}
            <div className="row m-1 justify-content-center">
                <div className="col-lg-8">
                    <AccordionComp />
                </div>
                <div className={styles.submitBtn}>
                    <button
                        onClick={handleSubmit}>
                        Guardar
                    </button> 
                </div>
            </div>
        </>
    );
}

export default DailyCheck;