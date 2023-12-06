import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Linking } from "react-native";
import { Block, Text } from "../components";
import { DataTable } from "react-native-paper";
import { theme } from "../constants";
import firebase from "firebase";
import { meterId } from "./SlectMeter.js";

//creating bill variables
var unit_value = 0;
var unit_cost = 0;
var Electricity_cost = 0;
var fc = 0;
var duty = 0;
var gst = 0;
var nj = 0;
var sub_total = 0;
var total = 0;

class Settings extends Component {
  // to maintain state after refresh
  constructor() {
    super();
    this.state = {
      x: 0,
    };
  }

  // run every time when firebase is updated react-native life cycle
  componentDidMount() {
    this._isMounted = true;
    const readUsersData = () => {
      firebase
        .database()
        .ref(meterId.toString() + "/Month_unit") // setting meter id and database address
        .on("value", (snapshot) => {
          if (this._isMounted) {
            unit_value = snapshot.val(); // taking unit value from database

            // switch case to determine unit cost accordingly to unit count
            switch (true) {
              case unit_value <= 50:
                unit_cost = 3.95;
                Electricity_cost = unit_value * unit_cost;
                break;
              case unit_value > 50 && unit_value <= 100:
                unit_cost = 7.74;
                Electricity_cost = unit_value * unit_cost;
                break;
              case unit_value > 100 && unit_value <= 200:
                unit_cost = 10.06;
                sub_total = 100 * 7.74;
                Electricity_cost = (unit_value - 100) * unit_cost + sub_total;
                break;
              case unit_value > 200 && unit_value <= 300:
                unit_cost = 12.15;
                sub_total = 200 * 10.06;
                Electricity_cost = (unit_value - 200) * unit_cost + sub_total;
                break;
              case unit_value > 300 && unit_value <= 700:
                unit_cost = 19.5;
                sub_total = 300 * 12.15;
                Electricity_cost = (unit_value - 300) * unit_cost + sub_total;
                break;
              case unit_value > 700:
                unit_cost = 22.65;
                sub_total = 700 * 19.5;
                Electricity_cost = (unit_value - 700) * unit_cost + sub_total;
                break;
            }

            // calculating the bill accordingly to IESCO standards
            if (unit_value > 0) {
              total = Electricity_cost;

              fc = unit_value * 0.43;
              total = total + fc;

              duty = (total * 1.5) / 100;
              total = total + duty;

              gst = total * 0.17;
              total = total + gst;

              nj = unit_value / 10;
              total = total + nj;

              total = total + 35; //tv charges
            }

            // did this to keep up state react-native  life cycle
            this.setState({ x: 1 });
          }
        });
    };
    readUsersData(); // calling function to read  data from firebase
  }

  // un mounting component to avoiding refresh loop react native life cycle
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Projected Bill
          </Text>
          <Text h2 bold center style={{ color: theme.colors.secondary }}>
            {meterId}
          </Text>
        </Block>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>No</DataTable.Title>
            <DataTable.Title style={{ flex: 5 }}>Title</DataTable.Title>
            <DataTable.Title>Cost</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>Unit consumed</DataTable.Cell>
            <DataTable.Cell style={{ flex: -3 }}>
              <Text h3>{unit_value.toFixed(2)}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>2</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>Cost of Unit</DataTable.Cell>
            <DataTable.Cell style={{ flex: -3 }}>
              <Text h3> {unit_cost.toFixed(2)}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>3</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>
              Cost of Electricity{" "}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: -3 }}>
              <Text h3> {Electricity_cost.toFixed(2)}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>4</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>FC Surcharge</DataTable.Cell>
            <DataTable.Cell style={{ flex: -3 }}>
              <Text h3> {fc.toFixed(2)}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>5</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>
              Electricity Duty
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: -3 }}>
              <Text h3> {duty.toFixed(2)}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>6</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>TV Fees</DataTable.Cell>
            <DataTable.Cell style={{ flex: -3 }}>
              <Text h3>35.00</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>7</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>GST</DataTable.Cell>
            <DataTable.Cell style={{ flex: -3 }}>
              <Text h3> {gst.toFixed(2)}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>8</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>N.J Surcharge</DataTable.Cell>
            <DataTable.Cell style={{ flex: -3 }}>
              <Text h3> {nj.toFixed(2)}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell numeric>
              <Text bold color="red">
                Estimated Bill{"  "}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text bold h3>
                {total.toFixed(2)} Rs/-
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        <TouchableOpacity
          style={{ paddingTop: 30 }}
          onPress={() => {
            Linking.openURL(`https://iescobill.pk/iesco-bill-calculator/`);
          }}
        >
          <Text gray2 center>
            how bill is calculated
          </Text>
        </TouchableOpacity>
      </Block>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
