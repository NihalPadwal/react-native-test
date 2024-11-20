import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { useRef, useState } from "react";
import { semantic } from "@/infrastructure/tokens/semantic";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Link, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import StatusBar from "@/components/StatusBar";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { useAuth } from "@/context/authContainer";

const SignIn = () => {
  const emailRef = useRef<string>();
  const passRef = useRef<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const safeAreaStats = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current && !passRef.current) {
      Alert.alert("Sign In", "Please fill all the fields!");
      return;
    }
    if (!emailRef.current) {
      Alert.alert("Sign In", "Please fill Email the field!");
      return;
    }
    if (!passRef.current) {
      Alert.alert("Sign In", "Please fill Password the field!");
      return;
    }
    setLoading(true);

    const response = await login({
      email: emailRef.current,
      pass: passRef.current,
    });
    setLoading(false);

    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
  };

  console.log(colorScheme);

  return (
    <CustomKeyboardView>
      <SafeAreaView
        style={{ ...styles.container, paddingTop: safeAreaStats.top }}
      >
        {/* <StatusBar /> */}
        <View style={styles.inner}>
          <Image
            source={require("../assets/images/login.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.head}>Sign In</Text>
          <View style={styles.inputWrap}>
            <Ionicons size={20} name="mail-outline" />
            <TextInput
              placeholderTextColor="black"
              placeholder="Enter Email"
              style={styles.input}
              onChangeText={(val) => {
                emailRef.current = val;
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <Ionicons size={20} name="lock-closed-outline" />
            <TextInput
              placeholderTextColor="black"
              placeholder="Enter Password"
              style={styles.input}
              secureTextEntry
              onChangeText={(val) => {
                passRef.current = val;
              }}
            />
          </View>
          <Text style={styles.forgotText}>Forgot Password ?</Text>

          <TouchableOpacity
            disabled={loading}
            style={styles.submitBtn}
            onPress={handleLogin}
          >
            <LottieView
              source={require("../assets/lottie/loading.json")}
              autoPlay
              loop
              resizeMode="cover"
              style={{
                opacity: loading ? 1 : 0,
                marginHorizontal: "auto",
                width: "40%",
                height: 30,
              }}
            />
            <Text style={{ opacity: loading ? 0 : 1, ...styles.submitBtnText }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Don't have an account?</Text>
            <Link href="/signup">
              <Text style={{ color: "blue", fontWeight: "600" }}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
  },
  inner: {
    paddingHorizontal: semantic.padding.xxlarge,
  },
  image: {
    height: 200,
    width: 200,
    marginHorizontal: "auto",
  },
  head: {
    fontSize: semantic.fontSize.heading1,
    textAlign: "center",
    fontWeight: "600",
    paddingVertical: 20,
  },
  inputWrap: {
    backgroundColor: "#e7e7e7",
    color: "white",
    padding: semantic.padding.medium,
    borderRadius: semantic.borderRadius.large,
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  input: {
    color: "black",
    width: "90%",
  },
  submitBtn: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#4b69f1",
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: semantic.borderRadius.large,
    position: "relative",
    overflow: "hidden",
  },
  submitBtnText: {
    color: "white",
    fontSize: semantic.fontSize.medium,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  forgotText: {
    textAlign: "right",
    marginTop: 10,
  },
});
