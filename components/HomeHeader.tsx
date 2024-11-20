import { useAuth } from "@/context/authContainer";
import { semantic } from "@/infrastructure/tokens/semantic";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import CustomHeaderMenuItems from "./CustomHeaderMenuItems";
import { blurhash } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeHeader = () => {
  const safeAreaStats = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { user, logout } = useAuth();

  const handleProfile = async () => {};

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{ ...styles.container, paddingTop: safeAreaStats.top }}>
      <View>
        <Text style={{ ...styles.headText }}>Chats</Text>
      </View>
      <View style={styles.imageWrap}>
        <Menu>
          <MenuTrigger>
            <Image
              style={styles.image}
              source={user?.profileUrl}
              placeholder={blurhash}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 50,
                marginLeft: 0,
                backgroundColor: "white",
                transformOrigin: "top right",
              },
            }}
          >
            {/* <MenuOption onSelect={() => alert(`Save`)} text="Save" /> */}
            <CustomHeaderMenuItems
              text="Profile"
              action={handleProfile}
              icon="person-circle-outline"
            />
            <View style={styles.divider}></View>
            <CustomHeaderMenuItems
              text="Sign Out"
              action={handleLogout}
              icon="log-out-outline"
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: semantic.color.background.dark.tint,
    borderBottomLeftRadius: semantic.borderRadius.large * 2,
    borderBottomRightRadius: semantic.borderRadius.large * 2,
    paddingBottom: 30,
    // flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: semantic.padding.medium,
    flexDirection: "row",
    alignItems: "center",
  },
  headText: {
    color: "white",
    fontSize: semantic.fontSize["2xlarge"],
    fontWeight: "700",
  },
  imageWrap: {
    // flex: 1,
  },
  image: {
    width: 45,
    borderRadius: 100,
    aspectRatio: 1,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: semantic.color.background.dark.shade,
    opacity: 0.1,
  },
});

export default HomeHeader;
