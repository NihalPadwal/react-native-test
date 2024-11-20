import HomeHeader from "@/components/HomeHeader";
import { Stack } from "expo-router";

export default function SafeRootLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ header: () => <HomeHeader /> }} />
    </Stack>
  );
}
