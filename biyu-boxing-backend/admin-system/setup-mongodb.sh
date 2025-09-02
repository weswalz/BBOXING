#!/bin/bash

echo "🚀 MongoDB Setup Script for BiYu Boxing Admin"
echo "============================================="
echo ""

# Function to install MongoDB
install_mongodb() {
    echo "📦 Installing MongoDB..."
    brew tap mongodb/brew
    brew install mongodb-community
    echo "✅ MongoDB installed successfully!"
}

# Function to start MongoDB
start_mongodb() {
    echo "🔄 Starting MongoDB service..."
    brew services start mongodb-community
    sleep 3
    echo "✅ MongoDB service started!"
}

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew is not installed!"
    echo "Please install Homebrew first:"
    echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed."
    read -p "Do you want to install MongoDB now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        install_mongodb
    else
        echo "MongoDB installation skipped."
        echo "You can use MongoDB Atlas instead (cloud database)."
        echo "Visit: https://www.mongodb.com/atlas"
        exit 0
    fi
fi

# Check if MongoDB is running
if ! brew services list | grep -q "mongodb-community.*started"; then
    echo "⚠️  MongoDB is installed but not running."
    read -p "Do you want to start MongoDB now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        start_mongodb
    else
        echo "MongoDB start skipped."
        exit 0
    fi
else
    echo "✅ MongoDB is already running!"
fi

# Test connection
echo ""
echo "🔍 Testing MongoDB connection..."
if mongosh --eval "db.version()" --quiet &> /dev/null; then
    echo "✅ Successfully connected to MongoDB!"
    echo ""
    echo "🎉 MongoDB is ready! You can now run:"
    echo "   npm run dev"
else
    echo "⚠️  Could not connect to MongoDB."
    echo "Try restarting MongoDB:"
    echo "   brew services restart mongodb-community"
fi
