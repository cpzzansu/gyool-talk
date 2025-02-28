import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import GeneralAppBar from "@/components/GeneralAppBar";
import * as common from "@/utils/common";

export default function AddFriend() {
  // 리덕스 상태에서 userId 가져오기
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [selectId, setSelectId] = useState("");
  const [friendId, setFriendId] = useState("");
  const { width, height } = Dimensions.get("window");
  const [userProfileImg, setUserProfileImg] = useState<string | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false); // 검색 여부 추적
  const [isFriendRequestPending, setIsFriendRequestPending] = useState(false); // 친구 요청 상태
  const imgUrl = "../assets/images/cat.jpg";

  const showAlert = (message: string) => {
    if (Platform.OS === "web") {
      window.alert(message);
    } else {
      Alert.alert(message);
    }
  };

  const findFriend = async () => {
    setSearchAttempted(true); // 검색 시도 상태 변경

    try {
      const result = await common.postRequest("/user/findId", {
        userId: selectId,
      });

      if (result.userId) {
        setFriendId(result.userId);
        setUserProfileImg(result.userProfileImg || null); // 프로필 이미지 URL 설정
        setIsFriendRequestPending(!!result.friendRequest); // 친구 요청 상태 설정
      } else {
        setFriendId("");
        setUserProfileImg(null); // 프로필 이미지 초기화
        setIsFriendRequestPending(false); // 검색 결과 없을 경우 상태 초기화
      }
    } catch (error) {
      console.error("친구 검색 오류:", error);
      showAlert("서버 오류가 발생했습니다. 관리자에게 문의하세요.");
    }
  };

  const addFriend = async () => {
    try {
      const result = await common.postRequest("/user/addFriend", {
        userId,
        friendId,
        status: 0,
      });

      if (result) {
        setIsFriendRequestPending(true); // 친구 요청 상태 업데이트
        showAlert("친구 요청을 보냈습니다.");
      } else {
        showAlert("친구 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("친구 추가 오류:", error);
      showAlert("서버 오류가 발생했습니다. 관리자에게 문의하세요.");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      //justifyContent: 'center',
      padding: width * 0.05,
      backgroundColor: "#DCD7CB",
    },
    infoText: {
      fontSize: width * 0.03,
      color: "#727272",
    },
    input: {
      width: width * 0.9,
      height: width * 0.1,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
      marginBottom: width * 0.01,
    },
    inputView: {
      width: width * 0.9,
      height: width * 0.1,
      paddingHorizontal: width * 0.01,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputKey: { color: "#2b2b2b" },
    inputValue: { color: "#827F7F" },
    profile: {
      width: width * 0.1,
      height: width * 0.1,
      resizeMode: "contain", // 원본 비율 유지
    },
    line: {
      width: "100%", // 전체 너비 차지하도록 설정
      height: 0.8, // 최소 1 이상으로 설정
      backgroundColor: "#E4E4E4",
      marginVertical: 2, // 위아래 간격 추가
    },
    addButton: {
      width: width * 0.13,
      height: width * 0.09,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    addButtonText: {
      color: "#F1F1F1",
      fontSize: width * 0.03,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      gap: 5,
      marginBottom: width * 0.03,
    },
    rowContainer2: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      gap: 5,
      marginTop: width * 0.08,
    },
    checkImage: {
      width: width * 0.11,
      height: height * 0.086,
      resizeMode: "contain", // 원본 비율 유지
    },
  });

  return (
    <>
      <GeneralAppBar title={"친구추가"} />
      <ThemedView style={styles.container}>
        {/* 아이디 검색*/}
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.input}
            placeholder="검색아이디"
            value={selectId}
            onChangeText={setSelectId}
            placeholderTextColor="#827F7F"
            returnKeyType="search" // 키보드의 'Enter' 버튼을 'Search'로 변경
            onSubmitEditing={findFriend} // 엔터(또는 검색 버튼) 눌렀을 때 실행될 함수
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputKey}>내 아이디</Text>
          <Text style={styles.inputValue}>{userId}</Text>
        </View>

        <View style={styles.line} />

        {/* 검색 결과가 있을 경우 아이디 & 추가 버튼 표시 */}
        {friendId ? (
          <View style={styles.rowContainer2}>
            {/* 프로필 이미지 */}
            {userProfileImg ? (
              <Image source={{ uri: userProfileImg }} style={styles.profile} />
            ) : (
              <Image
                source={require("@/assets/images/gyoolTalk.png")}
                style={styles.profile}
              />
            )}

            {/* 아이디 (왼쪽) */}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.infoText}>{friendId}</Text>
            </View>

            {/* 추가 버튼 (오른쪽) */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={isFriendRequestPending ? undefined : addFriend} // 요청 중이면 클릭 못 하게 처리
              disabled={isFriendRequestPending} // 버튼 비활성화
            >
              <ThemedText style={styles.addButtonText}>
                {isFriendRequestPending ? "요청됨" : "추가"}
              </ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          // 검색 결과가 없을 경우
          searchAttempted && (
            <Text style={{ color: "#827F7F", marginTop: 50 }}>
              검색 결과가 없습니다.
            </Text>
          )
        )}
      </ThemedView>
    </>
  );
}
