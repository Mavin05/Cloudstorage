import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { ref, set, update, onValue, remove } from "firebase/database";
import { db } from "./config";
import { useState } from "react";

export default function App() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");

  function create() {
    set(ref(db, "users/" + username), {
      username: username,
      email: email,
    })
      .then(() => {
        alert("Data updated");
      })
      .catch((error) => {
        alert(error);
      });
  }

  function updateItem() {
    update(ref(db, "users/" + username), {
      username: username,
      email: email,
    })
      .then(() => {
        alert("Data was changed");
      })
      .catch((error) => {
        alert(error);
      });
  }

  function readData() {
    const starCountRef = ref(db, "users/" + username);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setEmail(data.email);
      } else {
        alert("Data does not exist");
      }
    });
  }

  function deleteData() {
    remove(ref(db, "users/" + username))
      .then(function () {
        alert("Remove succeded.");
      })
      .catch(function (error) {
        alert("Remove failed: " + error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cloud Storage!</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Username"
        value={username}
        onChangeText={(username) => {
          setName(username);
        }}
      ></TextInput>
      <TextInput
        style={styles.inputText}
        placeholder="Email"
        value={email}
        onChangeText={(email) => {
          setEmail(email);
        }}
      ></TextInput>
      <Pressable onPress={create} style={styles.buttons}>
        <Text style={styles.buttonText}>Create Data</Text>
      </Pressable>
      <Pressable onPress={updateItem} style={styles.buttons}>
        <Text style={styles.buttonText}>Update Data</Text>
      </Pressable>
      <Pressable onPress={readData} style={styles.buttons}>
        <Text style={styles.buttonText}>Get Data</Text>
      </Pressable>
      <Pressable onPress={deleteData} style={styles.buttons}>
        <Text style={styles.buttonText}>Delete Data</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    margin: 10,
  },
  inputText: {
    fontSize: 20,
    margin: 5,
  },
  buttons: {
    backgroundColor: "red",
    height: 40,
    width: "60%",
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});