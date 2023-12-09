//importing stuff
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Block, Text, Button } from "../components";
import { theme } from "../constants";
import firebase from "firebase";
import {DataContext} from './DataContext.js';


//getting screen width to maintain UI and Ux
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//setting up chart config dummy
const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(3, 49, 130, ${opacity})`,
propsForDots: {
    r: "1.5",
}
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
var y = [];


//class daily report containing firebase and rendering
class DailyReport extends Component {
  // setting state for data -> daily usage data
  static contextType = DataContext;

  state = {
    Daily_Usage_data: 0,
      };

  // setting up mount to mounting on virtual representation
  _isMounted = false;

  //invoked immediately after a component is mounted
  //basically refresh the screen after data update
  // -thats what i think-
  componentDidMount() {
    const { meterId } = this.context;
    //setting mount true and will be false after refresh
    //so that memory does not leak after too many refreshes
    // android is both shit and awesome at same time
    this._isMounted = true;
    //behold the dataWizard this alone is bearing all the burden of fetching data
    //firebase is luv
    const readUsersData = () => {
      firebase
        .database()
        .ref(meterId.toString() + "/hours")
        .on("value", (snapshot) => {
          // checking mount status to prevent memory leak
          // this should be true at this state
          if (this._isMounted) {
            //snapshot of fetched value
            y = snapshot.val();
            //changing state of current value
            //alert(y)
            
            // changed successfully
          }
        });
this.setState({ Daily_Usage_data: ["1","2","3"] });
      //changing state of current value

      // changed successfully

      //fetching data from firebase keep this line secret
    };

    readUsersData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { navigation } = this.props;
    const x = this.state.Daily_Usage_data;
    
    // converting ["","",""] to [ ,  , ] and adding  current unit value to string
    const update = x.toString().replace(/, +/g, ",").split(",").map(Number);

    
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + "" + ampm;

    //-------------------------------- this will tel live time
    //if time == 12:00 am clear hour update day

    // sum of [ , , ] to display total units consumed today
    const Units = x
      .toString()
      .replace(/, +/g, ",")
      .split(",")
      .map(Number)
      .reduce((a, b) => a + b, 0);

    //watts to kwh then * with base price eg 5.99
    const cost =
      (((x
        .toString()
        .replace(/, +/g, ",")
        .split(",")
        .map(Number)
        .reduce((a, b) => a + b, 0)) * hours)/1000)*6;

        var hr_list = ["start",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        "."]
      hr_list.length=update.length-1;
      hr_list.push(strTime);

    return (
      <DataContext.Consumer>
        {({meterId})=>
      <View style={{ flex: 5 }}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text  bold>
            Todays Report
          </Text>
          <Text h2 bold center style={{ color: theme.colors.secondary }}>
            {meterId}
          </Text>
        </Block>
        <Block top middle>
          <LineChart
            style={{ marginRight: 10 }}
            data={{
              labels: hr_list,
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
            {Units.toFixed(2)} Watts
          </Text>
          <Text
            center
            style={{ fontWeight: "bold", fontSize: screenWidth * 0.04 }}
          >
            {" "}
            projected cost of consumed Watts
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
            This chart indicates your consumed electricity in watts.{" "}
          </Text>
          <Text center>Watts = (Amps x Volts)</Text>

          <Block middle margin={[70, theme.sizes.padding * 2]}>
            <Button gradient onPress={() => navigation.navigate("WeekReports")}>
              <Text center bold white>
                Weekly Report
              </Text>
            </Button>
            <Button
              gradient
              onPress={() => navigation.navigate("MonthReports")}
            >
              <Text center bold white>
                Monthly Report
              </Text>
            </Button>
          </Block>
        </Block>
      </View>}
    </DataContext.Consumer>
    );
  }
}

export default DailyReport;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
