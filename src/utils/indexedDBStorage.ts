import { AuditSession, ChecklistItem } from '../types/audit';

const DB_NAME = 'DAS_Audit_IndexedDB';
const DB_VERSION = 1;
const SESSION_STORE = 'audit_session';
const ITEMS_STORE = 'workpaper_items';

/**
 * Initializes and opens the IndexedDB database.
 */
export function openAuditDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB tidak didukung pada browser ini.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Store for complete audit session
      if (!db.objectStoreNames.contains(SESSION_STORE)) {
        db.createObjectStore(SESSION_STORE, { keyPath: 'key' });
      }

      // Store for individual workpaper items
      if (!db.objectStoreNames.contains(ITEMS_STORE)) {
        const itemStore = db.createObjectStore(ITEMS_STORE, { keyPath: 'id' });
        itemStore.createIndex('stage', 'stage', { unique: false });
        itemStore.createIndex('code', 'code', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Gagal membuka IndexedDB.'));
    };
  });
}

/**
 * Saves the entire AuditSession to IndexedDB.
 */
export async function saveSessionToIndexedDB(session: AuditSession): Promise<void> {
  try {
    const db = await openAuditDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([SESSION_STORE, ITEMS_STORE], 'readwrite');
      const sessionStore = transaction.objectStore(SESSION_STORE);
      const itemsStore = transaction.objectStore(ITEMS_STORE);

      // Save main session object
      sessionStore.put({
        key: 'active_session',
        session,
        savedAt: new Date().toISOString(),
      });

      // Also index individual items for fast queries if needed
      if (session.items && Array.isArray(session.items)) {
        session.items.forEach(item => {
          itemsStore.put(item);
        });
      }

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(transaction.error || new Error('Gagal menyimpan sesi ke IndexedDB.'));
      };
    });
  } catch (err) {
    console.warn('Fallback ke localStorage karena IndexedDB error:', err);
  }
}

/**
 * Loads the active AuditSession from IndexedDB.
 */
export async function loadSessionFromIndexedDB(): Promise<AuditSession | null> {
  try {
    const db = await openAuditDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([SESSION_STORE], 'readonly');
      const sessionStore = transaction.objectStore(SESSION_STORE);
      const request = sessionStore.get('active_session');

      request.onsuccess = () => {
        if (request.result && request.result.session) {
          resolve(request.result.session as AuditSession);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        reject(request.error || new Error('Gagal membaca sesi dari IndexedDB.'));
      };
    });
  } catch (err) {
    console.warn('Gagal membaca dari IndexedDB, menggunakan memori/localStorage:', err);
    return null;
  }
}

/**
 * Saves or updates a single ChecklistItem directly to IndexedDB.
 */
export async function saveWorkPaperItemToIndexedDB(item: ChecklistItem): Promise<void> {
  try {
    const db = await openAuditDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([ITEMS_STORE], 'readwrite');
      const store = transaction.objectStore(ITEMS_STORE);
      store.put(item);

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(transaction.error || new Error('Gagal menyimpan item ke IndexedDB.'));
      };
    });
  } catch (err) {
    console.error('Error saving item to IndexedDB:', err);
  }
}

/**
 * Removes an item by ID from IndexedDB.
 */
export async function deleteWorkPaperItemFromIndexedDB(itemId: string): Promise<void> {
  try {
    const db = await openAuditDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([ITEMS_STORE], 'readwrite');
      const store = transaction.objectStore(ITEMS_STORE);
      store.delete(itemId);

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(transaction.error || new Error('Gagal menghapus item dari IndexedDB.'));
      };
    });
  } catch (err) {
    console.error('Error deleting item from IndexedDB:', err);
  }
}
