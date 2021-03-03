import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {HaiList,HuroHaiSelectList} from './index.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const HaiSelectTabs = (props)=>{
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="手牌" {...a11yProps(0)} />
          <Tab label="和了牌" {...a11yProps(1)} />
          <Tab label="暗槓" {...a11yProps(2)} />
          <Tab label="副露" {...a11yProps(3)} />
          <Tab label="ドラ" {...a11yProps(4)} />
          <Tab label="裏ドラ" {...a11yProps(5)} />
          <Tab label="赤ドラ" {...a11yProps(6)} disabled />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        手牌を選択してください。
        <HaiList select={props.addTehai} haiList={props.haiList} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        和了牌を選択してください。
        <HaiList select={props.addAgarihai} haiList={props.haiList} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        暗槓を選択してください。
        <HaiList select={props.addAnkan} haiList={props.haiList} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        鳴いた牌を選択してください。
        <HuroHaiSelectList select={props.addHuro} haiList={props.haiList} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        ドラを選択してください。
        <HaiList select={props.addDora} haiList={props.haiList} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        裏ドラを選択してください。
        <HaiList select={props.addUradora} haiList={props.haiList} />
      </TabPanel>
      <TabPanel value={value} index={6}>
        赤ドラを選択してください。
        --現在は選択できません--
      </TabPanel>
    </div>
  );
}
export default HaiSelectTabs;