import SQLite, { ResultSet } from 'react-native-sqlite-storage';
import { Place } from '../store/reducers/places';

const db = SQLite.openDatabase(
  { name: 'places.db', location: 'default' },
  () => console.log('db created successfully'),
  (error) => console.log(error),
);

export const init = () => {
  const promise = new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const insertPlace = (
  title: Place['title'],
  imageUri: Place['imageUri'],
  address: string,
  lat: number,
  lng: number,
) => {
  const promise: Promise<ResultSet> = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise: Promise<ResultSet> = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};
