import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Clock, User, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogAuthors } from '../data/blogData';
// NEW: Use blog provider
import { getPostBySlug, getRelatedPosts } from '../lib/blogProvider';
import NotionContent from '../components/NotionContent';
import BlogCard from '../components/BlogCard';
import OneNationCard from '../components/OneNationCard';
import Footer from '../components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlogArticle = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [readingProgress, setReadingProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const progressBarRef = useRef(null);
    const contentRef = useRef(null);

    // Load article data
    useEffect(() => {
        async function loadArticle() {
            try {
                setLoading(true);
                const post = await getPostBySlug(slug);
                setArticle(post);

                if (post && post.relatedArticles) {
                    const related = await getRelatedPosts(post.relatedArticles);
                    setRelatedArticles(related);
                }
            } catch (error) {
                console.error('Error loading article:', error);
            } finally {
                setLoading(false);
            }
        }
        loadArticle();
    }, [slug]);

    useEffect(() => {
        // Scroll to top when article changes
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Reading progress bar
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            setReadingProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [slug]);

    useEffect(() => {
        // GSAP Animations
        gsap.fromTo(
            '.article-header',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );

        gsap.fromTo(
            '.article-content',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 30, duration: 0.8, delay: 0.3, ease: 'power2.out' }
        );

        // Stagger related articles
        gsap.fromTo(
            '.related-article-card',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.related-articles-section',
                    start: 'top 80%',
                },
            }
        );
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#22075e] border-t-transparent"></div>
                    <p className="mt-4 text-slate-600">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 font-bricolage">Article Not Found</h1>
                    <p className="text-slate-600">The article you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const author = blogAuthors[article.author] || blogAuthors.rajesh;
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-[#F8F9FC]">
            {/* Reading Progress Bar */}
            <div
                ref={progressBarRef}
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#22075e] to-[#1a0548] z-50 transition-all duration-150"
                style={{ width: `${readingProgress}%` }}
            />

            {/* Article Header */}
            <div className="article-header max-w-4xl mx-auto px-6 pt-32 pb-12">
                {/* Category */}
                <div className="mb-6">
                    <span className="px-4 py-2 rounded-full bg-[#22075e] text-white text-sm font-semibold uppercase tracking-wider">
                        {article.category}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight font-bricolage">
                    {article.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
                    <div className="flex items-center gap-3">
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-12 h-12 rounded-full border-2 border-[#22075e]/20"
                        />
                        <div>
                            <p className="font-semibold text-slate-900">{author.name}</p>
                            <p className="text-sm text-slate-500">{author.role}</p>
                        </div>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime} min read</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8" />
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Article Content */}
                    <article
                        ref={contentRef}
                        className="article-content lg:col-span-8 prose prose-lg prose-slate max-w-none"
                        style={{
                            lineHeight: '1.8',
                        }}
                    >
                        {/* Conditional rendering: Notion recordMap OR Markdown string */}
                        {typeof article.content === 'string' ? (
                            // Legacy markdown rendering
                            <ReactMarkdown
                                components={{
                                    h1: ({ node, ...props }) => (
                                        <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-6 font-bricolage" {...props} />
                                    ),
                                    h2: ({ node, ...props }) => (
                                        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 font-bricolage" {...props} />
                                    ),
                                    h3: ({ node, ...props }) => (
                                        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3 font-bricolage" {...props} />
                                    ),
                                    p: ({ node, ...props }) => (
                                        <p className="text-slate-700 mb-6 leading-relaxed" {...props} />
                                    ),
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote
                                            className="border-l-4 border-[#22075e] pl-6 py-2 my-6 bg-[#22075e]/5 rounded-r-lg italic text-slate-700"
                                            {...props}
                                        />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul className="list-disc list-inside mb-6 space-y-2 text-slate-700" {...props} />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol className="list-decimal list-inside mb-6 space-y-2 text-slate-700" {...props} />
                                    ),
                                    strong: ({ node, ...props }) => (
                                        <strong className="font-bold text-[#22075e]" {...props} />
                                    ),
                                    code: ({ node, inline, ...props }) =>
                                        inline ? (
                                            <code className="px-2 py-1 bg-slate-100 text-[#22075e] rounded text-sm font-mono" {...props} />
                                        ) : (
                                            <code className="block p-4 bg-slate-900 text-green-400 rounded-lg text-sm font-mono overflow-x-auto" {...props} />
                                        ),
                                    hr: ({ node, ...props }) => (
                                        <hr className="my-12 border-slate-200" {...props} />
                                    ),
                                }}
                            >
                                {article.content}
                            </ReactMarkdown>
                        ) : (
                            // Notion recordMap rendering
                            <NotionContent recordMap={article.content} />
                        )}
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            {/* Share Buttons */}
                            <div className="bg-white rounded-2xl p-6 shadow-md">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 font-bricolage">Share Article</h3>
                                <div className="flex gap-3">
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                        <Twitter className="w-4 h-4" />
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors">
                                        <Facebook className="w-4 h-4" />
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors">
                                        <Linkedin className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Table of Contents */}
                            {article.tableOfContents && article.tableOfContents.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-md">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 font-bricolage">Table of Contents</h3>
                                    <ul className="space-y-2">
                                        {article.tableOfContents.map((item, index) => (
                                            <li key={index}>
                                                <a
                                                    href={`#${item.id}`}
                                                    className="text-slate-600 hover:text-[#22075e] transition-colors text-sm leading-relaxed block py-1 hover:translate-x-1 transform transition-transform"
                                                >
                                                    {item.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>

            {/* Related Articles */}
            {relatedArticles && relatedArticles.length > 0 && (
                <div className="related-articles-section max-w-7xl mx-auto px-6 pb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 font-bricolage">Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedArticles.map((relatedArticle) => (
                            <div key={relatedArticle.id} className="related-article-card">
                                <BlogCard article={relatedArticle} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <OneNationCard />
            <Footer />
        </div>
    );
};

export default BlogArticle;
