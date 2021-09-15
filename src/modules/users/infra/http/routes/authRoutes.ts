import { Router } from "express"

import CreateUserController from "../controllers/CreateUserController"
import CurrentUserController from "../controllers/CurrentUserController"
import ForgetPasswordController from "../controllers/ForgetPasswordController"
import LoginUserController from "../controllers/LoginUserController"
import ResetPasswordController from "../controllers/ResetPasswordController"
import IsAuthenticated from "../middlewares/IsAuthenticated"
import { requireAuth } from "../middlewares/RequireAuth"
const authRoutes = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()
const currentUserController = new CurrentUserController()
const isAuthenticated = new IsAuthenticated()
const resetPasswordController = new ResetPasswordController()
const forgetPasswordController = new ForgetPasswordController()

authRoutes.post(
    '/create',
    createUserController.create
)

authRoutes.post(
    '/login',
    loginUserController.login
)

authRoutes.post(
    '/o_auth/google',
    loginUserController.googleLogin
)

authRoutes.post(
    '/o_auth/facebook',
    loginUserController.facebookLogin
)


authRoutes.get(
    '/currentuser',
    isAuthenticated.currentUser,
    requireAuth,
    currentUserController.user
)

authRoutes.post(
    '/logout',
    currentUserController.logout
)

authRoutes.post(
    '/reset-password/:userId/:token',
    resetPasswordController.reset
)

authRoutes.post(
    '/forget-password',
    forgetPasswordController.sendForgetPasswordEmail
)


export default authRoutes;