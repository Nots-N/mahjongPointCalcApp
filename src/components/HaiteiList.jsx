import React from 'react';
import {SelectButtonsComponent} from './index.js';

const HaiteiList = (props)=>{
    //色を指定する
    let colorFlag = ["primary","primary"];
    if(props.haitei!==0){
        colorFlag[props.haitei-1]="secondary";    
    }
    return(
        <div className="selectButtons">
            <SelectButtonsComponent label={"海底摸月"} color={colorFlag[0]} setNum={1} select={props.select} />
            <SelectButtonsComponent label={"河底撈魚"} color={colorFlag[1]} setNum={2} select={props.select} />
        </div>
    )
}

export default HaiteiList;