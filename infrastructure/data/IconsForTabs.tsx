import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";

// Define the props for each icon in `iconsForTabs`
type TabIconProps = Partial<ComponentProps<typeof TabBarIcon>>;
const sizeOfIcon = 15;

const iconsForTabs: { [key: string]: (props: TabIconProps) => JSX.Element } = {
  index: (props: TabIconProps) => {
    return <TabBarIcon size={sizeOfIcon} name="home" {...props} />;
  },
  profile: (props: TabIconProps) => {
    return <TabBarIcon size={sizeOfIcon} name="person" {...props} />;
  },
  signin: (props: TabIconProps) => {
    return <TabBarIcon size={sizeOfIcon} name="log-in" {...props} />;
  },
};

export default iconsForTabs;
