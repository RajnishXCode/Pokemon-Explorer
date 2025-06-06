# Pokemon Explorer

A modern, responsive Pokemon explorer built with Next.js 14, TypeScript, and Tailwind CSS. This application allows users to browse, search, and view detailed information about Pokemon.

## Features

- **Modern UI**: Clean and responsive design that works on all devices
- **Fast Search**: Client-side search functionality for quick Pokemon lookup
- **Detailed Information**: Comprehensive Pokemon details including:
  - Official artwork
  - Types with color coding
  - Base stats with visual representation
  - Height and weight
  - Abilities (including hidden abilities)
- **Performance Optimized**:
  - Server-side rendering for better SEO
  - Optimized image loading
  - Client-side caching
  - Smooth loading states

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: PokeAPI
- **State Management**: React Context
- **Deployment**: Vercel (recommended)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
pokemon-explorer/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/         # React components
│   ├── api/               # API utilities
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── public/              # Static files
└── package.json        # Project dependencies
```

## Features in Detail

### Home Page
- Responsive Pokemon grid
- Search functionality
- Smooth loading states
- Type-based color coding

### Detail Page
- Dynamic routing for each Pokemon
- Comprehensive Pokemon information
- Visual stat representation
- Type badges with official colors
- Loading skeleton for better UX

## Performance Considerations

- Server-side rendering for initial page load
- Client-side caching for better performance
- Optimized image loading with Next.js Image component
- Responsive design for all screen sizes
- Efficient search with client-side filtering

## SEO Optimization

- Server-side rendering for better indexing
- Dynamic metadata for each Pokemon
- OpenGraph and Twitter card support
- Proper semantic HTML structure

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by [PokeAPI](https://pokeapi.co/)
- Pokemon is a trademark of Nintendo/Game Freak
