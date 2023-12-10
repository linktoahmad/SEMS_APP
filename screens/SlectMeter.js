import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Block, Text, Button } from "../components";
import { theme } from "../constants";
import CustomMultiPicker from "react-native-multiple-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DataContext} from './DataContext.js';


const STORAGE_KEY = "@save_meterId";
const STORAGE_KEY2 = "@save_array";

const Meters = () => {
  const {meterId, setMeterId} =  useContext(DataContext)
  var default_meter_id = meterId.toString();

  const [userList, set_userList] = useState([default_meter_id]);

  const [new_meter, add_new_meter] = useState("");

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, meterId);
      alert("meter " + meterId.toString() + " selected ✅");
    } catch (e) {
      alert("Failed to save the data to the storage ❌");
    }
  };

  const readData = async () => {
    try {
      const user_meterId = await AsyncStorage.getItem(STORAGE_KEY);

      if (user_meterId !== null) {
        setMeterId(user_meterId);
      } else {
        setMeterId(userList[0]);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage ❌");
    }

    const user_List = await AsyncStorage.getItem(STORAGE_KEY2);
    if (user_List != null) {
      set_userList(JSON.parse(user_List));
    } else set_userList(userList);
  };


  // checks the regex of the entered id
  //if correct saves the id
  // and alert the user
  // if not matched with regex alert user
  const add_element = async () => {
    const regex = /^sems[0-9]{3,7}$/;
    if (new_meter.match(regex) && !userList.includes(new_meter)) {
      alert("               ✅\n"+new_meter + " added to list");
      let newlist = [...userList,new_meter]
      set_userList(newlist);
      try {
        await AsyncStorage.setItem(STORAGE_KEY2, JSON.stringify(newlist));
      } catch (e) {
        alert("Failed to save the data to the storage ❌");
      }
    } else {
      userList.includes(new_meter)?alert("               ⚠️\n"+new_meter + " already added to list"):
      alert("               ⚠️\nplease enter correct Id \nId is case sensitive \neg sems000");
    }
  };

  const delete_element = async () => {
    if (userList.length > 1) {
      alert(meterId + " has been deleted 🗑️");
      userList.splice(Number(userList.indexOf(meterId)), 1);
      setMeterId(userList[0]);
      let newlist = [...userList]
      set_userList(newlist);
      try {
        await AsyncStorage.setItem(STORAGE_KEY2, JSON.stringify([newlist]));
      } catch (e) {
        alert("Failed to save the data to the storage ❌");
      }
    } else alert("Last meter id cannot be deleted ❌");
  };

  useEffect(() => {
    readData();
  }, []);

  var onSubmitEditing = () => {
    if (!meterId) return;

    saveData(meterId.toString());
  };

  const onChangeText = (user_meterId) => {
    if(user_meterId.length){ setMeterId(user_meterId.toString())}
  };

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
          selected={userList[Number(userList.indexOf(meterId))]} // list of option which is selected by default
        />
      </Block>

      <Text bold center>
        {"Selected meter is "}
        {meterId}
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
