import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { FrenchVerbData } from "@/assets/types/Conjugation";
import { useTheme } from "@/context/ThemeContext";
import { imperativePronouns, pronouns, tenseLabels } from "@/lib/utils";

type TenseGroupProps = {
  verbData: FrenchVerbData;
  tenseKeys: string[];
};

const TenseGroup: React.FC<TenseGroupProps> = ({ verbData, tenseKeys }) => {
  const { isDark } = useTheme();

  return (
    <View>
      {tenseKeys.map((tenseKey) => {
        const data = verbData[tenseKey as keyof FrenchVerbData];
        if (!data) return null;

        // Handle single-value fields (participePresent, participePasse)
        if (typeof data === "string") {
          return (
            <View key={tenseKey}>
              <Text
                style={[
                  styles.tenseLabel,
                  { color: isDark ? "#93c5fd" : "#1e3a8a" },
                ]}
              >
                {tenseLabels[tenseKey] ?? tenseKey}
              </Text>
              <View
                style={[
                  styles.row,
                  { backgroundColor: isDark ? "#334155" : "#64748b" },
                ]}
              >
                <Text style={styles.rowText}>
                  <Text style={styles.rowValueBold}>{data}</Text>
                </Text>
              </View>
            </View>
          );
        }

        // Handle array tenses
        if (!Array.isArray(data) || data.length === 0) return null;

        const isImperative =
          tenseKey === "imperatif" || tenseKey === "imperatifPasse";
        const pronounList = isImperative ? imperativePronouns : pronouns;

        return (
          <View key={tenseKey}>
            <Text
              style={[
                styles.tenseLabel,
                { color: isDark ? "#93c5fd" : "#1e3a8a" },
              ]}
            >
              {tenseLabels[tenseKey] ?? tenseKey}
            </Text>
            {(data as string[]).map((value, i) => {
              if (!value || value === "\u2013" || value === "–") return null;
              const pronoun = pronounList[i];
              return (
                <View
                  key={`${tenseKey}_${i}`}
                  style={[
                    styles.row,
                    { backgroundColor: isDark ? "#334155" : "#64748b" },
                  ]}
                >
                  <Text style={styles.rowText}>
                    {pronoun ? (
                      <Text>
                        {pronoun}:{" "}
                        <Text style={styles.rowValueBold}>{value}</Text>
                      </Text>
                    ) : (
                      <Text style={styles.rowValueBold}>{value}</Text>
                    )}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default TenseGroup;

const styles = StyleSheet.create({
  tenseLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  rowText: {
    fontSize: 14,
    color: "#fff",
  },
  rowValueBold: {
    fontWeight: "bold",
  },
});
