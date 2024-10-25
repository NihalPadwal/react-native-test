import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import IgnoredPagesForTabs from "@/infrastructure/data/IgnoredPagesForTabs";
import { semantic } from "@/infrastructure/tokens/semantic";
import { Ionicons } from "@expo/vector-icons";
import iconsForTabs from "@/infrastructure/data/IconsForTabs";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.tabbar}>
      <View
        style={{
          backgroundColor:
            colorScheme === "light"
              ? semantic.color.background.dark.tint
              : semantic.color.background.light.tint,
          ...styles.container,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          // Ensure label is always a string
          const label = String(
            options.tabBarLabel ?? options.title ?? route.name
          );

          if (IgnoredPagesForTabs.includes(route.name)) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.navs}
            >
              {iconsForTabs[route.name]({
                color: isFocused ? "#ffffff" : "#c3c3c3",
                ...styles.tabIcon,
              })}
              <Text
                style={{
                  color: isFocused ? "#ffffff" : "#c3c3c3",
                  ...styles.navText,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 25,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    padding: semantic.padding.regular,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  navs: {
    paddingHorizontal: semantic.padding.large,
    paddingVertical: semantic.padding.regular,
    alignItems: "center",
  },
  tabIcon: {
    paddingBottom: 5,
  },
  navText: {},
});
