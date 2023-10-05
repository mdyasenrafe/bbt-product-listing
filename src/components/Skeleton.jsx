import { Animated, StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Skeleton({ width, height, style }) {
  const translateXAnimation = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateXAnimation, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);

  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: "rgba(0,0,0,0.12)",
      overflow: "hidden",
    },
    animatedView: {
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{ translateX: translateXAnimation }],
          },
        ]}
      >
        <LinearGradient
          style={styles.animatedView}
          colors={["transparent", "rgba(0,0,0,0.05)", "transparent"]}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}
