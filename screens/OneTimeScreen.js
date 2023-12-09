import React, { useState, useContext } from "react";
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from "react-native";
import {DataContext} from './DataContext.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const regex = /(sems)[0-9]{3,7}/;

const OTScreen = () => {

  const {meterId, setMeterId} = useContext(DataContext);
  const [meterInput, setMeterInput] = useState("");

  const  add_element = async () => {
    if (meterInput.match(regex)) {
      alert("✅" + meterInput + " Meter Up");
    let user_List = await AsyncStorage.getItem("@save_array");
    let newArray = [meterInput,...JSON.parse(user_List||"[]")]
     AsyncStorage.setItem("@save_array", JSON.stringify(newArray));
    AsyncStorage.setItem("@save_meterId", meterInput);
      setMeterId(meterInput)

    } else {
      alert(
        "               ⚠️\nplease enter correct Id \nId is case sensitive \neg sems000"
      );
    }
  };

  return (
    <View>
      <Modal
        animationType={"slide"}
        transparent={true}
        style={styles.ftreContainer}
        visible={!meterId || !meterId.match(regex)}
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
            onChangeText={(text) => setMeterInput(text)}
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
