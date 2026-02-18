import React from 'react';
import { NotionRenderer } from 'react-notion-x';
// FIX: Correct CSS import path for react-notion-x
// import 'react-notion-x/src/styles.css'; // WRONG - this causes errors

/**
 * Notion Content Renderer
 * 
 * Renders Notion blocks with custom styling to match the app's design system.
 * Used in BlogArticle.jsx to display blog post content.
 */

const NotionContent = ({ recordMap }) => {
    if (!recordMap) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-600">Content not available</p>
            </div>
        );
    }

    return (
        <div className="notion-content-wrapper">
            <NotionRenderer
                recordMap={recordMap}
                fullPage={false}
                darkMode={false}
                disableHeader={true}
                // Custom components for better control
                components={{
                    // You can override specific block types here if needed
                    // For example:
                    // Code: CustomCodeBlock,
                    // Image: CustomImage,
                }}
                // Map page URLs (useful for internal links)
                mapPageUrl={(pageId) => `/blog/${pageId}`}
            />

            <style jsx global>{`
                /* Override react-notion-x styles to match app theme */
                .notion-content-wrapper .notion {
                    font-family: inherit;
                }

                .notion-content-wrapper .notion-page {
                    padding: 0;
                    width: 100%;
                }

                .notion-content-wrapper .notion-text {
                    color: #334155;
                    line-height: 1.8;
                    font-size: 1.125rem;
                }

                .notion-content-wrapper .notion-h1,
                .notion-content-wrapper .notion-h2,
                .notion-content-wrapper .notion-h3 {
                    color: #0f172a;
                    font-weight: 700;
                }

                .notion-content-wrapper .notion-h1 {
                    font-size: 2rem;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                }

                .notion-content-wrapper .notion-h2 {
                    font-size: 1.5rem;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                }

                .notion-content-wrapper .notion-h3 {
                    font-size: 1.25rem;
                    margin-top: 2rem;
                    margin-bottom: 0.75rem;
                }

                .notion-content-wrapper .notion-code {
                    background: #1e293b;
                    color: #4ade80;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    overflow-x: auto;
                }

                .notion-content-wrapper .notion-inline-code {
                    background: #f1f5f9;
                    color: #22075e;
                    padding: 0.125rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                }

                .notion-content-wrapper .notion-quote {
                    border-left: 4px solid #22075e;
                    padding-left: 1.5rem;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    background: rgba(34, 7, 94, 0.05);
                    border-radius: 0 0.5rem 0.5rem 0;
                    font-style: italic;
                    color: #475569;
                }

                .notion-content-wrapper .notion-list {
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .notion-content-wrapper .notion-list-disc {
                    list-style-type: disc;
                }

                .notion-content-wrapper .notion-list-numbered {
                    list-style-type: decimal;
                }

                .notion-content-wrapper .notion-asset-wrapper {
                    margin: 2rem 0;
                }

                .notion-content-wrapper .notion-image {
                    border-radius: 0.75rem;
                    overflow: hidden;
                }

                .notion-content-wrapper .notion-callout {
                    display: flex;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    margin: 1.5rem 0;
                }

                .notion-content-wrapper .notion-hr {
                    margin: 3rem 0;
                    border: none;
                    border-top: 1px solid #e2e8f0;
                }

                .notion-content-wrapper strong {
                    font-weight: 700;
                    color: #22075e;
                }

                .notion-content-wrapper a {
                    color: #22075e;
                    text-decoration: underline;
                    transition: color 0.2s;
                }

                .notion-content-wrapper a:hover {
                    color: #1a0548;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .notion-content-wrapper .notion-text {
                        font-size: 1rem;
                    }

                    .notion-content-wrapper .notion-h1 {
                        font-size: 1.75rem;
                    }

                    .notion-content-wrapper .notion-h2 {
                        font-size: 1.5rem;
                    }

                    .notion-content-wrapper .notion-h3 {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default NotionContent;
