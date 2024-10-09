import { BaseIndexer } from "../baseIndexer";
import { getMongoDBInstance } from "../../database/mongo-connect";
import { getESInstance } from "../../database/elastic-connector";

import Logger from "../../helpers/logger";

export default class UserIndexer extends BaseIndexer {
  
  public async runIndexing(): Promise<void> {
    const health = await this.elasticClient.cluster.health({});
    const db = await getMongoDBInstance();
    const users = await db.collection("users").find().toArray();
    for (const user of users) {
      await this.indexDocument(String(user._id), user);
    }
  }

  public async bulkIndex(data: any[]) {
    const body = data.flatMap((doc) => [{ index: { _index: "users" } }, doc]);
    
    const { body: bulkResponse } = await this.elasticClient.bulk({
      refresh: true,
      body,
    });
    if (bulkResponse) {
      console.error("Bulk indexing errors:", bulkResponse);
    } else {
      console.log("Bulk indexing succeeded");
    }
  }

  public async indexDocument(id: string, document: any): Promise<void> {
    try {
      await this.elasticClient.index({
        index: "users",
        id: id.toString(),
        body: {
          name: document.name,
        },
      });
      Logger.info(`User ${id} indexed successfully`);
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteDocument(id: string): Promise<void> {
    await this.elasticClient.delete({
      index: "users",
      id: id.toString(),
    });
    Logger.info(`User ${id} deleted from index`);
  }
}
