import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import { theme } from "../constants";
import { Button, Block, Text } from "../components";
import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');
  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Welcome to
            <Text h1 primary>
              {" "}
              SEMS
            </Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Lets get Started.
          </Text>
        </Block>
        <Block>

        <ScrollView>
        <Image
        style={styles.logo}
        source={require("../assets/images/illustration_1.png")}
      />
            </ScrollView>

        </Block>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <Button onPress={() => navigation.navigate('HowToUse')}>
            <Text center caption gray>
              How to Use!
            </Text>
          </Button>
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
  logoContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 300
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    color: Colors.primary
  },
  buttonContainer: {
    padding: 45,
    paddingBottom: 5,
    width: '100%'
  }
});
