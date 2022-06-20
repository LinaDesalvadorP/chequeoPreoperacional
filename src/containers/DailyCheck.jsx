import React, {useRef }  from 'react';
import Accordion from 'react-bootstrap/Accordion'
import "bootstrap/dist/css/bootstrap.min.css";
import { Questions } from '../components/Questions';
import styles from '../styles/DailyCheck.module.scss';
import logo from '../../public/assets/images/main_logo_yellow.png';

const DailyCheck = () => {
    const findTipo = (itemName, questionType) => {
        console.log("id: " +itemName)
        switch(questionType) {
            case "N":   return <input name={itemName} type="number" className="mb-4 form-control answer-1"></input>;    
            case "S":   return <input name={itemName} type="range" className="mb-4 form-range" id="customRange1"/>;
            case "SA":  return <div className="mb-3 col-sm-12 col-lg-8 px-4">
                                    <div className="row">
                                        <div className="form-check col-lg-4  col-sm-12">
                                            <input
                                                className="form-check-input ml-4"
                                                value="si"
                                                type="radio"
                                                name={itemName}
                                                checked={true}
                                                onChange={handleSubmit}
                                                
                                                id="flexRadioDefault1"/>
                                            <label 
                                                className="form-check-label"
                                                htmlFor="flexRadioDefault1">
                                                Si
                                            </label>
                                        </div>

                                        <div className="form-check col-lg-4 col-sm-12">
                                            <input 
                                                className="form-check-input"
                                                value="no" type="radio"
                                                name={itemName}
                                                onChange={handleSubmit}
                                                id="flexRadioDefault1"/>
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>;
            case "O":   return <input name={itemName} type="text" className="mb-4 form-control answer-1"></input>;
            default:    return <h1>No match</h1>
        }
    }
    const form = useRef(null);
    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData(form.current);
        axios({
            method: 'post',
            url: API,
            data:{
                sectionZeroQuestionZero: formData.get('00'),
                sectionZeroQuestionOne: formData.get('01'),
                sectionZeroQuestionTwo: formData.get('02'),
                sectionOneQuestionZero: formData.get('10'),
                sectionOneQuestionOne: formData.get('11'),
                sectionOneQuestionTwo: formData.get('12')

            }
        }).then((response) =>{
            console.log(response)
        }).catch((error) =>{
            console.log(error.response.data.message)
        })
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
            
            <div className="row m-1 justify-content-center">
                <div className="col-lg-8">
                    <form action="/" ref={form}>
                    {Questions.map((item, index) =>
                            <Accordion key={index} defaultActiveKey="1" id="accordionPanelsStayOpenExample">
                            <Accordion.Item eventKey="0" className='mb-3'>
                                <Accordion.Header className={styles.headerSection}>
                                <img id={styles.imgSection} src={item?.path}/>
                                {item.name}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        {/* <div className="contenedorPregunta">
                                            <div>Pregunta abierta numerica</div>
                                            <input name="usuario" type="number" className="mb-4 form-control answer-1"></input>
                                        </div> */}
                                        {item.questions.map(
                                        (pregunta, indexPreg) => 
                                        
                                        <div key={indexPreg} className="contenedorPregunta">
                                                <div>{pregunta.statement}</div>
                                                {findTipo(index+''+indexPreg, pregunta.type)}
                                        </div>
                                        )}

                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            </Accordion>
                         )}
                        </form> 
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