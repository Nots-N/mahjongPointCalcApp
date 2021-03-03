import React from 'react';
import {h_0,h_1,h_2,h_3,h_4,h_5,h_6,h_7,h_8,h_9,h_11,h_12,h_13,h_14,h_15,h_16,h_17,h_18,h_19,h_21,h_22,h_23,h_24,h_25,h_26,h_27,h_28,h_29,h_31,h_32,h_33,h_34,h_35,h_36,h_37,h_0r,h_1r,h_2r,h_3r,h_4r,h_5r,h_6r,h_7r,h_8r,h_9r,h_11r,h_12r,h_13r,h_14r,h_15r,h_16r,h_17r,h_18r,h_19r,h_21r,h_22r,h_23r,h_24r,h_25r,h_26r,h_27r,h_28r,h_29r,h_31r,h_32r,h_33r,h_34r,h_35r,h_36r,h_37r} from '../assets/images/index.js';

const Hai = (props)=>{
    let dispHai;
    //数値+100で特定の牌の右向きを表す
    switch(props.hai){
        case 0: dispHai=h_0; break;
        case 1: dispHai=h_1; break;
        case 2: dispHai=h_2; break;
        case 3: dispHai=h_3; break;
        case 4: dispHai=h_4; break;
        case 5: dispHai=h_5; break;
        case 6: dispHai=h_6; break;
        case 7: dispHai=h_7; break;
        case 8: dispHai=h_8; break;
        case 9: dispHai=h_9; break;
        case 11: dispHai=h_11; break;
        case 12: dispHai=h_12; break;
        case 13: dispHai=h_13; break;
        case 14: dispHai=h_14; break;
        case 15: dispHai=h_15; break;
        case 16: dispHai=h_16; break;
        case 17: dispHai=h_17; break;
        case 18: dispHai=h_18; break;
        case 19: dispHai=h_19; break;
        case 21: dispHai=h_21; break;
        case 22: dispHai=h_22; break;
        case 23: dispHai=h_23; break;
        case 24: dispHai=h_24; break;
        case 25: dispHai=h_25; break;
        case 26: dispHai=h_26; break;
        case 27: dispHai=h_27; break;
        case 28: dispHai=h_28; break;
        case 29: dispHai=h_29; break;
        case 31: dispHai=h_31; break;
        case 32: dispHai=h_32; break;
        case 33: dispHai=h_33; break;
        case 34: dispHai=h_34; break;
        case 35: dispHai=h_35; break;
        case 36: dispHai=h_36; break;
        case 37: dispHai=h_37; break;
        case 100: dispHai=h_0r; break;
        case 101: dispHai=h_1r; break;
        case 102: dispHai=h_2r; break;
        case 103: dispHai=h_3r; break;
        case 104: dispHai=h_4r; break;
        case 105: dispHai=h_5r; break;
        case 106: dispHai=h_6r; break;
        case 107: dispHai=h_7r; break;
        case 108: dispHai=h_8r; break;
        case 109: dispHai=h_9r; break;
        case 111: dispHai=h_11r; break;
        case 112: dispHai=h_12r; break;
        case 113: dispHai=h_13r; break;
        case 114: dispHai=h_14r; break;
        case 115: dispHai=h_15r; break;
        case 116: dispHai=h_16r; break;
        case 117: dispHai=h_17r; break;
        case 118: dispHai=h_18r; break;
        case 119: dispHai=h_19r; break;
        case 121: dispHai=h_21r; break;
        case 122: dispHai=h_22r; break;
        case 123: dispHai=h_23r; break;
        case 124: dispHai=h_24r; break;
        case 125: dispHai=h_25r; break;
        case 126: dispHai=h_26r; break;
        case 127: dispHai=h_27r; break;
        case 128: dispHai=h_28r; break;
        case 129: dispHai=h_29r; break;
        case 131: dispHai=h_31r; break;
        case 132: dispHai=h_32r; break;
        case 133: dispHai=h_33r; break;
        case 134: dispHai=h_34r; break;
        case 135: dispHai=h_35r; break;
        case 136: dispHai=h_36r; break;
        case 137: dispHai=h_37r; break;
        default:
    }
    return(
        <div>
            <img src={dispHai} onClick={()=>props.select(props.hai,props.index)} alt={props.hai}/>
        </div>
    )
}

export default Hai;