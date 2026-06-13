#!/bin/bash
echo "==================================================="
echo "  Cloudflare Pages Deployment for thedustyphoenix"
echo "==================================================="
echo

echo "[1/3] Building the website..."
npm run build
if [ $? -ne 0 ]; then
    echo
    echo "[ERROR] Build failed! Please fix any code errors first."
    echo
    echo "This window will stay open so you can read the output."
    echo "Press Enter to close this window..."
    read
    exit 1
fi

echo
echo "[2/3] Checking Cloudflare authorization..."
echo "If a browser window opens, please log in to your Cloudflare account."
echo
npx wrangler login

echo
echo
echo "Your Cloudflare production branch is configured as 'production' (direct deploy)."
DEPLOY_BRANCH="production"

echo
echo "[3/3] Deploying to Cloudflare Pages (thedustyphoenix, branch: $DEPLOY_BRANCH)..."
npx wrangler pages deploy dist --project-name=thedustyphoenix --branch="$DEPLOY_BRANCH"
if [ $? -ne 0 ]; then
    echo
    echo "[ERROR] Deployment failed!"
    echo
    echo "This window will stay open so you can read the output."
    echo "Press Enter to close this window..."
    read
    exit 1
fi

echo
echo "==================================================="
echo "🎉 SUCCESS! Your website is updated on Cloudflare Pages!"
echo "==================================================="
echo
echo "This window will stay open so you can read the output."
echo "Press Enter to close this window..."
read
