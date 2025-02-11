import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";

export default function LoginScreen() {
  const { width, height } = Dimensions.get("window");
  const router = useRouter(); // 페이지 이동을 위한 useRouter 사용
  const [username, setUsername] = useState(""); // 아이디 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리
  const [passwordChk, setPasswordChk] = useState(""); // 비밀번호확인 상태 관리
  const [email, setEmail] = useState(""); // 이메일 상태 관리
  const [confirmNum, setConfirmNum] = useState(""); // 인정번호 상태 관리
  const [nickname, setNickName] = useState(""); // 닉네임 상태 관리

  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null); // 아이디 중복 여부
  const [isConfirm, setIsConfirm] = useState<boolean | null>(null); // 아이디 중복 여부
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 아이디 중복 여부

  const idCheck = () => {
    console.log("아이디 중복체크");
    const randomValue = Math.random() < 0.5 ? 0 : 1;
    if (randomValue == 0) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  const emailConfirm = () => {
    console.log("이메일 인증 체크");
    setIsConfirm(true);
  };
  const cofirmNumCheck = () => {
    console.log("인증번호 확인 체크");
    const randomValue = Math.random() < 0.5 ? 0 : 1;
    if (randomValue == 0) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };
  const join = () => {
    console.log(width);
    console.log(height);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: width * 0.045,
      backgroundColor: "#DCD7CB",
    },
    defaultExplain: {
      width: width * 0.35,
      height: height * 0.08,
      fontSize: width * 0.06,
      marginLeft: width * 0.07,
      marginTop: height * 0.05,
      marginBottom: height * 0.07,
      fontWeight: "500",
    },
    largeMb: {
      marginBottom: height * 0.017,
    },
    smallMb: {
      marginBottom: height * 0.006,
    },
    inputGrp: {
      paddingHorizontal: width * 0.01,
      backgroundColor: "#DCD7CB",
      width: "100%",
    },
    inputBlock: {
      height: height * 0.048,
      borderRadius: 3,
      paddingHorizontal: width * 0.027,
      backgroundColor: "#EFEFEF",
      flex: 1,
    },
    buttonBlock: {
      width: width * 0.15,
      backgroundColor: "#EF7417",
      marginLeft: width * 0.03,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    input: {
      width: "100%",
      height: height * 0.048,
      borderRadius: 3,
      paddingHorizontal: width * 0.027,
      backgroundColor: "#EFEFEF",
    },
    twoBlock: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    title: {
      fontSize: width * 0.054,
      marginBottom: width * 0.027,
    },
    checkText: {
      color: "#F1F1F1",
      fontSize: width * 0.045,
      fontWeight: "bold",
    },
    joinButton: {
      width: "100%",
      height: height * 0.048,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
      marginTop: height * 0.079,
    },
    joinButtonText: {
      color: "#F1F1F1",
      fontSize: width * 0.045,
      fontWeight: "bold",
    },
    okId: {
      fontSize: width * 0.029,
      color: "#299f0f",
    },
    duplId: {
      fontSize: width * 0.029,
      color: "#d61212",
    },
    isText: {
      display: "flex",
      flexDirection: "column",
    },
  });
  return (
    <>
      <ThemedView style={styles.container}>
        {/*기본 정보*/}
        <View style={{ width: width }}>
          <ThemedText type="title" style={styles.defaultExplain}>
            기본 정보를 입력하세요.
          </ThemedText>
        </View>
        <ThemedView style={styles.inputGrp}>
          {/* 아이디 입력창 */}
          <View style={[styles.isText, styles.largeMb]}>
            <View style={[styles.twoBlock]}>
              <TextInput
                style={styles.inputBlock}
                placeholder="아이디"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#827F7F"
              />
              <TouchableOpacity style={styles.buttonBlock} onPress={idCheck}>
                <ThemedText style={styles.checkText}>확인</ThemedText>
              </TouchableOpacity>
            </View>
            {isDuplicate !== null && (
              <ThemedText style={isDuplicate ? styles.duplId : styles.okId}>
                {isDuplicate
                  ? "사용 중인 아이디입니다."
                  : "사용 가능한 아이디입니다."}
              </ThemedText>
            )}
          </View>
          {/* 비밀번호 입력창 */}
          <TextInput
            style={[styles.input, styles.smallMb]}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#827F7F"
          />
          <TextInput
            style={[styles.input, styles.largeMb]}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={passwordChk}
            onChangeText={setPasswordChk}
            placeholderTextColor="#827F7F"
          />

          {/* 이메일 입력창 */}
          <View style={[styles.isText, styles.smallMb]}>
            <View style={[styles.twoBlock]}>
              <TextInput
                style={styles.inputBlock}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#827F7F"
              />
              <TouchableOpacity
                style={styles.buttonBlock}
                onPress={emailConfirm}
              >
                <ThemedText style={styles.checkText}>인증</ThemedText>
              </TouchableOpacity>
            </View>
            {isConfirm !== null && (
              <ThemedText style={styles.okId}>
                인증 메일이 발송되었습니다.
              </ThemedText>
            )}
          </View>
          {/* 인증번호 입력창 */}
          <View style={[styles.isText, styles.largeMb]}>
            <View style={styles.twoBlock}>
              <TextInput
                style={styles.inputBlock}
                placeholder="인증번호"
                value={confirmNum}
                onChangeText={setConfirmNum}
                placeholderTextColor="#827F7F"
              />
              <TouchableOpacity
                style={styles.buttonBlock}
                onPress={cofirmNumCheck}
              >
                <ThemedText style={styles.checkText}>확인</ThemedText>
              </TouchableOpacity>
            </View>
            {isCorrect !== null && (
              <ThemedText style={isCorrect ? styles.duplId : styles.okId}>
                {isCorrect ? "인증번호를 확인해주세요." : "인증되었습니다."}
              </ThemedText>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            secureTextEntry
            value={nickname}
            onChangeText={setNickName}
            placeholderTextColor="#827F7F"
          />
        </ThemedView>
        {/*회원가입 버튼*/}
        <TouchableOpacity style={styles.joinButton} onPress={join}>
          <ThemedText style={styles.joinButtonText}>회원가입</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}
