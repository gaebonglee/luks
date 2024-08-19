// 회원가입 폼 데이터 타입 정의
export interface JoinForm {
  memberId: string;
  memberPw: string;
  confirmPw: string;
  name: string;
  email: string;
  phonenumber: string;
  postcode: string;
  basic_address: string;
  detail_address: string;
  termsAccepted: boolean; // 이용약관 동의
  privacyPolicyAccepted: boolean; // 개인정보 약관 동의
}
