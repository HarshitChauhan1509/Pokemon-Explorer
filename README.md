# Pokemon Explorer

A responsive and visually appealing Pokemon Explorer web application built with Next.js, TailwindCSS, and TypeScript. Data is fetched from the PokeAPI.

## Features

- **Homepage**: Displays a list of 151 original Pokemons with a real-time search bar to filter by name. Uses **Static Generation (SSG)** for fast initial loading.
- **Detail Page**: Shows detailed information about a selected Pokemon, including its official artwork, types, height, weight, base stats, abilities, and a list of moves. Uses **Server-Side Rendering (SSR)** to ensure data is always fresh.
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop screens. Features dark mode support.
- **Next.js Dynamic Routing**: Uses `pages/pokemon/[id].tsx` to dynamically route to individual Pokemon pages.

## Tech Stack

- Next.js (Pages Router)
- TypeScript
- TailwindCSS v4
- PokeAPI

## How to Run the Project Locally

Follow these steps to run the project on your local machine:

### 1. Prerequisites
Ensure you have Node.js and npm (or yarn/pnpm) installed on your system.

### 2. Install Dependencies
Run the following command to install all required dependencies:

```bash
npm install
```

### 3. Run the Development Server
Start the Next.js development server:

```bash
npm run dev
```

### 4. View the App
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

## Production Build

To create an optimized production build, run:

```bash
npm run build
```

Then, start the production server:

```bash
npm run start
```
