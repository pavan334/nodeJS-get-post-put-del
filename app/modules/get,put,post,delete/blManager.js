

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "todoApplication.db");

let db = null;

export default class BLManager {
    static DBconnect = async () =>{
        console.log('DB trying to connect,' + new Date() )
          try {
            db = await open({
              filename: dbPath,
              driver: sqlite3.Database,
            });
            console.log('DB connected')
          } catch (error) {
            console.log(`DB Error: ${error.message}`);
            process.exit(1);
          }
      }

      async createTable (res) {
        // Cron Job Business logic-
        const creatingTable = `
                      CREATE TABLE todo(
                          id Number,
                          todo text,
                          priority text,
                          status text
                      )`;
        const result = await db.run(creatingTable);
        console.log("Table created",result);
      }

      async addData (req,res){
        const { id, todo, priority, status } = req.body;
        const postTodoQuery = `
        INSERT INTO
          todo (id, todo, priority, status)
        VALUES
          (${id}, '${todo}', '${priority}', '${status}');`;
        await db.run(postTodoQuery);
        console.log("Todo Successfully Added");
      };

      async getData (req,res){
        let data = null;

        const getTodoQuery = `
            SELECT
              *
            FROM
              todo;`;

        data = await db.all(getTodoQuery);
        console.log(data);
      };

      async updateData (req,res){
        const { todoId } = req.params;
        const {
          todo,
          priority,
          status
        } = req.body;

        const updateTodoQuery = `
          UPDATE
            todo
          SET
            todo='${todo}',
            priority='${priority}',
            status='${status}'
          WHERE
            id = ${todoId};`;

        await db.run(updateTodoQuery);
        console.log(`Updated`);
      };

      async deleteData (req,res) {
        const { todoId } = req.params;
        const deleteTodoQuery = `
        DELETE FROM
          todo
        WHERE
          id = ${todoId};`;

        await db.run(deleteTodoQuery);
        console.log("Todo Deleted");
      };


    }