import React, { Component } from "react";
import { Linking } from "react-native";
import * as Notifications from "expo-notifications";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Speedometer from "react-native-speedometer-chart";
import { Block, Text, Button } from "../components";
import { theme } from "../constants";
import firebase from "firebase";
import { meterId } from "./SlectMeter.js";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

class Amps extends Component {
  _isMounted = false;

  state = {
    isModalVisible: false,
    amps_value: [],
  };

  componentDidMount() {
    this._isMounted = true;
    const readUsersData = () => {
      firebase
        .database()
        .ref(meterId.toString() + "/amps")
        .on("value", (snapshot) => {
          if (this._isMounted) {
            const y = snapshot.val();
            this.setState({ amps_value: y });
          }
        });
    };

    readUsersData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    const amps_value = Number(this.state.amps_value);

    if (amps_value > 20) {
      schedulePushNotification();
    }
    return (
      <Block>
         <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Usage Load
          </Text>
          <Text h2 bold center style={{ color: theme.colors.secondary }}>
            {meterId}
          </Text>
        </Block>
        <Block center style={{ paddingVertical: 10 }}>
          <Speedometer
            size={300}
            value={amps_value}
            totalValue={100}
            internalColor="#4287f5"
            showLabels
            showIndicator
          />
          <Modal
            isVisible={this.state.isModalVisible}
            onBackButtonPress={() => this.setState({ isModalVisible: false })}
            backdropColor={"white"}
            backdropOpacity={0.95}
          >
            <View>
              <Text center h2 bold style={{ marginVertical: 5 }}>
                Select Region
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{051-9244301}`);
                }}
              >
                <Text bold center style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center Blue Area
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{051-2285931}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center G-9 Islamabad
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{051-9292692}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center Marrir Hassan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{051-4927303}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center Chandni Chowk
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{051-5738621}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center Swan Garden
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{0514-675245}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center Chakri
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{0544-9270169}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center Jhelum.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{057-2212067}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center FATEH JANG
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{051-9314162-63}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center TAXILA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{057-2702756}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center ,Attock.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:{0543-553279}`);
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Customer Services Center Chakwal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `https://iesco.com.pk/index.php/customer-services/help-offices`
                  );
                }}
              >
                <Text center bold style={{ marginVertical: 5, color: "black" }}>
                  Other
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._toggleModal}>
                <Text center style={{ color: "#4287f5" }}>
                  Dismiss
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Text center style={{ fontWeight: "bold", fontSize: 15 }}>
            Current Load
          </Text>
          <Text
            center
            style={{ fontWeight: "bold", fontSize: 25, color: "#4287f5" }}
          >
            {amps_value} amps
          </Text>
          <Text center style={{ paddingHorizontal: theme.sizes.base * 2 }}>
            A ceiling fan consumes about 0.7 Amps this will give you an good
            idea about your usage load{" "}
          </Text>
          <Block middle flex={0.5} margin={[100, theme.sizes.padding * 2]}>
            <Text center style={{ color: "#bfbfbf" }}>
              If you are experiencing unreliable electricity contact authorities
            </Text>
            <Button RedGradient onPress={this._toggleModal}>
              <Text center bold white>
                Contact Authority
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "High Load ☠️⚡",
      body: "Load on electricity line is more then 20 amps",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

export default Amps;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
