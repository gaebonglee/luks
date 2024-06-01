const express = require("express");
const router = express.Router();
const { saveWishList } = require("../sql/wishlist/saveWishList");
const { removeWishList } = require("../sql/wishlist/removeWishList");
const {
  getWishListItemStatus,
} = require("../sql/wishlist/getWishListItemStatus");
const { getWishList } = require("../sql/wishlist/getWishList");

// 좋아요 추가
router.post("/add", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { product_id } = req.body;
  const member_id = req.session.user.id; // 세션에서 사용자 ID 가져오기

  console.log(
    `Adding to wishlist: member_id=${member_id}, product_id=${product_id}`
  ); // 디버깅 로그

  saveWishList(member_id, product_id, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res
      .status(200)
      .json({ success: true, message: "상품이 위시리스트에 추가되었습니다." });
  });
});

// 좋아요 취소
router.post("/remove", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { product_id } = req.body;
  const member_id = req.session.user.id; // 세션에서 사용자 ID 가져오기

  console.log(
    `Removing from wishlist: member_id=${member_id}, product_id=${product_id}`
  ); // 디버깅 로그

  removeWishList(member_id, product_id, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.status(200).json({
      success: true,
      message: "상품이 위시리스트에서 삭제되었습니다.",
    });
  });
});

// 특정 상품에 대한 위시리스트 상태 조회
router.get("/item-status/:product_id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const member_id = req.session.user.id; // 세션에서 사용자 ID 가져오기
  const { product_id } = req.params;

  getWishListItemStatus(member_id, product_id, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    if (results.length === 0) {
      return res
        .status(200)
        .json({ success: true, liked_at: null, unliked_at: null });
    }
    res.status(200).json({
      success: true,
      liked_at: results[0].liked_at,
      unliked_at: results[0].unliked_at,
    });
  });
});

// 좋아요 목록 조회(components\mypage\mywish\MyWishList.jsx)
router.get("/mywish", (req, res) => {
  if (!req.session.user) {
    console.log("Unauthorized access attempt to /mywish");
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const member_id = req.session.user.id;
  console.log(`Fetching wishlist for member_id: ${member_id}`);

  getWishList(member_id, (error, results) => {
    if (error) {
      console.log("Database query error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.status(200).json({ success: true, products: results });
  });
});

module.exports = router;
