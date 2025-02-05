import { Button, StyleSheet, Image, TouchableOpacity, TextInput, View, Text, Alert } from "react-native";
import { Stack, useRouter} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import { useState } from "react";

export default function LoginScreen() {
    const router = useRouter(); // 페이지 이동을 위한 useRouter 사용
    const [username, setUsername] = useState(""); // 아이디 상태 관리
    const [password, setPassword] = useState(""); // 비밀번호 상태 관리

    // const handleLogin = () => {
    //     router.replace("/(tabs)"); // 로그인 후 탭 네비게이션으로 이동
    // };
    // const handleGoBack = () => {
    //     router.replace("/Login");  // 이전 화면으로 이동
    // };

    const handlePress = () => {
        Alert.alert('이미지 버튼 클릭됨');
    };


    return (
        <>
            <ThemedView style={styles.container}>
                {/* 로고 */}
                <Image source={require("@/assets/images/gyoolTalk.png")} style={styles.logo} />
                <ThemedText type="title" style={{fontSize: 24, marginBottom: 40}}>톡</ThemedText>

                {/* 아이디 입력창 */}
                <TextInput
                    style={styles.input}
                    placeholder="아이디"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#827F7F"
                />

                {/* 비밀번호 입력창 */}
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#827F7F"
                />

                {/* 로그인 버튼 */}
                <TouchableOpacity style={styles.loginButton}
                    //onPress={handleLogin}
                >
                    <ThemedText style={styles.loginButtonText}>로그인</ThemedText>
                </TouchableOpacity>

                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.line} />
                </View>

                <TouchableOpacity onPress={handlePress}>
                    <Image
                        source={require("@/assets/images/naver_login.png")}  // 이미지 경로
                        style={styles.loginImage}
                    />
                </TouchableOpacity>
            </ThemedView>
        </>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        padding: 20,
        backgroundColor: '#DCD7CB',
    },
    logo: {
        marginTop: 110,
        width: 44,
        height: 48,
        marginBottom: 10
    },
    title:{
        fontSize: 24,
        marginBottom: 10
    },
    input: {
        width: "98%",
        height: 46,
        borderRadius: 3,
        paddingHorizontal: 10,
        backgroundColor: "#EFEFEF",
        marginBottom: 15,
    },
    loginButton: {
        width: "98%",
        height: 45,
        backgroundColor: "#EF7417",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
    },
    loginButtonText: {
        color: "#F1F1F1",
        fontSize: 20,
        fontWeight: "bold",
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
        justifyContent: 'center',
    },
    line: {
        height: 0.8,
        flex: 1,
        backgroundColor: '#B1B1B1',
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#414040',
    },
    loginImage: {
        width: 196,  // 원하는 크기
        height: 41,
        borderRadius: 6,
        borderColor: '#858886',
        borderWidth: 1,

    },
});



