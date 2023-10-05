import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Typography } from "../theme/Typography";

export default function VehicleList({ item }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.media.image.thumbnail_url }}
        style={styles.image}
      />
      <Text
        style={{
          fontSize: 14,
          fontFamily: Typography.regular,
          marginBottom: 8,
          color: "#000",
        }}
      >
        {item.naming.make} {item.naming.model}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
