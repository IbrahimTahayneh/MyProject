import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, Text ,View} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component{
    
    constructor(props) {
        super(props);
         this.state = {
            username:'',
            userid:'',
        }
       
    }
    componentDidMount = () =>{ this.getData();}

    getData = async () => {
    try {
        const dlog = await AsyncStorage.getItem('@data');
            JSON.parse(dlog, (key, value) => {
            if (key==='username') this.setState({username:value});
            if (key==='userid') this.setState({userid:value});
            });
    } catch(e) {
        // error reading value
    }
    }
    get_menu =(mn) => {
        if(this.state.userid===2)
                {
                    alert('Access Denied');
                    return false;
                }
        else
        {
          if (mn===1) {Actions.Registration();}
          if (mn===2) {Actions.Profile()}
          if (mn===3) {Actions.ImportData();}
    
        }
      }
    render(){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center' }}>
                <Text style={{color:'#462749'}} >Welcome {this.state.username}</Text>
                <Text note style={{fontSize:9,fontStyle:"italic",color:'#800080'}}>Cashier Mobile Application</Text>
            </View>

        )
    }
}