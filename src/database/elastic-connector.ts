import { Client, HttpConnection } from '@elastic/elasticsearch'
import { Environment } from '../config/environment'
import Logger from '../helpers/logger'

let esClient: Client | null = null

export const connectES = async () => {
  if (esClient) {
    return
  }

  try {
    esClient = new Client({
      node: Environment.database.elastic.url,
      Connection: HttpConnection
    })

    return esClient
    Logger.info("Connected to Elasticsearch", { actor: 'Elasticsearch' });
  } catch (error) {
    Logger.info("Error connecting to Elasticsearch", { actor: 'Elasticsearch', error });
  }
}

export const disconnectES = async () => {
  if (!esClient) {
    return
  }

  try {
    await esClient.close()
    Logger.info("Disconnected from Elasticsearch", { actor: 'Elasticsearch' });
    // Server.log.info({ actor: 'Elasticsearch' }, 'Disconnected from Elasticsearch')
    esClient = null
  } catch (error) {
    Logger.info("Error disconnecting from Elasticsearch", { actor: 'Elasticsearch', error })
  }
}

export const getESInstance = () => {
  if (!esClient) {
    throw new Error('Elasticsearch client is not connected')
  }
  return esClient
}