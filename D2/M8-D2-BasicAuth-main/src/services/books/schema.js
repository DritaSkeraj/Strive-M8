const { Schema, model } = require("mongoose")

const BookSchema = new Schema(
  {
    _id: {
      type: String,
      validate: {
        validator: async value => {
          const asinExists = await BooksModel.findOne({ _id: value })
          if (asinExists) {
            throw new Error("ASIN already in database")
          }
        },
      },
    },
    title: String,
    author: String,
    description: String,
    year: Number,
    genre: Array,
    price: Number,
  },
  { _id: false }
)

module.exports = model("Book", BookSchema)
