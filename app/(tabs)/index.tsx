import { Image, View, Text, Dimensions } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const FirstView = () => {
  const { width } = Dimensions.get("window");

  return (
    <ThemedView
      style={{
        backgroundColor: "#DCD7CB",
        paddingLeft: "5%",
        paddingRight: "5%",
        height: "100%",
      }}
    >
      <FriendsListAppBar />
      <ListItem id={"내 아이디"} />
      <View style={{ height: width * 0.063 }} />
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#e4e4e4" }} />
      <View style={{ marginTop: width * 0.034 }}>
        <Text style={{ fontSize: width * 0.03, marginBottom: width * 0.013 }}>
          친구 7
        </Text>
      </View>
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
      <ListItem id={"친구아이디"} />
      <View style={{ height: width * 0.05 }} />
    </ThemedView>
  );
};

const ListItem = ({ id }: { id: string }) => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: width * 0.022,
      }}
    >
      <Image
        style={{ width: width * 0.1, height: width * 0.109 }}
        source={require("@/assets/images/icon/friends-list-profile.png")}
      />
      <Text style={{ fontSize: width * 0.036, fontWeight: "500" }}>{id}</Text>
    </View>
  );
};

const FriendsListAppBar = () => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        paddingTop: "20%",
        paddingBottom: "11%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: width * 0.072, fontWeight: "600" }}>친구</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: width * 0.022,
        }}
      >
        <Image
          style={{
            width: width * 0.072,
            height: width * 0.072,
            resizeMode: "contain",
          }}
          source={require("@/assets/images/icon/search-icon.png")}
        />
        <Image
          style={{
            width: width * 0.072,
            height: width * 0.072,
            resizeMode: "contain",
          }}
          source={require("@/assets/images/icon/add-friend-icon.png")}
        />
      </View>
    </View>
  );
};

export default FirstView;
