import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import Map from './Components/Map';
import MyMapView from './Components/Map.1';
const Stack=createStackNavigator();


export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator screenOptions={{ headerShown:false,}}>
    <Stack.Screen name='Login' component={Login}/>
    <Stack.Screen name='Map' component={MyMapView}/>
  </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
