import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FlashList } from "@shopify/flash-list";
import { AsyncStateWrapper } from "@/components/shared/async-state-wrapper";
import { AppColors } from "@/theme/colors";
import { useSearchDebounce } from "@/hooks/use-search-debounce";
import { useGetUser } from "../queries/home.query";
import {
  useGetSearchResults,
  useGetSpecializations,
} from "../../search/queries/search.query";
import RenderDoctorItem from "../../search/components/render-doctor-item";

const HomeScreen = () => {
  const userQuery = useGetUser();
  const user = userQuery.data;

  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("");

  const {
    debouncedValue: debouncedQuery,
    page,
    setPage,
  } = useSearchDebounce(query);

  useEffect(() => {
    setPage(1);
  }, [specialty, setPage]);

  const doctorsQuery = useGetSearchResults({
    query: debouncedQuery,
    specialty,
    page,
  });

  const specializationQuery = useGetSpecializations();

  const apiData = doctorsQuery.data;
  const totalPages = apiData?.totalPages ?? 1;
  const currentPage = apiData?.currentPage ?? 1;
  const totalDoctors =
    apiData?.count ?? doctorsQuery.data?.results?.length ?? 0;

  const loadMore = () => {
    if (doctorsQuery.isFetching) return;
    if (currentPage >= totalPages) return;
    setPage((prev) => prev + 1);
  };

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <AsyncStateWrapper
        isLoading={userQuery.isLoading}
        error={userQuery.error}
        isError={userQuery.isError}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroGlowOne} />
          <View style={styles.heroGlowTwo} />

          <View style={styles.greetingSection}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greetingText}>Welcome back</Text>
              <Text style={styles.userName}>{user?.name || "Student"}</Text>
              <Text style={styles.heroSubtitle}>
                Find trusted doctors and book your appointment easily.
              </Text>
            </View>

            <View style={styles.avatarMini}>
              <Text style={styles.avatarMiniText}>
                {user?.name?.charAt(0)?.toUpperCase() || "S"}
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{totalDoctors}</Text>
              <Text style={styles.statLabel}>Doctors</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {specializationQuery.data?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Specialties</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statValue}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>
        </View>
      </AsyncStateWrapper>

      <View style={styles.searchCard}>
        <Text style={styles.searchTitle}>Search doctors</Text>
        <Text style={styles.searchSubtitle}>
          Search by doctor name and filter by specialty
        </Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>⌕</Text>
          <TextInput
            placeholder="Search by doctor name..."
            value={query}
            onChangeText={setQuery}
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.pickerOuter}>
          <Text style={styles.filterLabel}>Specialty</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={specialty}
              onValueChange={(value) => setSpecialty(value)}
              style={styles.picker}
            >
              <Picker.Item label="All Specialties" value="" />
              {specializationQuery.data?.map((item: string, index: number) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeaderRow}>
        <View>
          <Text style={styles.listTitle}>Top Doctors</Text>
          <Text style={styles.listSubtitle}>
            Professional care from verified specialists
          </Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{totalDoctors} results</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AsyncStateWrapper
        isLoading={doctorsQuery.isLoading && page === 1}
        isError={doctorsQuery.isError}
        error={doctorsQuery.error}
      >
        <FlashList
          data={doctorsQuery.data?.results ?? []}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }) => <RenderDoctorItem item={item} />}
          keyExtractor={(item: any) =>
            item.id?.toString() || Math.random().toString()
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <Text style={styles.emptyIcon}>🩺</Text>
              </View>
              <Text style={styles.emptyTitle}>No doctors found</Text>
              <Text style={styles.emptySubtitle}>
                Try changing the doctor name or specialty filter.
              </Text>
            </View>
          }
          ListFooterComponent={
            doctorsQuery.isFetching && page > 1 ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator
                  color={AppColors.primary || "#2563EB"}
                  size="small"
                />
                <Text style={styles.loaderText}>Loading more doctors...</Text>
              </View>
            ) : (
              <View style={{ height: 34 }} />
            )
          }
        />
      </AsyncStateWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF4FF",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  headerContainer: {
    marginBottom: 18,
  },

  heroCard: {
    backgroundColor: "#0F172A",
    borderRadius: 28,
    padding: 20,
    marginBottom: 18,
    overflow: "hidden",
  },

  heroGlowOne: {
    position: "absolute",
    top: -40,
    right: -20,
    width: 160,
    height: 160,
    borderRadius: 999,
    backgroundColor: "rgba(59,130,246,0.22)",
  },

  heroGlowTwo: {
    position: "absolute",
    bottom: -50,
    left: -30,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(14,165,233,0.14)",
  },

  greetingSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  greetingText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 6,
    fontWeight: "500",
  },

  userName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(255,255,255,0.78)",
    maxWidth: "92%",
  },

  avatarMini: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarMiniText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  statCard: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },

  statLabel: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    fontWeight: "500",
  },

  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.14)",
  },

  searchCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },

  searchTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },

  searchSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 16,
    lineHeight: 19,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 14,
  },

  inputIcon: {
    fontSize: 18,
    color: "#64748B",
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
    color: "#0F172A",
  },

  pickerOuter: {
    marginTop: 2,
  },

  filterLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },

  pickerWrapper: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    overflow: "hidden",
  },

  picker: {
    height: 52,
    width: "100%",
    color: "#0F172A",
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal: 2,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 2,
  },

  listSubtitle: {
    fontSize: 13,
    color: "#64748B",
  },

  pill: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  pillText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "800",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
    paddingHorizontal: 20,
  },

  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: "#E0ECFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyIcon: {
    fontSize: 28,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
  },

  footerLoader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  loaderText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
});

export default HomeScreen;
