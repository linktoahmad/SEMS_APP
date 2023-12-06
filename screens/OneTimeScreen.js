import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

var first_id = "no meter";
const STORAGE_KEY = "@save_visibility";
const STORAGE_KEY2 = "@save_id";
const regex = /(sems)[0-9]{3,7}/;

const OTScreen = () => {
  const [visibility, set_visibility] = useState(true);

  const [new_meter, add_new_meter] = useState("");

  const saveData = async () => {
   
      
      AsyncStorage.setItem(STORAGE_KEY2, new_meter);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, "false");
      } catch (e) {
        alert("Failed to save the data to the storage");
      }

      set_visibility(false);
  };

  const readData = async () => {
    const id = await AsyncStorage.getItem(STORAGE_KEY2);
    if (id != null) {
      first_id = id;
    }

    const vis = await AsyncStorage.getItem(STORAGE_KEY);
    if (vis == null) {
      set_visibility(true);
    }else set_visibility(false);
  };

  const add_element = () => {
    if (new_meter.match(regex)) {
      alert("✅" + new_meter + " Meter Up");
      first_id = new_meter;
      saveData();
    } else {
      alert(
        "               ⚠️\nplease enter correct Id \nId is case sensitive \neg sems000"
      );
    }
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <View>
      <Modal
        animationType={"slide"}
        transparent={true}
        style={styles.ftreContainer}
        visible={visibility} //this.state.modalVisible
      >
        <View style={styles.ftreContainer}>
          <View style={styles.ftreTitleContainer}>
            <Text style={styles.ftreTitle}>👋 Hey There!</Text>
          </View>
          <Text style={{fontSize:15, fontWeight:"bold", alignSelf:"center", paddingBottom: 10}} >Welcome to SEMS</Text>
          <View style={styles.ftreDescriptionContainer}>
            <Text style={styles.ftreDescription} allowFontScaling={true}>
              Enter Meter ID
            </Text>

            <TextInput
              style={{
                marginLeft: 15,
                borderRadius: 5,
                height: 40,
                width: 240,
                borderColor: "#29a9e6",
                borderWidth: 1,
                alignSelf: "center",
              }}
              placeholder="Add new meter"
              placeholderTextColor="grey"
              onChangeText={(text) => add_new_meter(text)}
              onSubmitEditing={add_element}
            />

            <Text style={styles.fontx}>⚠️ Enter The meter Id precisely</Text>
            <Text style={styles.fontx}>⚠️ Meter Id is case sensitive</Text>
            <Text style={styles.fontx}>
              ⚠️ Entering wrong meter Id may cause loss of data
            </Text>
          </View>
          <View style={styles.ftreExitContainer}>
            <TouchableHighlight onPress={add_element}>
              <View style={styles.ftreExitButtonContainer}>
                <Text style={styles.ftreExitButtonText}>Done</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OTScreen;
export { first_id };

const styles = StyleSheet.create({
  ftreContainer: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 70,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#66a1ff",
  },
  ftreTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  ftreDescription: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
  fontx: {
    color: "grey",
    fontSize: 14,
    paddingLeft: 40,
  },
  ftreCloseIcon: {
    alignSelf: "flex-end",
    flex: 0.5,
    marginRight: 10,
  },
  ftreTitleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ftreDescriptionContainer: {
    flex: 6.5,
  },
  ftreExitContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ftreExitButtonContainer: {
    width: 200,
    height: 40,
    backgroundColor: "#66a1ff",
    borderRadius: 10,
    justifyContent: "center",
  },
  ftreExitButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
