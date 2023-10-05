import { View, Text, Image } from "react-native";
import React from "react";
import { globalStyles } from "../styles/globalStyle";

export default function VehicleList({ item }) {
  return (
    <View style={[globalStyles.card]}>
      <Image
        source={{ uri: item.media.image.thumbnail_url }}
        style={globalStyles.image}
      />
      <Text style={globalStyles.title}>
        {item.naming.make} {item.naming.model}
      </Text>
      <Text style={globalStyles.description}>
        Version: {item.naming.chargetrip_version}
      </Text>
    </View>
  );
}
