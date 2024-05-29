import React from "react";

const JoinAddress = ({ memberAddress, handleAddressChange }) => {
  return (
    <>
      <tr>
        <th scope="row">주소</th>
        <td className="input_td">
          <input
            id="member_address"
            name="member_address"
            type="text"
            value={memberAddress}
            onChange={handleAddressChange}
          />
        </td>
      </tr>
    </>
  );
};

export default JoinAddress;
