import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.get = promisify(this.client.get).bind(this.client);
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  isAlive() {
    //this.client.on('connect', () => this.client.connected);
    return this.client.connected;
  }

  async get(key) {
    let value;
    try {
      value = await this.get(key);
    } catch (err) {
      console.log(err);
    }
    return value;
  }

  async set(key, value, duration) {
    this.client.set(key, value, 'EX', duration);
  }

  async del(key) {
    this.client.del(key);
  }
}
const redisClient = new RedisClient();
export default redisClient;
