import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Explore from "../screens/Explore";
import Settings from "../screens/Settings";
import Volts from "../screens/Volts";
import Amps from "../screens/Amps";
import Reports from "../screens/Reports";
import WeekReports from "../screens/WeekReports";
import MonthReports from "../screens/MonthReports";
import Limits from "../screens/Limits";
import Utilities from "../screens/Utilities";
import Printer from "../screens/Printer";
import Units from "../screens/Units";
import Watt from "../screens/Watt";
import SlectMeter from "../screens/SlectMeter";
import OneTimeScreen from "../screens/OneTimeScreen";




const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Units" component={Units} />
      <Stack.Screen name="Watt" component={Watt} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Volts" component={Volts} />
      <Stack.Screen name="Amps" component={Amps} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="WeekReports" component={WeekReports} />
      <Stack.Screen name="MonthReports" component={MonthReports} />
      <Stack.Screen name="Limits" component={Limits} />
      <Stack.Screen name="Utilities" component={Utilities} />
      <Stack.Screen name="Printer" component={Printer} />
      <Stack.Screen name="SlectMeter" component={SlectMeter} />
      <Stack.Screen name="OneTimeScreen" component={OneTimeScreen} />
    </Stack.Navigator>
  );
}
