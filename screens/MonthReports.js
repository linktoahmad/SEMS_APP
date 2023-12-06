//importing stuff
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Block, Text, Button } from "../components";
import { theme } from "../constants";
import firebase from "firebase";
import { meterId } from "./SlectMeter.js";

//getting screen width to maintain UI and Ux
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//setting up chart config dummy
const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(3, 49, 130, ${opacity})`,
};
// chart labels and data dummy
const data = {
  labels: [
    "12am",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "12pm",
  ],
  datasets: [
    {
      data: [0, 9, 0, 0, 7, 8, 6, 0, 1],
    },
  ],
};

// global access variable to use everywhere
var y = 0;
var x;

//class daily report containing firebase and rendering
class DailyReport extends Component {
  // setting state for data -> daily usage data
  state = {
    Daily_Usage_data: 0,
    unit_data: 0,
  };

  // setting up mount to mounting on virtual representation
  _isMounted = false;

  //invoked immediately after a component is mounted
  //basically refresh the screen after data update
  // -thats what i think-
  componentDidMount() {
    //setting mount true and will be false after refresh
    //so that memory does not leak after too many refreshes
    // android is both shit and awesome at same time
    this._isMounted = true;
    //behold the dataWizard this alone is bearing all the burden of fetching data
    //firebase is luv
    const readUsersData = () => {
      firebase
        .database()
        .ref(meterId.toString() + "/unit")
        .on("value", (snapshot) => {
          // checking mount status to prevent memory leak
          // this should be true at this state
          if (this._isMounted) {
            //snapshot of fetched value

            x = snapshot.val();

            //changing state of current value
            this.setState({ unit_data: x });
            // changed successfully
          }
        });

      //fetching data from firebase keep this line secret
      firebase
        .database()
        .ref(meterId.toString() + "/years")
        .on("value", (snapshot) => {
          // checking mount status to prevent memory leak
          // this should be true at this state
          if (this._isMounted) {
            //snapshot of fetched value
            y = snapshot.val();
            //changing state of current value
            this.setState({ Daily_Usage_data: y });
            // changed successfully
          }
        });
    };

    readUsersData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { navigation } = this.props;
    const x = this.state.Daily_Usage_data;
    const y = this.state.unit_data;
    const update = x
      .toString()
      .replace(/, +/g, ",")
      .split(",")
      .map(Number)
      .concat(y.toString());

    //console.log(update)
    //console.log(update.toString())

    /*firebase.database().ref('sems001').set(update.toString())*/

    const Units =
      x
        .toString()
        .replace(/, +/g, ",")
        .split(",")
        .map(Number)
        .reduce((a, b) => a + b, 0)+(y/1);
       // alert(Units.toFixed(2))
    const cost =
      y
      *
      7.99;

      var d = new Date();
      var n = d.getMonth();

      var month_list = [ 
      "Jan",
      "Fab",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",]
      month_list.length=n+1;


    return (
      <View style={{ flex: 5 }}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Monthly Report
          </Text>
          <Text h2 bold center style={{ color: theme.colors.secondary }}>
            {meterId}
          </Text>
        </Block>
        <Block top middle>
          <LineChart
            style={{ marginRight: 10 }}
            data={{
              labels: 
                month_list
              ,
              datasets: [
                {
                  data: update,
                },
              ],
            }}
            width={screenWidth}
            height={screenHeight - screenWidth - 100}
            verticalLabelRotation={-90}
            fromZero={true}
            chartConfig={chartConfig}
            bezier
          />
          <Text
            center
            style={{ fontWeight: "bold", fontSize: screenWidth * 0.04 }}
          >
            {" "}
            You have consumed{" "}
          </Text>
          <Text
            center
            style={{
              fontWeight: "bold",
              fontSize: screenWidth * 0.05,
              color: "#4287f5",
            }}
          >
            {y} Units
          </Text>
          <Text
            center
            style={{ fontWeight: "bold", fontSize: screenWidth * 0.04 }}
          >
            {" "}
            projected cost of consumed units
          </Text>
          <Text
            center
            style={{
              fontWeight: "bold",
              fontSize: screenWidth * 0.05,
              color: "#4287f5",
            }}
          >
            {cost.toFixed(2)} Rs/-
          </Text>
          <Text center>
            This chart indicates your consumed electricity in units.{" "}
          </Text>
          <Text center>1 unit = (1000 watts * 1 hour)</Text>

          <Block middle margin={[70, theme.sizes.padding * 2]}>
            <Button gradient onPress={() => navigation.navigate("Reports")}>
              <Text center bold white>
                Daily Report
              </Text>
            </Button>
            <Button gradient onPress={() => navigation.navigate("WeekReports")}>
              <Text center bold white>
                Weekly Report
              </Text>
            </Button>
          </Block>
        </Block>
      </View>
    );
  }
}

export default DailyReport;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
