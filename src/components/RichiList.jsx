import React from 'react';
import {SelectButtonsComponent} from './index.js';

const RichiList = (props)=>{
    //色を指定する
    let colorFlag = ["primary","primary","primary"];
    if(props.richi!==0){
        colorFlag[props.richi-1]="secondary";    
    }
    return(
        
        <div className="selectButtons">
            <SelectButtonsComponent label={"立直"} color={colorFlag[0]} setNum={1} select={props.select} />
            <SelectButtonsComponent label={"ダブル立直"} color={colorFlag[1]} setNum={2} select={props.select} />
            <SelectButtonsComponent label={"オープン立直"} color={colorFlag[2]} setNum={3} select={props.select} />
        </div>
    )
}

export default RichiList;