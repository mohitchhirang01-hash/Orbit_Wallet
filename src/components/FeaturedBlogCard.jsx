import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { blogAuthors } from '../data/blogData';

const FeaturedBlogCard = ({ article }) => {
    if (!article) return null;

    const author = blogAuthors[article.author];
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Link to={`/blog/${article.slug}`}>
            <div className="group w-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-72 lg:h-full overflow-hidden">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Category Tag on Image */}
                        <div className="absolute top-6 left-6">
                            <span className="px-4 py-2 rounded-full bg-[#22075e] text-white text-xs font-semibold uppercase tracking-wider shadow-lg">
                                Featured
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        {/* Category */}
                        <div className="mb-4">
                            <span className="px-3 py-1 rounded-full bg-[#22075e]/10 text-[#22075e] text-xs font-semibold uppercase tracking-wider">
                                {article.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-[#22075e] transition-colors duration-300 font-bricolage">
                            {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-slate-600 text-lg mb-6 leading-relaxed line-clamp-2">
                            {article.excerpt}
                        </p>

                        {/* Author & Meta */}
                        <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <img
                                    src={author.avatar}
                                    alt={author.name}
                                    className="w-10 h-10 rounded-full border-2 border-slate-200"
                                />
                                <div>
                                    <p className="font-semibold text-slate-700">{author.name}</p>
                                    <p className="text-xs text-slate-500">{author.role}</p>
                                </div>
                            </div>
                            <span className="text-slate-300">•</span>
                            <span>{formattedDate}</span>
                            <span className="text-slate-300">•</span>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime} min read</span>
                            </div>
                        </div>

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-[#22075e] font-semibold group-hover:gap-4 transition-all duration-300">
                            <span>Read More</span>
                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default FeaturedBlogCard;
