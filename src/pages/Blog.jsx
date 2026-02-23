import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogHero from '../components/BlogHero';
import FeaturedBlogCard from '../components/FeaturedBlogCard';
import BlogCard from '../components/BlogCard';
import OneNationCard from '../components/OneNationCard';
import Footer from '../components/Footer';
// NEW: Use blog provider instead of direct data import
import { getAllPosts, getFeaturedPost, getPostsByCategory, searchPosts } from '../lib/blogProvider';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [displayArticles, setDisplayArticles] = useState([]);
    const [featuredArticle, setFeaturedArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const gridRef = useRef(null);

    // Initial data load
    useEffect(() => {
        async function loadInitialData() {
            try {
                setLoading(true);
                const [posts, featured] = await Promise.all([
                    getAllPosts(),
                    getFeaturedPost()
                ]);
                setDisplayArticles(posts.filter(a => !a.featured));
                setFeaturedArticle(featured);
            } catch (error) {
                console.error('Error loading blog data:', error);
            } finally {
                setLoading(false);
            }
        }
        loadInitialData();
    }, []);

    useEffect(() => {
        async function filterArticles() {
            try {
                let filtered = [];

                if (searchQuery) {
                    const results = await searchPosts(searchQuery);
                    filtered = results.filter(a => !a.featured);
                } else if (activeCategory !== 'all') {
                    const results = await getPostsByCategory(activeCategory);
                    filtered = results.filter(a => !a.featured);
                } else {
                    const allPosts = await getAllPosts();
                    filtered = allPosts.filter(a => !a.featured);
                }

                setDisplayArticles(filtered);
            } catch (error) {
                console.error('Error filtering articles:', error);
            }
        }

        if (!loading) {
            filterArticles();
        }
    }, [activeCategory, searchQuery, loading]);

    useEffect(() => {
        // GSAP Animations
        const ctx = gsap.context(() => {
            // Featured card animation
            gsap.fromTo(
                '.featured-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.featured-card',
                        start: 'top 80%',
                    }
                }
            );

            // Blog grid staggered animation
            gsap.fromTo(
                '.blog-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 70%',
                    }
                }
            );
        });

        return () => ctx.revert();
    }, [displayArticles]);

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setSearchQuery('');
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            setActiveCategory('all');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC]">
            {/* Hero Section */}
            <BlogHero
                onSearch={handleSearch}
                onCategoryChange={handleCategoryChange}
                activeCategory={activeCategory}
            />

            {/* Loading State */}
            {loading && (
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#22075e] border-t-transparent"></div>
                        <p className="mt-4 text-slate-600">Loading articles...</p>
                    </div>
                </div>
            )}

            {/* Featured Article Section */}
            {!loading && featuredArticle && !searchQuery && (
                <div className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e]">Featured Article</h2>
                    </div>
                    <div className="featured-card">
                        <FeaturedBlogCard article={featuredArticle} />
                    </div>
                </div>
            )}

            {/* Blog Grid Section */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e]">
                        {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory === 'all' ? 'All Articles' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Articles`}
                    </h2>
                    <p className="text-slate-600 mt-2">{displayArticles.length} article{displayArticles.length !== 1 ? 's' : ''} found</p>
                </div>

                {displayArticles.length > 0 ? (
                    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayArticles.map((article) => (
                            <div key={article.id} className="blog-card">
                                <BlogCard article={article} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-slate-600">No articles found matching your criteria.</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setActiveCategory('all');
                            }}
                            className="mt-6 px-6 py-3 bg-[#22075e] hover:bg-[#1a0548] text-white rounded-full font-semibold transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>

            <OneNationCard />
            <Footer />
        </div>
    );
};

export default Blog;
