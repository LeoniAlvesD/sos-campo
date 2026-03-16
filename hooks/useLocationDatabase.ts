import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'locations.db';

let db: SQLite.SQLiteDatabase | null = null;

const initDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return db;
};

const createTable = async () => {
  const database = await initDatabase();
  if (database) {
    await database.execAsync(
      'CREATE TABLE IF NOT EXISTS locations (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'name TEXT NOT NULL, ' +
      'latitude REAL NOT NULL, ' +
      'longitude REAL NOT NULL);'
    );
  }
};

const insertLocation = async (name: string, latitude: number, longitude: number) => {
  const database = await initDatabase();
  if (database) {
    await database.runAsync(
      'INSERT INTO locations (name, latitude, longitude) VALUES (?, ?, ?)',
      [name, latitude, longitude]
    );
  }
};

const getLocations = async (): Promise<any[]> => {
  const database = await initDatabase();
  if (database) {
    const result = await database.getAllAsync<any>('SELECT * FROM locations');
    return result || [];
  }
  return [];
};

const deleteLocation = async (id: number) => {
  const database = await initDatabase();
  if (database) {
    await database.runAsync('DELETE FROM locations WHERE id = ?', [id]);
  }
};

export { createTable, insertLocation, getLocations, deleteLocation };
