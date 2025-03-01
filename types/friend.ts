export interface Friend {
  // 친구 식별자
  id: number;
  // 친구 id
  userId: string;
  // 친구 별명 (내가 설정한)
  friendNickName: string;
  // 친구 프로필 Url
  userProfileImg: string;
  // 친구가 설정한 별명
  friendUserNickName: string;
}
