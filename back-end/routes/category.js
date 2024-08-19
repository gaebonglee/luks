const express = require("express");
const router = express.Router();
const { selectAllCategory } = require("../sql/category/selectAllCategory");
const { selectSubcategory } = require("../sql/category/selectSubcategory");
const { selectCategoryList } = require("../sql/category/selectCategoryList");

// 특정 카테고리의 모든 상품 가져오기
router.get("/:category", (req, res) => {
  const category = req.params.category;
  selectAllCategory(category, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Server error" });
    } else {
      res.json(results);
    }
  });
});

// 특정 카테고리와 서브카테고리의 모든 상품 가져오기
router.get("/:category/:subcategory", (req, res) => {
  const category = req.params.category;
  const subcategory = req.params.subcategory;
  selectSubcategory(category, subcategory, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Server error" });
    } else {
      res.json(results);
    }
  });
});

// 카테고리와 서브카테고리 목록 가져오기
router.get("/categories", (req, res) => {
  selectCategoryList((error, categories) => {
    if (error) {
      res.status(500).send({ error: "Server error" });
    } else {
      res.json(categories);
    }
  });
});

module.exports = router;
