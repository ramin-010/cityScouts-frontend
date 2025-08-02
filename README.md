# CityScouts Chandigarh – Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0.0-646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4)](https://tailwindcss.com/)

A modern, responsive web application for exploring local attractions, dining, and events in Chandigarh. Users can browse places of interest, check details, and manage favorite spots. The app includes user authentication and an admin dashboard for managing content.

## 📋 Table of Contents
- [Features](#-features)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Setup & Installation](#-setup--installation)
- [Development](#-development)
- [Folder Structure](#-folder-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features
- 🌐 **Multi-page Application** with React Router DOM v6
- 🔍 **Advanced Search** with debounced input and instant results
- 🗺️ **Interactive Maps** using React Leaflet
- 📱 **Fully Responsive** design for all device sizes
- 🎨 **Modern UI** with smooth animations using Framer Motion
- 🔄 **Infinite Scroll** with pagination support

### User Experience
- 👤 **User Authentication** (Login/Signup) with protected routes
- 🔒 **Role-Based Access Control** (Admin, Contributor, User)
- ❤️ **Favorites System** with persistent storage
- 📍 **Location-Based** content discovery
- 📱 **Mobile-First** responsive design
- ⚡ **Optimized Performance** with code splitting

### Admin & Content Management
- 📊 **Admin Dashboard** for content management
- 📝 **CRUD Operations** for attractions, dining, and events
- 🖼️ **Image Upload** with preview and management
- 📱 **Responsive Forms** with form validation
- 📅 **Event Management** with date and time controls

### Technical Features
- 🚀 **Custom Hooks** for data fetching and state management
  - `useFetch` - For simple data fetching
  - `useFetchWithQuery` - For paginated data with query support
  - `useDebounce` - For search input optimization
  - `useFavorite` - For managing favorite items
- 🔄 **State Management** with Recoil
- 📱 **Progressive Web App** ready
- 🛠 **Developer Tools** with ESLint and Prettier

## 🚀 Technologies

### Core Technologies
- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom theming
- **State Management**: Recoil for global state
- **Routing**: React Router DOM v6 with protected routes
- **Data Fetching**: Axios with interceptors
- **Form Handling**: Custom form components with validation

### UI & UX
- **Component Library**: Custom component library
- **Icons**: React Icons (Font Awesome, Material Icons, etc.)
- **Animations**: Framer Motion for smooth transitions
- **Maps**: React Leaflet with OpenStreetMap
- **Notifications**: React Toastify for user feedback

### Development Tools
- **Bundler**: Vite for fast development
- **Linting**: ESLint with custom rules
- **Code Formatting**: Prettier
- **Version Control**: Git with conventional commits
- **Package Manager**: npm/yarn

## 📋 Prerequisites

Before you begin, ensure you have installed:

- Node.js (v16 or later)
- npm (v8 or later) or yarn
- Git

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cityScouts-Chandigarh/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Environment Setup**
   Create a `.env` file in the `client` directory and add:
   ```env
   VITE_BASE_URL=http://localhost:3000
   VITE_FETCH_URL=http://localhost:5001
   ```
   Adjust these URLs to match your backend API endpoints.

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server at http://localhost:5173
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Development Workflow

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:5173](http://localhost:5173) in your browser
3. The page will automatically reload when you make changes

## 🔖 Folder Structure

```
client/
├── public/             # Static public assets (images, icons, fonts)
├── src/                # Application source code
│   ├── admin/          # Admin panel pages (Dashboard, DataForm)
│   ├── assets/         # Images, icons, and other static files
│   ├── components/     # Reusable UI components
│   │   ├── externalComps/  # Specialized components (map view, flip card)
│   │   ├── features/   # Feature-specific components
│   │   ├── form/       # Form field components
│   │   └── layouts/    # Layout components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Route-based page components
│   ├── recoil/         # Recoil state management
│   ├── services/       # API service functions
│   └── utils/          # Utility functions
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
└── [other config files]
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the [code of conduct](CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
