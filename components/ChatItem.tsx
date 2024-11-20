import { semantic } from "@/infrastructure/tokens/semantic";
import { UserData } from "@/types/ChatItem";
import { blurhash } from "@/utils";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Router } from "expo-router";

const ChatItem = ({
  data,
  router,
  index,
}: {
  data: UserData;
  router: Router;
  index: number;
}) => {
  const openChatRoom = async (item: UserData) => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  return (
    <TouchableOpacity
      onPress={() => openChatRoom(data)}
      style={styles.chatWrap}
    >
      {/* <Image source={{ uri: data.profileUrl }} style={styles.profile} /> */}
      <Image
        source={data.profileUrl}
        style={styles.profile}
        placeholder={blurhash}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{data.username}</Text>
        <Text style={styles.recentText}>Last Message</Text>
      </View>
      <Text style={styles.time}>time</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: semantic.color.background.dark.bright,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: semantic.fontSize.regular,
    fontWeight: "500",
  },
  recentText: {
    fontSize: semantic.fontSize.caption,
  },
  time: {
    opacity: 0.5,
    fontSize: semantic.fontSize.caption,
  },
  profile: { height: 50, width: "auto", aspectRatio: 1, borderRadius: 100 },
});

export default ChatItem;
