import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import { theme } from "../constants";
import Colors from '../utils/colors';
import { Block, Text } from "../components";
import IconButton from '../components/IconButton';
import useStatusBar from '../hooks/useStatusBar';

export default function HowToUse({ navigation }) {
  useStatusBar('light-content');
  

  return (
    <View style={styles.container}>
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text center h2 light>
            How to use
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              1. You have to connect your Iot (SEMS Meter) to your main Electric line. The guid is givin with the Iot (SEMS Meter).
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              2. Connect your Iot (SEMS Meter) to the Internet for that turn on your device,connect it to your phone the (SEMS Meter) page will popup. Just enter your WiFi Credentials. Your Iot (SEMS Meter) is now connected to your WiFi. 
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              3. To register in the SEMS application you will have to enter the Meter Id, Email and Password.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              4. If you are Already a User Press Login.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              5. Once you are successfully Login you can Monitor your Usage.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              6. If you have forgotten your Password click forgot Password in login menu.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              7. One user can monitor multiple Meters and one Meter can be Monitor by multiple users.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              8. Thanks For choosing SEMS.
            </Text>
          </ScrollView>
          <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color="black"
        size={30}
        onPress={() => navigation.goBack()}
      />
        </Block> 
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.mediumGrey
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
   
  }
});

