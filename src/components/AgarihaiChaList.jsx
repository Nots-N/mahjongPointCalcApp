import React from 'react';
import {SelectButtonsComponent} from './index.js';

const AgarihaiChaList = (props)=>{
    //色を指定する
    let colorFlag = ["primary","primary","primary","primary"];
    if(props.agarihaiCha!==0){
        colorFlag[props.agarihaiCha-1]="secondary";    
    }
    switch(props.agarihaiCha){
        case 'ji':
            colorFlag[0] = "secondary";
            break;
        case 'kami':
            colorFlag[1] = "secondary";
            break;
        case 'toi':
            colorFlag[2] = "secondary";
            break;
        case 'shimo':
            colorFlag[3] = "secondary";
            break;
        default:
    }
    return(
        <div className="selectButtons">
            <SelectButtonsComponent label={"ツモ"} color={colorFlag[0]} setNum={"ji"} select={props.select} />
            <SelectButtonsComponent label={"上家ロン"} color={colorFlag[1]} setNum={"kami"} select={props.select} />
            <SelectButtonsComponent label={"対面ロン"} color={colorFlag[2]} setNum={"toi"} select={props.select} />
            <SelectButtonsComponent label={"下家ロン"} color={colorFlag[3]} setNum={"shimo"} select={props.select} />
        </div>
    )
}

export default AgarihaiChaList;