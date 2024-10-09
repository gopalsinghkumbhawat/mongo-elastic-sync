import { getESInstance } from "../database/elastic-connector";

export abstract class BaseIndexer {
    elasticClient = null;
    
    constructor(){
        this.elasticClient =  getESInstance();
    }

    public abstract bulkIndex(data: any[]): Promise<void>;
    public abstract runIndexing(): Promise<void>;
    public abstract indexDocument(id: string, document: any): Promise<void>;
    public abstract deleteDocument(id: string): Promise<void>;
}