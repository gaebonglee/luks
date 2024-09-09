// Pages\Join.tsx에서 사용할 전체 폼 데이터 타입 정의
export interface JoinForm {
  memberId: string;
  memberPw: string;
  memberPwConfirm: string;
  memberName: string;
  memberEmail: string;
  memberMobileNum: string;
  postcode: string;
  basicAddress: string;
  detailAddress: string;
  allAgree: boolean;
  termsAgree: boolean;
  privacyAgree: boolean;
}

export interface JoinValidation {
  idValid: boolean;
  pwValid: boolean;
  pwMatch: boolean;
  emailValid: boolean;
  isDuplicate: boolean;
}

export {};
