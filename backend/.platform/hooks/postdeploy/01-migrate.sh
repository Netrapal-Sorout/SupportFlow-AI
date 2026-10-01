#!/bin/bash
set -e

cd /var/app/current

echo "Running Prisma production migrations..."

npm run db:deploy

echo "Prisma migrations completed successfully."