import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { semantic } from "@/infrastructure/tokens/semantic";

export default function StartPage() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: semantic.padding.regular,
    borderRadius: semantic.borderRadius.medium,
    width: "100%",
  },
});
