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
  
  var url = "https://654196bff0b8287df1fe827b.mockapi.io/bonus";
  // Fetch data when component mounts
  var fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      }).catch(err=> console.log(err));
      
  };

  useEffect(fetchData, []);
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
              height: "30px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Floating
          </Pressable>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "gray",
              width: 90,
              height: "30px",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() =>
              fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: "Cake birth day",
                  description: "New Item",
                  price: "34$",
                  image:
                    "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D",
                }),
              })
                .then((response) => response.json())
                .then(() =>  fetchData())
            }
          >
            Insert
          </Pressable>
        </View>
      </View>
      {data.map((item) => {
        return (
          <View
            key={item.id}
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
            <View style={{ position: "absolute", right: 50,bottom:0 }}>
              <Pressable
                style={{
                  width: 50,
                  height: 45,
                  backgroundColor: "#C0C0C0",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
                onPress={() => {
                  fetch(url + "/" + item.id, {
                    method: "DELETE",
                  }).then(() => {
                    fetchData();
                  });
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </View>
            <View style={{ position: "absolute", right: 110,bottom:0 }}>
              <Pressable
                style={{
                  width: 50,
                  height: 45,
                  backgroundColor: "#C0C0C0",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
                onPress={() => {
                  let dataToUpdate = {title: 'Birth day cake', description: 'Updated Description', price: "15$",image:"https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"};
                  fetch(url + "/" + item.id, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataToUpdate),
                  })
                  .then((res)=> res.json())
                  .then(() => {
                    fetchData();
                  });
                }}
              >
                <Text>Update</Text>
              </Pressable>
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
              <Pressable
                onPress={() => {
                  navigation.navigate("Screen2", { item: item });
                }}
              >
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
