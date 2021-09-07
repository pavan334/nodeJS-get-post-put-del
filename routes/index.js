/**
 * Created by AyushK on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";
import TestModule from "../app/modules/testModule";
import {stringConstants} from "../app/common/constants";
import BLManager from "../app/modules/get,put,post,delete/blManager";

module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
    app.post("/createTable", new BLManager().createTable);
    app.get("/getTodo", new BLManager().getData);
    app.post("/addTodo", new BLManager().addData);
    app.put("/updateTodo/:todoId/", new BLManager().updateData);
    app.delete("/removeTodo/:todoId/", new BLManager().deleteData);
};
