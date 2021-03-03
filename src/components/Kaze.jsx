import React from 'react';
import Button from '@material-ui/core/Button';
import '../assets/styles/style.css';

const Kaze = (props)=>{
    let kazeNum;
    switch(props.kaze){
        case '東':
            kazeNum = 31;
            break;
        case '南':
            kazeNum = 32;
            break;
        case '西':
            kazeNum = 33;
            break;
        case '北':
            kazeNum = 34;
            break;
        default:
    }

    return(
        <div className="textButton">
            <Button variant="contained" color={props.color} onClick={() => props.select(props.jiBa, kazeNum)}>
                {props.kaze}
            </Button>
        </div>
    )
}

export default Kaze;