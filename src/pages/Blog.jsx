import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogHero from '../components/BlogHero';
import FeaturedBlogCard from '../components/FeaturedBlogCard';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import { blogArticles, getFeaturedArticle, getArticlesByCategory, searchArticles } from '../data/blogData';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [displayArticles, setDisplayArticles] = useState(blogArticles.filter(a => !a.featured));
    const featuredArticle = getFeaturedArticle();
    const gridRef = useRef(null);

    useEffect(() => {
        // Filter articles based on category and search
        let filtered = blogArticles.filter(a => !a.featured);

        if (searchQuery) {
            filtered = searchArticles(searchQuery).filter(a => !a.featured);
        } else if (activeCategory !== 'all') {
            filtered = getArticlesByCategory(activeCategory).filter(a => !a.featured);
        }

        setDisplayArticles(filtered);
    }, [activeCategory, searchQuery]);

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

            {/* Featured Article Section */}
            {featuredArticle && !searchQuery && (
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

            <Footer />
        </div>
    );
};

export default Blog;
