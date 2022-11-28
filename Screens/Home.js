import { useEffect, useState } from 'react'; 
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Card, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
const db = SQLite.openDatabase('EventsDatabase.db'); 

export default function AssetExample() {
  const [date, setDate] = useState('09-10-2020');
  const [name,setName]=useState('');
      db.transaction(tx => {
      tx.executeSql(
          'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(225), date VARCHAR(225))'
      )
    });
    const newevent = () => {
      db.transaction(tx => {
        tx.executeSql('INSERT INTO events (name, date) values (?, ?)', [name, date],
          (txObj, resultSet) =>{
             console.log('Successfully created');
          })
      });
      //navigation.navigate('Events');
    }
 
  return (
    <View style={styles.container}>
      <Card style={styles.datecards}>
        <TextInput style={styles.input} placeholder='Event name' onChangeText={(text)=>setName(text)}></TextInput>

     <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
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

        <TouchableOpacity style={styles.Addbutton} onPress={() => newevent()}><Text style={{color:'white',fontWeight:'bold',fontSize:40,marginLeft:12,marginTop:-2}}>+</Text></TouchableOpacity>
      </Card>
      <Card style={styles.cardOuter}>
        <Text style={{textAlign:'center', fontWeight:'bold',fontSize:16,padding:2}}>Overview</Text>
      <Card style={styles.card}>
           <Text style={styles.over }>Active Events</Text>
        </Card>
        <Card style={styles.card}>
           <Text style={styles.over}>Notifications</Text>
        </Card>
        <Card style={styles.card}>
           <Text style={styles.over}>Archives</Text>
        </Card>
      </Card>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  card:{
    height:80,
    width:'94%',
    backgroundColor:'white',
    margin:10,
    borderRadius:20,
  },
  cardOuter:{
    height:320,
    width:'100%',
    borderRadius:20,
    backgroundColor:'white'
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
    width:'97%',
    marginLeft:5,
    marginBottom:5,
  },
  Addbutton:{
    height:50,
    width:'15%',
    color:'white',
    backgroundColor:'#0d3b66',
    borderRadius:60,
    marginLeft:'70%',
    marginTop:-42,
  },
  over:{
    fontSize:18,
    fontWeight:'bold',
    padding:5,
  }
});
