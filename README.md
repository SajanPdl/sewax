<div align="center">
  <div style="background-color: #3b82f6; width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
    <span style="color: white; font-size: 32px; font-weight: bold;">S</span>
  </div>
  <h1>Sewax - Sajilo Website Builder</h1>
  <p>
    <strong>A modern, Gen-Z SaaS platform for Nepali creators to build websites, sell courses, and host marketplaces.</strong>
  </p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#contributing">Contributing</a>
  </p>

  ![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)
  ![License](https://img.shields.io/badge/license-Private-red.svg)
</div>

<br />

## 🚀 About Sewax

Sewax is a comprehensive SaaS platform designed to empower creators and businesses in Nepal. It combines a powerful website builder with a robust commerce engine, allowing users to create stunning online presences, manage sales, and scale their operations with ease.

Built with performance and user experience in mind, Sewax features a striking design, intuitive dashboard, and seamless local payment integrations.

## ✨ Key Features

### 🏗️ Website Builder
- **Drag-and-Drop Editor:** Intuitive interface for building custom pages.
- **Templates:** Professional, ready-to-use templates for various industries.
- **CMS:** Built-in content management system for blogs and dynamic content.

### 🛍️ Commerce Engine
- **Point of Sale (POS):** Integrated POS for physical retail locations.
- **Product Management:** Advanced inventory tracking, variants, and categories.
- **Order Management:** Streamlined order processing and fulfillment.
- **Customer CRM:** Detailed customer profiles and purchase history.
- **Discounts & Marketing:** Create campaigns, coupons, and promotional offers.

### 📊 Dashboard & Operations
- **Analytics:** Real-time insights into sales, traffic, and user behavior.
- **Team Management:** Role-based access control for staff members.
- **Multi-Location:** Manage inventory and sales across multiple branches.
- **Billing:** Automated invoicing and subscription management.

### 🛡️ Admin Panel
- **Tenant Management:** Comprehensive tools for platform administrators.
- **User Roles:** Granular control over permissions and access.
- **Audit Logs:** Detailed tracking of system activities for security.
- **System Health:** Monitoring tools for platform performance and stability.

## 🛠️ Tech Stack

- **Frontend:** [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State & Auth:** [Supabase](https://supabase.com/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Lottie](https://lottiefiles.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sewax.git
   cd sewax
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` or `.env.local` file in the root directory and add your configuration keys:
   ```env
   # Gemini API Key for AI features
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## 📂 Project Structure

```
sewax/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── admin/       # Admin panel components
│   │   ├── auth/        # Authentication components
│   │   ├── dashboard/   # User dashboard components
│   │   └── ...
│   ├── lib/             # Utilities and Supabase client
│   ├── themes/          # Theme configurations
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Built with ❤️ for Nepal</p>
</div>
