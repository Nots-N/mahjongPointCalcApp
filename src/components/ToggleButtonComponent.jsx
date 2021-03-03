import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';

const ToggleButtonComponent = (props)=>{
    return (
        <div>
            {props.label}
        <div className="textButton">
        <ToggleButton
            value="check"
            size="small"
            selected={props.changeItem}
            onChange={() => {
                props.select(props.changeItem);
            }}
        >
            <CheckIcon />
        </ToggleButton>
        </div>
      </div>
    );
  
}

export default ToggleButtonComponent;