import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { useState } from "react";
import { semantic } from "@/infrastructure/tokens/semantic";

export default function Index() {
  const [number, setNumber] = useState<string>("");

  function changeNumber(e: string) {
    setNumber(e);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Sign In</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
