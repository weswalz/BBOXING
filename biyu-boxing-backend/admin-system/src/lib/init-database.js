import { getCollection, connectToDatabase } from './mongodb.js';

export async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Initialize news collection with indexes
    const newsCollection = await getCollection('news');
    await newsCollection.createIndex({ "published": 1, "createdAt": -1 });
    await newsCollection.createIndex({ "slug": 1 }, { unique: true });
    await newsCollection.createIndex({ "category": 1 });
    await newsCollection.createIndex({ "featured": 1 });
    
    // Initialize media collection
    const mediaCollection = await getCollection('media');
    await mediaCollection.createIndex({ "createdAt": -1 });
    await mediaCollection.createIndex({ "mimeType": 1 });
    
    // Initialize pages collection
    const pagesCollection = await getCollection('pages');
    await pagesCollection.createIndex({ "pageId": 1 }, { unique: true });
    
    // Initialize settings collection
    const settingsCollection = await getCollection('settings');
    await settingsCollection.createIndex({ "category": 1 }, { unique: true });
    
    // Insert default settings if they don't exist
    const existingSettings = await settingsCollection.findOne({ category: 'general' });
    if (!existingSettings) {
      await settingsCollection.insertOne({
        category: 'general',
        settings: {
          siteName: {
            type: 'text',
            value: 'BiYu Boxing',
            label: 'Site Name'
          },
          siteTagline: {
            type: 'text',
            value: 'Professional Boxing Training',
            label: 'Site Tagline'
          }
        },
        updatedAt: new Date(),
        updatedBy: 'system'
      });
    }
    
    console.log('✅ Database initialized successfully');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return { success: false, error: error.message };
  }
}
