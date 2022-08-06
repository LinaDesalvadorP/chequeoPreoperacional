import React, {useState} from "react";

const MultipleAnswerComponent = ({name, answer, selected, setSelected, className}) => {
  console.log(answer)
    // const [ selected, setSelected ] = useState(new Array(Object.keys(props.props.answer.respuestas).length).fill(false)); 
  // setSelected(new Array(Object.keys(props.props.answer.respuestas).length).fill(false))

    const handleOnChange = (index) => {
    if (selected[index] === false) {
        selected[index] = true;
    } else {
        selected[index] = false;
    }
    setSelected(selected)
  };

  return (
    <div className="mb-3 col-sm-12 col-lg-8 px-4">
      <div className="row">
        {answer?.map((itemRespuesta, index) => (
          <div key={index} className="form-check col-lg-4  col-sm-12">
            <input
              className="form-check-input ml-4"
              value={selected}
              type="checkbox"
              name={name}
              onChange={() => handleOnChange(index)}
              id="flexRadioDefault1"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              {itemRespuesta.statement}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleAnswerComponent;
