import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Hai,HaiList,SelectButtonsComponent} from './index.js';
import {huroSets} from '../assets/datasets/index.js'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const HuroHaiSelectList = (props)=>{
    const cha = ["kami","toi","shimo"];
    const chaDisp = ["上家","対面","下家"];
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedCha, setCha] = React.useState("kami");
    const [selectedHai, setSelectedHai] = React.useState("1");
  
    const handleOpen = (selectedHai,selectedHaiIndex) => {
        setOpen(true);
        setSelectedHai(selectedHai.toString());
    };
  
    const handleClose = () => {
        setCha("kami");
        setOpen(false);
    };

    const handleCha = (selectedIndex)=>{
        setCha(cha[selectedIndex]);
    };

    const handleHuro = (clickedHai,index) =>{
        handleClose();
        const huroObj = {
            oneMentsu:huroSets[selectedCha][selectedHai]["huroMentsu"][index],
            ie:selectedCha,
            hai:selectedHai,
        }
        props.select(huroObj,index);
    }

    return (
        <div>
        <HaiList select={handleOpen} haiList={props.haiList} />
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
                <h2 id="transition-modal-title">副露選択</h2>
                <div className="selectButtons">
                    {chaDisp.map((x,index)=>{
                        return <SelectButtonsComponent label={x} color="primary" setNum={index} select={handleCha} key={index.toString()} />
                    })}
                </div>
                {huroSets[selectedCha][selectedHai]["disp"].map((oneHuro,index)=>{
                    return (
                        <div className="selectHai" key={index.toString()}>
                            {oneHuro.map((value,index2)=>{
                                return <Hai hai={value} key={index2.toString()} index={index} select={handleHuro} />
                            })}
                        </div>
                    )
                })}
            </div>
          </Fade>
        </Modal>
      </div>
    );
}

export default HuroHaiSelectList;
