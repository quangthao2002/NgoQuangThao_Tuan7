import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import { Icon } from "react-native-vector-icons/icon";

function Screen1() {
  var [data, setData] = useState([]);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    fetch("https://654196bff0b8287df1fe827b.mockapi.io/bonus")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: "gray", fontSize: 18 }}>Welcome, Jala!</Text>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Choice you Best food
        </Text>

        <TextInput
          style={{
            height: 45,
            borderWidth: "1px",
            borderColor: "gray",
            // borderColor:"#D3D3D3",
            fontSize: "16px",
            fontWeight: "bold",
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#D3D3D3",
          }}
          placeholder="   Search Food!"
          placeholderTextColor="gray"
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "gray",
              width: 90,
              backgroundColor: "yellow",
              height: "30px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Donut
          </Pressable>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "gray",
              width: 90,
              marginLeft: 20,
              height: "30px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Pink Donut
          </Pressable>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "gray",
              width: 90,
              marginLeft: 20,
              height: "30px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Floating
          </Pressable>
        </View>
      </View>
      {data.map((item) => {
        return (
          <View key={item.id}
            style={{
              flexDirection: "row",
              marginTop: 20,
              backgroundColor: "pink",
              borderRadius: 10,
              paddingHorizontal: 10,
              marginRight: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                margin: 3,
                borderRadius: 10,
                width: 100,
                height: 100,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ ...styles.title, marginBottom: 5 }}>
                {item.title}
              </Text>
              <Text style={{ ...styles.desc, marginBottom: 5 }}>
                {item.description}
              </Text>
              <Text style>{item.price}</Text>
            </View>
            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                backgroundColor: "#F1B000",
                padding: 2,
                borderRadius: 30,
                borderTopLeftRadius: 90,
              }}
            >
              <Pressable onPress={()=>{
                  navigation.navigate("Screen2",{item:item})
              }}>
                <Ionicons name="add" size={40} color={"white"} />
              </Pressable>
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
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  desc: {
    color: "gray",
    fontSize: 18,
    fontWeight: "400",
  },
});

export default Screen1;
