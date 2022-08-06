import React, { useState } from "react";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const SliderComponent = (props) => {
    const [ value, setValue ] = useState(50); 

    return (
        <RangeSlider
        name={props.name}
        id="customRange1"
        value={value}
        tipprops={{visible:true}}
        onChange={changeEvent => setValue(changeEvent.target.value)}
      />
    );
}

export default SliderComponent;