import React, { useState,useRef, useEffect} from 'react';
import  { StyleSheet, View, Pressable, Text, Alert, Button,ScrollView,Modal,TextInput }from 'react-native';
import MapView, { Circle, Polyline, Marker } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';


const MyMapView = ({ }) => {
  //all states
  const [drawLine, setdawLine] = useState(false);
  const [locations, setLocation] = useState([]);
  const [showlist, setShowlist] = useState(false);
  const [path, setPath] = useState([]);
  const [Name, setName] = useState('');
  const mapRef = useRef(null);
  const [showModal,setshowModal]=useState(false)
  const [locName,setLocName]=useState()
  const [mapScrollEnabled, setMapScrollEnabled] = useState(true);
  const [makeDraw,setMakedraw]=useState(false)

  //handling drawing
  const handleMapPress = (e) => {
    if (makeDraw) {
      setPath([...path, e.nativeEvent.coordinate]);
    }
  };

///Handing the finish button
  const handleFinish = () => {
    if (path.length >1 && makeDraw) {
      setMakedraw(false)
    setshowModal(true)
      const tempath=[...path]
      setPath([...tempath, path[0]]);
    } 
    else{
      Alert.alert('Kindly Draw First')
    }
  };


  //Handling the delete shape button.
  const handleDeleteShape = (index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocation(updatedLocations);
  };

  const showAlert = () => {
    console.log('yahan hun mn')
    
  }

  //setting the patting by clicking on list object
  const handlesetLocation=(points)=>{
    setPath(points)
    console.log("fdsl ",points)
    setShowlist(false)
    if (mapRef.current) {
      const selectedRegion = {
        latitude: points[0].latitude,
        longitude: points[0].longitude,
        latitudeDelta: 0.02, 
        longitudeDelta: 0.02,
      };
      mapRef.current.animateToRegion(selectedRegion, 1000);
    }
  }

  //handling save location
  const handlesaveLocation=()=>{
    if (locName && path.length > 1) {
      setMapScrollEnabled(true)
      setshowModal(false)
      const newLocation = {
        locName: locName,
        points: path,
      };
      setLocation([...locations, newLocation]);
      setPath([]);
      setLocName('');
    } else {
      Alert.alert('Please enter a valid location name or draw a shape.');
    }
  }

  //testing location update
useEffect(()=>{
  console.log(locations)
},[locations])


  return (
    <View style={styles.container}>

      <View style={styles.listButtonContainer}>
      <Pressable onPress={() => setShowlist(true)}>
      <Entypo name="list" size={16} color="white" />
      </Pressable>

    </View>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: 33.768051,
          longitude: 72.360703,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        onPanDrag={handleMapPress}
        scrollEnabled={mapScrollEnabled}
        //onPress={handleMapPress}
      >
        <Circle
          center={{ latitude: 33.768051, longitude: 72.360703 }}
          radius={30}
          strokeColor='rgba(158, 158, 255, 1.0)'
          fillColor='rgba(0, 0, 255, 0.3)'
        />
        {drawLine && (
          <Polyline
            coordinates={path}
            strokeColor='red'
            strokeWidth={2} 
          />
        )}
        <Marker
          coordinate={{ latitude: 33.768051, longitude: 72.360703 }}
          title="Current Location"
          description="This is your current location"
        />
      </MapView>
      
      <Modal transparent={true} style={{height:100,width:100}} visible={showModal}>
        <View style={styles.centeredview}>
          <View style={styles.modalview}>
         <View style={styles.input}><TextInput   placeholder='Enter Location Name'
  autoCapitalize='none'
  keyboardType='default' 
  textContentType='password'
  onChangeText={newtext=>setLocName(newtext)}/></View>
        <Pressable onPress={handlesaveLocation} style={styles.savebtn}><Text style={styles.txt}>Save</Text></Pressable>
        <Pressable onPress={()=>{setshowModal(false)}} style={styles.deletebtn}><Text style={styles.txt}>Close</Text></Pressable>
        </View>
        </View>



      </Modal>

      <Modal visible={showlist} transparent={true}>
  <ScrollView style={{ padding: 30, borderRadius: 10, backgroundColor: 'white' }}>
    <View style={styles.listheadingcon}>
      <Text style={styles.listheading}>Stored Location List</Text>
      <Button style={{}} title='Close' onPress={() => setShowlist(false)} />
    </View>
    {locations.map((coordinates, index) => (
      <View style={styles.listitem} key={index}>
        <Pressable styles={{alignItems:'flex-start'}} onPress={() => handlesetLocation(coordinates.points)}>
          
           <Text style={{fontSize:16,fontWeight:'bold'}}> Name: {coordinates.locName}</Text> 
          
        </Pressable>
        <Pressable style={styles.deletebutton} onPress={() => handleDeleteShape(index)}>
          <Text>Delete</Text>
        </Pressable>
      </View>
    ))}
    <View style={{ alignItems: 'flex-end', marginTop: 5 }}></View>
  </ScrollView>
</Modal>

      <View style={{ flex: 1, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Pressable style={styles.functionbuttons} onPress={() => { setdawLine(true)
           setPath([])
           setMapScrollEnabled(false) 
           setMakedraw(true)}}><Text style={styles.txt}>Draw</Text></Pressable>
        <Pressable style={styles.functionbuttons} onPress={() => { handleFinish() }}><Text style={styles.txt}>Finish</Text></Pressable>
        <Pressable style={styles.functionbuttons} onPress={() => { setPath([])
        setdawLine(false) }}><Text style={styles.txt}>Clear</Text></Pressable>
      </View>
    </View>
  );
};

export default MyMapView;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex:0
  },
  
listheadingcon:{
  flex:2,
alignItems:'center',
columnGap:30,
padding:5,
flexDirection:'row'
},
listheading:{
fontWeight:'bold',
fontSize:20
},

listButtonContainer: {
  position: 'absolute',
  top: 60,
  left: 20,
  backgroundColor: '#0E63C2',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  zIndex:1,
  padding:10,
  borderRadius:8,
  borderWidth:2,
  borderColor:'black'
},
listButtonText: {
  color: 'white',
  fontWeight: 'bold',
},

  listitem:{
    alignItems:'center',
    margin:10,
    borderWidth:1,
    borderColor:'black',
backgroundColor:'#D3D3D3',
padding:10,
borderRadius:12
  },
  
deletebutton:{
  backgroundColor:'red',
  alignItems:'center',
  padding:5,
margin:5,
borderRadius:5,
width:70
},

functionbuttons:{
  backgroundColor:'#0E63C2',
  padding:10,
  borderRadius:8,
  width:80,
  alignItems:'center',
  borderWidth:2,
  borderColor:'black'
},
txt:{
  color:'white'
},

centeredview:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
},
modalview:{
  backgroundColor:'lightblue',
  padding:40,
  borderRadius:20,
  shadowColor:'black',
  elevation:5
},
input:{
  backgroundColor:'#F6F7FB',
  height:48,
  width:200,
  marginBottom:20,
  fontSize:16,
  borderRadius:10,
  padding:12,
},
savebtn:{
  alignItems:'center',
  backgroundColor:'blue',
  height:40,
  paddingTop:10,
  borderRadius:15,
  marginTop:15
},
deletebtn:{
  alignItems:'center',
  backgroundColor:'red',
  height:40,
  paddingTop:10,
  borderRadius:15,
  marginTop:15
}


});
