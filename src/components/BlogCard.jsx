import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { blogAuthors } from '../data/blogData';

const BlogCard = ({ article }) => {
    const author = blogAuthors[article.author];
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Link to={`/blog/${article.slug}`}>
            <div className="group h-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-[#22075e] text-white text-xs font-semibold uppercase tracking-wider shadow-md">
                            {article.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-[#22075e] transition-colors duration-300">
                        {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                        {article.excerpt}
                    </p>

                    {/* Author & Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className="w-8 h-8 rounded-full border-2 border-slate-200"
                            />
                            <span className="text-sm font-medium text-slate-700">{author.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime} min</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
