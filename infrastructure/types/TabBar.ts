// Define types for iconsForTabs if not already typed
type IconsForTabsType = {
  [key: string]: (props: { color: string; size: number }) => JSX.Element;
};
