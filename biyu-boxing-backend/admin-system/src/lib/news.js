import { getCollection } from './mongodb.js';
import { ObjectId } from 'mongodb';

// Create URL-friendly slug from title
export function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get all news articles
export async function getAllNews(filter = {}) {
  const collection = await getCollection('news');
  const query = { ...filter };
  const news = await collection
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
  return news;
}

// Get published news
export async function getPublishedNews(limit = 10) {
  const collection = await getCollection('news');
  const news = await collection
    .find({ published: true })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .toArray();
  return news;
}

// Get single news article by ID
export async function getNewsById(id) {
  const collection = await getCollection('news');
  const news = await collection.findOne({ _id: new ObjectId(id) });
  return news;
}

// Get single news article by slug
export async function getNewsBySlug(slug) {
  const collection = await getCollection('news');
  const news = await collection.findOne({ slug });
  return news;
}

// Create new news article
export async function createNews(data) {
  const collection = await getCollection('news');
  
  // Generate unique slug
  let slug = createSlug(data.title);
  let slugCounter = 0;
  let uniqueSlug = slug;
  
  // Check if slug exists and make it unique
  while (await collection.findOne({ slug: uniqueSlug })) {
    slugCounter++;
    uniqueSlug = `${slug}-${slugCounter}`;
  }
  
  const now = new Date();
  const newsItem = {
    ...data,
    slug: uniqueSlug,
    published: data.published || false,
    featured: data.featured || false,
    tags: data.tags || [],
    createdAt: now,
    updatedAt: now,
    publishedAt: data.published ? now : null
  };
  
  const result = await collection.insertOne(newsItem);
  return { ...newsItem, _id: result.insertedId };
}

// Update news article
export async function updateNews(id, data) {
  const collection = await getCollection('news');
  const currentNews = await getNewsById(id);
  
  if (!currentNews) {
    throw new Error('News article not found');
  }
  
  // Handle slug update if title changed
  let updateData = { ...data };
  if (data.title && data.title !== currentNews.title) {
    let slug = createSlug(data.title);
    let slugCounter = 0;
    let uniqueSlug = slug;
    
    // Check if slug exists (excluding current article)
    while (await collection.findOne({ 
      slug: uniqueSlug, 
      _id: { $ne: new ObjectId(id) } 
    })) {
      slugCounter++;
      uniqueSlug = `${slug}-${slugCounter}`;
    }
    
    updateData.slug = uniqueSlug;
  }
  
  // Handle publish status change
  if (data.published && !currentNews.published) {
    updateData.publishedAt = new Date();
  } else if (data.published === false) {
    updateData.publishedAt = null;
  }
  
  updateData.updatedAt = new Date();
  
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  
  return result.modifiedCount > 0;
}

// Delete news article
export async function deleteNews(id) {
  const collection = await getCollection('news');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

// Toggle publish status
export async function togglePublishStatus(id) {
  const news = await getNewsById(id);
  if (!news) {
    throw new Error('News article not found');
  }
  
  return await updateNews(id, { 
    published: !news.published 
  });
}

// Get news categories (from existing news)
export async function getNewsCategories() {
  const collection = await getCollection('news');
  const categories = await collection.distinct('category');
  return categories.filter(cat => cat); // Remove null/empty values
}

// Get news tags (from existing news)
export async function getNewsTags() {
  const collection = await getCollection('news');
  const tags = await collection.distinct('tags');
  return tags.filter(tag => tag);
}

// Search news
export async function searchNews(searchTerm) {
  const collection = await getCollection('news');
  const regex = new RegExp(searchTerm, 'i');
  
  const news = await collection
    .find({
      $or: [
        { title: regex },
        { content: regex },
        { excerpt: regex },
        { category: regex },
        { tags: regex }
      ]
    })
    .sort({ createdAt: -1 })
    .toArray();
  
  return news;
}
