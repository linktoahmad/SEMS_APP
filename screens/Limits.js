import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TextInput } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import * as Notifications from "expo-notifications";
import { Block, Text, Switch, Button } from "../components";
import { theme } from "../constants";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "firebase";
import {DataContext} from './DataContext.js';

const STORAGE_KEY = "@save_unit";
const STORAGE_KEY2 = "@save_Load";
const STORAGE_KEY3 = "@save_not1";
const STORAGE_KEY4 = "@save_not2";


var unit_per = 0;
var load_per = 0;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {

  const {meterId} = useContext(DataContext)


  const [unit_limit, setUnit] = useState("");
  const [load_limit, setLoad] = useState("");
  const [not1, setNot1] = useState("");
  const [not2, setNot2] = useState("");

const [unit_read, set_unit_read] = useState(0);
const [load_read, set_load_read] = useState(0);


    useEffect(() => {
    // Set up a listener for real-time updates
    const ampsListener = firebase.database().ref(`${meterId}/amps`).on("value", (snapshot) => {
      set_load_read(snapshot.val());
    });
    const unitListner = firebase.database().ref(`${meterId}/Month_unit`).on("value", (snapshot) => {
      set_unit_read(snapshot.val());
    });

    // Clean up the listener when the component unmounts
    return () => {
      firebase.database().ref(`${meterId}/amps`).off("value", ampsListener);
      firebase.database().ref(`${meterId}/Month_unit`).off("value", unitListner);
    };
  }, [meterId]); // Ensure that the listener is re-established when meterId changes


  useEffect(() => {
    readData();
  }, []);

  // read data
  const readData = async () => {
    try {
      const unit_limit = await AsyncStorage.getItem(STORAGE_KEY);

      const load_limit = await AsyncStorage.getItem(STORAGE_KEY2);

      const not1 = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY3));

      const not2 = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY4));

      if (unit_limit !== null) {
        setUnit(unit_limit);
      }
      if (load_limit !== null) {
        setLoad(load_limit);
      }
      if (not1 !== null) {
        setNot1(not1);
      }
      if (not2 !== null) {
        setNot2(not2);
      }
    } catch (e) {
      alert("Failed lo load_limit! ❌");
    }
  };

  // save data

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, unit_limit);
      setUnit(unit_limit);
      await AsyncStorage.setItem(STORAGE_KEY2, load_limit);
      setLoad(load_limit);
      await AsyncStorage.setItem(STORAGE_KEY3, JSON.stringify(not1));
      setNot1(not1);
      await AsyncStorage.setItem(STORAGE_KEY4, JSON.stringify(not2));
      setNot2(not2);
      alert("successfully saved ✅");
    } catch (e) {
      alert("Failed! ❌");
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      await AsyncStorage.removeItem(STORAGE_KEY2);
      await AsyncStorage.removeItem(STORAGE_KEY3);
      await AsyncStorage.removeItem(STORAGE_KEY4);
      setLoad("");
      setUnit("");
      setNot1(false);
      setNot2(false);
      alert("cleared! ✅");
    } catch (e) {
      alert("Failed to clear ❌");
    }
  };

  const onChangeText = (unit_limit) => setUnit(unit_limit);
  const onChangeText2 = (load_limit) => setLoad(load_limit);

  const onChangeNot1 = (not1) => setNot1(not1);
  const onChangeNot2 = (not2) => setNot2(not2);

  const onSubmitEditing = () => {
    if (!unit_limit) return;
    saveData(unit_limit);
    setUnit("");
  };

  const onSubmitEditing2 = () => {
    if (!load_limit) return;
    saveData(load_limit);
    setLoad("");
  };

  if (unit_read >= unit_limit && unit_limit != 0 && not1 == true) {
    scheduleUnitPushNotification();
  }

  if (load_read >= load_limit && load_limit != 0 && not2 == true) {
    scheduleLoadPushNotification();
  }

  if (unit_limit == 0) unit_per = 0;
  else if (unit_limit !== 0)
    unit_per = ((unit_read / unit_limit) * 100).toFixed(0);
  else unit_per = 0;

  if (load_limit == 0) load_per = 0;
  else if (load_limit != 0)
    load_per = ((load_read / load_limit) * 100).toFixed(0);
  else load_per = 0;

  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text  bold>
          Set Limit
        </Text>
        <Text h2 bold center style={{ color: theme.colors.secondary }}>
          {meterId}
        </Text>
      </Block>

      <Block style={styles.header}>
        <Block row center space="between" style={{ flex: 0.1 }}>
          <Text gray>Activate Unit Limit</Text>
          <Switch value={not1} onValueChange={onChangeNot1} />
        </Block>
        <Block row center space="between" style={{ flex: 0.1 }}>
          <Text gray>Set Unit Limit</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={3}
            value={unit_limit}
            placeholder="Enter Unit"
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
        </Block>
        <Block row center space="between" style={{ flex: 0.1 }}>
          <Text gray>Activate Load Limit</Text>
          <Switch value={not2} onValueChange={onChangeNot2} />
        </Block>
        <Block row center space="between" style={{ flex: 0.1 }}>
          <Text gray>Set Load Limit</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={3}
            value={load_limit}
            placeholder="Enter Load"
            onChangeText={onChangeText2}
            onSubmitEditing={onSubmitEditing2}
          />
        </Block>

        <Block style={[{ paddingTop: 20 }, { flexDirection: "row" }]}>
          <Block center>
            <ProgressCircle
              percent={Number(unit_per)}
              radius={60}
              borderWidth={30}
              color="#4287f5"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 15 }}>{unit_per>100?100+"%":unit_per + "%"}</Text>
            </ProgressCircle>
            <Text gray>Unit Consumed</Text>
          </Block>
          <Block center>
            <ProgressCircle
              percent={Number(load_per)}
              radius={60}
              borderWidth={30}
              color="#4287f5"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 15 }}>{load_per>100?100+"%":load_per + "%"}</Text>
            </ProgressCircle>
            <Text gray>Load Consumed</Text>
          </Block>
        </Block>
        <Button gradient onPress={onSubmitEditing}>
          <Text bold white center>
            Apply
          </Text>
        </Button>
        <Button RedGradient onPress={clearStorage}>
          <Text bold white center>
            Reset
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

async function scheduleLoadPushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Load Alarm ⚡",
      body:
        "You have reached the load limit",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function scheduleUnitPushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Unit Alarm ⚡",
      body:
        "You reached the unit limit",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

export default App;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#333",
  },
});
