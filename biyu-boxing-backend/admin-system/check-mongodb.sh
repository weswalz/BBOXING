#!/bin/bash

echo "🔍 MongoDB Setup Diagnostic Tool"
echo "================================"
echo ""

# Check if MongoDB is installed
echo "1. Checking if MongoDB is installed..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
    mongod --version | head -n1
else
    echo "❌ MongoDB is NOT installed"
    echo ""
    echo "To install MongoDB, run:"
    echo "  brew tap mongodb/brew"
    echo "  brew install mongodb-community"
fi

echo ""
echo "2. Checking MongoDB service status..."
if brew services list | grep -q "mongodb-community.*started"; then
    echo "✅ MongoDB service is running"
else
    echo "❌ MongoDB service is NOT running"
    echo ""
    echo "To start MongoDB, run:"
    echo "  brew services start mongodb-community"
fi

echo ""
echo "3. Checking port 27017..."
if lsof -i :27017 &> /dev/null; then
    echo "✅ MongoDB is listening on port 27017"
else
    echo "❌ Nothing is listening on port 27017"
fi

echo ""
echo "4. Testing MongoDB connection..."
if mongosh --eval "db.version()" --quiet &> /dev/null; then
    echo "✅ Can connect to MongoDB"
else
    echo "❌ Cannot connect to MongoDB"
fi

echo ""
echo "================================"
echo "📋 Summary:"
echo ""

if command -v mongod &> /dev/null && lsof -i :27017 &> /dev/null; then
    echo "✅ MongoDB is properly set up and running!"
    echo "You can now run: npm run dev"
else
    echo "⚠️  MongoDB needs attention. Follow the steps above to fix."
fi
