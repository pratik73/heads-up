# Guess the Word: Heads Up!

A fun, mobile-friendly, PWA-enabled word guessing game inspired by the popular Heads Up! app. Hold your phone above your head and let others give you clues to guess the word on the screen!

## 🎮 How to Play

1. **Choose a Category**: Select from Animals, Movies, Food, Countries, or Celebrities
2. **Start the Game**: You have 60 seconds to guess as many words as possible
3. **Hold Your Phone Up**: Place the phone on your forehead so others can see the screen
4. **Get Clues**: Your friends give you clues to help you guess the word
5. **Make Your Choice**:
   - **Correct**: Tilt phone down or tap the ✓ button
   - **Skip**: Tilt phone up or tap the → button

## 📱 Features

- **Mobile-Optimized**: Responsive design that works perfectly on phones and tablets
- **PWA Enabled**: Install as an app on your device for offline play
- **Touch & Gesture Controls**: Supports both button taps and phone tilting
- **Multiple Categories**: 5 different word categories with 30 words each
- **Score Tracking**: Keep track of your performance
- **Offline Support**: Play even without an internet connection (after initial install)
- **Share Results**: Share your scores with friends

## 🚀 Getting Started

### Play Online
Simply visit the GitHub Pages URL: `https://[username].github.io/heads-up/`

### Install as PWA
1. Open the game in your mobile browser
2. Look for the "Install" prompt or "Add to Home Screen" option
3. Install the app for offline play and quick access

### Local Development
1. Clone this repository
2. Open `index.html` in a web browser
3. For full PWA features, serve from a local HTTP server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

## 🛠 Technical Details

### Files Structure
```
├── index.html          # Main app interface
├── styles.css          # Mobile-responsive styling
├── app.js              # Game logic & PWA functionality
├── manifest.json       # PWA configuration
├── service-worker.js   # Offline support & caching
├── .nojekyll          # GitHub Pages compatibility
├── icons/             # PWA icons
│   ├── icon-192.png   # 192x192 app icon
│   └── icon-512.png   # 512x512 app icon
└── README.md          # This file
```

### PWA Features
- **Installable**: Can be installed on mobile devices and desktops
- **Offline First**: Works without internet after initial load
- **App-like Experience**: Full screen, standalone display
- **Fast Loading**: Service worker caching for instant startup

### Browser Support
- Modern mobile browsers (iOS Safari, Chrome, Firefox)
- Desktop browsers with PWA support
- Requires JavaScript enabled

## 🎯 Game Controls

### Touch Controls
- **Tap Correct (✓)**: Mark the current word as correct
- **Tap Skip (→)**: Skip to the next word
- **Tap Pause**: Pause the game

### Gesture Controls (Mobile)
- **Tilt Phone Down**: Mark word as correct
- **Tilt Phone Up**: Skip to next word

### Keyboard Controls (Desktop)
- **Arrow Down**: Mark word as correct
- **Arrow Up**: Skip to next word
- **Spacebar**: Pause game

## 🎲 Word Categories

- **🐾 Animals**: Common animals and wildlife
- **🎬 Movies**: Popular films and blockbusters
- **🍕 Food**: Delicious foods and dishes
- **🌍 Countries**: Countries from around the world
- **⭐ Celebrities**: Famous actors, musicians, and personalities

## 🔧 Customization

### Adding New Categories
Edit the `categories` object in `app.js`:
```javascript
const categories = {
    yourcategory: [
        'Word 1', 'Word 2', 'Word 3'
        // Add your words here
    ]
};
```

### Changing Game Settings
Modify game parameters in `app.js`:
- `timeLeft: 60` - Game duration in seconds
- Word lists in the `categories` object

## 📋 GitHub Pages Setup

This game is ready for GitHub Pages deployment:

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Save

2. **Access Your Game**:
   - Your game will be available at: `https://[username].github.io/[repository-name]/`
   - It may take a few minutes for changes to appear

3. **Custom Domain** (Optional):
   - Add a `CNAME` file with your custom domain
   - Configure DNS settings to point to GitHub Pages

## 🤝 Contributing

Feel free to contribute to this project:
- Add new word categories
- Improve the UI/UX
- Add new game features
- Fix bugs or improve performance

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Have Fun!

Enjoy playing Guess the Word: Heads Up! with your friends and family. Perfect for parties, gatherings, or just having fun together!