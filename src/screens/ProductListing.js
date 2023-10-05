import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_VEHICLE_LIST } from "../query/query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../theme/Typography";
import VehicleList from "../components/VehicleList";
import Skeleton from "../components/Skeleton";
import { globalStyles } from "../styles/globalStyle";

export default function ProductListing() {
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);

  // Fetch vehicle list data using Apollo Client
  const { loading, data, fetchMore } = useQuery(GET_VEHICLE_LIST, {
    variables: { page: page, size: 12 },
    onCompleted: (newData) => {
      if (page === 1) {
        setVehicleData(newData.vehicleList);
      } else {
        const updatedData = newData.vehicleList.filter(
          (newItem) =>
            !vehicleData.some((existingItem) => newItem.id === existingItem.id)
        );
        setVehicleData([...vehicleData, ...updatedData]);
      }
    },
  });

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      fetchMore({
        variables: { page: page + 1, size: 10 },
        updateQuery: (prevData, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevData;
          setIsLoadingMore(false);
          setPage(page + 1);

          return {
            ...prevData,
            vehicleList: [
              ...prevData.vehicleList,
              ...fetchMoreResult.vehicleList,
            ],
          };
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && page === 1 ? (
        <View style={styles.loadingContainer}>
          {Array.from(Array(12).keys()).map((item, index) => {
            return (
              <View style={globalStyles.card} key={index}>
                <Skeleton width={150} height={150} style={globalStyles.image} />
                <Skeleton
                  width={100}
                  height={20}
                  style={{
                    marginTop: 8,
                  }}
                />
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Our Products</Text>
          <FlatList
            data={vehicleData}
            renderItem={({ item }) => <VehicleList item={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={() => (
              <View
                style={[
                  styles.loadingContainer,
                  {
                    paddingHorizontal: 0,
                  },
                ]}
              >
                {Array.from(Array(2).keys()).map((item, index) => (
                  <View style={globalStyles.card} key={index}>
                    <Skeleton
                      width={150}
                      height={150}
                      style={globalStyles.image}
                    />
                    <Skeleton
                      width={100}
                      height={20}
                      style={{
                        marginTop: 8,
                      }}
                    />
                  </View>
                ))}
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  loadingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: Typography.medium,
    marginBottom: 24,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  listContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
};
