var loginRouter = express.Router();

loginRouter.all("/login",loginControl.login);
loginRouter.get("/logout",loginControl.logout);

module.exports = loginRouter;