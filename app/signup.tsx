import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRef, useState } from "react";
import { semantic } from "@/infrastructure/tokens/semantic";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Link } from "expo-router";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { useAuth } from "@/context/authContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignUp = () => {
  const usernameRef = useRef<string>();
  const profileRef = useRef<string>();
  const emailRef = useRef<string>();
  const passRef = useRef<string>();
  const safeAreaStats = useSafeAreaInsets();
  const [loading, setLoading] = useState<boolean>(false);
  const { register } = useAuth();

  const login = async () => {
    if (!emailRef.current && !passRef.current && !usernameRef.current) {
      Alert.alert("Sign Up", "Please fill all the fields!");
      return;
    }
    if (!usernameRef.current) {
      Alert.alert("Sign Up", "Please fill Username the field!");
      return;
    }
    // if (!profileRef.current) {
    //   Alert.alert("Sign Up", "Please fill Profile the field!");
    //   return;
    // }
    if (!emailRef.current) {
      Alert.alert("Sign Up", "Please fill Email the field!");
      return;
    }
    if (!passRef.current) {
      Alert.alert("Sign Up", "Please fill Password the field!");
      return;
    }
    setLoading(true);

    const tempProfileUrl =
      "https://media.licdn.com/dms/image/v2/C560BAQHyGR9ni0YVvw/company-logo_200_200/company-logo_200_200/0/1631424581383?e=2147483647&v=beta&t=6tzVV7RnWuDCws805vpt3VHe6ga2pm_ESz4Q21jcuPs";

    let response = await register({
      email: emailRef.current,
      pass: passRef.current,
      profileUrl: tempProfileUrl,
      username: usernameRef.current,
    });
    setLoading(false);

    console.log("got the result", response);

    if (!response.success) {
      Alert.alert("Sign Up", response.msg || "Something went wrong!");
    }

    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  };

  return (
    <CustomKeyboardView>
      <SafeAreaView
        style={{ ...styles.container, paddingTop: safeAreaStats.top }}
      >
        <View style={styles.inner}>
          <Image
            source={require("../assets/images/register.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.head}>Sign Up</Text>

          <View style={styles.inputWrap}>
            <Ionicons size={20} name="person-outline" />
            <TextInput
              placeholderTextColor="black"
              placeholder="Username"
              style={styles.input}
              onChangeText={(val) => {
                usernameRef.current = val;
              }}
            />
          </View>

          {/* <View style={styles.inputWrap}>
            <Ionicons size={20} name="image-outline" />
            <TextInput
              placeholderTextColor="black"
              placeholder="Profile Url"
              style={styles.input}
              onChangeText={(val) => {
                profileRef.current = val;
              }}
            />
          </View> */}

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
          <TouchableOpacity style={styles.submitBtn} onPress={login}>
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
              Sign Up
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
            <Text>Already have an account?</Text>
            <Link href="/signin">
              <Text style={{ color: "blue", fontWeight: "600" }}>Sign In</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
