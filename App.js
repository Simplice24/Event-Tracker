import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import {card} from 'react-native-paper';
import Home from './Screens/Home';
import Update from './Screens/Update';
import Notifications from './Screens/Notifications';
import Archives from './Screens/Archives';
import Events from './Screens/Events';
const Tab = createBottomTabNavigator();

function MyTabs(navigation) {
  return (
    <NavigationContainer >
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#00f5d4'
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={'#006d77'} size={size} />
          ),
        }}
      />

<Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={'#006d77'} size={size} />
          ),
          tabBarBadge:12,
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={'#006d77'} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Archives"
        component={Archives}
        options={{
          tabBarLabel: 'Archives',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="archive" color={'#006d77'} size={size} />
          ),
          tabBarBadge:20
        }}
      />

<Tab.Screen
        name="Update"
        component={Update}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;

