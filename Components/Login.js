import React,{useState} from 'react'
import { StyleSheet,Text,View,Button,TextInput,Image,TouchableOpacity,SafeAreaView, Alert } from 'react-native'
import pic from '../assets/peakpx.jpg'
import Toast from 'react-native-toast-message';


export default function Login({navigation}){
 
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

const validation=()=>{
  if(email==""||password==""){
    return false
  }
  return true
}


const handleLogin=()=>{

  if(validation()){
    try{
  fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    username: 'kminchelle',
    password: '0lelplR',
    // expiresInMins: 60, // optional
  })
})
.then(res => res.json())
.then(()=>{
 showToast()
 setTimeout(() => {
  navigation.navigate('Map')
 }, 1500);
})
    }
catch(error){
console.log(error.message)
}
  }
else{
 showToast2()
}

}

const showToast=()=>{
  Toast.show({
    type:'success',
    text1:'Successfully Logged In'
  })
}
const showToast2=()=>{
  Toast.show({
    type:'error',
    text1:'Kindly fill the required Fields'
  })
}
  return(
<View style={styles.container}>
 <Image source={pic} style={styles.backImage}/>
  <View  style={styles.whitesheet} >
 <SafeAreaView style={styles.form}>
<Text style={styles.title}>Login</Text>
<TextInput
style={styles.input}
placeholder='Enter Password'
autoCapitalize='none'
keyboardType='default'
textContentType='emailaddress'
autoFocus={true}
autoCorrect={false}
value={email}
onChangeText={newtext=>setEmail(newtext)}

/>
<TextInput
  style={styles.input}
  placeholder='Enter Password'
  autoCapitalize='none'
  keyboardType='default'  // Change keyboardType to 'default' for passwords
  textContentType='password'
  autoFocus={true}
  autoCorrect={false}
  secureTextEntry={true}
  value={password}
  onChangeText={newPassword => setPassword(newPassword)}  // Use onChangeText instead of onChange
/>

<TouchableOpacity  style={{marginTop:5,flexDirection:'row',alignItems:'flex-start',alignSelf:'flex-start'}}>
  <Text style={{color:'blue'}}>Forget Password</Text>
</TouchableOpacity>
<TouchableOpacity onPress={handleLogin}  style={styles.button}>
  <Text style={{fontWeight:'bold',color:'#fff',fontSize:18}}>Login</Text>
</TouchableOpacity>
<View style={{marginTop:20,flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
  <Text style={{color:'gray', fontWeight:600,fontSize:18}}>Don't have account? </Text>
  <TouchableOpacity>
    <Text style={{color:'#f57c00',fontWeight:'600',fontSize:18}} onPress={()=>navigation.navigate('Signup')}>Sign Up</Text>
  </TouchableOpacity>
</View>
</SafeAreaView>   
  </View>
  <Toast/>
</View>
  )



}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  title:{
    fontSize:36,
    fontWeight:'bold',
    color:'orange',
    alignSelf:'center',
    paddingBottom:24
  },
  input:{
    backgroundColor:'#F6F7FB',
    height:58,
    marginBottom:20,
    fontSize:16,
    borderRadius:10,
    padding:12,
  },
  backImage:{
    width:'100%',
    height:340,
    position:'absolute',
    top:0,
    resizeMode:'cover'
  },
  whitesheet:{
    width:'100%',
    height:'75%',
    position:'absolute',
    bottom:0,
   backgroundColor:'#fff',
    borderTopLeftRadius:60
  },
  form:{
    flex:1,
    justifyContent:'center',
    marginHorizontal:30
  },
  button:{
    borderRadius:10,
    height:58,
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
    backgroundColor:'#f57c00'
  }
})