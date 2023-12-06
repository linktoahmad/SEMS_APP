import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Block, Text, Button } from "../components";
import { theme } from "../constants";
import CustomMultiPicker from "react-native-multiple-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { first_id } from "./OneTimeScreen.js"; // the meter id that user entered on first login!

const STORAGE_KEY = "@save_selected_meter_id";
const STORAGE_KEY2 = "@save_array";

let meterId = "sems000"; // if meter id is null or does not match regex etc... must match case sems0000

const Meters = () => {
  const [selected_meter_id, set_selected_meter_id] = useState("");

  var default_meter_id = first_id.toString();

  const [userList, set_userList] = useState([default_meter_id]);

  const [new_meter, add_new_meter] = useState("");

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, selected_meter_id);
      alert("meter " + selected_meter_id.toString() + " selected ✅");
    } catch (e) {
      alert("Failed to save the data to the storage ❌");
    }
  };

  const readData = async () => {
    try {
      const user_selected_meter_id = await AsyncStorage.getItem(STORAGE_KEY);

      if (user_selected_meter_id !== null) {
        set_selected_meter_id(user_selected_meter_id);
      } else {
        set_selected_meter_id(userList[0]);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage ❌");
    }

    const user_List = await AsyncStorage.getItem(STORAGE_KEY2);
    if (user_List != null) {
      set_userList(JSON.parse(user_List));
    } else set_userList(userList);
  };

  const save_array = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY2, JSON.stringify(userList));
    } catch (e) {
      alert("Failed to save the data to the storage ❌");
    }
    set_userList(userList);
    onRefresh();
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // checks the regex of the entered id
  //if correct saves the id
  // and alert the user
  // if not matched with regex alert user
  const add_element = () => {
    const regex = /(sems)[0-9]{3,7}/;
    if (new_meter.match(regex)) {
      alert("               ✅\n"+new_meter + " added to list");
      userList.push(new_meter);
      save_array();
    } else {
      alert("               ⚠️\nplease enter correct Id \nId is case sensitive \neg sems000");
    }
  };

  const delete_element = () => {
    if (userList.length > 1) {
      alert(selected_meter_id + " has been deleted 🗑️");
      userList.splice(Number(userList.indexOf(selected_meter_id)), 1);
      set_selected_meter_id("");
      save_array();
    } else alert("Last meter id cannot be deleted ❌");
  };

  useEffect(() => {
    readData();
  }, []);

  var onSubmitEditing = () => {
    if (!selected_meter_id) return;

    saveData(selected_meter_id.toString());
  };

  const onChangeText = (user_selected_meter_id) => {
    set_selected_meter_id(user_selected_meter_id.toString());
  };

  meterId = selected_meter_id;
  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h3 bold>
          Add Delete or Select Meter
        </Text>
      </Block>
      <Block>
        <TextInput
          style={{
            marginLeft: 15,
            borderRadius: 5,
            height: 40,
            width: 340,
            borderColor: "#29a9e6",
            borderWidth: 1,
          }}
          placeholder="Add new meter"
          placeholderTextColor="grey"
          onChangeText={(text) => add_new_meter(text)}
          onSubmitEditing={add_element}
        />

        <CustomMultiPicker
          options={userList}
          search={true} // should show search bar?
          multiple={false} //
          placeholder={"Search"}
          placeholderTextColor={"#757575"}
          returnValue={"label"} // label or value
          callback={onChangeText} // callback, array of selected items
          rowBackgroundColor={"#eee"}
          rowHeight={40}
          rowRadius={5}
          iconColor={"#00a2dd"}
          iconSize={30}
          selectedIconName={"ios-checkmark-circle-outline"}
          unselectedIconName={"ios-radio-button-off-outline"}
          scrollViewHeight={370}
          selected={userList[Number(userList.indexOf(selected_meter_id))]} // list of option which is selected by default
        />
      </Block>

      <Text bold center>
        {"Selected meter is "}
        {selected_meter_id}
      </Text>

      <View style={styles.buton}>
        <Button gradient onPress={onSubmitEditing}>
          <Text bold white center>
            Select
          </Text>
        </Button>

        <Button RedGradient onPress={delete_element}>
          <Text bold white center>
            Delete Meter
          </Text>
        </Button>
      </View>
    </Block>
  );
};

/* <Block flex={false} row center space="between" style={styles.buton}>
        <TouchableOpacity onPress={onSubmitEditing}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/icons/button.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={delete_element}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/icons/button2.png")}
          ></Image>
        </TouchableOpacity>
      </Block>*/
export default Meters;
export { meterId };

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  buton: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
