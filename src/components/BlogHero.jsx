import React, { useState } from 'react';
import { Search } from 'lucide-react';

const BlogHero = ({ onSearch, onCategoryChange, activeCategory }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', name: 'All', color: '#22075e' },
        { id: 'interoperability', name: 'Interoperability', color: '#22075e' },
        { id: 'transit', name: 'Public Transit', color: '#00D1FF' },
        { id: 'payments', name: 'Payments', color: '#7C3AED' },
        { id: 'identity', name: 'Identity', color: '#EC4899' },
        { id: 'infrastructure', name: 'Infrastructure', color: '#8B5CF6' },
    ];

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <div className="relative w-full py-24 px-6 overflow-hidden">
            {/* Animated Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Radial gradient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#22075e]/10 via-transparent to-transparent blur-3xl animate-pulse"
                    style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-bricolage mb-6 text-[#22075e] tracking-tight">
                        Orbit Insights
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                        Deep dives into interoperability, fintech infrastructure, public systems & the future of unified payments.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#22075e] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full pl-12 pr-6 py-4 rounded-full bg-white border-2 border-slate-200 focus:border-[#22075e] focus:outline-none text-slate-900 placeholder-slate-400 shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${activeCategory === category.id
                                ? 'bg-gradient-to-r from-[#22075e] to-[#1a0548] text-white shadow-lg shadow-[#22075e]/30'
                                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#22075e]/50 hover:shadow-md'
                                }`}
                            style={{
                                ...(activeCategory === category.id && {
                                    background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`,
                                }),
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogHero;
