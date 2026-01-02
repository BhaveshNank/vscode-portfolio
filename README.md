<div align="center">
  <img src="public/vs-code-logo.png" width="80" height="80" />
  <h1>VS Code Portfolio Template</h1>
  <p>
    <a href="https://vscode-portfolio-rho.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Portfolio-blue?style=for-the-badge&logo=vercel" alt="Live Demo" />
    </a>
  </p>
</div>

A stunning, fully functional Visual Studio Code replica built as a portfolio website. This template recreates the authentic VS Code experience with working features including file explorer, terminal, extensions marketplace, and theme switching.

![VS Code Portfolio](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### Core Functionality
- 🎯 **Authentic VS Code UI** - Pixel-perfect recreation of Visual Studio Code interface
- 📁 **File Explorer** - Interactive sidebar with syntax-highlighted file icons
- 💻 **Working Terminal** - Functional terminal with custom commands and Easter eggs
- 🎨 **7 Theme System** - Dark+, Monokai, GitHub Dark, Dracula, Night Owl, and more
- 📦 **Extensions Marketplace** - Display your technical skills as VS Code extensions
- 🔧 **Drag-to-Resize** - Resizable terminal and sidebar panels
- 📱 **Mobile Responsive** - Optimized mobile experience with swipe gestures

### Integration Features
- 🐙 **GitHub Profile Integration** - Real-time GitHub stats using GitHub API
- 📄 **PDF Resume Viewer** - Embedded resume viewing capability
- 🎭 **Smooth Animations** - Framer Motion powered transitions
- 📊 **Analytics Ready** - Vercel Analytics pre-configured

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A code editor (VS Code recommended 😉)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd vscode-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization Guide

### 1. Personal Information

Update your basic information in these files:

**`app/components/HomeContent.tsx`**
```typescript
// Update your name, title, and introduction
const YOUR_NAME = "Your Name";
const YOUR_TITLE = "Your Title";
const YOUR_INTRO = "Your introduction text";
```

**`app/components/AboutContent.tsx`**
```typescript
// Update your background, skills, and experience
```

**`app/components/ContactContent.tsx`**
```typescript
// Update your contact information and social links
```

### 2. Projects

**`app/components/ProjectsContent.tsx`**
- Replace the project data with your own projects
- Update project titles, descriptions, tech stacks, and links

### 3. GitHub Integration

**`app/components/GitHubProfile.tsx`**
```typescript
// Line ~15: Update with your GitHub username
const GITHUB_USERNAME = 'YourGitHubUsername';
```

### 4. Resume

**`public/Bhavesh_Nankani_resume.pdf`**
- Replace with your own resume PDF
- Keep the same path or update the reference in `app/page.tsx`

### 5. Profile Picture

**`public/bhavesh.jpeg`**
- Replace with your own profile picture
- Recommended size: 400x400px or larger
- Keep the same filename or update references

### 6. Terminal Commands

**`app/components/Terminal.tsx`**
```typescript
// Add or modify custom terminal commands in the commands array
// Each command needs: name, description, and execute function
```

### 7. Extensions/Skills

**`app/page.tsx`** (lines ~200-400)
```typescript
// Update the extensions array with your skills
// Each extension represents a technology/skill you want to showcase
```

### 8. Themes (Optional)

**`app/utils/themes.ts`**
- Modify existing themes or add new ones
- Each theme requires color definitions for all CSS variables

## 📁 Project Structure

```
vscode-portfolio/
├── app/
│   ├── components/          # React components
│   │   ├── HomeContent.tsx       # Landing page content
│   │   ├── AboutContent.tsx      # About section
│   │   ├── ProjectsContent.tsx   # Projects showcase
│   │   ├── ContactContent.tsx    # Contact information
│   │   ├── Terminal.tsx          # Terminal component
│   │   ├── GitHubProfile.tsx     # GitHub integration
│   │   ├── PDFViewer.tsx         # Resume viewer
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   └── useSwipeGesture.tsx
│   ├── utils/               # Utility functions
│   │   └── themes.ts             # Theme definitions
│   ├── globals.css          # Global styles & theme variables
│   ├── page.tsx             # Main page component
│   └── layout.tsx           # Root layout
├── public/                  # Static assets
│   ├── Bhavesh_Nankani_resume.pdf
│   ├── bhavesh.jpeg
│   └── ...
└── package.json
```

## 🎯 Key Files to Customize

| File | What to Change | Priority |
|------|----------------|----------|
| `app/components/HomeContent.tsx` | Name, title, introduction | ⭐⭐⭐ |
| `app/components/AboutContent.tsx` | Background, skills, experience | ⭐⭐⭐ |
| `app/components/ProjectsContent.tsx` | Your projects | ⭐⭐⭐ |
| `app/components/ContactContent.tsx` | Contact info, social links | ⭐⭐⭐ |
| `app/components/GitHubProfile.tsx` | GitHub username | ⭐⭐⭐ |
| `public/Bhavesh_Nankani_resume.pdf` | Your resume | ⭐⭐⭐ |
| `public/bhavesh.jpeg` | Your photo | ⭐⭐⭐ |
| `app/page.tsx` (extensions array) | Your skills | ⭐⭐ |
| `app/components/Terminal.tsx` | Terminal commands | ⭐ |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Click "Deploy"

3. **Configure Custom Domain (Optional)**
   - Add your domain in Vercel project settings
   - Update DNS records as instructed

### Alternative Deployment Platforms
- **Netlify**: Similar to Vercel, drag-and-drop deployment
- **AWS Amplify**: Enterprise-grade hosting
- **GitHub Pages**: Free hosting (requires static export)

## 🛠️ Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **PDF Viewing**: Browser native

## 🎨 Theme System

This portfolio includes 7 professionally designed themes:
- 🌙 **Dark+ (default)** - VS Code's classic dark theme
- 🎨 **Monokai** - Vibrant and colorful
- 🌐 **GitHub Dark** - GitHub's signature dark theme
- 🌑 **GitHub Dark Dimmed** - Softer GitHub dark variant
- 🧛 **Dracula** - Popular purple-accented theme
- 🦉 **Night Owl** - Blue-focused night theme
- 🌓 **One Dark Pro** - Atom's iconic dark theme

Themes use CSS variables for instant switching without page reloads.

## 💡 Tips & Best Practices

1. **Keep Content Concise**: Portfolio visitors scan quickly - highlight key information
2. **Update Projects Regularly**: Show your latest and best work
3. **Test on Mobile**: Ensure responsive design works on all devices
4. **Optimize Images**: Compress images to improve load times
5. **SEO**: Update meta tags in `app/layout.tsx` for better search visibility
6. **GitHub Username**: Ensure your GitHub profile is public for API to work

## 🐛 Common Issues

### GitHub API Rate Limiting
- **Issue**: GitHub profile not loading after many refreshes
- **Solution**: GitHub API has rate limits (60 requests/hour unauthenticated)
- **Fix**: Wait an hour or implement GitHub token authentication

### Resume Not Displaying
- **Issue**: PDF viewer shows blank
- **Solution**: Ensure PDF is in `public/` folder and path is correct
- **Browser**: Some browsers block PDF rendering - test in Chrome/Firefox

### Theme Not Changing
- **Issue**: Theme switch doesn't update colors
- **Solution**: Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- **Check**: Ensure localStorage is enabled in browser

### Terminal Not Working
- **Issue**: Terminal commands don't respond
- **Solution**: Check browser console for errors
- **Verify**: Commands are properly defined in `Terminal.tsx`

## 📝 License

This project is open source and available for personal and commercial use. Feel free to customize and make it your own!

## 🤝 Contributing

If you'd like to improve this template:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💬 Support

If you have questions or run into issues:
- Check the comments in the code - they explain most functionality
- Review this README carefully
- Open an issue on GitHub
- Search for similar issues in the repository

## 🌟 Showcase

Built your portfolio with this template? I'd love to see it! Share your creation:
- Tag me on LinkedIn
- Open a PR to add your portfolio to a "Showcase" section

## 🙏 Acknowledgments

- Inspired by Visual Studio Code
- Built with Next.js and Tailwind CSS
- Icons from Lucide React
- Animations by Framer Motion

---

**Made with ❤️ by Bhavesh Nankani**

If this template helped you, consider giving it a ⭐ on GitHub!

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vercel Deployment Docs](https://vercel.com/docs)
