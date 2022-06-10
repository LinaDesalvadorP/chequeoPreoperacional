import React from "react";

const SAQuestion = () => {
    return (
        <div className="mb-3 col-sm-12 col-lg-8 px-4">
            <div className="row">
                <div className="form-check col-lg-4  col-sm-12">
                    <input className="form-check-input ml-4" type="radio" name="flexRadioDefault"
                        id="flexRadioDefault1"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Si
                    </label>
                </div>

                <div className="form-check col-lg-4 col-sm-12">
                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                        id="flexRadioDefault1"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        No
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SAQuestion;