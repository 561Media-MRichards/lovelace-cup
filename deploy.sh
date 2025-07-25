#!/bin/bash

# Lovelace Memorial Cup Deployment Script

echo "🏌️ Deploying Lovelace Memorial Cup to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
vercel whoami || vercel login

# Deploy to production
echo "🚀 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at the URL shown above"
echo ""
echo "📧 Don't forget to update any email links if needed"
echo "📱 Test the site on mobile devices"
echo "🔗 Share the live URL with your team!"