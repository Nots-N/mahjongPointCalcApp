import React from 'react';
import {Kaze} from './index.js';

const KazeList = (props) => {
    //現在の自風の色を指定する
    let jiKazeColorFlag = ["primary","primary","primary","primary"];
    jiKazeColorFlag[props.jiKaze%30-1]="secondary";
    //現在の場風の色を指定する
    let baKazeColorFlag = ["primary","primary","primary","primary"];
    baKazeColorFlag[props.baKaze%30-1]="secondary";

    return(
        <div>
            自風<br/>
            <div className="selectButtons">
                <Kaze kaze={"東"} jiBa={0} color={jiKazeColorFlag[0]} select={props.select}/>
                <Kaze kaze={"南"} jiBa={0} color={jiKazeColorFlag[1]} select={props.select}/>
                <Kaze kaze={"西"} jiBa={0} color={jiKazeColorFlag[2]} select={props.select}/>
                <Kaze kaze={"北"} jiBa={0} color={jiKazeColorFlag[3]} select={props.select}/>
            </div>
            場風<br/>
            <div className="selectButtons">
                <Kaze kaze={"東"} jiBa={1} color={baKazeColorFlag[0]} select={props.select}/>
                <Kaze kaze={"南"} jiBa={1} color={baKazeColorFlag[1]} select={props.select}/>
                <Kaze kaze={"西"} jiBa={1} color={baKazeColorFlag[2]} select={props.select}/>
                <Kaze kaze={"北"} jiBa={1} color={baKazeColorFlag[3]} select={props.select}/>
            </div>
        </div>
    )
}

export default KazeList;