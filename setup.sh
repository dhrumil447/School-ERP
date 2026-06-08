#!/bin/bash

# School ERP Setup Script
# This script installs all dependencies and runs the development server

echo "================================================"
echo "🎓 Elevate School ERP - Setup"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Start development server
echo "🚀 Starting development server..."
echo "================================================"
echo "📍 Open your browser and visit: http://localhost:5173"
echo ""
echo "Demo Credentials:"
echo "  Admin: admin@schoolerp.demo / Admin@123"
echo "  Student: student@schoolerp.demo / Student@123"
echo "  Teacher: teacher@schoolerp.demo / Teacher@123"
echo "================================================"
echo ""

npm run dev
