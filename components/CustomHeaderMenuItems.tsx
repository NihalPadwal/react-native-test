import { View, Text, StyleSheet } from "react-native";
import { HeaderMenuItem } from "@/types/HeaderMenu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderMenuItems = ({
  text,
  action,
  value,
  icon,
}: HeaderMenuItem) => {
  return (
    <MenuOption onSelect={action}>
      <View style={styles.container}>
        <Text>{text}</Text>
        <Ionicons size={20} name={icon} />
      </View>
    </MenuOption>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  },
});

export default CustomHeaderMenuItems;
