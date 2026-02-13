// Blog Data for OrbitWallet
export const blogCategories = [
    { id: "all", name: "All", color: "#22075e" },
    { id: "interoperability", name: "Interoperability", color: "#22075e" },
    { id: "transit", name: "Public Transit", color: "#00D1FF" },
    { id: "payments", name: "Payments", color: "#7C3AED" },
    { id: "identity", name: "Identity", color: "#EC4899" },
    { id: "infrastructure", name: "Infrastructure", color: "#8B5CF6" },
];

export const blogAuthors = {
    rajesh: {
        name: "Rajesh Kumar",
        role: "Chief Technology Officer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    },
    priya: {
        name: "Priya Sharma",
        role: "Head of Product",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    amit: {
        name: "Amit Patel",
        role: "Infrastructure Lead",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    },
    neha: {
        name: "Neha Gupta",
        role: "UX Researcher",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
    },
};

export const blogArticles = [
    {
        id: 1,
        slug: "unified-payment-infrastructure-india",
        title: "Building Unified Payment Infrastructure for India's Transit Networks",
        excerpt: "How OrbitWallet is transforming the fragmented transit payment landscape into a seamless national system.",
        category: "infrastructure",
        author: "rajesh",
        date: "2026-02-10",
        readTime: 8,
        featured: true,
        image: "https://images.unsplash.com/photo-1554672407-e9869bb75f78?w=1200&h=600&fit=crop",
        content: `# Building Unified Payment Infrastructure for India's Transit Networks

India's public transit ecosystem spans 700+ cities, each with its own payment system. For the average commuter, this means carrying multiple cards, apps, and cash alternatives—a friction point that costs billions in inefficiency annually.

## The Fragmentation Problem

Today's transit payment landscape is characterized by:

- **Regional silos**: Each city operates independently
- **Multiple form factors**: Cards, QR codes, tokens, tickets
- **Poor interoperability**: What works in Mumbai fails in Delhi
- **High infrastructure costs**: Each system requires dedicated hardware

This fragmentation isn't just inconvenient—it's a systemic barrier to mobility.

## The NCMC Promise

The National Common Mobility Card (NCMC) was designed to solve this. But adoption has been slow because:

1. **Infrastructure upgrades are expensive**
2. **User onboarding is complex**
3. **Existing systems resist change**

OrbitWallet bridges this gap by working with existing infrastructure while enabling NCMC compliance.

## Our Approach: Layer, Don't Replace

Instead of forcing a complete overhaul, we've built a compatibility layer:

- Works with existing card readers
- Supports NFC, QR, and traditional cards
- Provides unified backend reconciliation
- Enables cross-city settlement

This means a commuter can tap once in Bangalore and again in Hyderabad—seamlessly.

## The Technology Stack

Our infrastructure leverages:

- **Edge computing** for sub-100ms transaction times
- **Blockchain-based settlement** for transparency
- **AI-driven fraud detection**
- **Offline-first architecture** for reliability

Performance is non-negotiable when someone's rushing to catch a train.

## Real-World Impact

Early deployments show:

- **67% reduction** in transaction time
- **89% user satisfaction** in pilot cities
- **Zero downtime** over 6 months
- **14 million transactions** processed

These aren't just numbers—they represent real people getting home faster.

## The Road Ahead

We're expanding to 50 cities by 2027. But the vision is bigger: unified payments across transit, utilities, and public services.

Imagine a single tap that works everywhere—from metro rides to electricity bills. That's the infrastructure we're building.

---

*Infrastructure isn't glamorous. But it's the foundation of everything that works. And India deserves infrastructure that just works.*`,
        tableOfContents: [
            { id: "fragmentation", title: "The Fragmentation Problem" },
            { id: "ncmc", title: "The NCMC Promise" },
            { id: "approach", title: "Our Approach: Layer, Don't Replace" },
            { id: "tech", title: "The Technology Stack" },
            { id: "impact", title: "Real-World Impact" },
            { id: "future", title: "The Road Ahead" },
        ],
        relatedArticles: [2, 3],
    },
    {
        id: 2,
        slug: "cost-of-fragmentation",
        title: "The Hidden Cost of Fragmentation: Why Every Second Matters",
        excerpt: "A deep dive into how payment friction at transit gates costs India billions in lost productivity.",
        category: "interoperability",
        author: "priya",
        date: "2026-02-08",
        readTime: 6,
        featured: false,
        image: "https://images.unsplash.com/photo-1508614999368-9260051292e5?w=1200&h=600&fit=crop",
        content: `# The Hidden Cost of Fragmentation: Why Every Second Matters

At rush hour, the Andheri metro station processes 12,000 commuters per hour. Each person spends an average of 4.2 seconds at the payment gate.

That's 14 hours of collective time—every single hour.

## The Math of Inefficiency

Let's break down what happens in those 4.2 seconds:

1. Find the right card/app (1.5s)
2. Authenticate/scan (1.8s)
3. Wait for confirmation (0.9s)

Multiply this by 14 million daily metro riders across India, and you get **16,333 hours of lost time daily**—equivalent to 681 full days.

## The Ripple Effect

But time at the gate is just the beginning. Fragmentation creates:

### Economic Impact
- Missed appointments cost businesses ₹2,400 crore annually
- Reduced ridership means lower revenue for transit authorities
- Infrastructure duplication wastes ₹8,000 crore in redundant systems

### Human Impact
- Stress and anxiety from payment uncertainty
- Digital divide: Those without smartphones face longer queues
- Tourist confusion in unfamiliar cities

### Environmental Impact
- Longer queues mean more station congestion
- Increased vehicle idling at station drop-offs
- More single-use plastic tokens and paper tickets

## The Unification Solution

OrbitWallet's approach reduces gate time to 0.8 seconds:

- **No search**: One card for everything
- **Instant tap**: Sub-100ms NFC verification
- **Pre-authentication**: Background processing

This 3.4-second reduction scales to phenomenal impact:

- **13,222 hours saved daily** across India
- **551 full days** reclaimed per day
- **₹1,980 crore** in annual productivity gains

## Beyond the Numbers

The real cost isn't measured in rupees or seconds. It's measured in:

- The parent who makes it to their child's school play
- The job interview that starts on time
- The elderly citizen who can navigate transit with dignity

Technology should disappear. Payments should be invisible. Movement should be effortless.

That's not idealism—it's infrastructure done right.`,
        tableOfContents: [
            { id: "math", title: "The Math of Inefficiency" },
            { id: "ripple", title: "The Ripple Effect" },
            { id: "solution", title: "The Unification Solution" },
            { id: "beyond", title: "Beyond the Numbers" },
        ],
        relatedArticles: [1, 3],
    },
    {
        id: 3,
        slug: "ncmc-technical-deep-dive",
        title: "NCMC Technical Deep Dive: How Smart Cards Enable Interoperability",
        excerpt: "Understanding the technology behind India's National Common Mobility Card standard.",
        category: "payments",
        author: "amit",
        date: "2026-02-05",
        readTime: 10,
        featured: false,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop",
        content: `# NCMC Technical Deep Dive: How Smart Cards Enable Interoperability

The National Common Mobility Card isn't just a payment card—it's a sophisticated piece of infrastructure built on decades of cryptographic and banking innovation.

## The Technology Stack

NCMC cards are built on the **EMV (Europay, Mastercard, Visa)** standard with additional specifications from NPCI and RBI:

### Hardware Layer
- **Contact chip**: ISO/IEC 7816 compliant
- **Contactless interface**: ISO/IEC 14443 (NFC Type A/B)
- **Dual interface**: Works both contact and contactless
- **Secure element**: Hardware-encrypted key storage

### Software Layer
- **Payment applications**: RuPay, Visa, Mastercard
- **Transit application**: NCMC-EMV overlay
- **Loyalty programs**: Multi-application support
- **Offline balance**: Local value storage

## How a Transaction Works

When you tap your NCMC card at a metro gate, here's what happens in <100ms:

1. **Proximity Detection** (5ms)
   - Reader emits 13.56 MHz field
   - Card activates via inductive coupling
   - Anti-collision protocol if multiple cards present

2. **Mutual Authentication** (30ms)
   - Card presents UID and application list
   - Reader selects NCMC transit app
   - Cryptographic handshake (3DES or AES)
   - Both sides verify authenticity

3. **Transaction Processing** (40ms)
   - Reader sends transaction amount
   - Card checks balance/limit
   - Card performs cryptographic authorization
   - Balance updated in secure element

4. **Confirmation** (15ms)
   - Transaction logged in card memory
   - Receipt data sent to reader
   - Gate opens

5. **Backend Sync** (async)
   - Transaction queued for upload
   - Settlement processed overnight
   - Inter-operator reconciliation

## Security Architecture

NCMC implements multiple security layers:

### Card Level
- **Unique Card Number**: Never changes, never exposed
- **Rotating Cryptogram**: Different for each transaction
- **PIN for high-value**: Above ₹2,000 threshold
- **Tamper detection**: Physical security features

### Network Level
- **TLS 1.3**: For all network communication
- **HSM encryption**: Keys never leave secure modules
- **Tokenization**: Card numbers replaced with tokens
- **Fraud scoring**: ML-based anomaly detection

### Application Level
- **Transaction limits**: Per-transaction and daily caps
- **Velocity checks**: Too many transactions = flag
- **Geofencing**: Unusual location patterns detected
- **Offline counters**: Prevents replay attacks

## OrbitWallet's Innovation

We've extended NCMC with:

- **Virtual NCMC**: Phone-based, no physical card needed
- **Multi-channel**: NFC, QR, card—all in one account
- **Real-time sync**: No waiting for overnight settlement
- **Smart routing**: Automatically chooses best payment method

## The Future: Beyond Transit

NCMC's architecture supports far more than metro rides:

- Government services (Aadhaar integration)
- Utility payments (electricity, water)
- Retail purchases (small-ticket transactions)
- Authentication (secure identity verification)

The same card that gets you on a bus could soon pay your entire daily routine.

---

*Technology this complex should feel this simple. That's engineering.*`,
        tableOfContents: [
            { id: "stack", title: "The Technology Stack" },
            { id: "transaction", title: "How a Transaction Works" },
            { id: "security", title: "Security Architecture" },
            { id: "innovation", title: "OrbitWallet's Innovation" },
            { id: "future", title: "The Future: Beyond Transit" },
        ],
        relatedArticles: [1, 2],
    },
];

// Helper functions
export const getFeaturedArticle = () => {
    return blogArticles.find((article) => article.featured);
};

export const getArticlesByCategory = (categoryId) => {
    if (categoryId === "all") return blogArticles;
    return blogArticles.filter((article) => article.category === categoryId);
};

export const getArticleBySlug = (slug) => {
    return blogArticles.find((article) => article.slug === slug);
};

export const getRelatedArticles = (articleId) => {
    const article = blogArticles.find((a) => a.id === articleId);
    if (!article) return [];
    return article.relatedArticles.map((id) =>
        blogArticles.find((a) => a.id === id)
    );
};

export const searchArticles = (query) => {
    const lowerQuery = query.toLowerCase();
    return blogArticles.filter(
        (article) =>
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.content.toLowerCase().includes(lowerQuery)
    );
};
