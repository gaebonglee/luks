const connection = require("../../config/db");
const bcrypt = require("bcrypt");

const saveMemberInfo = (memberData, callback) => {
  const {
    member_id,
    member_pw,
    member_name,
    member_roles,
    email,
    phonenumber,
    postcode,
    basic_address,
    detail_address,
  } = memberData;

  if (!member_pw) {
    console.error("Password is missing");
    return callback(new Error("Password is missing"), null);
  }

  // 비밀번호 해싱
  bcrypt.hash(member_pw, 10, (err, hashedPw) => {
    if (err) {
      console.error("Error hashing password: ", err);
      return callback(err, null);
    }

    connection.query(
      "INSERT INTO member (member_id, member_pw, member_name, member_roles, email, phonenumber, postcode, basic_address, detail_address) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        member_id,
        hashedPw, // 해시된 비밀번호 저장
        member_name,
        member_roles,
        email,
        phonenumber,
        postcode,
        basic_address,
        detail_address,
      ],
      (error, results) => {
        if (error) {
          console.error("Error inserting member data: ", error);
          callback(error, null);
        } else {
          callback(null, results);
        }
      }
    );
  });
};

module.exports = { saveMemberInfo };
