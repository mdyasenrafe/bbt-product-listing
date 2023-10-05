import { StyleSheet } from "react-native";
import { Typography } from "../theme/Typography";

export const globalStyles = StyleSheet.create({
  image: {
    height: 145,
    width: "100%",
    borderRadius: 8,
    resizeMode: "contain",
  },
  card: {
    width: "48%",
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#171717",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 24,
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: Typography.regular,
    marginBottom: 8,
    color: "#000",
  },
  description: {
    fontSize: 10,
    fontFamily: Typography.medium,
    color: "#000",
    fontWeight: "500",
  },
});
