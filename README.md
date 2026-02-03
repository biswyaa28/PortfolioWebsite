# Biswajeet Rout - Portfolio Website

A modern, professional portfolio website for a cybersecurity engineering student, built with Next.js 14 and Tailwind CSS.

## 🚀 Features

- **Single-Page Design**: Smooth scrolling between sections
- **Dark Theme**: Modern dark theme with cyber-green (#00ff9d) accents
- **Responsive**: Fully responsive design for all devices
- **Interactive**: Hover animations and smooth transitions
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast**: Built with Next.js 14 for optimal performance

## 📋 Sections

1. **Hero/Home**: Full-screen introduction with name, title, and tagline
2. **About**: Bio, current focus areas, and academic status
3. **Projects**: Grid of project cards with descriptions and GitHub links
4. **Skills**: Categorized technical skills
5. **Contact**: Contact form and information
6. **Blog**: Coming soon section for future articles
7. **Footer**: Social links and copyright

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Inter (body), JetBrains Mono (code)

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ and npm installed

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Update Personal Information

1. **Projects** (`components/Projects.tsx`):
   - Update the `projects` array with your actual projects
   - Add project titles, descriptions, technologies, and GitHub URLs

2. **Skills** (`components/Skills.tsx`):
   - Modify the `skillCategories` array with your skills
   - Add or remove categories as needed

3. **Contact** (`components/Contact.tsx`):
   - Replace `your.email@example.com` with your actual email
   - Update location and other contact details

4. **Footer** (`components/Footer.tsx`):
   - Update GitHub URL: Replace `https://github.com/yourusername`
   - Update LinkedIn URL: Replace `https://linkedin.com/in/yourusername`

5. **Tagline** (`components/Hero.tsx`):
   - Modify the tagline if you prefer a different one

### Color Customization

Edit `tailwind.config.ts` to change colors:
- `background`: Main background color
- `cyber-green`: Primary accent color
- `electric-blue`: Secondary accent color (currently unused, available for customization)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy

### Build for Production

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Future Enhancements

- Add blog functionality with MDX
- Implement dark/light theme toggle
- Add animations with Framer Motion
- Include resume download feature
- Add project filtering by technology
- Integrate analytics

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Biswajeet Rout**
- Portfolio: [Your deployed URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)

---

Built with ❤️ using Next.js and Tailwind CSS
