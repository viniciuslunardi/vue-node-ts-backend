import mongoose, { Connection } from 'mongoose';

export default class Database {
  private _connection!: Connection; // definite assignment assertion

  public async init(): Promise<Connection> {
    const {
      MONGO_DATABASE,
      MONGO_HOST,
      MONGO_PASSWORD,
      MONGO_PORT,
      MONGO_USER,
    } = process.env;
    
    const db_uri =
      process.env.TESTING === 'true'
        ? `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
        : `mongodb+srv://<${MONGO_USER}>:<${MONGO_PASSWORD}>@node-ts.bo1hv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

    try {
      console.log(
        `connecting mongo on: \n
					MONGO_DATABASE: ${MONGO_DATABASE}, \n
					MONGO_HOST: ${MONGO_HOST},  \n
					MONGO_PASSWORD: ${MONGO_PASSWORD}, \n
					MONGO_PORT: ${MONGO_PORT}, \n
					MONGO_USER: ${MONGO_USER}`
      );

      await mongoose.connect(db_uri, {
        user: MONGO_USER,
        pass: MONGO_PASSWORD,
        authSource: 'admin',
      });
    } catch (error) {
      console.error(`error connecting to database: ${error}`);
      process.exit(0);
    }

    return (this._connection = mongoose.connection);
  }

  get connection(): Connection {
    return this._connection;
  }

  close(): void {
    this._connection.close().then(() => console.log('connection closed'));
  }
}
