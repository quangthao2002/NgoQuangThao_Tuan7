import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Pressable } from "react-native";

export default function App() {
  var [data, setData] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    fetch("https://654196bff0b8287df1fe827b.mockapi.io/bonus")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={{marginVertical:10}}>
        <Text style={{color:'gray'}}>Welcome, Jala!</Text>
        <Text style={{fontSize:22,fontWeight:'bold',marginBottom:10}}>Choice you Best food</Text>

        <TextInput
          style={{
            height: 40,
            borderWidth: "2px",
            alignItems: "center",
            justifyContent: "center",
          }}
          placeholder="Search Food!"
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
        <View style={{flexDirection:"row",marginTop:20}}>

          <Pressable style={{borderWidth:2,width:90,backgroundColor:"yellow",height:"30px",alignItems:"center",justifyContent:'center'}}>Donut</Pressable>
          <Pressable style={{borderWidth:2,width:90, marginLeft:20,height:"30px",alignItems:"center",justifyContent:'center'}}>Pink Donut</Pressable>
          <Pressable style={{borderWidth:2,width:90,marginLeft:20,height:"30px",alignItems:"center",justifyContent:'center'}}>Floating</Pressable>


        </View>
      </View>
      {data.map((item) => {
        return (
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              backgroundColor: "pink",
              borderRadius:10,
              paddingHorizontal:10,
              marginRight:10
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100 ,resizeMode:"contain"}}
            />
            <View style={{marginLeft:10}}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style>{item.price}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    paddingLeft:10

  },
  title:{
    fontSize:20,
    fontWeight:"bold"
  },
  desc:{
    color:"gray",
    fontWeight:"400"
    
  }
});
