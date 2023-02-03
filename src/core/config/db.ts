import "reflect-metadata";
import {
  Connection,
  ConnectionManager,
  getConnectionManager,
  ConnectionOptions,
  createConnection,
} from "typeorm";
import { logger } from "../logger";
import { CONFIG } from "./config";
import { TestResult } from "../entities";
import { Init1634984735947 } from "../migrations/1634984735947-Init";

class Database {
  private synchronize: boolean;

  public connection: Connection;

  private connectionManager: ConnectionManager;

  constructor() {
    this.synchronize = false;
    this.connectionManager = getConnectionManager();
  }

  public connect = async (): Promise<Connection> => {
    try {
      const CONNECTION_NAME = "default";

      let connection: Connection;

      if (this.connectionManager.has(CONNECTION_NAME)) {
        logger.info("---using existing connection ...");
        connection = await this.connectionManager.get(CONNECTION_NAME);

        if (!connection.isConnected) {
          await connection.connect();
        }
      } else {
        logger.info("~~~creating connection ...");

        const dbOptions = CONFIG.stage === 'prod' ? CONFIG.db_prod: CONFIG.db;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const connectionOptions: ConnectionOptions = {
          ...dbOptions,
          name: "default",
          entities: [TestResult],
          migrations: [
            Init1634984735947,
          ],
          synchronize: this.synchronize,
          logging: "all",
        };

        connection = await createConnection(connectionOptions);
        logger.info("connected ---");
      }

      this.connection = connection;
      return connection;
    } catch (err) {
      logger.error("connection failed ---", err);
      return Promise.reject(err);
    }
  };

  public disconnectAll = async (): Promise<boolean> => {
    if (this.connection) {
      await this.connection.close();
      logger.info("connection closed ---");
      return true;
    }
    logger.info("connection not exist ---");
    return false;
  };
}

export const db = new Database();
