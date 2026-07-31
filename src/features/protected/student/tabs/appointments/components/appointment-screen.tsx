import { AsyncStateWrapper } from "@/components/shared/async-state-wrapper";
import { AppColors } from "@/theme/colors";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useGetAppointments } from "../queries/appointments.query";
import RenderAppointmentCard from "./render-appointment-card";

const AppointmentScreen = () => {
  const [page, setPage] = useState(1);

  const userQuery = useGetAppointments({
    query: {
      page,
    },
  });

  const apiData = userQuery.data;

  const appointments: any[] = useMemo(
    () => apiData?.results ?? [],
    [apiData?.results]
  );

  const currentPage = apiData?.currentPage ?? 1;
  const totalPages = apiData?.totalPages ?? 1;
  const hasNextPage = currentPage < totalPages;

  const headerData = useMemo(() => {
    return {
      total: apiData?.count ?? 0,
      paid: appointments.filter((item) => item.status === "PAID").length,
      doctors: new Set(appointments.map((item) => item.doctor?.id)).size,
    };
  }, [apiData?.count, appointments]);

  const handleLoadMore = () => {
    if (!userQuery.isFetching && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.heroCard}>
        <View style={styles.heroGlowOne} />
        <View style={styles.heroGlowTwo} />

        <View style={styles.heroTopRow}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.screenEyebrow}>Appointments</Text>
            <Text style={styles.screenTitle}>My Appointments</Text>
            <Text style={styles.screenSubtitle}>
              Track your booked consultations, payment status, and doctor
              details in one place.
            </Text>
          </View>

          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Active</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.summaryCardBlue]}>
            <Text style={styles.summaryNumberLight}>{headerData.total}</Text>
            <Text style={styles.summaryLabelLight}>Total</Text>
          </View>

          <View style={[styles.summaryCard, styles.summaryCardWhite]}>
            <Text style={styles.summaryNumberDark}>{headerData.paid}</Text>
            <Text style={styles.summaryLabelDark}>Paid</Text>
          </View>

          <View style={[styles.summaryCard, styles.summaryCardWhite]}>
            <Text style={styles.summaryNumberDark}>{headerData.doctors}</Text>
            <Text style={styles.summaryLabelDark}>Doctors</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Recent bookings</Text>
          <Text style={styles.sectionSubtitle}>
            Your latest appointment history
          </Text>
        </View>

        <View style={styles.sectionPill}>
          <Text style={styles.sectionPillText}>{headerData.total} records</Text>
        </View>
      </View>
    </View>
  );

  return (
    <AsyncStateWrapper
      isLoading={userQuery.isLoading}
      error={userQuery.error}
      isError={userQuery.isError}
    >
      <View style={styles.container}>
        <FlashList
          data={appointments}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => <RenderAppointmentCard item={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={
            userQuery.isFetching && hasNextPage ? (
              <View style={styles.footerLoader}>
                <View style={styles.loaderChip}>
                  <ActivityIndicator size="small" color={AppColors.primary} />
                  <Text style={styles.footerText}>
                    Loading more appointments...
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.footerSpace} />
            )
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <Text style={styles.emptyIcon}>📅</Text>
              </View>
              <Text style={styles.emptyTitle}>No appointments found</Text>
              <Text style={styles.emptySubtitle}>
                Your booked appointments will appear here once you schedule a
                consultation.
              </Text>
            </View>
          }
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </AsyncStateWrapper>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF4FF",
  },

  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  headerContainer: {
    marginBottom: 18,
  },

  heroCard: {
    position: "relative",
    backgroundColor: "#0F172A",
    borderRadius: 28,
    padding: 20,
    overflow: "hidden",
    marginBottom: 18,
  },

  heroGlowOne: {
    position: "absolute",
    top: -35,
    right: -25,
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

  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  heroTextWrap: {
    flex: 1,
    paddingRight: 12,
  },

  screenEyebrow: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255,255,255,0.65)",
    marginBottom: 6,
    letterSpacing: 0.3,
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  screenSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(255,255,255,0.75)",
  },

  heroBadge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },

  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summaryCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  summaryCardBlue: {
    backgroundColor: "rgba(59,130,246,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginRight: 10,
  },

  summaryCardWhite: {
    backgroundColor: "#FFFFFF",
    marginLeft: 5,
    marginRight: 5,
  },

  summaryNumberLight: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  summaryLabelLight: {
    marginTop: 6,
    fontSize: 13,
    color: "rgba(255,255,255,0.78)",
    fontWeight: "500",
  },

  summaryNumberDark: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },

  summaryLabelDark: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 2,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 2,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#64748B",
  },

  sectionPill: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  sectionPillText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "800",
  },

  footerLoader: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  loaderChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  footerText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },

  footerSpace: {
    height: 10,
  },

  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },

  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: "#E0ECFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  emptyIcon: {
    fontSize: 28,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    color: "#64748B",
  },
});
