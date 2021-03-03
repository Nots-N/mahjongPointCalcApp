import React from 'react';
import {Hai} from './index.js';


const HaiList = (props)=>{
    //牌の数が30以上の場合は４行で表示、そうでない場合(例えば手牌など）は一行で表示。
    let HaiLines = ()=>{
        if(props.haiList.length>30){
            return(
            <div>
                <div className="selectHai">
                        {props.haiList.filter((x)=>x<10).map((value,index)=>{
                            return <Hai hai={value} key={index.toString()} index={index} select={props.select} />
                        })}
                </div>
                <div className="selectHai">
                        {props.haiList.filter((x)=>x>=10&&x<20).map((value,index)=>{
                            return <Hai hai={value} key={index.toString()} index={index} select={props.select} />
                        })}
                </div>
                <div className="selectHai">
                        {props.haiList.filter((x)=>x>=20&&x<30).map((value,index)=>{
                            return <Hai hai={value} key={index.toString()} index={index} select={props.select} />
                        })}
                </div>
                <div className="selectHai">
                        {props.haiList.filter((x)=>x>=30&&x<40).map((value,index)=>{
                            return <Hai hai={value} key={index.toString()} index={index} select={props.select} />
                        })}
                </div>
            </div>
            )
        }else{
            return(
                <div className="selectHai">
                {props.haiList.map((value,index)=>{
                    return <Hai hai={value} key={index.toString()} index={index} select={props.select} />
                })}
                </div>
            )
        }
    }

    return(
        <div>
            <HaiLines />
        </div>
    )
}

export default HaiList;