import startWatching from "./common/watcher";
import { Environment } from "./config/environment";
import { initDB } from "./database";
import Logger from "./helpers/logger";
import { IndexLoader } from "./loaders/IndexLoader";
import app from "./server";

async function init() {
  try {
    Logger.info("# Express server loaded");

    await initDB();

    app.listen(Environment.port, async () => {
      Logger.info(
        `Server running at server at http://${Environment.host}:${Environment.port}`
      );
    });


    // Start the MongoDB watcher after the database is initialized
    await startWatching();



  } catch (error) {
    console.log(error);
  }
}
init();
