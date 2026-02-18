/**
 * Notion to App Data Adapter
 * 
 * Transforms Notion blog data into the application's expected schema.
 * This adapter ensures compatibility with existing blog components.
 */

import { blogAuthors } from '../data/blogData';

/**
 * Adapt a single Notion post to the app's blog article format
 * @param {Object} notionPost - Post data from Notion API
 * @returns {Object} Adapted article object
 */
export function adaptNotionPost(notionPost) {
    // Ensure author exists in blogAuthors, fallback to 'rajesh'
    const authorKey = notionPost.author || 'rajesh';
    const author = blogAuthors[authorKey] || blogAuthors.rajesh;

    return {
        id: notionPost.id.replace(/-/g, '').substring(0, 8), // Convert to short ID
        slug: notionPost.slug,
        title: notionPost.title,
        excerpt: notionPost.excerpt || 'No excerpt available.',
        category: notionPost.category,
        author: authorKey,
        authorData: author, // Include full author object
        date: notionPost.date,
        readTime: notionPost.readTime,
        featured: notionPost.featured,
        image: notionPost.image || 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop',
        tags: notionPost.tags || [],
        content: notionPost.content, // Notion recordMap for rendering
        relatedArticles: notionPost.relatedArticles || [],

        // For backward compatibility
        tableOfContents: extractTableOfContents(notionPost.content),
    };
}

/**
 * Adapt multiple Notion posts
 * @param {Array} notionPosts - Array of Notion posts
 * @returns {Array} Array of adapted articles
 */
export function adaptNotionPosts(notionPosts) {
    return notionPosts.map(post => adaptNotionPost(post));
}

/**
 * Extract table of contents from Notion recordMap
 * This is a simplified version - you can enhance it based on Notion block structure
 * @param {Object} recordMap - Notion recordMap
 * @returns {Array} Table of contents items
 */
function extractTableOfContents(recordMap) {
    if (!recordMap || !recordMap.block) {
        return [];
    }

    const toc = [];
    const blocks = Object.values(recordMap.block);

    blocks.forEach((block) => {
        const value = block.value;
        if (!value || !value.properties) return;

        // Extract headings (h1, h2, h3)
        if (value.type === 'header' || value.type === 'sub_header' || value.type === 'sub_sub_header') {
            const title = value.properties.title?.[0]?.[0] || '';
            const id = value.id || '';

            if (title) {
                toc.push({
                    id: id,
                    title: title,
                    level: value.type === 'header' ? 1 : value.type === 'sub_header' ? 2 : 3,
                });
            }
        }
    });

    return toc;
}

/**
 * Get related articles from adapted posts
 * @param {Array} allPosts - All available posts
 * @param {Array} relatedSlugs - Array of related article slugs
 * @returns {Array} Related article objects
 */
export function getRelatedArticles(allPosts, relatedSlugs) {
    if (!relatedSlugs || relatedSlugs.length === 0) {
        return [];
    }

    return allPosts.filter(post => relatedSlugs.includes(post.slug));
}
