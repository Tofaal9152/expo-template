import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { AppColors } from "@/theme/colors";
import { usePaymentMutation } from "../queries/payments.query";

const RenderDoctor = ({ item }: { item: any }) => {
  const paymentMutation = usePaymentMutation();

  const doctorName = item?.name || "Unknown Doctor";
  const specialtyText = item?.doctor?.specialty?.trim() || "General Specialist";
  const experienceText = item?.doctor?.experience || "Experience not available";
  const bioText = item?.doctor?.bio || "No professional bio available yet.";
  const firstLetter = doctorName?.charAt(0)?.toUpperCase() || "D";

  const genderText = item?.gender || "N/A";
  const ageText = item?.age ? `${item.age} yrs` : "Age N/A";
  const emailText = item?.email || "No email available";

  const handlePayment = () => {
    paymentMutation.mutate({
      doctorId: item.id,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardGlow} />

      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            {item?.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>{firstLetter}</Text>
              </View>
            )}
            <View style={styles.onlineDot} />
          </View>

          <View style={styles.topInfo}>
            <Text style={styles.name} numberOfLines={1}>
              {doctorName}
            </Text>
            <Text style={styles.specialty} numberOfLines={1}>
              {specialtyText}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.metaChip}>
                <Text style={styles.metaChipText}>{genderText}</Text>
              </View>
              <View style={styles.metaChip}>
                <Text style={styles.metaChipText}>{ageText}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>Verified</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <View style={styles.featureCard}>
          <Text style={styles.featureLabel}>Experience</Text>
          <Text style={styles.featureValue}>{experienceText}</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureLabel}>Professional Bio</Text>
          <Text style={styles.bioText} numberOfLines={4}>
            {bioText}
          </Text>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactLabel}>Contact</Text>
          <Text style={styles.email} numberOfLines={1}>
            {emailText}
          </Text>
        </View>
      </View>

      <SubmitButton
        style={[
          styles.button,
          paymentMutation.isPending && styles.buttonDisabled,
        ]}
        onPress={handlePayment}
        disabled={paymentMutation.isPending}
        isLoading={paymentMutation.isPending}
        loadingText="Processing..."
      >
        {paymentMutation.isPending ? "Processing..." : "Book Appointment"}
      </SubmitButton>
    </View>
  );
};

export default RenderDoctor;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(30, 136, 229, 0.08)",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    overflow: "hidden",
  },

  cardGlow: {
    position: "absolute",
    top: -30,
    right: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(30, 136, 229, 0.06)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  profileSection: {
    flexDirection: "row",
    flex: 1,
    paddingRight: 10,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: AppColors.inputBackground,
    borderWidth: 2,
    borderColor: "rgba(30, 136, 229, 0.12)",
  },

  avatarFallback: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
  },

  onlineDot: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: "#22C55E",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  topInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },

  name: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },

  specialty: {
    fontSize: 14,
    color: AppColors.subtitleText,
    marginBottom: 10,
    fontWeight: "500",
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  metaChip: {
    backgroundColor: "#F1F7FE",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(30, 136, 229, 0.08)",
  },

  metaChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: AppColors.primary,
  },

  statusBadge: {
    backgroundColor: "#ECFDF3",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  statusBadgeText: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "800",
  },

  contentSection: {
    gap: 12,
    marginBottom: 16,
  },

  featureCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  featureLabel: {
    fontSize: 12,
    color: AppColors.subtitleText,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "700",
  },

  featureValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  bioText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#334155",
    fontWeight: "500",
  },

  contactCard: {
    backgroundColor: "#F9FBFD",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  contactLabel: {
    fontSize: 12,
    color: AppColors.subtitleText,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "700",
  },

  email: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: "600",
  },

  button: {
    backgroundColor: AppColors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },

  buttonDisabled: {
    opacity: 0.75,
  },
});
