import React from 'react';
import {Hai} from './index.js';


const AnkanList = (props)=>{
    let ankanList =[];
    props.haiList.forEach((oneHai)=>{
        ankanList.push([0,oneHai,oneHai,0]);
    })
    return(
        <div className="selectHai">
            {
            ankanList.map((oneAnkan,index)=>{
                return oneAnkan.map((value,index2)=>{
                    return <Hai hai={value} key={index2.toString()} index={index} select={props.select} />
                })
            })
            }
        </div>
    )
}

export default AnkanList;