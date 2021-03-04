import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../assets/styles/style.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {HaiList,AnkanList,HuroHaiList,SelectButtonsComponent} from './index.js';
import {haiNumSets,yakuHansuSets} from '../assets/datasets/index.js'

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflow:'scroll',
      margin:'3vh auto',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const ResultWindow = (props)=>{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = (setNum)=>{
        setOpen(true);
    }
    const handleClose = ()=>{
        setOpen(false);
    }

    let oyaKo;
    if(props.jiKaze===31){
        oyaKo = "親";
    }else{
        oyaKo = "子";
    }

    let agarihaiCaution;
    if(props.haiListTehai.some((x)=>x===props.agarihai.hai)){
        agarihaiCaution = null;
    }else{
        agarihaiCaution = "選択されている和了牌が、手牌に存在していません"
    }

    let doraListStr;
    if(props.dorahai.length!==0){
        doraListStr = props.dorahai.map((x)=>{return haiNumSets[x]}).join(',');
    }
    let uradoraListStr;
    if(props.uradorahai.length!==0){
        uradoraListStr = props.uradorahai.map((x)=>{return haiNumSets[x]}).join(',');
    }

    let huStr;
    if(props.result.hu===0){
        huStr = "-";
    }else{
        huStr = String(props.result.hu);
    }

    let pointName="";
    if(props.result.hansu>=39){
        pointName="トリプル役満";
    }else if(props.result.hansu>=26){
        pointName="ダブル役満";
    }else if(props.result.hansu>=13){
        pointName="役満";
    }else if(props.result.hansu>=11){
        pointName="三倍満";
    }else if(props.result.hansu>=8){
        pointName="倍満";
    }else if(props.result.hansu>=6){
        pointName="跳満";
    }else if(props.result.hansu>=5){//4飜で満貫の場合とそうでない場合があるため、マンガンだけは点数で区別。
        pointName="満貫";
    }else if(props.result.hansu>=4 && props.result.hu>=40){//4飜で満貫の場合とそうでない場合があるため、マンガンだけは点数で区別。
        pointName="満貫";
    }else if(props.result.hansu>=3 && props.result.hu>=70){//4飜で満貫の場合とそうでない場合があるため、マンガンだけは点数で区別。
        pointName="満貫";
    }
    //結果表示をするために「役名＋飜数＋"飜"」の配列を作る
    let yakuHansuArr=[];
    const yakumanArr=["大車輪","緑一色","大三元","国士無双(13面待ち)","国士無双","清老頭","字一色","大四喜","小四喜","純正九連宝燈","九連宝燈","四槓子","四暗刻(単騎待ち)","四暗刻","天和","地和"];
    for(let i=0;i<props.yaku.length;i++){
        if(i<=props.yaku.length-4){
            yakuHansuArr.push(props.yaku[i]+":"+yakuHansuSets[props.yaku[i]]+"飜");
        }else if(yakumanArr.some((value)=>{return value===props.yaku[i]})){
            yakuHansuArr.push(props.yaku[i]);
        }else{
            yakuHansuArr.push(props.yaku[i]+"飜");
        }
    }

    return(
        <div>
            <div className="resultWindowButton">
               <SelectButtonsComponent label={"Show Result"} color={"primary"} setNum={1} select={handleOpen} />
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">結果表示</h2>
                        <h4>※牌を選択すると削除することができます。</h4>
                        {oyaKo}  {huStr}符{props.result.hansu}飜
                        <h2>{pointName}　{props.result.point}点</h2>
                        <div className="cautionStr">{agarihaiCaution}</div>
                        {yakuHansuArr.map((value,index)=>{
                            return <div key={index}>{value}</div>
                        })}<br/>
                        自風：{haiNumSets[props.jiKaze]}　　場風：{haiNumSets[props.baKaze]}　　和了牌：{haiNumSets[props.agarihai.hai]}<br/>
                        ドラ：{doraListStr}　　裏ドラ：{uradoraListStr}<br/><br/>
                        {/*手牌の牌リスト*/}
                        手牌：<HaiList select={props.selectTehai} haiList={props.haiListTehai} />
                        {/*暗槓の牌リスト */}
                        暗槓：<AnkanList select={props.selectAnkan} haiList={props.haiListAnkan} />
                        {/**副露の牌リスト */}
                        副露：<HuroHaiList select={props.selectHuro} huro={props.haiListHuro} /> 
                        <br/>
                        <br/>
                        <div className="resultWindowCancelButton">
                            <SelectButtonsComponent label={"閉じる"} color={"default"} setNum={1} select={handleClose} />
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ResultWindow;
