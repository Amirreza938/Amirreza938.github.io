# Dictionary App

A modern English dictionary web application built with React that allows users to search for word definitions, pronunciations, and examples.

![Dictionary App Screenshot](./screenshots/app-screenshot.png)

## Features

- Search for word definitions, etymologies, and usage examples
- Listen to word pronunciations
- View multiple meanings and examples for each word
- Responsive design works on desktop and mobile devices
- Dark/light mode toggle
- History of recent searches

## Demo

The application is deployed and available at: [https://yourusername.github.io/dictionary-app/](https://yourusername.github.io/dictionary-app/)

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and development server
- **Free Dictionary API** - Dictionary data source
- **CSS Modules** - Styling
- **GitHub Pages** - Hosting

## Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/dictionary-app.git

# Navigate to the project directory
cd dictionary-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
dictionary-app/
├── public/
│   ├── dictionary-icon.svg
│   └── ...
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
└── README.md
```

## API Usage

This application uses the [Free Dictionary API](https://dictionaryapi.dev/) to fetch word definitions.

Example API usage:

```javascript
fetch('https://api.dictionaryapi.dev/api/v2/entries/en/hello')
  .then(response => response.json())
  .then(data => console.log(data))
```

## Deployment

The app is configured for deployment to GitHub Pages. To deploy:

```bash
# Build the application
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### GitHub Pages Configuration

The application includes special handling for GitHub Pages:

1. A custom 404.html page that redirects to the main application
2. Path normalization in main.jsx to handle GitHub Pages routing
3. Base path configuration in vite.config.js

## Browser Support

The Dictionary App supports all modern browsers including:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Free Dictionary API](https://dictionaryapi.dev/) for providing the dictionary data
- [Vite](https://vitejs.dev/) for the excellent development experience
- All the open-source libraries used in this project
