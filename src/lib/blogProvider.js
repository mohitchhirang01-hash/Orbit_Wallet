/**
 * Blog Provider Abstraction Layer
 * 
 * This abstraction allows for easy switching between different CMS providers
 * (Notion, Contentful, Sanity, etc.) without changing the UI code.
 * 
 * Currently uses Notion as the provider, but can be extended to support others.
 */

import * as notionAPI from './notion';
import { adaptNotionPost, adaptNotionPosts } from './notionAdapter';

/**
 * Base Blog Provider Interface
 * All CMS providers should implement these methods
 */
class BlogProvider {
    async getAllPosts() {
        throw new Error('getAllPosts() must be implemented');
    }

    async getPostBySlug(slug) {
        throw new Error('getPostBySlug() must be implemented');
    }

    async getPostsByCategory(category) {
        throw new Error('getPostsByCategory() must be implemented');
    }

    async searchPosts(query) {
        throw new Error('searchPosts() must be implemented');
    }

    async getFeaturedPost() {
        throw new Error('getFeaturedPost() must be implemented');
    }

    async getRelatedPosts(slugs) {
        throw new Error('getRelatedPosts() must be implemented');
    }
}

/**
 * Notion Blog Provider Implementation
 */
class NotionBlogProvider extends BlogProvider {
    async getAllPosts() {
        const posts = await notionAPI.getAllPosts();
        return adaptNotionPosts(posts);
    }

    async getPostBySlug(slug) {
        const post = await notionAPI.getPostBySlug(slug);
        return post ? adaptNotionPost(post) : null;
    }

    async getPostsByCategory(category) {
        const posts = await notionAPI.getPostsByCategory(category);
        return adaptNotionPosts(posts);
    }

    async searchPosts(query) {
        const posts = await notionAPI.searchPosts(query);
        return adaptNotionPosts(posts);
    }

    async getFeaturedPost() {
        const post = await notionAPI.getFeaturedPost();
        return post ? adaptNotionPost(post) : null;
    }

    async getRelatedPosts(slugs) {
        const posts = await notionAPI.getRelatedPosts(slugs);
        return adaptNotionPosts(posts);
    }
}

/**
 * Fallback Provider (uses legacy blogData.js)
 * Used when Notion API is unavailable or for development
 */
class LegacyBlogProvider extends BlogProvider {
    constructor() {
        super();
        // Lazy load to avoid circular dependencies
        this.blogData = null;
    }

    async loadBlogData() {
        if (!this.blogData) {
            const module = await import('../data/blogData');
            this.blogData = module;
        }
        return this.blogData;
    }

    async getAllPosts() {
        const { blogArticles } = await this.loadBlogData();
        return blogArticles;
    }

    async getPostBySlug(slug) {
        const { getArticleBySlug } = await this.loadBlogData();
        return getArticleBySlug(slug);
    }

    async getPostsByCategory(category) {
        const { getArticlesByCategory } = await this.loadBlogData();
        return getArticlesByCategory(category);
    }

    async searchPosts(query) {
        const { searchArticles } = await this.loadBlogData();
        return searchArticles(query);
    }

    async getFeaturedPost() {
        const { getFeaturedArticle } = await this.loadBlogData();
        return getFeaturedArticle();
    }

    async getRelatedPosts(articleId) {
        const { getRelatedArticles } = await this.loadBlogData();
        return getRelatedArticles(articleId);
    }
}

// ============================================
// Provider Configuration
// ============================================
// TODO: Once Notion is configured with real keys, set USE_NOTION to true
// For now, it will use the legacy provider (blogData.js)
// ============================================

const USE_NOTION = false; // Set to true when Notion API keys are configured

/**
 * Active blog provider instance
 * Switch between Notion and Legacy based on configuration
 */
export const blogProvider = USE_NOTION
    ? new NotionBlogProvider()
    : new LegacyBlogProvider();

/**
 * Convenience methods that use the active provider
 * These are the primary exports that components should use
 */

export async function getAllPosts() {
    return await blogProvider.getAllPosts();
}

export async function getPostBySlug(slug) {
    return await blogProvider.getPostBySlug(slug);
}

export async function getPostsByCategory(category) {
    return await blogProvider.getPostsByCategory(category);
}

export async function searchPosts(query) {
    return await blogProvider.searchPosts(query);
}

export async function getFeaturedPost() {
    return await blogProvider.getFeaturedPost();
}

export async function getRelatedPosts(slugsOrId) {
    return await blogProvider.getRelatedPosts(slugsOrId);
}
