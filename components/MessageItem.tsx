import { UserChat, UserData } from "@/types/ChatItem";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MessageItem = ({
  message,
  currentUser,
}: {
  message: UserChat;
  currentUser: UserData;
}) => {
  const isMyMessage = currentUser?.userId === message?.userId;

  if (isMyMessage) {
    return (
      <View style={styles.myMsg}>
        <View style={{ ...styles.msgWrap, backgroundColor: "white" }}>
          <Text>{message.text}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.otherMsg}>
      <View style={{ ...styles.msgWrap, backgroundColor: "#becaff" }}>
        <Text>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myMsg: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
    marginRight: 5,
  },
  otherMsg: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginLeft: 5,
  },
  msgWrap: {
    padding: 10,
    borderRadius: 100,
  },
});

export default MessageItem;
