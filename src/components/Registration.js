import React, { Component } from 'react';
import realm from '../models/allSchemas';
import {insertNewMobApp,GetDataRegs,deleteAllMobApp,insertNewPerson,deletePerson, GetPersonByPid,deletePersonByPid} from '../models/allSchemas';
import {Alert, Text,PermissionsAndroid, KeyboardAvoidingView, Button} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Actions } from 'react-native-router-flux';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { View } from 'native-base';
const message_disabled='ACTIVATE APP';
const message_enabled='REGISTERED';

export async function request_READ_PHONE_STATE() {
 
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE ,
        {
          'title': 'ReactNativeCode wants to READ_PHONE_STATE',
          'message': 'ReactNativeCode App needs access to your personal data. '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
   
       // Alert.alert("Permission Granted.");
      }
      else {
   
        Alert.alert("Permission Not Granted");
   
      }
    } catch (err) {
      console.warn(err)
    }
  }

  export default class Registration extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            isLoading:false,
            secretid:'',
            secretkey:'',
            secretkey_system:'',    
            isaktiv:false,
            configsLists:[],
            textReg:'',
            DeviceIMEI: '',
            configsRegs:[],
            okmang:'',
            username:'superadmin',
            email:'',
            password:'',

        }
    }
    getDeviceIMEI = () => {
        const IMEI = require('react-native-imei');
        IMEI.getImei().then(imeiList => {
          this.setState({secretid: imeiList[0]})
          this.setState({configsLists: imeiList})
          });
      }
    async componentDidMount() {

    await request_READ_PHONE_STATE() ;
    this._reloadData()
    this.getDeviceIMEI();

    }
    _reloadData = () => {
        GetDataRegs().then((configsRegs) => {
          this.setState({ configsRegs });
          var ddata=configsRegs;
          for (let i=0; i<ddata.length; i++) {
            this.setState({secretkey:ddata[i].masecretkey,
              okmang:ddata[i].notes
             }) 
           }
        }).catch((error) => {
            this.setState({ configsRegs: [] });
        });

        GetPersonByPid(1).then((dperson) => {
          this.setState({ dperson });
          var ddata=dperson;
          for (let i=0; i<ddata.length; i++) {
            this.setState({username:ddata[i].username,
             password:ddata[i].password
             }) 
           }
        }).catch((error) => {
            this.setState({ configsRegs: [] });
        });

     }  

     ActDelete =() =>{
        deleteAllMobApp().then().catch((error) => {
          alert(`Save Data :  error ${error}`);
          });
          deletePerson().then().catch((error) => {
            alert(`Save Data :  error ${error}`);
            });
          
  
    }
    ActSave () {
        var aesjs = require('aes-js');
        // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
        var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    
        // Convert text to bytes
        var text = this.state.secretid+'R21518';
        var textBytes = aesjs.utils.utf8.toBytes(text);
    
        // The counter is optional, and if omitted will begin at 1
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textBytes);
    
        // To print or store the binary data, you may convert it to hex
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    
            if (this.state.secretkey!==encryptedHex)
            {
                alert("Invalid Secret Key !!!");
                return false;
            }
    
            Alert.alert("Save ","Activate Application ?", 
            [
              {text: 'Cancel', onPress: () => {}, style: 'cancel' },
              {text: 'Save', onPress: () => {
                var NewItems=[];
                          NewItems = {
                            maid         : Math.floor(Date.now() / 10),
                            masecretid     : this.state.secretid,
                            masecretkey    : this.state.secretkey,
                            notes        : 'OKMANG'
                        }
                       
                    deleteAllMobApp().then().catch((error) => {
                        alert(`Save Data :  error ${error}`);
                        });
                    insertNewMobApp(NewItems).then(
                      Alert.alert(
                        'Success',
                        'Save data successfully',
                        [
                          {
                            text: 'Ok',
                            onPress: () => {Actions.Home();}
                          },
    
                        ],
                        { cancelable: false }
                      )
                      
                    ).catch((error) => {
                        alert(`Save Data :  error ${error}`);
                        });
                  
                        var NewItems=[];
                        NewItems = {
                                pid         : 1,
                                username : this.state.username,
                                email: this.state.email,
                                password : this.state.password,
                            }
                           
                        deletePersonByPid(1).then().catch((error) => {});
                        insertNewPerson(NewItems).then().catch((error) => {
                            alert(`Save Data :  error ${error}`);
                            });
                       
                }}
            ]);
      }  
      
      _the_encrypted_key = () =>
      {
         
    var aesjs = require('aes-js');
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    
    var text = this.state.secretid+'R21518';
    var textBytes = aesjs.utils.utf8.toBytes(text);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
 
            this.setState({
             // secretkey : encryptedHex,
              secretkey_system : encryptedHex,
            });
    }
    render(){
        return(
            <ScrollView style={styles.mainBody}>
                <KeyboardAvoidingView 
                style ={{flex: 1, justifyContent: 'space-between'}}>
                    <View style={styles.SectionStyle}>
                        <Text>Registration</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            underlineColorAndroid='green'
                            placeholder={'Enter username'}
                            returnKeyType={'next'}
                            editable = {false} 
                            value={this.state.secretid} 
                            onChangeText={ secretid => this.setState({secretid})}
                            
                        />
                        <TextInput
                            style={styles.inputStyle}
                            underlineColorAndroid='green'
                            placeholder={'Enter username'}
                            returnKeyType={'next'}
                            value={this.state.secretkey} 
                            onChangeText={secretkey => this.setState({secretkey})}
                            
                        />
                        <TextInput
                            style={styles.inputStyle}
                            underlineColorAndroid='green'
                            placeholder={'Enter username'}
                            returnKeyType={'next'}
                            editable = {false} 
                            value={this.state.username} 
                            onChangeText={username => this.setState({username})}
                            
                        />
                        <TextInput
                           style={styles.textInput} 
                            underLineColorAndroid='green'
                            placeholder={'Enter Your password'}
                            placeholderTextColor='grey'
                            returnKeyType={'next'}
                            value={this.state.password} 
                            onChangeText={password => this.setState({password})}
                            secureTextEntry 
                        />

                    </View>
                    <View style={styles.SectionStyle}>
                        <Button block primary onPress={() => this.ActSave()}>
                        <Text  style={{ color:'#ffffff' }}>ACTIVATE APPLICATION</Text>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }



  }
  const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#307ecc',
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: '#7DE24E',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: 'white',
    },
    registerTextStyle: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
  });