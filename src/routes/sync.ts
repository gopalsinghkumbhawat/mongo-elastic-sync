import { Router, Request, Response} from 'express';
import { IndexLoader } from '../loaders/IndexLoader';

const route = Router();


// Manual sync endpoint
route.get('/sync', async (req: Request, res: Response) => {
    try {
        const loader = new IndexLoader();
        await loader.loadAndRun();
        res.status(200).json({ message: `Collection synced successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Manual sync endpoint
route.post('/sync-coll', async (req: any, res: any) => {
    const { collection } = req.body;

    if (!collection) {
        return res.status(400).json({ error: 'Collection name is required' });
    }

    try {
        const loader = new IndexLoader();
        await loader.runSpecificIndexer(collection);
        res.status(200).json({ message: `Collection ${collection} synced successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default route;