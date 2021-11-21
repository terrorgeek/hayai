import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const Constants = {
  IS_DEV: true,
  API_BASE_URL: "http://localhost:3000/api",
  BASE_URL: "http://localhost:3000",
  VIDEO_CHAT_BASE_URL: "http://localhost:3000",

  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,

  BooleanValues: [
    {
      label: "Yes",
      value: "1",
    },
    {
      label: "No",
      value: "0",
    },
  ],

  Gender: [
    { label: "M", value: "M" },
    { label: "F", value: "F" },
  ],


  MaritalStatus: [
    { label: "Single", value: 1 },
    { label: "Married", value: 2 },
    { label: "Unknown", value: 3 },
  ],
};

module.exports = Constants;
