# Lovelace Memorial Cup - Deployment Guide

## Project Overview

A modern, responsive website for the Lovelace Memorial Cup golf tournament built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Hero Section**: Event details with countdown timer
- **Registration**: Multiple pricing tiers ($125 individual, $500 team, $1000 gold sponsor)
- **Sponsorship**: Various sponsorship packages
- **Contact Form**: Email integration
- **Responsive Design**: Mobile-optimized with golf-themed elements
- **Smooth Animations**: Professional UI/UX

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Google Fonts (Inter, Poppins)
- Vercel deployment ready

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Direct Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 2: GitHub Integration
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Automatic deployments on push

## Environment Requirements

- Node.js 18.18.0+ (recommended: 20.x)
- npm or yarn

## Configuration

### Color Scheme (Malbon Golf Inspired)
- Forest Green: `#1B4332`, `#4A7C59`
- Memorial Gold: `#D4A574`
- Cream: `#F7F3E9`

### Key Links
- Registration: https://www.eventbrite.com/e/lovelacememorialcup2-tickets-1403964378249
- Contact: wolfersway@gmail.com

## Event Details

- **Date**: August 15th, 2025
- **Time**: 8:00 AM
- **Venue**: Sycamore Ridge Golf Course
- **Mission**: Supporting families battling cancer

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── Navigation.tsx
    ├── Hero.tsx
    ├── About.tsx
    ├── Registration.tsx
    ├── Sponsorship.tsx
    ├── Contact.tsx
    └── Footer.tsx
```

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Notes

- All forms use mailto: links for simplicity
- Countdown timer updates in real-time
- Responsive design tested on mobile/tablet/desktop
- SEO optimized with proper meta tags
- Accessibility features included