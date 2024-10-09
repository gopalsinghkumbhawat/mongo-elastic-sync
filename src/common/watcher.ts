import { Environment } from './../config/environment';
import { ChangeStreamWatcher } from '../services/ChangeStreamWatcher';
import UserIndexer from '../services/indexers/UserIndexer';
import { delay } from './utils';
import Logger from '../helpers/logger';

// Initialize and start watching MongoDB collections
export default async function startWatching() {

  Logger.info("# ChangeStream watchers initializing....")

  await delay(Environment.database.elastic.delay);
  const changeStreamWatcher = new ChangeStreamWatcher();

  // Watch 'users' collection and sync with Elasticsearch
  await changeStreamWatcher.watchCollection("users", UserIndexer);

  Logger.info("# ChangeStream watchers initialized and running...")
}
