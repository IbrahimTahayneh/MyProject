import React, { Component } from 'react';
import { Router, Scene,Drawer,Stack} from 'react-native-router-flux';
import { Icon,Button } from 'native-base';
import SideMenu from '../components/Menu';
import Home from '../components/Home';
import Registration from '../components/Registration';
import RegAlert from '../components/RegAlert';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";

const MenuIcon = () => {
    return(
        <Icon name='apps' style={{color:'#f15a23'}} />
    )
};

export default class MainRouter extends React.Component {
    render() {
        return(
        <Router>
             <Stack key="rootx">
            <Drawer key="drawer"                    
                        contentComponent={SideMenu}
                        drawerIcon={MenuIcon}
                        drawerWidth={300}
                        hideNavBar
            > 
                <Scene key="root"> 
                    <Scene key="Registration" title="Registration" component={Registration} hideNavBar/>
                    <Scene key="RegAlert" title="Reg Alert" component={RegAlert} hideNavBar/>
                </Scene>
            </Drawer>
            </Stack>
        </Router>
        )
      
    }
}

