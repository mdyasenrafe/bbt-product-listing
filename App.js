import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ProductListing from "./src/screens/ProductListing";
import { useFonts } from "expo-font";

const headers = {
  "x-client-id": "651e5a8612e5356e23ce5a57",
  "x-app-id": "651e5a8612e5356e23ce5a59",
};

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://api.chargetrip.io/graphql",
  headers,
  cache: new InMemoryCache(),
});

export default function App() {
  const [loaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <ProductListing />
    </ApolloProvider>
  );
}
