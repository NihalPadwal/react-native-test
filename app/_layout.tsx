import TabBar from "@/components/TabBar";
import { AuthContextProvider, useAuth } from "@/context/authContainer";
import { Stack, Tabs, Slot, useSegments, useRouter } from "expo-router";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  console.log(isAuthenticated);

  useEffect(() => {
    // check if user is authenticated or not
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("/(app)/home");
    } else if (isAuthenticated === false) {
      // redirect to sign in page
      router.replace("/signin");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MenuProvider>
        <MainLayout />
      </MenuProvider>
    </AuthContextProvider>
  );
}
