import { ScrollView, StyleSheet, Text, View } from "react-native";
import MessageItem from "./MessageItem";
import { UserChat, UserData } from "@/types/ChatItem";

const MessageList = ({
  messages,
  currentUser,
}: {
  messages: any;
  currentUser: UserData;
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message: UserChat, ind: number) => {
        return (
          <MessageItem message={message} key={ind} currentUser={currentUser} />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MessageList;
