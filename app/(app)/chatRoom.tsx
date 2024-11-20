import ChatHeader from "@/components/ChatHeader";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import MessageList from "@/components/MessageList";
import { useAuth } from "@/context/authContainer";
import { db } from "@/firebase.config";
import { semantic } from "@/infrastructure/tokens/semantic";
import { UserData } from "@/types/ChatItem";
import { getRoomId } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChatRoom = () => {
  const { user } = useAuth(); // logged in user
  const item = useLocalSearchParams() as UserData; // second user
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const textRef = useRef<string>("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    return unsub;
  }, []);

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      textRef.current = "";
      inputRef.current?.clear();

      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log("New message id: ", newDoc.id);
    } catch (_e) {
      let e = _e as Error;
      Alert.alert("Message", e.message);
    }
  };

  console.log("Messages", messages);

  return (
    <CustomKeyboardView inChat={true}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ChatHeader user={item} router={router} />
        <View style={styles.divider}></View>
        <View style={styles.chatContainer}>
          <View style={{ flex: 1 }}>
            <MessageList messages={messages} currentUser={user} />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrap}>
              <TextInput
                ref={inputRef}
                onChangeText={(val) => {
                  textRef.current = val;
                }}
                placeholder="Type Message..."
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                style={styles.sendBtn}
              >
                <Ionicons size={20} name="paper-plane-outline" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  divider: {
    borderBottomWidth: 0.2,
    paddingTop: 20,
    borderColor: "gray",
  },
  chatContainer: {
    flex: 1,
    justifyContent: "space-between",
    overflow: "visible",
    backgroundColor: "#f6f6f6",
  },
  inputContainer: {
    paddingTop: 30,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 10,
    borderRadius: 100,
    backgroundColor: "white",
    width: "90%",
    paddingLeft: 20,
  },
  sendBtn: {
    backgroundColor: "#d2d2d2",
    padding: 5,
    borderRadius: 100,
  },
});

export default ChatRoom;
