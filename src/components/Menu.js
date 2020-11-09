import React, { Component } from 'react';
import {Image,View } from "react-native";
import { Actions } from 'react-native-router-flux';
import { Content,Button, ListItem, Text, Icon, Left, Body, Thumbnail,StyleProvider} from 'native-base';
import getStyles from '../../assets/styles';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';
const styles = getStyles();

export default class Menu extends React.Component{
    render(){
        return(
            <StyleProvider style={getTheme(commonColor)}>
            <View style={{ flex:1}}>
                 <View padder style={{height:180, backgroundColor:'#f15a23',justifyContent:"center",alignItems:"center" }}>
                     <Thumbnail 
                       source={require('../../assets/images/nurse2.jpg')} 
                       large
                      />
                       <Text style={{color:'#fff'}}>Welcome User Application</Text>
                       
                 </View>
                 <View style={{ flex:2}}>
                     <Content style={{backgroundColor:'#fff'}}>
                     <ListItem icon onPress={() => Actions.Registration()} >
                         <Left>
                             <Button style={{ backgroundColor: "#FF9501" }}>
                                 <Icon active name="umbrella" type="FontAwesome" />
                             </Button>
                         </Left>
                         <Body>
                             <Text style = {styles.text_menu} >Registration</Text>
                         </Body>
                     </ListItem>          
                 <ListItem icon onPress={() => Actions.Registration()}>
                   <Left>
                     <Button primary>
                       <Icon active name="users" type="FontAwesome"/>
                     </Button>
                   </Left>
                   <Body>
                     <Text style = {styles.text_menu}>User Access</Text>
                   </Body>
                 </ListItem>
                     </Content>
                 </View>   
             </View>
             </StyleProvider>
        )
    }
}