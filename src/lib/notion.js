/**
 * Notion Blog Data Fetching Layer
 * 
 * This module handles all interactions with the Notion API for blog content.
 * Uses dummy keys for development - replace with real keys in production.
 */

// ============================================
// TODO: Add your real Notion credentials in .env file
// 1. Create a Notion integration: https://www.notion.so/my-integrations
// 2. Share your database with the integration
// 3. Add VITE_NOTION_API_KEY and VITE_NOTION_DATABASE_ID to your .env file
// WARNING: This client-side implementation exposes your API Key. Use a backend proxy in production.
// ============================================

const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;
if (!NOTION_API_KEY) {
    console.warn('Security Warning: VITE_NOTION_API_KEY is missing. Notion content will not load.');
}
const NOTION_DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

// Initialize Notion clients (singleton pattern)
let notionClient = null;
let notionAPI = null;
let Client = null;
let NotionAPI = null;

/**
 * Lazy load Notion modules (only when actually needed)
 */
async function loadNotionModules() {
    if (!Client || !NotionAPI) {
        const [notionModule, notionXModule] = await Promise.all([
            import('@notionhq/client'),
            import('react-notion-x')
        ]);
        Client = notionModule.Client;
        NotionAPI = notionXModule.NotionAPI;
    }
}

/**
 * Get or create Notion client instance
 */
async function getNotionClient() {
    await loadNotionModules();
    if (!notionClient) {
        notionClient = new Client({
            auth: NOTION_API_KEY,
        });
    }
    return notionClient;
}

/**
 * Get or create NotionAPI instance (for rendering)
 */
async function getNotionAPI() {
    await loadNotionModules();
    if (!notionAPI) {
        notionAPI = new NotionAPI();
    }
    return notionAPI;
}

/**
 * Fetch all published blog posts from Notion
 * @returns {Promise<Array>} Array of blog post objects
 */
export async function getAllPosts() {
    try {
        const notion = getNotionClient();

        const response = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        });

        return response.results.map(page => extractPostMetadata(page));
    } catch (error) {
        console.error('Error fetching posts from Notion:', error);
        // Graceful fallback - return empty array
        return [];
    }
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - The post slug
 * @returns {Promise<Object|null>} Post object with content or null
 */
export async function getPostBySlug(slug) {
    try {
        const notion = getNotionClient();
        const notionAPIClient = getNotionAPI();

        // Query database for the post with matching slug
        const response = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
            filter: {
                and: [
                    {
                        property: 'Published',
                        checkbox: {
                            equals: true,
                        },
                    },
                    {
                        property: 'Slug',
                        rich_text: {
                            equals: slug,
                        },
                    },
                ],
            },
        });

        if (response.results.length === 0) {
            return null;
        }

        const page = response.results[0];

        // Fetch page content (blocks) using react-notion-x API
        const recordMap = await notionAPIClient.getPage(page.id);

        return {
            ...extractPostMetadata(page),
            content: recordMap,
        };
    } catch (error) {
        console.error(`Error fetching post with slug "${slug}":`, error);
        return null;
    }
}

/**
 * Get posts filtered by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Filtered posts
 */
export async function getPostsByCategory(category) {
    try {
        const allPosts = await getAllPosts();

        if (category === 'all') {
            return allPosts;
        }

        return allPosts.filter(post => post.category === category);
    } catch (error) {
        console.error(`Error fetching posts by category "${category}":`, error);
        return [];
    }
}

/**
 * Search posts by query (title, excerpt, or tags)
 * @param {string} query - Search query
 * @returns {Promise<Array>} Matching posts
 */
export async function searchPosts(query) {
    try {
        const allPosts = await getAllPosts();
        const lowerQuery = query.toLowerCase();

        return allPosts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.excerpt.toLowerCase().includes(lowerQuery) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );
    } catch (error) {
        console.error(`Error searching posts with query "${query}":`, error);
        return [];
    }
}

/**
 * Get the featured blog post
 * @returns {Promise<Object|null>} Featured post or null
 */
export async function getFeaturedPost() {
    try {
        const allPosts = await getAllPosts();
        return allPosts.find(post => post.featured) || null;
    } catch (error) {
        console.error('Error fetching featured post:', error);
        return null;
    }
}

/**
 * Get related posts by slugs
 * @param {Array<string>} slugs - Array of post slugs
 * @returns {Promise<Array>} Related posts
 */
export async function getRelatedPosts(slugs) {
    try {
        if (!slugs || slugs.length === 0) {
            return [];
        }

        const allPosts = await getAllPosts();
        return allPosts.filter(post => slugs.includes(post.slug));
    } catch (error) {
        console.error('Error fetching related posts:', error);
        return [];
    }
}

/**
 * Extract metadata from a Notion page object
 * @param {Object} page - Notion page object
 * @returns {Object} Cleaned post metadata
 */
function extractPostMetadata(page) {
    const properties = page.properties;

    return {
        id: page.id,
        slug: getPropertyValue(properties.Slug, 'rich_text'),
        title: getPropertyValue(properties.Title, 'title'),
        excerpt: getPropertyValue(properties.Excerpt, 'rich_text'),
        category: getPropertyValue(properties.Category, 'select')?.toLowerCase() || 'infrastructure',
        author: getPropertyValue(properties.Author, 'rich_text') || 'rajesh',
        date: getPropertyValue(properties.Date, 'date'),
        readTime: getPropertyValue(properties['Read Time'], 'number') || 5,
        featured: getPropertyValue(properties.Featured, 'checkbox') || false,
        image: getPropertyValue(properties['Cover Image'], 'files'),
        tags: getPropertyValue(properties.Tags, 'multi_select') || [],
        relatedArticles: parseRelatedArticles(getPropertyValue(properties['Related Articles'], 'rich_text')),
    };
}

/**
 * Helper to extract value from Notion property
 */
function getPropertyValue(property, type) {
    if (!property) return null;

    switch (type) {
        case 'title':
            return property.title?.[0]?.plain_text || '';
        case 'rich_text':
            return property.rich_text?.[0]?.plain_text || '';
        case 'select':
            return property.select?.name || null;
        case 'multi_select':
            return property.multi_select?.map(item => item.name) || [];
        case 'checkbox':
            return property.checkbox || false;
        case 'number':
            return property.number || null;
        case 'date':
            return property.date?.start || null;
        case 'files':
            return property.files?.[0]?.file?.url || property.files?.[0]?.external?.url || null;
        default:
            return null;
    }
}

/**
 * Parse comma-separated related article slugs
 */
function parseRelatedArticles(text) {
    if (!text) return [];
    return text.split(',').map(slug => slug.trim()).filter(Boolean);
}
