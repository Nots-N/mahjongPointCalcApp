import React from 'react';
import Button from '@material-ui/core/Button';
import '../assets/styles/style.css';


const SelectButtonsComponent = (props)=>{
    return(
        <div className="textButton">
            <Button variant="contained" color={props.color} onClick={()=>props.select(props.setNum)}>
                {props.label}
            </Button>
        </div>
    )
}

export default SelectButtonsComponent;