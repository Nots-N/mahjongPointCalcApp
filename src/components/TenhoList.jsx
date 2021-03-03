import React from 'react';
import {SelectButtonsComponent} from './index.js';

const TenhoList = (props)=>{
    //色を指定する
    let colorFlag = ["primary","primary"];
    if(props.tenho!==0){
        colorFlag[props.tenho-1]="secondary";    
    }
    return(
        <div className="selectButtons">
            <SelectButtonsComponent label={"天和"} color={colorFlag[0]} setNum={1} select={props.select} />
            <SelectButtonsComponent label={"地和"} color={colorFlag[1]} setNum={2} select={props.select} />
        </div>
    )
}

export default TenhoList;