import api from "@/redux/apis/api";

export interface UploadImg {
  uesrId: String;
  profileImgUri: String;
}

export const uploadProfileimgApi = async (
  uri: string,
  userId: string,
): Promise<String> => {
  try {
    // FormData 객체를 생성하여 데이터를 추가
    const formData = new FormData();
    formData.append("uri", uri); // 이미지 URI
    formData.append("userId", userId); // 사용자 ID

    // FormData로 POST 요청 보내기
    const response = await api.post("/active/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type을 multipart/form-data로 설정
      },
    });
    return response.data; // 백엔드에서 true/false 반환
  } catch (error) {
    console.error("업로드 오류:", error);
    return "fail to upload"; // 실패 시 false 반환
  }
};
