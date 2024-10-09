import { connectMongoDB } from "./mongo-connect";
import { connectES } from "./elastic-connector";
export async function initDB() {
  await connectMongoDB();
  await connectES();
}
