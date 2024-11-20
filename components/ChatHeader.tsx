import { semantic } from "@/infrastructure/tokens/semantic";
import { UserData } from "@/types/ChatItem";
import { blurhash } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Router, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatHeader = ({ user, router }: { user: UserData; router: Router }) => {
  const safeAreaStats = useSafeAreaInsets();
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View
            style={{
              ...styles.headerLeftContainer,
            }}
          >
            <TouchableOpacity onPress={() => router.back()} style={styles.bar}>
              <Ionicons size={20} name="chevron-back" />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  source={user.profileUrl}
                  style={styles.profile}
                  placeholder={blurhash}
                />
                <Text style={styles.name}>{user?.username}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              ...styles.headerRightContainer,
            }}
          >
            <TouchableOpacity
              // onPress={() => router.back()}
              style={styles.bar}
            >
              <Ionicons size={20} name="call" />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => router.back()}
              style={styles.bar}
            >
              <Ionicons size={20} name="videocam" />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  profile: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 100,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  name: {
    fontWeight: 600,
    fontSize: semantic.fontSize.regular,
  },
});

export default ChatHeader;
