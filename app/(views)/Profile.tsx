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
import * as ImagePicker from "expo-image-picker";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState("");
  const selectImg = async () => {
    //권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("권한 필요", "사진첩 접근을 허용해야 합니다.");
      return;
    }

    // 사진 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //이미지 서버저장
    }
  };

  const { width, height } = Dimensions.get("window");

  const userId = useSelector((state: RootState) => state.auth.userId);
  const userNickname = useSelector(
    (state: RootState) => state.auth.userNickname,
  );
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);

  const updateNickName = () => {
    router.push("/Nickname");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: width * 0.05,
      backgroundColor: "#DCD7CB",
    },
    logo: {
      marginTop: width * 0.01,
      width: width * 0.32,
      height: width * 0.32,
      marginBottom: width * 0.045,
      resizeMode: "contain", // 원본 비율 유지
    },
    profileImg: {
      marginTop: width * 0.01,
      width: width * 0.32,
      height: width * 0.32,
      marginBottom: width * 0.045,
      borderRadius: 100,
    },
    camera: {
      width: width * 0.06,
      height: width * 0.06,
      backgroundColor: "#ffc953",
      padding: width * 0.04,
      borderRadius: 50,
      position: "absolute",
      right: width * 0.02,
      bottom: width * 0.045,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: width * 0.045,
      height: width * 0.045,
    },
    inputView: {
      width: width * 0.9,
      height: width * 0.1,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
      marginBottom: width * 0.03,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputKey: { color: "#2b2b2b" },
    inputValue: { color: "#827F7F" },
    nickName: {
      position: "absolute",
      right: width * 0.08,
    },
    input: {
      width: width * 0.9,
      height: height * 0.05,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
      marginBottom: height * 0.015,
    },
    loginButton: {
      width: width * 0.9,
      height: width * 0.1,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    loginButtonText: {
      color: "#F1F1F1",
      fontSize: width * 0.04,
    },
  });

  return (
    <>
      <GeneralAppBar title={"프로필"} />
      <ThemedView style={styles.container}>
        <View>
          {/* 로고 */}
          <TouchableOpacity onPress={selectImg}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImg} />
            ) : (
              <Image
                source={require("@/assets/images/gyoolTalk.png")}
                style={styles.logo}
              />
            )}
            <View style={styles.camera}>
              <Image
                style={styles.icon}
                source={require("@/assets/images/icon/camera.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* 닉네임  확인*/}
        <TouchableOpacity onPress={updateNickName}>
          <View style={styles.inputView}>
            <Text style={styles.inputKey}>닉네임</Text>
            <Text style={[styles.inputValue, styles.nickName]}>
              {userNickname}
            </Text>
            <Image source={require("@/assets/images/icon/right-arrow.png")} />
          </View>
        </TouchableOpacity>
        {/* 아이디  확인*/}
        <View style={styles.inputView}>
          <Text style={styles.inputKey}>아이디</Text>
          <Text style={styles.inputValue}>{userId}</Text>
        </View>
        {/* 이메일  확인*/}
        <View style={styles.inputView}>
          <Text style={styles.inputKey}>이메일</Text>
          <Text style={styles.inputValue}>{userEmail}</Text>
        </View>
      </ThemedView>
    </>
  );
}
