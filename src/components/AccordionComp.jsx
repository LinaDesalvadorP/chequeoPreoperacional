import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import "bootstrap/dist/css/bootstrap.min.css";
import { Questions } from './Questions';
import SAQuestion from '../components/SAQuestion';
import styles from '../styles/AccordionComp.module.scss';
const AccordionComp = () => {
    
    const findTipo = (questionType) => {
        switch(questionType) {
            case "N":   return <input type="number" className="mb-4 form-control answer-1"></input>;    
            case "S":   return <input type="range" className="mb-4 form-range" id="customRange1"/>;
            case "SA":  return <SAQuestion />
            case "O":   return <input type="text" className="mb-4 form-control answer-1"></input>;
            default:    return <h1>No match</h1>
        }
    }

  return (
    <>
      {Questions.map((item, index) =>{
          return(
            <Accordion key={index} defaultActiveKey="1" id="accordionPanelsStayOpenExample">
              <Accordion.Item eventKey="0" className='mb-3'>
                <Accordion.Header className={styles.headerSection}>
                  <img id={styles.imgSection} src={item?.path}/>
                  {item.name}
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    {item.questions.map(
                      (pregunta, indexPreg) => 
                      <div key={indexPreg} className="contenedorPregunta">
                            <div>{pregunta.statement}</div>
                            {findTipo(pregunta.type)}
                            
                       </div>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
      })}
        
    </>
  );
}

export default AccordionComp;

