import express from "express"
import { isAuthed } from "../middlewares/isAuthed.js"
import { isAdmin } from "../middlewares/role.middleware.js"
import { cancelAgreement, createAgreement, getAllAgreements, getUserAgreemented, handleAgreement } from "../controllers/agreement.controller.js"

const router = express.Router()

router.post("/create-agreement/:apartmentId" , isAuthed , createAgreement )
router.delete("/cancel-agreement/:apartmentId" , isAuthed , cancelAgreement)
router.get("/get-user-agreement" , isAuthed , getUserAgreemented)
router.get("/agreements" , isAuthed ,isAdmin , getAllAgreements )
router.post("/handle-agreement/:agreementId" , isAuthed ,isAdmin , handleAgreement )



export default router