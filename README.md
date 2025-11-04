# Cricket Live Score

## Description
A real-time cricket score tracking application that provides live match updates with a clean, Google-style user interface. Stay updated with the latest cricket action as scores refresh automatically.

## Features
- **Live Scores**: Get real-time cricket match scores as they happen
- **Detailed Scorecard**: View comprehensive match statistics and player performance
- **Google-style UI**: Clean, intuitive, and responsive design for optimal user experience
- **Auto-refresh**: Automatic score updates without manual page refresh
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Styling**: Modern CSS with responsive design principles
- **API Integration**: Real-time cricket data API
- **Deployment**: Vercel

## Deployment Instructions for Vercel

1. **Prerequisites**
   - A Vercel account (sign up at [vercel.com](https://vercel.com))
   - Git repository with your project code

2. **Deploy via Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com) and log in
   - Click on "Add New Project"
   - Import your GitHub repository
   - Configure project settings (Vercel will auto-detect the framework)
   - Click "Deploy"

3. **Deploy via Vercel CLI**
   ```bash
   # Install Vercel CLI globally
   npm i -g vercel
   
   # Navigate to your project directory
   cd cricket-live-score
   
   # Deploy to Vercel
   vercel
   
   # For production deployment
   vercel --prod
   ```

4. **Environment Variables** (if needed)
   - Add any required API keys in the Vercel dashboard under Project Settings > Environment Variables

## Usage Instructions

1. **Local Development**
   ```bash
   # Clone the repository
   git clone https://github.com/arpancodez/cricket-live-score.git
   
   # Navigate to project directory
   cd cricket-live-score
   
   # Open index.html in your browser or use a local server
   # For example, with Python:
   python -m http.server 8000
   
   # Or with Node.js http-server:
   npx http-server
   ```

2. **Accessing the Live App**
   - Visit the deployed URL provided by Vercel
   - The homepage displays current live matches
   - Click on any match to view detailed scorecard
   - Scores update automatically every few seconds

3. **Features Usage**
   - **Home**: View all live and recent matches
   - **Match Details**: Click on any match for detailed scorecard
   - **Auto-refresh**: Scores update automatically - no need to refresh the page

## Contributing
Feel free to submit issues and enhancement requests!

## License
This project is open source and available under the MIT License.
