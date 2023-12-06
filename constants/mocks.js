const categories = [
  {
    id: "Voltage",
    name: "Voltage",
    tags: ["status"],
    image: require("../assets/icons/plants.png"),
    page: "Volts"
  },
  {
    id: "Load",
    name: "Load",
    tags: ["status"],
    image: require("../assets/icons/seeds.png"),
    page: "Amps"
  },
  {
    id: "Units",
    name: "Units",
    tags: ["status"],
    image: require("../assets/icons/power.png"),
    page: "Units"
  },
  {
    id: "Watts",
    name: "Watts",
    tags: ["status"],
    image: require("../assets/icons/watt.png"),
    page: "Watt"
  },
  {
    id: "Reports",
    name: "Reports",
    tags: ["smart portal"],
    image: require("../assets/icons/flowers.png"),
    page: "Reports"
  },
  {
    id: "Set Limit",
    name: "Set Limit",
    tags: ["smart portal"],
    image: require("../assets/icons/sprayers.png"),
    page: "Limits"
  },
  {
    id: "Bills",
    name: "Bills",
    tags: ["utilities"],
    image: require("../assets/icons/pots.png"),
    page: "Utilities"
  },
  {
    id: "Printer",
    name: "Printer",
    tags: ["utilities"],
    image: require("../assets/icons/fertilizers.png"),
    page: "Printer"
  }
];

const profile = {
  username: "react-ui-kit",
  location: "Europe",
  email: "contact@react-ui-kit.com",
  avatar: require("../assets/images/avatar.png"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false
};

export { categories,profile };
