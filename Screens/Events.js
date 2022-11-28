import {useState,useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'; 
const db = SQLite.openDatabase('EventsDatabase.db'); 
export default function Event() {
  const [events,setEvents]=useState([]);

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

  const deleteEvent=(id)=>{
       db.transaction(tx=>{
        tx.executeSql('DELETE FROM events WHERE id=?',[id],
        (txObj,resultSet)=>{
          if(resultSet.rowsAffected>0){
            console.log('Event deleted successfully');
          }
        }
        )
       })
  }

  const listItemView = (item) => {
    return (
      <View
        key={item.id}
        ItemSeparatorComponent={listViewItemSeparator}
        style={{ backgroundColor: 'white', padding: 20, margin:2, borderRadius:5, width:'100%' }}>
        <TouchableOpacity onPress={()=>deleteEvent(item.id)}>
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
  }
});
