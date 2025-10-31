# Tech Stack Comparison

A comprehensive React application for comparing hosting platforms, cloud databases, and domain registrars with detailed free and paid tier breakdowns.

Built with **React + TypeScript + Vite** and styled with **Tailwind CSS**.

## 📋 Overview

This interactive comparison tool helps developers and businesses choose the right tech stack by providing side-by-side comparisons of:

- **Domain Registrars**: GoDaddy, Vodien, Namecheap
- **Hosting Platforms**: Vercel, Netlify, Railway, Render
- **Cloud Databases**: Supabase, PlanetScale, AWS RDS, Railway DB

## ✨ Features

- 🎯 **Free vs Paid Tier Comparison**: Clear breakdown of what's included in each tier
- 💱 **Multi-Currency Support**: Toggle between USD and SGD pricing with real-time conversion
- 🔍 **Category Filtering**: View all services or filter by type (domains, hosting, databases)
- 📊 **Feature Lists**: Detailed feature comparisons for each service
- 💡 **Quick Recommendations**: Curated suggestions for different budget levels and use cases
- 🎨 **Modern UI**: Clean, responsive design with gradient backgrounds and smooth hover effects
- ⚡ **Fast Development**: Built with Vite for instant hot module replacement (HMR)
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Type-Safe**: Full TypeScript implementation for better developer experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone or download this repository:
```bash
git clone <repository-url>
cd tech-stack-comparison
```

2. Install dependencies:
```bash
npm install
```

That's it! The project uses Tailwind CSS via CDN, so no additional CSS setup is needed.

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 19.1**: UI framework with modern hooks
- **TypeScript 5.9**: Type safety and better developer experience
- **Vite 7.1**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Lucide React 0.552**: Beautiful, consistent icon library
- **ESLint 9.36**: Code linting and quality control

## 📦 Project Structure

```
tech-stack-comparison/
├── public/              # Static assets (Vite logo, etc.)
├── src/
│   ├── App.tsx         # Main comparison component (all-in-one)
│   └── main.tsx        # Application entry point
├── index.html          # HTML template with Tailwind CDN
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration (main)
├── tsconfig.app.json   # TypeScript app configuration
├── tsconfig.node.json  # TypeScript node configuration
├── eslint.config.js    # ESLint configuration
└── README.md           # This file
```

**Note**: This project uses Tailwind CSS via CDN for simplicity. All styles are utility classes directly in the component.

## 🎯 Use Cases & Recommendations

### Start Free (Perfect for Learning & Prototypes)
- **Hosting**: Vercel (Free Tier)
- **Database**: Supabase (Free Tier)
- **Cost**: $0/month
- **Great for**: Personal projects, MVPs, learning

### Budget Paid (Small Projects & Startups)
- **Domain**: Namecheap (~$8-15/year)
- **Hosting + Database**: Railway (~$5-10/month)
- **Total**: ~$13-25/month
- **Great for**: Side projects, small startups

### Professional (Growing Businesses)
- **Domain**: GoDaddy or Vodien
- **Hosting**: Vercel Pro ($20/month)
- **Database**: Supabase Pro ($25/month)
- **Total**: ~$65-75/month
- **Great for**: Commercial projects, teams

### Scale-Ready (High Traffic Applications)
- **Hosting**: Railway or Render
- **Database**: PlanetScale or Supabase
- **Pricing**: Usage-based, scales with your needs
- **Great for**: Growing apps, enterprise

## 📦 Services Included

### Domain Registrars
| Service | Starting Price | Currency Support | Special Features |
|---------|---------------|------------------|------------------|
| Namecheap | $8-15/year | USD | Free WHOIS privacy |
| GoDaddy | $15-30/year | SGD | 24/7 support |
| Vodien | $20-35/year | SGD | Singapore-based, .sg domains |

### Hosting Platforms
| Service | Free Tier | Paid Tier | Best For |
|---------|-----------|-----------|----------|
| Vercel | ✅ Yes | From $20/month | Next.js, React apps |
| Netlify | ✅ Yes | From $19/user/month | Jamstack sites |
| Railway | ✅ $5 credit | From $5/month + usage | Full-stack apps, databases |
| Render | ✅ Yes | From $7/month | Docker, auto-deploy |

### Cloud Databases
| Service | Free Tier | Paid Tier | Database Type |
|---------|-----------|-----------|---------------|
| Supabase | ✅ 500MB | From $25/month | PostgreSQL + Auth |
| PlanetScale | ✅ 5GB | From $5-29/month | MySQL, serverless |
| AWS RDS | ✅ 12 months | From $15-50+/month | Multi-engine |
| Railway DB | ✅ $5 credit | Usage-based | PostgreSQL/MySQL/Redis |

## 💡 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Customization

#### Adding New Services

Edit the `data` object in `src/App.tsx` to add new services:

```tsx
{
  name: 'Service Name',
  type: 'Domain Registrar' | 'Hosting Platform' | 'Cloud Database',
  hasFree: true,
  starter: '$X/month',
  currency: 'USD' | 'SGD',
  freeTier: {
    available: true,
    name: 'Free Plan',
    features: ['Feature 1', 'Feature 2']
  },
  paidTier: {
    name: 'Pro Plan',
    features: ['Feature 1', 'Feature 2']
  },
  url: 'service.com'
}
```

#### Updating Exchange Rate

Modify the `exchangeRate` constant in `src/App.tsx`:

```tsx
const exchangeRate = 1.35; // USD to SGD
```

#### Styling

This project uses **Tailwind CSS via CDN** (included in `index.html`). All styling is done through utility classes in the JSX. To customize:

1. **Change colors/spacing**: Modify the Tailwind utility classes in `src/App.tsx`
2. **Add custom CSS**: You can create a CSS file and import it in `main.tsx`
3. **Use Tailwind config**: For more control, switch to npm-based Tailwind:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
   Then remove the CDN script from `index.html` and add Tailwind directives to a CSS file.

## 🔧 Troubleshooting

### Development server not starting

1. Make sure all dependencies are installed:
```bash
npm install
```

2. Check if port 5173 is already in use. Vite will automatically use the next available port.

### Build errors

Clear node modules and reinstall:
```bash
# On Windows (cmd)
rmdir /s /q node_modules
del package-lock.json
npm install

# On Linux/Mac
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

1. Check your `tsconfig.json` configuration
2. Ensure all type definitions are installed
3. Try restarting your TypeScript server in VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

### Tailwind styles not working

This project uses Tailwind CSS via CDN (check `index.html`). If styles aren't loading:
1. Ensure the CDN script tag is present in `index.html`
2. Check your internet connection
3. Try hard refreshing your browser (`Ctrl+Shift+R` or `Cmd+Shift+R`)

## 📝 Notes

- Prices are approximate and subject to change
- Free tier limitations may vary based on usage
- Some services offer additional tiers not shown in this comparison
- Always check official websites for current pricing and features
- Exchange rates are approximate and may fluctuate

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new services to the comparison
- Update pricing information
- Improve the UI/UX
- Fix bugs or add features

---

**Last Updated**: November 2025  
**Exchange Rate**: 1 USD ≈ 1.35 SGD (approximate)  
**Built with**: React + Vite + TypeScript + Tailwind CSS

