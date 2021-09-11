import authRoutes from "@modules/users/infra/http/routes/authRoutes"

import {Router} from "express"

const routes = Router()

routes.use("/auth", authRoutes)

export default routes