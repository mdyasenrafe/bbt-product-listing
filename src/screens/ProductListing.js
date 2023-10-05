import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_VEHICLE_LIST } from "../query/query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../theme/Typography";
import VehicleList from "../components/VehicleList";

// Component for the loading indicator
const LoadingIndicator = ({ loading }) => {
  return (
    <View>
      {loading ? <ActivityIndicator color="#F40B0B" size="small" /> : null}
    </View>
  );
};

export default function ProductListing() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);

  // Fetch vehicle list data using Apollo Client
  const { loading, data, fetchMore } = useQuery(GET_VEHICLE_LIST, {
    variables: { page: page, size: 12 },
    onCompleted: (data) => {
      if (page > 1) {
        const newData = data.vehicleList.filter(
          (item) => !vehicleList.some((other) => item.id === other.id)
        );
        setVehicleList([...vehicleList, ...newData]);
      } else {
        setVehicleList(data.vehicleList);
      }
    },
  });

  const handleLoadMore = () => {
    if (!isLoading) {
      setIsLoading(true);
      fetchMore({
        variables: { page: page + 1, size: 10 },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setIsLoading(false);
          setPage(page + 1);

          return Object.assign({}, prev, {
            vehicleList: [...prev.vehicleList, ...fetchMoreResult.vehicleList],
          });
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && page == 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#F40B0B" size="large" />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Our Products</Text>
          <FlatList
            data={vehicleList}
            renderItem={({ item }) => <VehicleList item={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={() => (
              <View style={{ marginBottom: 40 }}>
                <ActivityIndicator loading={isLoading} />
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
};
