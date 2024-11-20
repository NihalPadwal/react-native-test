import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

const CustomStatusBar = (props: Props) => {
  const colorScheme = useColorScheme();
  const safeAreaStats = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: safeAreaStats.top }}>
      <StatusBar barStyle="default" />
    </View>
  );
};

export default CustomStatusBar;

const styles = StyleSheet.create({});
