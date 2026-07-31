import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AsyncStateWrapper } from "@/components/shared/async-state-wrapper";
import LogoutSample from "@/components/shared/signout";
import { AppColors } from "@/theme/colors";
import { useGetUser } from "../../home/queries/home.query";

const SettingScreen = () => {
  const userQuery = useGetUser();
  const user = userQuery.data;

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <AsyncStateWrapper
      isLoading={userQuery.isLoading}
      error={userQuery.error}
      isError={userQuery.isError}
    >
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <View style={styles.heroGlowOne} />
          <View style={styles.heroGlowTwo} />

          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{firstLetter}</Text>
            </View>
          </View>

          <Text style={styles.name}>{user?.name || "User"}</Text>
          <Text style={styles.role}>{user?.role || "Student"}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Profile Active</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Telemedicine User</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value} numberOfLines={1}>
              {user?.email || "N/A"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{user?.age || "N/A"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{user?.gender || "N/A"}</Text>
          </View>

          <View style={[styles.infoRow, styles.lastRow]}>
            <Text style={styles.label}>Joined</Text>
            <Text style={styles.value}>{joinedDate}</Text>
          </View>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <Text style={styles.sectionSubtitle}>
            Manage your session and sign out securely.
          </Text>

          <View style={styles.logoutWrapper}>
            <LogoutSample />
          </View>
        </View>
      </View>
    </AsyncStateWrapper>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF4FF",
    padding: 16,
  },

  heroCard: {
    position: "relative",
    backgroundColor: "#0F172A",
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 18,
  },

  heroGlowOne: {
    position: "absolute",
    top: -40,
    right: -20,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(59,130,246,0.20)",
  },

  heroGlowTwo: {
    position: "absolute",
    bottom: -45,
    left: -20,
    width: 160,
    height: 160,
    borderRadius: 999,
    backgroundColor: "rgba(14,165,233,0.12)",
  },

  avatarWrapper: {
    marginBottom: 14,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },

  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 4,
  },

  role: {
    fontSize: 14,
    color: "rgba(255,255,255,0.72)",
    marginTop: 6,
  },

  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },

  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
  },

  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
    marginTop: -4,
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEFF5",
  },

  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 4,
  },

  label: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },

  value: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    textAlign: "right",
    marginLeft: 14,
  },

  logoutWrapper: {
    marginTop: 4,
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
});
