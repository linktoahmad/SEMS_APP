import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Button, Block, Text, Switch } from "../components";
import { theme } from "../constants";
import { logout } from "../components/Firebase/firebase";
import {DataContext} from './DataContext.js';


class Settings extends Component {
  state = {
    selectedValue: null,
  };
  static contextType = DataContext;
  about() {
    alert(
      "    ⚡SEMS V(1.0)⚡\nMade By Ahmed Khalil\n\n2021 © All rights reserved"
    );
  }
  render() {
    const { navigation } = this.props;
    const { meterId } = this.context;
    async function handleSignOut() {
      try {
        await logout();
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text  bold>
            Settings
          </Text>
        </Block>
        <Block style={styles.buton}>
          <Block row center space="between" style={{ flex: 0.5 }}></Block>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../assets/images/Meter.png")} />
          </View>
          <Text h2 bold center>
            Meter ID
          </Text>
          <Text h1 style={{ color: theme.colors.secondary }} center>
            {meterId}
          </Text>

          <Button gradient onPress={() => navigation.navigate("SlectMeter")}>
            <Text bold white center>
              Select Meter
            </Text>
          </Button>

          <Button RedGradient onPress={handleSignOut}>
            <Text bold white center>
              Sign Out
            </Text>
          </Button>
          <TouchableOpacity onPress={this.about}>
            <Text gray2 center>
              about
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  buton: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
