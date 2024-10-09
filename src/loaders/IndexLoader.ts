import fs from 'fs';
import path from 'path';
import Logger from '../helpers/logger';


export class IndexLoader {
    public async loadAndRun() {
        const indexersPath = path.join(__dirname, '../services/indexers');
        const files = fs.readdirSync(indexersPath);

        for (const file of files) {
            const indexerModule = await import(path.join(indexersPath, file));
            const indexerInstance = new indexerModule.default();
            await indexerInstance.runIndexing();
        }
        Logger.info("# All files loaded")
    }

    public async runSpecificIndexer(collection: string) {
        const indexersPath = path.join(__dirname, '../services/indexers');
        const filePath = path.join(indexersPath, `${collection}Indexer.ts`);
        
        if (fs.existsSync(filePath)) {
            const indexerModule = await import(filePath);
            const indexerInstance = new indexerModule.default();
            await indexerInstance.runIndexing();
        } else {
            throw new Error(`Indexer for collection ${collection} not found.`);
        }
    }
}