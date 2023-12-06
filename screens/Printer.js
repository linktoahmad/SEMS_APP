import React, {useEffect } from "react";
import { Block, Text, Button } from "../components";
import { theme } from "../constants";
import { StyleSheet, Image } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import firebase from "firebase";
import { meterId } from "./SlectMeter.js";

var unit_value = 0;
var unit_cost = 0;
var Electricity_cost = 0;
var fc = 0;
var duty = 0;
var gst = 0;
var nj = 0;
var sub_total = 0;
var total = 0;
var day_data=[0];
var months_data=[0];
var days=[0];
var months_=[0];




var d = new Date();
var month = new Array();

(month[0] = "January"),
  (month[1] = "February"),
  (month[2] = "March"),
  (month[3] = "April"),
  (month[4] = "May"),
  (month[5] = "June"),
  (month[6] = "July"),
  (month[7] = "August"),
  (month[8] = "September"),
  (month[9] = "October"),
  (month[10] = "November"),
  (month[11] = "December");

var month_name = month[d.getMonth()];
var day_of_month = d.getDate();
var current_year = d.getFullYear();



const App = () => {

  const getData = () => {
    //getting days data
    firebase
      .database()
      .ref(meterId.toString() + "/days")
      .on("value", (snapshot) => {
        day_data = snapshot
          .val()
          .toString()
          .replace(/, +/g, ",")
          .split(",")
          .map(Number);
      });
    
    var dy = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    
     days = day_data.concat(dy);
    
    //getting month data
    firebase
      .database()
      .ref(meterId.toString() + "/years")
      .on("value", (snapshot) => {
        months_data = snapshot
          .val()
          .toString()
          .replace(/, +/g, ",")
          .split(",")
          .map(Number);
      });
    
    var m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
   months_ = months_data.concat(m);
    
    // getting units from database and calculating bill
    firebase
      .database()
      .ref(meterId.toString() + "/Month_unit")  // setting meter id and database address
      .on("value", (snapshot) => {
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
          total.toFixed(2);
        }
      });
    
    }

    getData();


    useEffect(() => {
      getData();
    }, []);

  const html = `<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>


dl {
  display: flex;
  background-color: white;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  position: relative;
  padding: 20px;
  margin-left: -80px;
}

dt {
  align-self: flex-start;
  width: 100%;
  font-weight: 700;
  display: block;
  text-align: center;
  font-size: 1.2em;
  font-weight: 700;
  margin-bottom: 20px;
  margin-left: 130px;
}

.text {
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 40px;
  width: 130px;
  background-color: white;
  position: absolute;
  left: 0;
  justify-content: flex-end;
}

.percentage {
  font-size: 0.8em;
  line-height: 1;
  text-transform: uppercase;
  width: 100%;
  height: 40px;
  margin-left: 130px;
  background: repeating-linear-gradient(to right, #ddd, #ddd 1px, #fff 1px, #fff 5%);
}
.percentage:after {
  content: "";
  display: block;
  background-color: "white";
  width: 50px;
  margin-bottom: 10px;
  height: 90%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.3s ease;
  cursor: pointer;
}
.percentage:hover:after, .percentage:focus:after {
  background-color: #aaa;
}

.percentage-1:after {
  width: 1%;
  background-color:#5eb1ff;
}

.percentage-2:after {
  width: 2%;
  background-color:#5eb1ff;
}

.percentage-3:after {
  width: 3%;
  background-color:#5eb1ff;
}

.percentage-4:after {
  width: 4%;
  background-color:#5eb1ff;
}

.percentage-5:after {
  width: 5%;
  background-color:#5eb1ff;
}

.percentage-6:after {
  width: 6%;
  background-color:#5eb1ff;
}

.percentage-7:after {
  width: 7%;
  background-color:#5eb1ff;
}

.percentage-8:after {
  width: 8%;
  background-color:#5eb1ff;
}

.percentage-9:after {
  width: 9%;
  background-color:#5eb1ff;
}

.percentage-10:after {
  width: 10%;
  background-color:#5eb1ff;
}

.percentage-11:after {
  width: 11%;
  background-color:#5eb1ff;
}

.percentage-12:after {
  width: 12%;
  background-color:#5eb1ff;
}

.percentage-13:after {
  width: 13%;
  background-color:#5eb1ff;
}

.percentage-14:after {
  width: 14%;
  background-color:#5eb1ff;
}

.percentage-15:after {
  width: 15%;
  background-color:#5eb1ff;
}

.percentage-16:after {
  width: 16%;
  background-color:#5eb1ff;
}

.percentage-17:after {
  width: 17%;
  background-color:#5eb1ff;
}

.percentage-18:after {
  width: 18%;
  background-color:#5eb1ff;
}

.percentage-19:after {
  width: 19%;
  background-color:#5eb1ff;
}

.percentage-20:after {
  width: 20%;
  background-color:#1fe08d;
}

.percentage-21:after {
  width: 21%;
  background-color:#1fe08d;
}

.percentage-22:after {
  width: 22%;
  background-color:#1fe08d;
}

.percentage-23:after {
  width: 23%;
  background-color:#1fe08d;
}

.percentage-24:after {
  width: 24%;
  background-color:#1fe08d;
}

.percentage-25:after {
  width: 25%;
  background-color:#1fe08d;
}

.percentage-26:after {
  width: 26%;
  background-color:#1fe08d;
}

.percentage-27:after {
  width: 27%;
  background-color:#1fe08d;
}

.percentage-28:after {
  width: 28%;
  background-color:#1fe08d;
}

.percentage-29:after {
  width: 29%;
  background-color:#1fe08d;
}

.percentage-30:after {
  width: 30%;
  background-color:#1fe08d;
}

.percentage-31:after {
  width: 31%;
  background-color:#1fe08d;
}

.percentage-32:after {
  width: 32%;
  background-color:#1fe08d;
}

.percentage-33:after {
  width: 33%;
  background-color:#1fe08d;
}

.percentage-34:after {
  width: 34%;
  background-color:#1fe08d;
}

.percentage-35:after {
  width: 35%;
  background-color:#1fe08d;
}

.percentage-36:after {
  width: 36%;
  background-color:#1fe08d;
}

.percentage-37:after {
  width: 37%;
  background-color:#1fe08d;
}

.percentage-38:after {
  width: 38%;
  background-color:#1fe08d;
}

.percentage-39:after {
  width: 39%;
  background-color:#1fe08d;
}

.percentage-40:after {
  width: 40%;
  background-color:#1fe08d;
}

.percentage-41:after {
  width: 41%;
  background-color:#1fe08d;
}

.percentage-42:after {
  width: 42%;
  background-color:#1fe08d;
}

.percentage-43:after {
  width: 43%;
  background-color:#1fe08d;
}

.percentage-44:after {
  width: 44%;
  background-color:#1fe08d;
}

.percentage-45:after {
  width: 45%;
  background-color:#1fe08d;
}

.percentage-46:after {
  width: 46%;
  background-color:#1fe08d;
}

.percentage-47:after {
  width: 47%;
  background-color:#1fe08d;
}

.percentage-48:after {
  width: 48%;
  background-color:#1fe08d;
}

.percentage-49:after {
  width: 49%;
  background-color:#1fe08d;
}

.percentage-50:after {
  width: 50%;
  background-color:#1fe08d;
}

.percentage-51:after {
  width: 51%;
  background-color:#f7e360;
}

.percentage-52:after {
  width: 52%;
  background-color:#f7e360;
}

.percentage-53:after {
  width: 53%;
  background-color:#f7e360;
}

.percentage-54:after {
  width: 54%;
  background-color:#f7e360;
}

.percentage-55:after {
  width: 55%;
  background-color:#f7e360;
}

.percentage-56:after {
  width: 56%;
  background-color:#f7e360;
}

.percentage-57:after {
  width: 57%;
  background-color:#f7e360;
}

.percentage-58:after {
  width: 58%;
  background-color:#f7e360;
}

.percentage-59:after {
  width: 59%;
  background-color:#f7e360;
}

.percentage-60:after {
  width: 60%;
  background-color:#f7e360;
}

.percentage-61:after {
  width: 61%;
  background-color:#f7e360;
}

.percentage-62:after {
  width: 62%;
  background-color:#f7e360;
}

.percentage-63:after {
  width: 63%;
  background-color:#f7e360;
}

.percentage-64:after {
  width: 64%;
  background-color:#f7e360;
}

.percentage-65:after {
  width: 65%;
  background-color:#f7e360;
}

.percentage-66:after {
  width: 66%;
  background-color:#f7e360;
}

.percentage-67:after {
  width: 67%;
  background-color:#f7e360;
}

.percentage-68:after {
  width: 68%;
  background-color:#f7e360;
}

.percentage-69:after {
  width: 69%;
  background-color:#f7e360;
}

.percentage-70:after {
  width: 70%;
  background-color:#f7e360;
}

.percentage-71:after {
  width: 71%;
  background-color:#f7e360;
}

.percentage-72:after {
  width: 72%;
  background-color:#f7e360;
}

.percentage-73:after {
  width: 73%;
  background-color:#f7e360;
}

.percentage-74:after {
  width: 74%;
  background-color:#f7e360;
}

.percentage-75:after {
  width: 75%;
  background-color:#f7e360;
}

.percentage-76:after {
  width: 76%;
  background-color:#f79448;
}

.percentage-77:after {
  width: 77%;
  background-color:#f79448;
}

.percentage-78:after {
  width: 78%;
  background-color:#f79448;
}

.percentage-79:after {
  width: 79%;
  background-color:#f79448;
}

.percentage-80:after {
  width: 80%;
  background-color:#f79448;
}

.percentage-81:after {
  width: 81%;
  background-color:#f79448;
}

.percentage-82:after {
  width: 82%;
  background-color:#f79448;
}

.percentage-83:after {
  width: 83%;
  background-color:#f79448;
}

.percentage-84:after {
  width: 84%;
  background-color:#f79448;
}

.percentage-85:after {
  width: 85%;
  background-color:#f79448;
}

.percentage-86:after {
  width: 86%;
  background-color:#f79448;
}

.percentage-87:after {
  width: 87%;
  background-color:#f79448;
}

.percentage-88:after {
  width: 88%;
  background-color:#f79448;
}

.percentage-89:after {
  width: 89%;
  background-color:#f79448;
  
}

.percentage-90:after {
  width: 90%;
  background-color: #eb4646;
}

.percentage-91:after {
  width: 91%;
  background-color: #eb4646;
}

.percentage-92:after {
  width: 92%;
  background-color: #eb4646;
}

.percentage-93:after {
  width: 93%;
  background-color: #eb4646;
}

.percentage-94:after {
  width: 94%;
  background-color: #eb4646;
}

.percentage-95:after {
  width: 95%;
  background-color: #eb4646;
}

.percentage-96:after {
  width: 96%;
  background-color: #eb4646;
}

.percentage-97:after {
  width: 97%;
  background-color: #eb4646;
}

.percentage-98:after {
  width: 98%;
  background-color: #eb4646;
}

.percentage-99:after {
  width: 99%;
  background-color: #eb4646;
}

.percentage-100:after {
  width: 100%;
  background-color: #eb4646;
}

html, body {
  height: 500px;
  font-family: "fira-sans-2", sans-serif;
  color: #333;
}


    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    div {
      size: 21cm 29.7cm;
      margin: 10mm 10mm 10mm 10mm;
      /* change the margins as you want them to be. */
    }

    .column {
      float: left;
      width: 50%;
      padding: 10px;
      height: 300px;
      /* Should be removed. Only for demonstration */
    }

    /* Clear floats after the columns */
    .row:after {
      content: "";
      display: table;
      clear: both;
    }

    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    td,
    th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #ccedff;
    }

    .container {
      width: 50%;
      height: 50%;
      margin: 20px;
    }
  </style>
  <div>
   
</head>
<img
      src="data:image/png;base64,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"
      style="width:400px;height:140px;">
<body>
  <h2 style="text-align: center;">Printed on - <span>${month_name}</span> <span>${day_of_month}</span>,
    <span>${current_year}</span>
  </h2>
  <h2 style="text-align: center;">
  <span>Meter Id ${meterId}</span>
  </h2>

<div style="width: 100%;">
<dl>
<dt>
  Monthly Comparison of Usage
</dt>
<dd class="percentage percentage-${parseInt(
  months_[0]
)}"><span class="text">JAN<br>${months_[0].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[1]
)}"><span class="text">FAB<br>${months_[1].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[2]
)}"><span class="text">MAR<br>${months_[2].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[3]
)}"><span class="text">APR<br>${months_[3].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[4]
)}"><span class="text">MAY<br>${months_[4].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[5]
)}"><span class="text">JUN<br>${months_[5].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[6]
)}"><span class="text">JUL<br>${months_[6].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[7]
)}"><span class="text">AUG<br>${months_[7].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[8]
)}"><span class="text">SEP<br>${months_[8].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[9]
)}"><span class="text">OCT<br>${months_[9].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[10]
)}"><span class="text">NOV<br>${months_[10].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  months_[11]
)}"><span class="text">DEC<br>${months_[11].toFixed(2)}</span></dd>
</dl>
</div>

<div style="width: 100%; padding-top: 150px;">
<dl>
<dt>
  This Week of Electricity usage
</dt>
<dd class="percentage percentage-${parseInt(
  days[0]
)}"><span class="text">Mon<br>${days[0].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  days[1]
)}"><span class="text">Tue<br>${days[1].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  days[2]
)}"><span class="text">Wed<br>${days[2].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  days[3]
)}"><span class="text">Thu<br>${days[3].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  days[4]
)}"><span class="text">Fri<br>${days[4].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  days[5]
)}"><span class="text">Sat<br>${days[5].toFixed(2)}</span></dd>
<dd class="percentage percentage-${parseInt(
  days[6]
)}"><span class="text">Sun<br>${days[6].toFixed(2)}</span></dd>
</dl>
</div>
 
  <h1>Bill Calculation</h1>

  <table>
    <tr>
      <th>No</th>
      <th>Title</th>
      <th>Cost</th>
    </tr>
    <tr>
      <td>1</td>
      <td>Unit Consumed</td>
      <td>${unit_value.toFixed(2)}</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Cost of Unit</td>
      <td>${unit_cost.toFixed(2)}</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Cost of Electricity</td>
      <td>${Electricity_cost.toFixed(2)}</td>
    </tr>
    <tr>
      <td>4</td>
      <td>FC Surcharge</td>
      <td>${fc.toFixed(2)}</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Electricity Duty</td>
      <td>${duty.toFixed(2)}</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Tv Fees</td>
      <td>35</td>
    </tr>
    <tr>
      <td>7</td>
      <td>GST</td>
      <td>${gst.toFixed(2)}</td>
    </tr>
    <tr>
      <td>8</td>
      <td>NJ Surcharge</td>
      <td>${nj.toFixed(2)}</td>
    </tr>
    <tr>
      <td></td>
      <td>
        <h1>Total</h1>
      </td>
      <td>
        <h1>${total.toFixed(2)}</h1>
      </td>
    </tr>
  </table>

  <h3 style = "padding-top:150px;">Tips: Ways to save electricity</h3>
  <p style="font-size:80%;">Turn off unnecessary lights,
    Use natural light,
    Use task lighting,
    Take shorter showers <br />
    Turn water off when shaving, washing hands, brushing teeth<br />
    Fix that leaky faucet,
    Unplug unused electronics.<br />
    Install solar panels on your roof to generate electricity,
    Install solar water heater system.<br />
    Insulate your house,
    Install window shutters.
    Install double glazing windows,
    Buy Energy Star qualified appliances.<br />
    Buy appliances with low power consumption.<br />
    Check the temperature insulation of your house.<br />
    Turn off appliances and gadgets that are in stand by state,
    Prefer fan to A/C,
    Prefer A/C heating to electric/gas/wood heating<br />
    Prefer inverter A/C to regular on/off A/C,
    Set A/C's thermostat to moderate temperature.<br />
    Use A/C locally for one room instead of the whole house.<br />
    Avoid opening frequently the refrigerator door.<br />
    Leave enough space between the refrigerator and the wall to allow ventilation.<br />
    Turn off the light when you leave the room.<br />
    Install presence detector to turn lighting off when leaving the room.<br />
    Use low power light bulbs,
    Wash your clothes in cold water,
    Use shorter washing machine program.
    Fill the washing machine / dryer / dishwasher before operation.<br />
    Wear clothes that fit the current temperature.<br />
    Wear thick clothes to keep warm,
    Wear light clothes to keep cool<br />
    Use the stairs instead of elevator,
    Set PC energy saving features<br />
    Use clothes drying rack instead of electric clothes dryer<br />
    Put the exact amount of water that you need in your electric kettle<br />
    Go to sleep early,
    Install solar water heater system.
    Use sunlight instead of artificial light<br />
    Buy LED TV instead of plasma,
    Reduce TV/Monitor/Phone display brightness<br />
    Buy computer with low power (TDP) CPU/GPU<br />
    Buy computer with efficient power supply unit (PSU)<br />
    Prefer LED light over incandescent light bulbs,
    Disconnect electrical charger when it finished charging.<br />
    Prefer microwave oven over toaster oven,
    Use electricity usage monitor</p>

</body>
</div>
</html>
`;

async function Share_report() {
  const { uri } = await Print.printToFileAsync({ html });

  Sharing.shareAsync(uri);
}

async function Print_report() {
  Print.printAsync({
    html: html,
  });
}
  
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Print Report
          </Text>
          <Text h2 bold center style={{ color: theme.colors.secondary }}>
            {meterId}
          </Text>
        </Block>
        <Block middle flex={0.7} margin={[100, theme.sizes.padding * 2]}>
          <Image source={require("../assets/images/bill.png")} />

          <Text center>Save to device or send to printer</Text>

          <Button gradient onPress={() => Print_report()}>
            <Text center bold white>
              Save and Print
            </Text>
          </Button>

          <Text center>Share to contacts, whatsapp or Email</Text>

          <Button gradient onPress={() => Share_report()}>
            <Text center bold white>
              Share
            </Text>
          </Button>
        </Block>
      </Block>
    );
  
}

export default App;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
