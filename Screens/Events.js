import {useState,useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import { Text, View, StyleSheet, FlatList, TouchableOpacity,Alert } from 'react-native'; 
const db = SQLite.openDatabase('EventsDatabase.db'); 
export default function Event({navigation}) {
  const [events,setEvents]=useState([]);

  const [idupdated,setID]=useState('');
  const [nameupdated,setName]=useState('');
  const [dateupdated,setDate]=useState('');

  const getEvents = () =>{
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM events', null,
        (txObj, {rows:{_array}}) => setEvents(_array)
        ) 
    })
  };

useEffect(()=>{
    getEvents();
},[events]);
    
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080',
          borderWidth:1,
          borderColor:'gray'
        }}
      />
    );
  };
  

  const DeleteUpdate=(id,name,date)=>{
    Alert.alert(
      'Hello, Do you want to update selected Event or to delete it?',
      '',
      [
        { text: 'Delete', onPress: () =>{
          db.transaction(tx=>{
            tx.executeSql('DELETE FROM events WHERE id=?',[id],
            (txObj,resultSet)=>{
              if(resultSet.rowsAffected>0){
                console.log('Event deleted successfully');
              }
            }
            )
           })
        } },
        {
          text: 'Update',
          onPress:() =>{navigation.navigate('Update',{id,name,date})}
        },
      ],
      { cancelable: true }
      //clicking out side of alert will not cancel
    );
       
  }
  const UpdateEvent=()=>{
    navigation.navigate('Update',{});
  }


  const listItemView = (item) => {
    return (
      <View
        key={item.id}
        ItemSeparatorComponent={listViewItemSeparator}
        style={{ backgroundColor: 'white', padding: 20, margin:2, borderRadius:5, width:'100%' }}>
        <TouchableOpacity onPress={()=>DeleteUpdate(item.id,item.name,item.date)}>
        <Text style={{fontWeight:'bold',fontSize:24}}>{item.name}</Text>
        <Text style={{fontSize:18}}>Due date:{item.date}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
       <FlatList
            data={events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
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
  }
});
