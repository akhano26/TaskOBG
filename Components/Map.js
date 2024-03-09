import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Image,
  SafeAreaView,
  Text,
  Pressable
} from 'react-native';
import MapViewGestures from '@dev-event/react-native-maps-draw'

import MapView, { Polygon, Marker } from 'react-native-maps';
import MenuCard from './Menu';


const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

export default function App() {
  const mapRef = useRef(null);

  const initialPolygon = useRef({
    polygons: [],
    distance: 0,
    lastLatLng: undefined,
    initialLatLng: undefined,
    centerLatLng: undefined,
  });

  const [isActiveDraw, setDrawMode] = useState(false);
  const [polygon, setPolygon] = useState(initialPolygon.current);
  const [isReady, setIsReady] = useState(false);
  const [points, setPoints] = useState([]);
const [listLocation,setlistLocation]=useState([]);
  const handleMapReady = useCallback(
    () => mapRef.current && setIsReady(true),
    []
  );

  const convertByPoint = async (item) =>
    await mapRef.current?.coordinateForPoint(item);

  const handleRemovePolygon = () => setPolygon(initialPolygon.current);

  const handleCanvasEndDraw = useCallback((locations) => 
  {

    setPolygon(locations.polygons);
    setDrawMode(false);
  }, []);

  const handlePolygon = useCallback(
    (_, index) => (
      <AnimatedPolygon
        key={index}
        coordinates={polygon.polygons}
        fillColor="rgba(255, 171, 171, 0.01)"
        strokeColor="rgba(255, 171, 171, 0.88)"
        strokeWidth={1}
      />
    ),
    [polygon.polygons]
  );

  const handlemovelocation=()=>{
    setPolygon(listLocation[0])
  }
const handlefinish=()=>{
  const array=[...listLocation,polygon]

  setlistLocation(array)
  console.log('All Locations: ',listLocation)
}
  const isVisiblePolygons = useMemo(
    () => isReady && polygon.polygons && polygon.polygons.length > 0,
    [isReady, polygon.polygons]
  );



  return (
    <SafeAreaView style={styles.container}>
      <MapView ref={mapRef} style={styles.map} onMapReady={handleMapReady}>
        {isVisiblePolygons && (
          <>
            {polygon.centerLatLng && (
              <Marker
                onPress={handleRemovePolygon}
                coordinate={polygon.centerLatLng}
              >
                <View style={styles.card}>
                  <Image
                    source={require('../assets/location.png')}
                    resizeMode={'stretch'}
                    style={styles.img}
                  />
                </View>
              </Marker>
            )}
            {polygon.polygons.map({handlePolygon})}
          </>
        )}
      </MapView>
      {isActiveDraw && (
        <MapViewGestures
          points={points}
          widthLine={3}
          colorLine={'green'}
          onEndDraw={handleCanvasEndDraw}
          onChangePoints={setPoints}
          backgroundCanvas={'rgba(0, 0, 0, 0.0)'}
          convertByPoint={convertByPoint
           }
        />
      )}
      
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding:20,
          }}
        >
          <MenuCard
            enabled={isActiveDraw}
            title={'Draw Area'}
            onTap={() => {
              setPolygon(initialPolygon.current);
              setPoints([]);
              setDrawMode(true);
            }}
          />
          <Pressable onPress={()=>{setDrawMode(false)
          handlemovelocation()
        }}><Text>Move</Text></Pressable>
          <Pressable onPress={()=>{setDrawMode(false)
          handlefinish()
        }}><Text>Finish</Text></Pressable>
        </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  panel: {
    flexDirection: 'column',
    bottom: '0%',
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
    position: 'absolute',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  title: {
    color: '#241f1f',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  img: {
    height: 18,
    width: 18,
    tintColor: 'white',
  },
  map: {
    flex: 1,
  },

  card: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: 'orange',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});