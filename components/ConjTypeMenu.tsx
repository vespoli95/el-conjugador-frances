import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native";

type ConjTypeMenuProps = {
  currentTense: string;
  setCurrentTense: (tense: string) => void;
  tenses: string[];
};

const ConjTypeMenu: React.FC<ConjTypeMenuProps> = ({
  currentTense,
  setCurrentTense,
  tenses,
}) => {
  const { width } = useWindowDimensions();
  const fontSize = width < 600 ? 12 : 16;

  return (
    <View style={styles.container}>
      {tenses?.map((tense) => (
        <TouchableHighlight
          key={tense}
          style={styles.touchable}
          onPress={() => setCurrentTense(tense)}
        >
          <Text
            style={[
              styles.tab,
              { fontSize },
              currentTense === tense ? styles.tabActive : styles.tabInactive,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {tense}
          </Text>
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default ConjTypeMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 12,
    marginStart: 72,
    marginEnd: 72,
  },
  touchable: {
    flex: 1,
    borderRadius: 6,
  },
  tab: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 6,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  tabActive: {
    backgroundColor: "#2563eb",
  },
  tabInactive: {
    backgroundColor: "#1e3a8a",
  },
});
