import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Actions } from 'react-native-router-flux';


export default class RegAlert extends Component{
    render(){
        return(
            <View>
                <Grid style={{marginLeft:5,marginRight:5}} >
                <Row>
                    <Col style={styles.dashb4w} onPress={() => Actions.Registration()}>
                    <Text style={{color:'#462749',marginBottom:10,marginTop:10,fontWeight:"bold"}}>Click To Activate Application</Text>
                    </Col>
                </Row>
                </Grid>
            </View>
        )
    }
}