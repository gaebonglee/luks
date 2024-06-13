const db = require("../../config/db");

const updateMemberInfo = (memberData, callback) => {
  const disableForeignKeyChecks = "SET FOREIGN_KEY_CHECKS = 0;";
  const enableForeignKeyChecks = "SET FOREIGN_KEY_CHECKS = 1;";

  const query = `
    UPDATE member
    SET member_id = ?, member_pw = ?, member_name = ?, email = ?, phonenumber = ?, postcode = ?, basic_address = ?, detail_address = ?
    WHERE member_id = ?
  `;
  const values = [
    memberData.new_member_id, // 수정된 아이디
    memberData.member_pw,
    memberData.member_name,
    memberData.email,
    memberData.phonenumber,
    memberData.postcode,
    memberData.basic_address,
    memberData.detail_address,
    memberData.current_member_id, // 수정 전 아이디
  ];

  // 수정된 값 확인
  console.log("With values: ", values);

  db.beginTransaction((err) => {
    if (err) {
      return callback(err);
    }

    db.query(disableForeignKeyChecks, (err) => {
      if (err) {
        return db.rollback(() => {
          callback(err);
        });
      }

      db.query(query, values, (err, result) => {
        if (err) {
          return db.rollback(() => {
            callback(err);
          });
        }

        db.query(enableForeignKeyChecks, (err) => {
          if (err) {
            return db.rollback(() => {
              callback(err);
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                callback(err);
              });
            }
            callback(null, result);
          });
        });
      });
    });
  });
};

module.exports = updateMemberInfo;
