import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';

const DailyCheck = () => {
    return (
        <>
            <main className="container-fluid">

<div className="row py-4 title text-center">
    <span className="fs-2 fw-bold"> Móvil 351</span>
</div>

<div className="row justify-content-center">
    <div className="mb-3 col-sm-12 col-lg-8 px-4">
        <div className="row">
            <div className="form-label col-sm-12 fs-5 col-lg-1  me-5">
                <span for="km-input" className="form-label">Kilometraje: </span>
            </div>
            <div className="col-sm-12 col-lg-6">
                <input type="text" className="form-control border-1 km-input" id="km-input"
                    placeholder="Ingrese el kilometraje actual de su vehiculo"/>
            </div>
        </div>
    </div>
</div>
<div className="row m-1 justify-content-center">
    <div className="col-lg-8">
        <div className="accordion" id="accordionPanelsStayOpenExample">

            <div className="accordion-item mb-3">

                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button rounded-3" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne">
                        <img className="accordion-img" src="img/neumatico_w.png"/>
                        Llantas
                    </button>
                </h2>

                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne">
                    <div className="accordion-body">
                        <div className="container-fluid">

                            <div className="row ">

                                <div className="col-sm-12  col-lg-12 mb-2">
                                    <span className=" question-text">Ingrese la profundidad de labrado de cada
                                        llanta:</span>
                                </div>

                                <div
                                    className="col-sm-12 col-lg-4 order-lg-2 order-sm-0 recomendation border border-warning border-2 rounded-3 mb-3">

                                    <div
                                        className="row align-items-center justify-content-center  pt-2 pb-2 information-msg">

                                        <div className="col-3 ">
                                            <div className="text-center">
                                                <img className="info-img img-fluid  center-block align-middle"
                                                    src="img/info.png"/>
                                            </div>
                                        </div>

                                        <div className="col-9">
                                            <span className="information-title">Información</span><br></br>
                                            <span className="information-body">Tenga en cuenta que la medida debe
                                                ser tomada del área en
                                                el que visualice mayor desgaste.</span>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-lg-8 col-sm-12  answer-1">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-12 pb-3">
                                            <div className="row">
                                                <div className="col-6">
                                                    <span>Llanta trasera derecha:</span>
                                                </div>
                                                <div className="col-4">
                                                    <input type="text" className="form-control answer-1"/>
                                                </div>
                                                <div className="col-1">
                                                    <span>mm</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12 pb-3">
                                            <div className="row">
                                                <div className="col-6">
                                                    <span>Llanta trasera izquierda:</span>
                                                </div>
                                                <div className="col-4">
                                                    <input type="text" className="form-control answer-1"/>
                                                </div>
                                                <div className="col-1">
                                                    <span>mm</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12 pb-3">
                                            <div className="row">
                                                <div className="col-6">
                                                    <span>Llanta delantera derecha:</span>
                                                </div>
                                                <div className="col-4">
                                                    <input type="text" className="form-control answer-1"/>
                                                </div>
                                                <div className="col-1">
                                                    <span>mm</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12  pb-3">
                                            <div className="row">
                                                <div className="col-6">
                                                    <span>Llanta delantera izquierda:</span>
                                                </div>
                                                <div className="col-4">
                                                    <input type="text" className="form-control answer-1"/>
                                                </div>
                                                <div className="col-1">
                                                    <span>mm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item mb-3">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                    <button className="accordion-button rounded-3 collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo">
                        <img className="accordion-img" src="img/cinturon-de-seguridad.png"/>
                        Seguridad
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingTwo">
                    <div className="accordion-body">

                        <div className="container-fluid">

                            <div className="row ">

                                <div className="col-sm-12  col-lg-12 mb-2">
                                    <span className=" question-text">Garantiza que por lo menos los cinturones de
                                        seguridad de las
                                        sillas de adelante se encuentran funcionando adecuadamente.</span>
                                </div>


                                <div
                                    className="col-sm-12 col-lg-4 order-lg-2 order-sm-0  recomendation border border-primary border-2 rounded-3 mb-3 ">

                                    <div className="row align-items-center pt-2 pb-2 recomendation-msg">

                                        <div className="col-3 ">
                                            <div className="text-center">
                                                <img className="info-img img-fluid  center-block align-middle"
                                                    src="img/recomendacion.png"/>
                                            </div>
                                        </div>

                                        <div className="col-9">
                                            <span className="recomendation-title">Recomendación</span><br></br>
                                            <span className="recomendation-body">No utilizar productos químicos o
                                                limpiadores agresivos.
                                                Reducen las condiciones y resistencia del material.</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-8 answer-2">
                                    <div className="row">
                                        <div className="form-check col-lg-4  col-sm-12">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                id="flexRadioDefault1"/>
                                            <label className="form-check-label" for="flexRadioDefault1">
                                                Bueno
                                            </label>
                                        </div>

                                        <div className="form-check col-lg-4 col-sm-12">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                id="flexRadioDefault1"/>
                                            <label className="form-check-label" for="flexRadioDefault1">
                                                Regular
                                            </label>
                                        </div>
                                        <div className="form-check col-lg-4 col-sm-12">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                id="flexRadioDefault1"/>
                                            <label className="form-check-label" for="flexRadioDefault1">
                                                Malo
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item mb-3">
                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                    <button className="accordion-button rounded-3 collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree">
                        <img className="accordion-img" src="img/accumulator.png"/>
                        Batería
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingThree">
                    <div className="accordion-body">

                        <div className="container-fluid">

                            <div className="row ">

                                <div className="col-sm-12  col-lg-12 mb-2">
                                    <span className=" question-text">Seleccione qué comportamientos presenta su
                                        batería.</span>
                                </div>


                                <div
                                    className="col-sm-12 col-lg-4 order-lg-2 order-sm-0  recomendation border border-primary border-2 rounded-3 mb-3 ">

                                    <div className="row align-items-center pt-2 pb-2 recomendation-msg">

                                        <div className="col-3 ">
                                            <div className="text-center">
                                                <img className="info-img img-fluid  center-block align-middle"
                                                    src="img/recomendacion.png"/>
                                            </div>
                                        </div>

                                        <div className="col-9">
                                            <span className="recomendation-title">Recomendación</span><br></br>
                                            <span className="recomendation-body">Las temperaturas extremas o
                                                mantener el coche en desuso durante largos periodos de tiempo
                                                reducen la duración de la batería.
                                                .</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-12  answer-3">

                                    <div className="form-check mb-1 ">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="flexCheckDefault"/>
                                        <label className="form-check-label" for="flexCheckDefault">
                                            Arranque más enérgico
                                        </label>
                                    </div>
                                    <div className="form-check  mb-1">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="flexCheckDefault"/>
                                        <label className="form-check-label" for="flexCheckDefault">
                                            Bornes flojos u oxidados.
                                        </label>
                                    </div>
                                    <div className="form-check  mb-1">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="flexCheckDefault"/>
                                        <label className="form-check-label" for="flexCheckDefault">
                                            Fallos eléctricos intermitentes.
                                        </label>
                                    </div>
                                    <div className="form-check  mb-1">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="flexCheckDefault"/>
                                        <label className="form-check-label" for="flexCheckDefault">
                                            Dificultad para arrancar el motor.
                                        </label>
                                    </div>
                                    <div className="form-check  mb-1">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="flexCheckDefault"/>
                                        <label className="form-check-label" for="flexCheckDefault">
                                            No presenta fallo
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item mb-3">
                <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                    <button className="accordion-button rounded-3 collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFour">
                        <img className="accordion-img" src="img/comportamiento2.png"/>
                        Código de transito
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingFour">
                    <div className="accordion-body">

                        <div className="container-fluid">

                            <div className="row ">

                                <div className="col-sm-12  col-lg-12 mb-2">
                                    <span className=" question-text">¿Cuál de las siguientes señales indica al
                                        conductor que se aproxima a una curva peligrosa a la izquierda?</span>
                                </div>


                                <div className="col-lg-12 col-sm-12  answer-4">
                                    <div className="row px-5 justify-content-center">

                                        <div className="col-6 ">
                                            <div className="row mb-3">
                                                <div className="col-lg-6 img-answer" >
                                                    <div
                                                        className="row text-center justify-content-center bg-light border border-1 rounded-5 me-2">
                                                        <span className="col-12 py-2">SP01</span>
                                                        <img src="img/sp01.jpg"
                                                            className="img-fluid image-form traffic-signal col-12"/>
                                                        <span className="col-12 py-2">A</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 img-answer">
                                                    <div
                                                        className="row text-center justify-content-center bg-light border border-1 rounded-5 me-2">
                                                        <span className="col-12 py-2">SP01</span>
                                                        <img src="img/sp01.jpg"
                                                            className="img-fluid image-form traffic-signal col-12"/>
                                                        <span className="col-12 py-2">B</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-lg-6 img-answer" >
                                                    <div
                                                        className="row text-center justify-content-center bg-light border border-1 rounded-5 me-2">
                                                        <span className="col-12 py-2">SP01</span>
                                                        <img src="img/sp01.jpg"
                                                            className="img-fluid image-form traffic-signal col-12"/>
                                                        <span className="col-12 py-2">C</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 img-answer" >
                                                    <div
                                                        className="row text-center justify-content-center bg-light border border-1 rounded-5 me-2">
                                                        <span className="col-12 pb-3">SP01</span>
                                                        <img src="img/sp01.jpg"
                                                            className="img-fluid image-form traffic-signal col-12"/>
                                                        <span className="col-12 py-2">D</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

</main>

        </>
    );
}

export default DailyCheck;