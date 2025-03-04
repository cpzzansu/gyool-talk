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
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/reducer";
import GeneralAppBar from "@/components/GeneralAppBar";
import { updateNickName } from "@/redux/slices/auth/authThunk";

export default function updateScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { width } = Dimensions.get("window");
  const maxLength = 16;
  const userNickname = useSelector(
    (state: RootState) => state.auth.userNickname,
  );
  const [nickname, setUserNickname] = useState(userNickname);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const update = async () => {
    console.log(nickname, "변경 닉네임");

    const result = await dispatch(
      updateNickName({
        user: {
          userId: userId,
          userNickName: nickname,
        },
      }),
    );
    alert("닉네임이 변경 됐습니다.");
    router.push("/Profile");
  };
  const handleNicknameChange = (text: string) => {
    if (text.length <= maxLength) {
      setUserNickname(text);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: width * 0.05,
      backgroundColor: "#DCD7CB",
    },
    input: {
      width: width * 0.9, // ✅ width, height를 여기서 사용
      height: width * 0.1,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
    },
    maxLength: {
      marginBottom: width * 0.03,
      textAlign: "right",
      color: "#827F7F",
    },
    updateButton: {
      width: width * 0.9,
      height: width * 0.1,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    updateButtonText: {
      color: "#F1F1F1",
      fontSize: width * 0.04,
    },
  });

  return (
    <>
      <GeneralAppBar title={"닉네임 변경"} />
      <ThemedView style={styles.container}>
        {/* 이메일  확인*/}
        <View>
          <TextInput
            style={styles.input}
            placeholderTextColor="#827F7F"
            placeholder={userNickname}
            value={nickname}
            onChangeText={handleNicknameChange}
            maxLength={maxLength}
          />
          <Text style={styles.maxLength}>
            {nickname.length}/{maxLength} {/* 현재 길이 / 최대 길이 표시 */}
          </Text>
          <TouchableOpacity style={styles.updateButton} onPress={update}>
            <ThemedText style={styles.updateButtonText}>변경</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </>
  );
}
