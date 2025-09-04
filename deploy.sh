#!/bin/bash

# BiYuBoxing.com Deployment Script
# Server: 104.219.54.169
# Port: 8084 -> 3000 (container)

set -e

SERVER_IP="104.219.54.169"
SERVER_USER="root"
PROJECT_NAME="biyuboxing"
CONTAINER_NAME="boxing-container"
SERVER_PORT="8084"
CONTAINER_PORT="3000"

echo "🥊 Deploying ${PROJECT_NAME} to biyuboxing.com..."

# Build Docker image locally for AMD64 architecture
echo "📦 Building Docker image for AMD64..."
if ! docker build --platform linux/amd64 -t ${PROJECT_NAME} . --no-cache; then
    echo "❌ Docker build failed!"
    exit 1
fi

# Save image to tar file
echo "💾 Saving image to tar file..."
if ! docker save ${PROJECT_NAME} > ${PROJECT_NAME}.tar; then
    echo "❌ Failed to save Docker image!"
    exit 1
fi

# Copy image to server
echo "📤 Uploading image to server..."
if ! scp ${PROJECT_NAME}.tar ${SERVER_USER}@${SERVER_IP}:/tmp/; then
    echo "❌ Failed to upload image to server!"
    rm ${PROJECT_NAME}.tar
    exit 1
fi

# Deploy on server
echo "🚀 Deploying on server..."
ssh ${SERVER_USER}@${SERVER_IP} << EOF
    # Load the Docker image
    echo "Loading Docker image..."
    docker load < /tmp/${PROJECT_NAME}.tar
    
    # Stop and remove existing container
    echo "Stopping existing container..."
    docker stop ${CONTAINER_NAME} 2>/dev/null || true
    docker rm ${CONTAINER_NAME} 2>/dev/null || true
    
    # Run new container
    echo "Starting new container on port ${SERVER_PORT}..."
    docker run -d \
        -p ${SERVER_PORT}:${CONTAINER_PORT} \
        --name ${CONTAINER_NAME} \
        --restart unless-stopped \
        ${PROJECT_NAME}
    
    # Clean up
    rm /tmp/${PROJECT_NAME}.tar
    
    # Show container status
    echo "Container status:"
    docker ps | grep ${CONTAINER_NAME}
EOF

# Clean up local tar file
rm ${PROJECT_NAME}.tar

echo "✅ Deployment complete!"
echo "🌐 Site available at: http://biyuboxing.com"
echo "🔧 Container running on server port ${SERVER_PORT}"
echo ""
echo "To check status: ssh ${SERVER_USER}@${SERVER_IP} 'docker ps | grep ${CONTAINER_NAME}'"
echo "To view logs: ssh ${SERVER_USER}@${SERVER_IP} 'docker logs ${CONTAINER_NAME}'"