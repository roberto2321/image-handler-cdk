import { Callback, Context } from "aws-lambda";
import { db } from "./core/config/db";
import { logger } from "./core/logger";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(event: any, context: Context, callback: Callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const conn = await db.connect();
    const response = await conn.runMigrations({
      transaction: "none",
    });
    await db.disconnectAll();

    callback(null, response);
  } catch (e) {
    logger.info("--failed to migrate", e);
    callback(new Error());
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(event: any, context: Context, callback: Callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const conn = await db.connect();
    const response = await conn.undoLastMigration({
      transaction: "none",
    });
    await db.disconnectAll();

    callback(null, response);
  } catch (e) {
    logger.info("--failed to rollback", e);
    callback(new Error());
  }
}
