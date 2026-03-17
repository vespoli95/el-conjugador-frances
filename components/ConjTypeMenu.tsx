import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
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
          >
            {tense}
          </Text>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
};

export default ConjTypeMenu;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 12,
    marginStart: 4,
    marginEnd: 4,
  },
  touchable: {
    borderRadius: 6,
  },
  tab: {
    paddingVertical: 14,
    paddingHorizontal: 16,
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
