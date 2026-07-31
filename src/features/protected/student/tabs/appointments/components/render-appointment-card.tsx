import { AppColors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const RenderAppointmentCard = ({ item }: { item: any }) => {
  const router = useRouter();

  const doctorName = item?.doctor?.user?.name ?? "Unknown Doctor";
  const specialty = item?.doctor?.specialty ?? "N/A";
  const visitFee = item?.doctor?.visitFee ?? 0;
  const experience = item?.doctor?.experience ?? "N/A";
  const createdDate = item?.createdAt
    ? new Date(item.createdAt).toLocaleDateString()
    : "N/A";

  const transactionId = item?.tranId ?? "N/A";
  const registrationNumber = item?.doctor?.registrationNumber ?? "N/A";
  const isApproved = item?.doctor?.isApproved;

  const statusText = item?.status ?? "UNKNOWN";
  const statusIsPaid = statusText === "PAID";

  return (
    <View style={styles.card}>
      <View style={styles.cardGlow} />

      <View style={styles.cardTopRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {doctorName?.charAt(0)?.toUpperCase() || "D"}
          </Text>
        </View>

        <View style={styles.cardTopInfo}>
          <Text style={styles.doctorName} numberOfLines={1}>
            {doctorName}
          </Text>
          <Text style={styles.specialty} numberOfLines={1}>
            {specialty}
          </Text>

          <View style={styles.metaChips}>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>Online Consultation</Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            statusIsPaid ? styles.statusBadgePaid : styles.statusBadgeDefault,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              statusIsPaid ? styles.statusTextPaid : styles.statusTextDefault,
            ]}
          >
            {statusText}
          </Text>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Visit Fee</Text>
          <Text style={styles.infoValue}>৳ {visitFee}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Experience</Text>
          <Text style={styles.infoValue}>{experience}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Transaction ID</Text>
          <Text style={styles.infoValueSmall} numberOfLines={1}>
            {transactionId}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Booked On</Text>
          <Text style={styles.infoValue}>{createdDate}</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.bottomItem}>
          <Text style={styles.bottomLabel}>Registration</Text>
          <Text style={styles.bottomValue}>Reg: {registrationNumber}</Text>
        </View>

        <View style={styles.bottomItemRight}>
          <Text style={styles.bottomLabel}>Verification</Text>
          <Text
            style={[
              styles.approvedText,
              isApproved ? styles.approvedYes : styles.approvedNo,
            ]}
          >
            {isApproved ? "Approved Doctor" : "Pending Approval"}
          </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.detailsButton,
          pressed && styles.detailsButtonPressed,
        ]}
        onPress={() =>
          router.push({
            pathname: "/doctor/[id]",
            params: { id: item.id },
          })
        }
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </Pressable>
    </View>
  );
};

export default RenderAppointmentCard;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(37, 99, 235, 0.08)",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 5,
    overflow: "hidden",
  },

  cardGlow: {
    position: "absolute",
    top: -30,
    right: -20,
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor: "rgba(59,130,246,0.06)",
  },

  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },

  cardTopInfo: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 10,
  },

  doctorName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },

  specialty: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 10,
  },

  metaChips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  metaChip: {
    backgroundColor: "#EFF6FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  metaChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563EB",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },

  statusBadgePaid: {
    backgroundColor: "#ECFDF3",
    borderColor: "#BBF7D0",
  },

  statusBadgeDefault: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
  },

  statusTextPaid: {
    color: "#15803D",
  },

  statusTextDefault: {
    color: "#334155",
  },

  infoGrid: {
    marginTop: 18,
    gap: 10,
  },

  infoCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 5,
    fontWeight: "600",
    textTransform: "uppercase",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  infoValueSmall: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },

  bottomSection: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  bottomItem: {
    flex: 1,
  },

  bottomItemRight: {
    flex: 1,
    alignItems: "flex-end",
  },

  bottomLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 4,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  bottomValue: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
  },

  approvedText: {
    fontSize: 12,
    fontWeight: "700",
  },

  approvedYes: {
    color: "#15803D",
  },

  approvedNo: {
    color: "#D97706",
  },

  detailsButton: {
    marginTop: 16,
    backgroundColor: AppColors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 4,
  },

  detailsButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
