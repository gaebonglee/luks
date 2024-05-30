const bcrypt = require("bcrypt");
const db = require("../../config/db");

const saveMemberInfo = async (memberData, callback) => {
  try {
    const hashedPassword = await bcrypt.hash(memberData.member_pw, 10);
    const query = `
      INSERT INTO member (
        member_id, member_pw, member_name, member_roles, email, phonenumber, postcode, basic_address, detail_address, register_date
      )
      VALUES (?, ?, ?, 'member', ?, ?, ?, ?, ?, NOW())
    `;
    const values = [
      memberData.member_id,
      hashedPassword,
      memberData.member_name,
      memberData.email,
      memberData.phonenumber,
      memberData.postcode,
      memberData.basic_address,
      memberData.detail_address,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  } catch (err) {
    callback(err);
  }
};

module.exports = saveMemberInfo;
