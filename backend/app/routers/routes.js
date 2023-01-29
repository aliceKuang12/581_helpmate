import * as user from "../controllers/userController.js";
import app from "../../server.js"

app.post("/users", user.createUser);

app.get("/users", user.findAll);