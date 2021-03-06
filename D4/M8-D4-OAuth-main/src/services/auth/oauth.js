const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const UserModel = require("../users/schema")
const { authenticate } = require("./")

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/users/googleRedirect",
    },
    async (request, accessToken, refreshToken, profile, next) => {
      const newUser = {
        googleId: profile.id,
        name: profile.name.givenName,
        surname: profile.name.familyName,
        email: profile.emails[0].value,
        role: "User",
        refreshTokens: [],
      }

      try {
        const user = await UserModel.findOne({ googleId: profile.id })
        console.log(user)
        if (user) {
          const tokens = await authenticate(user)
          next(null, { user, tokens })
          console.log('the user is there')
        } else {
          const createdUser = new UserModel(newUser)
          await createdUser.save()
          const tokens = await authenticate(createdUser)
          console.log('no user around')
          next(null, { user: createdUser, refreshTokens })
        }
      } catch (error) {
        next(error)
      }
    }
  )
)

passport.serializeUser(function (user, next) {
  next(null, user)
})
