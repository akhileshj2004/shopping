
# ShopSync - Collaborative Shopping Lists

![ShopSync Logo](src/assets/icons/favicon.svg)

## Overview
ShopSync is a responsive, collaborative shopping list application that enables users to create, manage and share shopping lists in real-time. With a modern interface combining shopping functionality and tech-inspired design elements, ShopSync makes coordination between household members, roommates, or family members seamless and effortless.

## Key Features

### Core Functionality
- **Collaborative Lists**: Create and edit shopping lists that multiple users can access simultaneously
- **Real-time Synchronization**: All changes update instantly across connected devices
- **User Authentication**: Secure account registration and login system
- **List Sharing**: Share shopping lists via generated links or directly through social platforms
- **Cross-device Compatibility**: Consistent experience across mobile, tablet, and desktop

### User Experience
- **Tech-inspired UI**: Modern interface with animated tech elements and code symbols
- **Multiple Themes**: Choose between light, dark, or blue themes to customize your experience
- **Visual Feedback**: Animations and transitions for a polished, responsive feel
- **Grid & List Views**: Toggle between different list visualization options

### Advanced Features
- **User Search**: Find and connect with other ShopSync users
- **Activity Tracking**: Monitor recent actions and changes to your lists
- **Privacy Controls**: Customize profile visibility and search preferences
- **Sharing Options**: Multiple social sharing integrations (WhatsApp, Email, Facebook, Twitter)

## Project Structure
```
hybrid-webview-app/
├── README.md                   # Project documentation
├── webpack.config.js           # Webpack configuration
├── src/
│   ├── index.html              # Home page / Entry point
│   ├── assets/
│   │   └── icons/              # Application icons and graphics
│   ├── css/
│   │   ├── styles.css          # Global styles and tech animations
│   │   ├── home.css            # Home page specific styles
│   │   ├── lists.css           # Lists page specific styles
│   │   ├── shared.css          # Shared lists page specific styles
│   │   ├── recent.css          # Recent activity page specific styles
│   │   ├── search.css          # Search page specific styles
│   │   ├── profile.css         # Profile page specific styles
│   │   └── settings.css        # Settings page specific styles
│   ├── js/
│   │   ├── app.js              # Core application functionality
│   │   ├── auth.js             # Authentication handling
│   │   ├── lists.js            # Lists management functionality
│   │   ├── sharing.js          # List sharing functionality
│   │   ├── search.js           # User search functionality
│   │   └── profile.js          # User profile management
│   └── pages/
│       ├── lists.html          # My Lists page
│       ├── shared.html         # Shared Lists page
│       ├── recent.html         # Recent Activity page
│       ├── search.html         # User Search page
│       ├── profile.html        # User Profile page
│       └── settings.html       # Settings page
```

## Technical Implementation Details

### Front-end Architecture
- **HTML5**: Semantic markup for accessible, SEO-friendly pages
- **CSS3**: Advanced CSS features including:
  - CSS Grid and Flexbox for responsive layouts
  - CSS Animations for tech-themed background elements
  - Custom properties for theme switching
  - Media queries for responsive design across devices
- **JavaScript (ES6+)**: Modern JavaScript with:
  - Module-based organization
  - Event delegation for efficient event handling
  - LocalStorage for client-side data persistence
  - Dynamic DOM manipulation

### Features Implementation
- **Authentication System**: Client-side authentication with session management via LocalStorage
- **List Management**: Create, read, update, and delete operations for shopping lists
- **Real-time Collaboration**: Simulated real-time updates (prepared for WebSocket integration)
- **Themes**: Dynamic theme switching with CSS variables
- **Tech Animations**: Procedurally generated floating code symbols and gradient animations

### Design Philosophy
The application combines the practical aspects of shopping list management with a tech-inspired aesthetic:
- Clean, professional interface for everyday users
- Tech elements like floating code symbols and digital patterns appeal to tech-savvy users
- Responsive design ensures usability on all devices
- Consistent visual language across all pages

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn package manager

### Development Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/shopsync.git
   cd hybrid-webview-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:8080`

### Production Build
1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy the contents of the dist folder** to your hosting service

## Using ShopSync

### First-time User Flow
1. Visit the home page to see an introduction to ShopSync
2. Click "Sign Up" to create a new account
3. After signing in, you'll be redirected to the Lists page
4. Create your first shopping list by clicking "New List"

### Creating and Managing Lists
1. Navigate to "My Lists" in the sidebar
2. Click "New List" to create a shopping list
3. Enter a name for your list
4. Add items by typing them and clicking "Add"
5. Each item can be checked off as you shop
6. Edit or delete lists using the action buttons on each list card

### Sharing Lists with Others
1. Open any list you want to share
2. Click the share icon (paper airplane)
3. Copy the generated link or use social sharing buttons
4. Recipients can view and collaborate on your list

### Account and Settings Management
1. Visit the Profile page to update personal information
2. Access Settings to:
   - Change appearance theme (Light/Dark/Blue)
   - Toggle between grid and list views
   - Adjust notification preferences
   - Manage privacy settings

## Browser Compatibility
- Chrome: Full support (recommended)
- Firefox: Full support
- Safari: Full support
- Edge: Full support
- IE: Not supported

## Future Development Roadmap

### Short-term Enhancements
- Implement dark mode CSS
- Add drag-and-drop list reordering
- Enhance mobile touch interactions

### Medium-term Features
- Backend implementation with Node.js and Express
- MongoDB integration for data persistence
- Real WebSocket integration for true real-time updates

### Long-term Vision
- Native mobile apps using Capacitor
- Offline support with service workers
- Voice input for adding items
- Shopping categories and item suggestions
- Budget tracking features

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style conventions and includes appropriate tests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Font Awesome for the icon set
- CSS-Tricks for flexbox and grid tutorials
- MDN Web Docs for JavaScript references
```

