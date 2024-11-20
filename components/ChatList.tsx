import { FlatList, StyleSheet, Text, View } from "react-native";
import ChatItem from "./ChatItem";
import { semantic } from "@/infrastructure/tokens/semantic";
import { UserData } from "@/types/ChatItem";
import { useRouter } from "expo-router";

const ChatList = ({ users }: { users: UserData[] | undefined }) => {
  const router = useRouter();
  return (
    <View style={styles.itemsWrap}>
      <FlatList
        data={users}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => `${item.userId}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            data={item}
            router={router}
            key={item.userId}
            index={index}
          />
        )} // Destructure `item` and `index`
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  list: {
    paddingVertical: semantic.padding.large,
  },
  itemsWrap: {
    paddingHorizontal: semantic.padding.large,
  },
});
