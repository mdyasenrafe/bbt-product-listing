import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Skeleton from "./Skeleton";
import { globalStyles } from "../styles/globalStyle";

export default function SkeletonContainer({ number }) {
  return (
    <View style={styles.loadingContainer}>
      {Array.from(Array(number).keys()).map((item, index) => {
        return (
          <View style={globalStyles.card} key={index}>
            <Skeleton width={150} height={150} style={globalStyles.image} />
            <Skeleton
              width={100}
              height={20}
              style={{
                marginTop: 8,
              }}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
