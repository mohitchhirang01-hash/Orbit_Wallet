import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "Orbit Wallet | NCMC Card for Transit, Payments & Mobility Across India",
    description = "Experience seamless travel with Orbit Wallet's NCMC card. One card for metro, bus, rope ways, parking & retail + e-commerce payments across India. National Common Mobility Card explained.",
    keywords = "orbit wallet, ncmc, national common mobility card, transit card india, metro card, bus pass, mobility card",
    ogImage = "https://orbitwallet.com/og-image.jpg",
    url = "https://orbitwallet.com/",
    type = "website",
    structuredData = null,
    breadcrumbs = null
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}

            {/* Breadcrumb Schema */}
            {breadcrumbs && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": breadcrumbs.map((crumb, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "name": crumb.name,
                            "item": crumb.url
                        }))
                    })}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
