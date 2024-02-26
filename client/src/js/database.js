import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database')
  // Create a connection to the jate database and version we want to use
  const jateDb = await openDB('jate', 1);
  // Create a new transaction, specify the database posting to, and specify the data privilege to be readwrite
  const tx = jateDb.transaction('jate','readwrite');
  // Open up the object store
  const store = tx.objectStore('jate');
  // Use put method to add the content
  const request = store.put({ text: content });
  // Confirm the data is added
  const result = await request;
  console.log('Successfully saved data to the database.', result);

} 

initdb();
