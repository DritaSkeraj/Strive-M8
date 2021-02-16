const express = require("express")
const BookSchema = require("./schema")
const { adminOnly, basic } = require("../authTools")

const booksRouter = express.Router()

booksRouter.get("/", basic, adminOnly, async (req, res, next) => {
  try {
    const books = await BookSchema.find(req.query)
    res.send(books)
  } catch (error) {
    next(error)
  }
})

booksRouter.get("/:id", async (req, res, next) => {})

booksRouter.post("/", async (req, res, next) => {})

booksRouter.put("/:id", async (req, res, next) => {})

booksRouter.delete("/:id", async (req, res, next) => {})

module.exports = booksRouter
