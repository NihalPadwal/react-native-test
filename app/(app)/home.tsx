import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { semantic } from "@/infrastructure/tokens/semantic";
import { useAuth } from "@/context/authContainer";
import ChatList from "@/components/ChatList";
import { UserData } from "@/types/ChatItem";
import { getDocs, query, where } from "firebase/firestore";
import { userRef } from "@/firebase.config";

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState<UserData[]>();

  const getUsers = async () => {
    const q = query(userRef, where("userId", "!=", user?.uid));
    const querySnapShot = await getDocs(q);
    let data = [] as UserData[];
    querySnapShot.forEach((doc) => {
      const userData = doc.data() as UserData;
      data.push(userData);
    });

    setUsers(data);
  };

  useEffect(() => {
    if (user?.uid) getUsers();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {users?.length === 0 ? <Loader /> : <ChatList users={users} />}
      </View>
    </SafeAreaView>
  );
}

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
