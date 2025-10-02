# 🌟 Personal Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and TailwindCSS, featuring a stunning emerald green gradient design.

![Portfolio Preview](public/image/profile.jpg)

## 👨‍💻 About

I'm a 4th year IT student at **Cebu Technological University - Naga Extension Campus**, passionate about web development and creating solutions that solve real-world problems. A vibe coder crafting digital experiences.

## 🚀 Features

- ✨ **Modern Design**: Beautiful emerald green gradient theme with smooth animations
- 📱 **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- 🎯 **Active Navigation**: Scroll spy highlighting current section
- 📧 **Working Contact Form**: Integrated email functionality with Nodemailer
- 🖼️ **Project Showcase**: Featured capstone and academic projects with images
- ⚡ **Fast Performance**: Built with Next.js 15 and optimized for speed
- 🎨 **Smooth Animations**: Engaging hover effects and transitions

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons

### Backend
- **Next.js API Routes** - Serverless functions
- **Nodemailer** - Email sending functionality
- **Gmail SMTP** - Email delivery service

### Expertise
- **PHP** - Backend development
- **MySQL & SQL Server** - Database management
- **C# & ASP.NET MVC** - .NET development
- **PHPMailer** - Email verification & OTP

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── send-email/    # Email API route
│   │   ├── image/             # Project images
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main portfolio page
│   └── ...
├── public/
│   └── image/                 # Public images
├── .env.local                 # Environment variables
└── package.json
```

## 🎯 Featured Projects

### 1. **E-Industria** (Capstone Project)
A comprehensive web-based platform for industrial supplies, manpower services, and business management.
- **Tech**: PHP, TailwindCSS, MySQL
- **Purpose**: Solving real-world industrial operations challenges

### 2. **ByteBuilder** (Capstone Project)
Web-based personal computer modeling and simulation with rule-based custom recommendations.
- **Tech**: PHP, Bootstrap, MySQL
- **Purpose**: Help users build their dream PC with intelligent suggestions

### 3. **Mom's Food Delicacies** (School Project)
E-commerce platform for home-cooked food delicacies.
- **Tech**: PHP, TailwindCSS, PHPMailer, MySQL
- **Features**: Email verification, OTP authentication, secure user management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ezgaminglogan/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

> **Note**: For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833)

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Email Configuration

The contact form uses Nodemailer with Gmail SMTP. To set it up:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Add credentials to `.env.local`

## 🎨 Customization

### Changing Colors
The portfolio uses an emerald green theme. To change colors, update the TailwindCSS classes in:
- `src/app/page.tsx` - Main component
- `src/app/globals.css` - Global styles

### Updating Content
- **Profile Image**: Replace `public/image/profile.jpg`
- **Project Images**: Add images to `public/image/`
- **Personal Info**: Edit data in `src/app/page.tsx`

## 📱 Sections

- **Home** - Hero section with profile image and tagline
- **About** - Personal introduction and stats
- **Skills** - Technical expertise and tools
- **Projects** - Featured projects with images and descriptions
- **Experience** - Education and development journey
- **Contact** - Working contact form with email integration

## 🔧 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ezgaminglogan/portfolio)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Connect with Me

- **GitHub**: [@ezgaminglogan](https://github.com/ezgaminglogan)
- **LinkedIn**: [Logan Panucat](https://www.linkedin.com/in/logan-panucat-b319562a9/)
- **Email**: mrorange09123@gmail.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Heroicons](https://heroicons.com/)
- Fonts by [Vercel](https://vercel.com/font)

---

**Built with 💚 by a vibe coder** | © 2025 Portfolio
