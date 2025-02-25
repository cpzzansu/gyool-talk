import {
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  ScrollView,
  View,
  Text,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSelector } from "react-redux";
import TabsScreenAppBar from "@/components/TabsScreenAppBar";

const data = [
  {
    chatroomName: "채팅방1",
    messages: [{ content: "마지막 채팅 내용1", timestamp: "2025.02.20" }],
  },
  {
    chatroomName: "채팅방2",
    messages: [{ content: "마지막 채팅 내용2", timestamp: "2025.02.20" }],
  },
  {
    chatroomName: "채팅방3",
    messages: [{ content: "마지막 채팅 내용3", timestamp: "2025.02.20" }],
  },
  {
    chatroomName: "채팅방4",
    messages: [{ content: "마지막 채팅 내용4", timestamp: "2025.02.20" }],
  },
  {
    chatroomName: "채팅방5",
    messages: [{ content: "마지막 채팅 내용5", timestamp: "2025.02.20" }],
  },
  {
    chatroomName: "채팅방6",
    messages: [{ content: "마지막 채팅 내용6", timestamp: "2025.02.20" }],
  },
  {
    chatroomName: "채팅방7",
    messages: [{ content: "마지막 채팅 내용7", timestamp: "2025.02.20" }],
  },
];
export default function TabTwoScreen() {
  const { width } = Dimensions.get("window");

  return (
    <>
      <TabsScreenAppBar
        title={"채팅"}
        icons={[
          { src: require("@/assets/images/icon/chatting-search-icon.png") },
          { src: require("@/assets/images/icon/add-chatting.png") },
        ]}
      />
      <ScrollView style={{ backgroundColor: "#DCD7CB" }}>
        {/*Tabs Screen App Bar*/}
        <ThemedView
          style={{
            backgroundColor: "#DCD7CB",
            paddingTop: width * 0.06,
            paddingLeft: width * 0.045,
            paddingRight: width * 0.045,
            height: "100%",
          }}
        >
          {/*친구 목록*/}
          {data.map((chat, index) => {
            const message = chat.messages.pop();
            return (
              <ListItem
                chatroomName={chat.chatroomName}
                lastMessage={message?.content!}
                timestamp={message?.timestamp!}
                marginBottom={0.05}
                key={index}
              />
            );
          })}
        </ThemedView>
      </ScrollView>
    </>
  );
}

// 친구 목록 아이템 컴포넌트
const ListItem = ({
  chatroomName,
  lastMessage,
  marginBottom,
  timestamp,
}: {
  chatroomName: string;
  lastMessage: string;
  marginBottom: number;
  timestamp: string;
}) => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: width * marginBottom,
      }}
    >
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
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: width * 0.005,
          }}
        >
          <Text
            style={{ fontSize: width * 0.029, fontFamily: "pretendardMedium" }}
          >
            {chatroomName}
          </Text>
          <Text
            style={{
              fontSize: width * 0.027,
              fontFamily: "pretendardMedium",
              color: "#848484",
            }}
          >
            {lastMessage}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: width * 0.027,
            fontFamily: "pretendardMedium",
            color: "#848484",
          }}
        >
          {timestamp}
        </Text>
      </View>
    </View>
  );
};
