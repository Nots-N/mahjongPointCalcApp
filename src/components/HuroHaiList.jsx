import React from 'react';
import {Hai} from './index.js';
import {huroSets} from '../assets/datasets/index.js'

const HuroHaiList = (props)=>{

  //二次元行列における指定の一次元行列のインデックスを返す関数
  const indexOfArray2D = (array2D,specifiedArray)=>{
    const stringArray2D = array2D.map((x)=>x.toString());
    return stringArray2D.indexOf(specifiedArray.toString());
  }


    return (
        <div>
          {props.huro.map((oneHuro,index)=>{
            const indexOfHuroSets = indexOfArray2D(huroSets[oneHuro["ie"]][oneHuro["hai"]]["huroMentsu"],oneHuro.oneMentsu);
            return (
              <div className="selectHai" key={index.toString}>
                  {huroSets[oneHuro["ie"]][oneHuro["hai"]]["disp"][indexOfHuroSets].map((value,index2)=>{
                      return <Hai hai={value} key={index2.toString()} index={index} select={props.select} />
                  })}
              </div>
            )
          })}
      </div>
    );
}

export default HuroHaiList;
