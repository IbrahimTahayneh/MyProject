import React from 'react';
import {View, AsyncStorageStatic, Button, ScrollView, StyleSheet,Content, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {GetDataRegsLenght,GetPersonByLogin} from '../database/schema';

export default class LoginForm extends React.Component{
    constructor(props) {
        super(props);
         this.state = {
            username:'',
            passwrod:'',
            okmang:'',
        }
        GetDataRegsLenght().then((regis) => {
            //window.console.log(regis);
            if (regis <= 0)
            {

                Actions.Mainpage();  
            }
            
        }).catch((error) => {
           alert('ERROR');
           Actions.Mainpage();
        });
    }
   _storeData = async (data) => {
    //window.console.log(data);
                try {
                    //await AsyncStorage.setItem('@username',this.state.username);
                    for (let i=0; i<data.length; i++) {
                        const NewData = {
                            username    : this.state.username,
                            userid : data[i].pid
                         };
                         await AsyncStorage.setItem('@data',JSON.stringify(NewData));
                      }
                     
                  } catch (error) {
                    // Error saving data
                }
        };
    doLogin = ()=>
    {
       
        GetPersonByLogin(this.state.username,this.state.userpass).then((regis) => {
            this.setState({ regis });
            //window.console.log(regis);
            if (regis.length <= 0)
            {
                alert('Please Try Again !!!');
                return false;
            }
            else
            {
                this._storeData(regis);
                Actions.Mainpage();
            }
          }).catch((error) => {
            alert(error);
          });

        
    }
    render(){
        return(
            <ScrollView>
            <KeyboardAvoidingView style={{padding:20}}>
                <View>
                    <Text style = {{fontSize:30}} >Login</Text>
                    <Text style = {{fontSize:25}}>Sign in to your acount</Text>
                </View>
                <View >
                    <TextInput placeholder='User Name' value={this.state.username} onChangeText={username => this.setState({username})} />
                    <TextInput placeholder='Password' secureTextEntry value={this.state.userpass} onChangeText={userpass => this.setState({userpass})}/>
                    <Button block primary onPress={() => {this.doLogin();}}>
                            <Text >Login</Text>
                    </Button>
                        
                </View>
            </KeyboardAvoidingView>

            </ScrollView>

        )
        }
}