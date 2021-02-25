const express = require("express")
const UserModel = require("./schema")
const { authenticate, refresh } = require("../auth")
const { authorize } = require("../auth/middlewares")

const usersRouter = express.Router()

usersRouter.get("/", authorize, async (req, res, next) => {
  try {
    console.log(req.user)
    const users = await UserModel.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/me", async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)
    const { _id } = await newUser.save()

    res.status(201).send(_id)
  } catch (error) {
    next(error)
  }
})

usersRouter.put("/me", async (req, res, next) => {
  try {
    const updates = Object.keys(req.body)
    updates.forEach(update => (req.user[update] = req.body[update]))
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/me", async (req, res, next) => {
  try {
    await req.user.deleteOne(res.send("Deleted"))
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/login", async (req, res, next) => {
  try {
    //Check credentials
    const { email, password } = req.body
    const user = await UserModel.findByCredentials(email, password)
    console.log("user ", user)
    //Generate token
    const { accessToken, refreshToken } = await authenticate(user)

    //Send back tokens
    res.send({ accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/refreshToken", async (req, res, next) => {
  try {
    // Grab the refresh token

    const oldRefreshToken = req.body.refreshToken

    // Verify the token

    // If it's ok generate new access token and new refresh token

    const { accessToken, refreshToken } = await refresh(oldRefreshToken)

    // send them back

    res.send({ accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
