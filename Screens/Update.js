import React,{useEffect,useState} from "react";
import { Text,StyleSheet,TouchableOpacity,View,TextInput} from "react-native";
import {Card} from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import DatePicker from 'react-native-datepicker';
const db = SQLite.openDatabase('EventsDatabase.db');

export default function UpdateData({route}){
// const {id}=route.params.id;
// const {name}=route.params.name;
// const {date}=route.params.date;
const[Uname,setName]=useState('')
const[Udate,setDate]=useState('')
// console.log(name,date);
 const update=(id)=>{
    
    db.transaction((tx)=>{
     tx.executeSql("UPDATE events set name=?, date=? where id=?",
     [Uname,Udate,id],
     (txObj,resultSet)=>{
         if(resultSet.rowsAffected>0){
            console.log('Update successfully');
         }
     }
     )
    })
}

return(
      <View style={styles.container}>
      <Card style={styles.datecards}>
        <TextInput style={styles.input} placeholder='Event name'  onChangeText={(text)=>setName(text)}></TextInput>

     <DatePicker
          style={styles.datePickerStyle}
          date={route.params.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-10-2022"
          maxDate="01-01-2024"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              width:60
            },
            dateInput: {
              marginLeft: 65,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />

        <TouchableOpacity style={styles.Addbutton} onPress={() => update(route.params.id)}><Text style={{color:'white',fontWeight:'bold',fontSize:20,marginLeft:7,marginTop:-2,marginTop:10}}>Update</Text></TouchableOpacity>
      </Card>

    </View>
)
}

const styles=StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      },
      datecards:{
        marginBottom:5,
        height:150,
        width:'100%',
        borderRadius:20
    },
    datePickerStyle: {
      width: 200,
      marginTop: 10,
    },
    input:{
      height:50,
      marginTop:20,
      color:'black',
      backgroundColor:'gray',
      width:'97%',
      marginLeft:5,
      marginBottom:5,
    },
    Addbutton:{
      height:50,
      width:'25%',
      color:'white',
      backgroundColor:'#0d3b66',
      borderRadius:5,
      marginLeft:'70%',
      marginTop:-42,
    }
})