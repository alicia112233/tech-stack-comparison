import { useState } from 'react';
import { Server, Database, Globe, CheckCircle, XCircle, AlertTriangle, Archive } from 'lucide-react';

interface Service {
    name: string;
    type: string;
    hasFree: boolean;
    starter: string;
    currency: string;
    freeTier: {
        available: boolean;
        name?: string;
        features: string[];
        downsides?: string[];
    };
    paidTier: {
        name?: string;
        features: string[];
    };
    url: string;
}

const ComparisonChart = () => {
    const [currency, setCurrency] = useState('SGD');
    const [category, setCategory] = useState('all');

    const exchangeRate = 1.35; // USD to SGD approximate rate

    const convertPrice = (price: string, fromCurrency: string = 'USD'): string => {
        if (!price) return 'N/A';
        if (fromCurrency === currency) return price;
        
        // Handle per GB pricing (e.g., "$0.004/GB/month")
        const perGBMatch = price.match(/\$?([\d.]+)(.+)/);
        if (perGBMatch) {
            const amount = parseFloat(perGBMatch[1]);
            const suffix = perGBMatch[2]; // e.g., "/GB/month", "/month", "/year"
            
            if (currency === 'SGD' && fromCurrency === 'USD') {
                const converted = (amount * exchangeRate).toFixed(4);
                // Remove trailing zeros for cleaner display
                const cleanPrice = parseFloat(converted).toString();
                return `$${cleanPrice}${suffix}`;
            }
            if (currency === 'USD' && fromCurrency === 'SGD') {
                const converted = (amount / exchangeRate).toFixed(4);
                const cleanPrice = parseFloat(converted).toString();
                return `$${cleanPrice}${suffix}`;
            }
        }
        
        return price;
    };

    const data = {
        domains: [
            {
                name: 'GoDaddy',
                type: 'Domain Registrar',
                hasFree: false,
                starter: '$15-30/year',
                currency: 'SGD',
                freeTier: {
                    available: false,
                    features: []
                },
                paidTier: {
                    features: [
                        '.com, .net, .org domains',
                        'DNS management',
                        'Domain privacy (add-on)',
                        'Email forwarding',
                        '24/7 support'
                    ]
                },
                url: 'godaddy.com'
            },
            {
                name: 'Vodien',
                type: 'Domain Registrar',
                hasFree: false,
                starter: '$20-35/year',
                currency: 'SGD',
                freeTier: {
                    available: false,
                    features: []
                },
                paidTier: {
                    features: [
                        '.sg, .com domains',
                        'Local Singapore support',
                        'DNS management',
                        'WHOIS privacy',
                        'Local billing in SGD'
                    ]
                },
                url: 'vodien.com'
            },
            {
                name: 'Namecheap',
                type: 'Domain Registrar',
                hasFree: false,
                starter: '$8-15/year',
                currency: 'USD',
                freeTier: {
                    available: false,
                    features: []
                },
                paidTier: {
                    features: [
                        '.com, .online domains',
                        'Free WHOIS privacy',
                        'DNS management',
                        '2FA security',
                        'Email forwarding'
                    ]
                },
                url: 'namecheap.com'
            }
        ],
        hosting: [
            {
                name: 'Vercel',
                type: 'Hosting Platform',
                hasFree: true,
                starter: '$20/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Hobby',
                    features: [
                        'Unlimited deployments',
                        '100 GB bandwidth',
                        'Automatic HTTPS',
                        'Preview deployments',
                        'Personal projects only',
                        'Community support'
                    ],
                    downsides: [
                        'Personal/non-commercial use only',
                        'Limited team collaboration',
                        'No password protection',
                        'Community support only (slower response)'
                    ]
                },
                paidTier: {
                    name: 'Pro',
                    features: [
                        'Everything in Hobby',
                        '1TB bandwidth',
                        'Analytics & monitoring',
                        'Commercial projects',
                        'Team collaboration',
                        'Password protection',
                        'Priority support'
                    ]
                },
                url: 'vercel.com'
            },
            {
                name: 'Netlify',
                type: 'Hosting Platform',
                hasFree: true,
                starter: '$19/user/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Free',
                    features: [
                        '100GB bandwidth/month',
                        '300 build minutes/month',
                        'Instant forms (100/month)',
                        'Serverless functions',
                        'Deploy previews',
                        'Community support'
                    ],
                    downsides: [
                        'Limited build minutes (300/month)',
                        'Limited form submissions (100/month)',
                        'No background functions',
                        'No analytics or split testing',
                        'Community support only'
                    ]
                },
                paidTier: {
                    name: 'Pro',
                    features: [
                        'Everything in Free tier',
                        '1TB bandwidth/month',
                        '25,000 build minutes/month',
                        'Background functions',
                        'Split testing',
                        'Analytics',
                        'Role-based access',
                        'Priority support'
                    ]
                },
                url: 'netlify.com'
            },
            {
                name: 'Railway',
                type: 'Hosting Platform',
                hasFree: true,
                starter: '$5/month + usage',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Trial',
                    features: [
                        '$5 free credit',
                        'All features unlocked',
                        '512 MB RAM per service',
                        '1 GB disk per service',
                        'Shared CPU',
                        'Community support'
                    ],
                    downsides: [
                        'Only $5 credit (runs out quickly)',
                        'Limited RAM (512 MB)',
                        'Limited disk space (1 GB)',
                        'Shared CPU (slower performance)',
                        'Need credit card for trial'
                    ]
                },
                paidTier: {
                    name: 'Usage-based',
                    features: [
                        'Pay only for what you use',
                        'Up to 32 GB RAM',
                        'Up to 100 GB disk',
                        'Dedicated resources',
                        'Database support',
                        'Auto-scaling',
                        'Docker support',
                        'Priority support'
                    ]
                },
                url: 'railway.com/pricing'
            },
            {
                name: 'Render',
                type: 'Hosting Platform',
                hasFree: true,
                starter: '$7/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Free',
                    features: [
                        'Static sites (unlimited)',
                        '100 GB bandwidth',
                        'Auto-deploy from Git',
                        '750 hours/month (instances)',
                        'Automatic SSL',
                        'Community support'
                    ],
                    downsides: [
                        'Free instances spin down after inactivity',
                        'Cold starts (slow initial response)',
                        'Limited to 750 hours/month',
                        'No background workers or cron jobs',
                        'Community support only'
                    ]
                },
                paidTier: {
                    name: 'Starter',
                    features: [
                        'Everything in Free tier',
                        'Always-on instances',
                        'Background workers',
                        'Cron jobs',
                        'Faster builds',
                        'More resources',
                        'Email support'
                    ]
                },
                url: 'render.com'
            }
        ],
        databases: [
            {
                name: 'Supabase',
                type: 'Cloud Database',
                hasFree: true,
                starter: '$25/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Free',
                    features: [
                        'PostgreSQL database',
                        '500 MB database storage',
                        '1 GB file storage',
                        '2 GB bandwidth',
                        '50,000 monthly active users',
                        'Unlimited API requests',
                        'Up to 500MB data transfer',
                        'Community support'
                    ],
                    downsides: [
                        'Limited storage (500 MB database)',
                        'No automatic backups',
                        'Projects pause after 1 week inactivity',
                        'Limited to 2 organizations',
                        'Community support only'
                    ]
                },
                paidTier: {
                    name: 'Pro',
                    features: [
                        '8 GB database storage',
                        '100 GB file storage',
                        '250 GB bandwidth',
                        'No limits on active users',
                        'Daily backups (7 days)',
                        'Auth & storage included',
                        'Realtime subscriptions',
                        'Email support'
                    ]
                },
                url: 'supabase.com/pricing'
            },
            {
                name: 'PlanetScale',
                type: 'Cloud Database',
                hasFree: true,
                starter: '$5-29/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Hobby',
                    features: [
                        'MySQL database (serverless)',
                        '5 GB storage',
                        '1 billion row reads/month',
                        '10 million row writes/month',
                        '1 production branch',
                        '1 development branch',
                        'Community support'
                    ],
                    downsides: [
                        'Limited to 1 database',
                        'Limited branches (1 prod + 1 dev)',
                        'No high availability',
                        'No query insights',
                        'Community support only'
                    ]
                },
                paidTier: {
                    name: 'Scaler',
                    features: [
                        '10 GB storage ($5) or 100 GB ($29)',
                        'High availability option',
                        'Query insights',
                        'Multiple branches',
                        'Database branching',
                        'Point-in-time recovery',
                        'Priority support'
                    ]
                },
                url: 'planetscale.com/pricing'
            },
            {
                name: 'AWS RDS',
                type: 'Cloud Database',
                hasFree: true,
                starter: '$15-50+/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Free Tier (12 months)',
                    features: [
                        '750 hours/month db.t2.micro',
                        '20 GB storage',
                        '20 GB backup storage',
                        'MySQL, PostgreSQL, MariaDB',
                        'Single-AZ deployment',
                        'Standard support'
                    ],
                    downsides: [
                        'Only 12 months free (then charged)',
                        'Very limited instance size (t2.micro)',
                        'Single-AZ only (no high availability)',
                        'Complex pricing after free tier',
                        'Requires AWS account & credit card'
                    ]
                },
                paidTier: {
                    name: 'On-Demand',
                    features: [
                        'Multiple instance types',
                        'All database engines',
                        'Multi-AZ deployment',
                        'Read replicas',
                        'Automated backups',
                        'Performance insights',
                        'Advanced monitoring',
                        'Enterprise support available'
                    ]
                },
                url: 'aws.amazon.com/rds/pricing/'
            },
            {
                name: 'Railway DB',
                type: 'Cloud Database',
                hasFree: true,
                starter: '$5/month + usage',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Trial',
                    features: [
                        '$5 free credit',
                        'PostgreSQL/MySQL/Redis',
                        '512 MB RAM',
                        '1 GB disk',
                        'Integrated with hosting',
                        'Community support'
                    ],
                    downsides: [
                        'Only $5 credit (runs out quickly)',
                        'Very limited RAM (512 MB)',
                        'Limited disk space (1 GB)',
                        'No automatic backups on free tier',
                        'Need credit card for trial'
                    ]
                },
                paidTier: {
                    name: 'Usage-based',
                    features: [
                        'Pay for what you use',
                        'Up to 32 GB RAM',
                        'Up to 100 GB disk',
                        'Automatic backups',
                        'Point-in-time recovery',
                        'Database metrics',
                        'Priority support'
                    ]
                },
                url: 'railway.com/pricing'
            }
        ],
        archival: [
            {
                name: 'Backblaze B2',
                type: 'Archival Storage',
                hasFree: true,
                starter: '$0.006/GB/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Free Tier',
                    features: [
                        '10 GB storage (forever free)',
                        '1 GB daily download',
                        'Unlimited upload bandwidth',
                        'S3 compatible API',
                        'No egress fees (1st GB/day)',
                        'No minimum storage duration'
                    ],
                    downsides: [
                        'Limited to 10 GB free storage',
                        'Only 1 GB/day free download',
                        'No CDN included (partner with Cloudflare)',
                        'Less features than big cloud providers',
                        'Smaller geographic presence'
                    ]
                },
                paidTier: {
                    name: 'B2 Cloud Storage',
                    features: [
                        '$0.006/GB/month storage',
                        '$0.01/GB download (after free tier)',
                        'Free upload bandwidth',
                        'S3 compatible',
                        'No API call fees',
                        'Object lock',
                        'Free Cloudflare CDN partnership',
                        'Simple, transparent pricing'
                    ]
                },
                url: 'backblaze.com/cloud-storage/pricing'
            },
            {
                name: 'AWS Glacier',
                type: 'Archival Storage',
                hasFree: true,
                starter: '$0.004/GB/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Free Tier (12 months)',
                    features: [
                        '10 GB retrieval/month',
                        'PUT/COPY requests free',
                        'Standard retrieval included',
                        'Lifecycle policies',
                        'S3 integration',
                        'First 12 months only'
                    ],
                    downsides: [
                        'Only 12 months free (then charged)',
                        'Retrieval times: 3-5 hours (standard)',
                        'Retrieval fees apply ($0.01/GB)',
                        'Minimum 90-day storage commitment',
                        'Complex pricing structure',
                        'Requires AWS account & credit card'
                    ]
                },
                paidTier: {
                    name: 'Glacier Flexible/Deep Archive',
                    features: [
                        'Flexible: $0.004/GB/month',
                        'Deep Archive: $0.00099/GB/month',
                        'Bulk retrieval: 5-12 hours',
                        'Expedited retrieval: 1-5 minutes',
                        'Unlimited storage',
                        'Vault lock for compliance',
                        'Cross-region replication',
                        'Automatic encryption'
                    ]
                },
                url: 'aws.amazon.com/glacier/pricing/'
            },
            {
                name: 'Azure Archive Storage',
                type: 'Archival Storage',
                hasFree: true,
                starter: '$0.002/GB/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Free Tier (12 months)',
                    features: [
                        '5 GB LRS storage',
                        '20,000 read operations',
                        '10,000 write operations',
                        'Blob storage integration',
                        'Lifecycle management',
                        'First 12 months only'
                    ],
                    downsides: [
                        'Only 12 months free (then charged)',
                        'Retrieval times: up to 15 hours',
                        'High priority retrieval: under 1 hour',
                        'Minimum 180-day storage commitment',
                        'Early deletion fees apply',
                        'Requires Azure account'
                    ]
                },
                paidTier: {
                    name: 'Cool/Archive Tiers',
                    features: [
                        'Cool tier: $0.01/GB/month',
                        'Archive tier: $0.002/GB/month',
                        'Multiple retrieval options',
                        'Geo-redundant options',
                        'Immutable storage',
                        'Azure integration',
                        'WORM policies',
                        'Encryption at rest'
                    ]
                },
                url: 'azure.microsoft.com/pricing/details/storage/blobs/'
            },
            {
                name: 'Google Cloud Archive',
                type: 'Archival Storage',
                hasFree: true,
                starter: '$0.0012/GB/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Always Free',
                    features: [
                        '5 GB storage (all classes)',
                        '5,000 Class A operations',
                        '50,000 Class B operations',
                        '100 GB network egress',
                        'Lifecycle policies',
                        'Forever free (within limits)'
                    ],
                    downsides: [
                        'Limited to 5 GB total (all storage)',
                        'Retrieval times: hours to 12+ hours',
                        'Early deletion fees (365 days minimum)',
                        'Egress charges after 100 GB',
                        'Regional restrictions apply',
                        'Complex pricing for operations'
                    ]
                },
                paidTier: {
                    name: 'Archive Storage Class',
                    features: [
                        'Archive: $0.0012/GB/month (cheapest)',
                        'Nearline: $0.01/GB/month (30-day min)',
                        'Coldline: $0.004/GB/month (90-day min)',
                        'Multi-region availability',
                        'Object versioning',
                        'Bucket lock',
                        'Autoclass for cost optimization',
                        'Integrated with Google Cloud'
                    ]
                },
                url: 'cloud.google.com/storage/pricing'
            },
            {
                name: 'Wasabi Hot Storage',
                type: 'Archival Storage',
                hasFree: true,
                starter: '$6.99/TB/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Trial',
                    features: [
                        '1 TB free for 30 days',
                        'No egress fees',
                        'No API fees',
                        'S3 compatible',
                        'Instant retrieval',
                        '30 days only'
                    ],
                    downsides: [
                        'Only 30 days free trial',
                        'Minimum 90-day storage commitment',
                        'Minimum 1 TB storage fee applies',
                        'Early deletion fees',
                        'Limited region availability',
                        'Less features than AWS/Azure'
                    ]
                },
                paidTier: {
                    name: 'Hot Cloud Storage',
                    features: [
                        'Storage: $6.99/TB/month (flat rate)',
                        'Equivalent: ~$0.0069/GB/month',
                        'Egress: $0 (zero, unlimited)',
                        'API requests: $0 (zero)',
                        'Instant retrieval (not archival)',
                        'S3 compatible API',
                        'Immutable storage',
                        '11 nines durability',
                        'Simple pricing'
                    ]
                },
                url: 'wasabi.com/cloud-storage-pricing/'
            },
            {
                name: 'Cloudflare R2',
                type: 'Archival Storage',
                hasFree: true,
                starter: '$0.015/GB/month',
                currency: 'USD',
                freeTier: {
                    available: true,
                    name: 'Free Tier',
                    features: [
                        '10 GB storage (forever free)',
                        '10 million Class A ops/month',
                        '100 million Class B ops/month',
                        'Zero egress fees (forever)',
                        'S3 compatible API',
                        'Global edge network'
                    ],
                    downsides: [
                        'Limited to 10 GB free storage',
                        'Newer service (less mature)',
                        'Limited geographic regions',
                        'No archival tiers (hot storage only)',
                        'Fewer features than AWS/Azure',
                        'Requires Cloudflare account'
                    ]
                },
                paidTier: {
                    name: 'R2 Storage',
                    features: [
                        '$0.015/GB/month storage',
                        'Zero egress fees (forever)',
                        'No API call fees (Class B)',
                        'S3 compatible',
                        'Global distribution',
                        'Automatic multi-region',
                        'Fast retrieval',
                        'Cloudflare integration'
                    ]
                },
                url: 'cloudflare.com/products/r2/'
            }
        ]
    };

    const filteredData = category === 'all'
        ? [...data.domains, ...data.hosting, ...data.databases, ...data.archival]
        : data[category as keyof typeof data] || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                Hosting & Database Comparison
                            </h1>
                            <p className="text-gray-600">Compare free vs paid tiers across services</p>
                        </div>
                        <div className="flex gap-4">
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="px-4 py-2 border-2 border-indigo-300 rounded-lg bg-white focus:border-indigo-500 focus:outline-none"
                            >
                                <option value="USD">USD ($)</option>
                                <option value="SGD">SGD (S$)</option>
                            </select>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="px-4 py-2 border-2 border-indigo-300 rounded-lg bg-white focus:border-indigo-500 focus:outline-none"
                            >
                                <option value="all">All Services</option>
                                <option value="domains">Domain Registrars</option>
                                <option value="hosting">Hosting Platforms</option>
                                <option value="databases">Cloud Databases</option>
                                <option value="archival">Archival Storage</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {filteredData.map((service: Service, idx: number) => (
                            <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-indigo-400">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {service.type.includes('Domain') && <Globe className="text-green-600" size={24} />}
                                            {service.type.includes('Hosting') && <Server className="text-blue-600" size={24} />}
                                            {service.type.includes('Database') && <Database className="text-purple-600" size={24} />}
                                            {service.type.includes('Archival') && <Archive className="text-orange-600" size={24} />}
                                            <h2 className="text-2xl font-bold text-gray-800">{service.name}</h2>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                {service.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            <a 
                                                href={`https://${service.url}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                {service.url}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Free Tier */}
                                    <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                                                {service.freeTier.available ? '🎉 Free Tier' : '❌ No Free Tier'}
                                            </h3>
                                            {service.freeTier.name && (
                                                <p className="text-sm text-gray-600">{service.freeTier.name}</p>
                                            )}
                                            <div className="text-2xl font-bold text-green-600 mt-2">
                                                {service.freeTier.available ? '$0' : 'N/A'}
                                            </div>
                                        </div>

                                        {service.freeTier.available ? (
                                            <div className="space-y-2">
                                                {service.freeTier.features.map((feature: string, fIdx: number) => (
                                                    <div key={fIdx} className="flex items-start gap-2">
                                                        <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                                                        <span className="text-sm text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                                
                                                {service.freeTier.downsides && service.freeTier.downsides.length > 0 && (
                                                    <>
                                                        <div className="border-t border-gray-300 my-3 pt-3">
                                                            <p className="text-xs font-semibold text-orange-700 mb-2">⚠️ Limitations:</p>
                                                        </div>
                                                        {service.freeTier.downsides.map((downside: string, dIdx: number) => (
                                                            <div key={dIdx} className="flex items-start gap-2">
                                                                <AlertTriangle className="text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                                                                <span className="text-sm text-gray-600">{downside}</span>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <XCircle size={16} />
                                                <span className="text-sm">Free tier not available</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Paid Tier */}
                                    <div className="border-2 border-indigo-300 rounded-lg p-4 bg-indigo-50">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                                                💎 Paid Tier
                                            </h3>
                                            {service.paidTier.name && (
                                                <p className="text-sm text-gray-600">{service.paidTier.name}</p>
                                            )}
                                            <div className="text-2xl font-bold text-indigo-600 mt-2">
                                                {service.starter ? convertPrice(service.starter, service.currency) : 'Custom'}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            {service.paidTier.features.map((feature: string, fIdx: number) => (
                                                <div key={fIdx} className="flex items-start gap-2">
                                                    <CheckCircle className="text-indigo-500 mt-0.5 flex-shrink-0" size={16} />
                                                    <span className="text-sm text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Quick Recommendations</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><strong>Start Free:</strong> Vercel (hosting) + Supabase (database) + Backblaze B2 (storage) - All have generous free tiers</p>
                            <p><strong>Budget Paid:</strong> Namecheap (domain $8-15) + Railway ($5-10) + Backblaze ($0.006/GB) - Around $13-25/month</p>
                            <p><strong>Professional:</strong> GoDaddy/Vodien (domain) + Vercel Pro + Supabase Pro - ~$65-75/month</p>
                            <p><strong>Scale-Ready:</strong> Railway or PlanetScale - Usage-based pricing grows with your needs</p>
                            <p><strong>Archival Storage:</strong> Google Cloud Archive ($0.0012/GB) or Backblaze B2 ($0.006/GB) for cost-effective long-term storage</p>
                            <p><strong>Zero Egress Fees:</strong> Cloudflare R2 or Wasabi - No charges for data downloads</p>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p>Prices shown are approximate base prices. Actual costs vary based on usage and features.</p>
                        <p className="mt-1">Exchange rate: 1 USD ≈ 1.35 SGD (approximate)</p>
                        <p className="mt-1">Archival storage pricing shown per GB/month unless otherwise noted. 1 TB = 1,000 GB.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonChart;