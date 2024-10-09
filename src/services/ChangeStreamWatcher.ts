import { getMongoDBInstance, connectMongoDB } from '../database/mongo-connect';
import Logger from '../helpers/logger';
import { BaseIndexer } from './baseIndexer';

export class ChangeStreamWatcher {
    public async watchCollection(collectionName: string, IndexerClass: { new(): BaseIndexer }  ) {
        const db = await getMongoDBInstance();
        const collection = db.collection(collectionName);
        console.log("collection", collectionName)
        const changeStream = collection.watch();

        changeStream.on('change', async (change) => {
            try {
                const indexerInstance = new IndexerClass();

                if (change.operationType === 'insert' || change.operationType === 'update') {
                    const documentId = change.documentKey._id;
                    const document = await collection.findOne({ _id: documentId });
                    await indexerInstance.indexDocument(String(document._id), document);
                    Logger.info(`Document ${documentId} synced to Elasticsearch.`);
                } else if (change.operationType === 'delete') {
                    await indexerInstance.deleteDocument(String(change.documentKey._id));
                    Logger.info(`Document ${change.documentKey._id} deleted from Elasticsearch.`);
                }
            } catch (error) {
                Logger.error(`Error syncing change: ${error}`);
            }
        });

        Logger.info(`# ChangeStream watcher running for collection: ${collectionName}`);
    }
}
