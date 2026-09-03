# ============================================================
# HelpDesk Pro - One-Shot Deploy Script
# Run this in PowerShell AFTER extracting the ZIP
# ============================================================

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  HelpDesk Pro - Deploy Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify we're in the right folder
Write-Host "[1/5] Verifying project folder..." -ForegroundColor Yellow

if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "You must run this script from inside the helpdesk-deploy folder." -ForegroundColor Red
    Write-Host ""
    Write-Host "Fix:" -ForegroundColor Yellow
    Write-Host "  cd C:\Users\hp\Desktop\HelpDesk\helpdesk-deploy" -ForegroundColor White
    Write-Host "  .\deploy.ps1" -ForegroundColor White
    exit 1
}

$pkg = Get-Content "package.json" | ConvertFrom-Json
if ($pkg.name -ne "helpdesk-pro") {
    Write-Host "ERROR: Wrong project! package.json says: $($pkg.name)" -ForegroundColor Red
    Write-Host "You must be in the helpdesk-deploy folder, NOT HelpDesk\HelpDesk." -ForegroundColor Red
    exit 1
}

Write-Host "OK - Project: $($pkg.name) v$($pkg.version)" -ForegroundColor Green

# Step 2: Install dependencies
Write-Host ""
Write-Host "[2/5] Installing dependencies..." -ForegroundColor Yellow
npm install --no-audit --no-fund
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm install failed!" -ForegroundColor Red
    exit 1
}
Write-Host "OK - Dependencies installed" -ForegroundColor Green

# Step 3: Test the build locally
Write-Host ""
Write-Host "[3/5] Testing build locally..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed! Check the errors above." -ForegroundColor Red
    exit 1
}
Write-Host "OK - Build successful" -ForegroundColor Green

# Step 4: Git init + commit
Write-Host ""
Write-Host "[4/5] Setting up Git..." -ForegroundColor Yellow

# Check if .env exists locally (shouldn't, but just in case)
if (Test-Path ".env") {
    Write-Host "WARNING: .env file found. It will NOT be committed (in .gitignore)." -ForegroundColor Yellow
}

# Initialize git (or reuse existing)
if (-not (Test-Path ".git")) {
    git init
}
git add .
git commit -m "Initial commit: HelpDesk Pro - IT Help Desk Visual Prototype" --allow-empty
git branch -M main

Write-Host "OK - Git ready" -ForegroundColor Green

# Step 5: Push to GitHub
Write-Host ""
Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: When Git asks for credentials:" -ForegroundColor Cyan
Write-Host "  Username: MahmoudHusamAbdeen" -ForegroundColor White
Write-Host "  Password: Your Personal Access Token (NOT your GitHub password)" -ForegroundColor White
Write-Host "  Get one at: https://github.com/settings/tokens" -ForegroundColor White
Write-Host ""

$repoUrl = "https://github.com/MahmoudHusamAbdeen/helpdesk-pro.git"

# Try to add remote, or update if it exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    git remote set-url origin $repoUrl
} else {
    git remote add origin $repoUrl
}

git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Push failed. Common fixes:" -ForegroundColor Yellow
    Write-Host "  1. Create the repo first at: https://github.com/new" -ForegroundColor White
    Write-Host "     - Name: helpdesk-pro" -ForegroundColor White
    Write-Host "     - Public" -ForegroundColor White
    Write-Host "     - DO NOT check 'Initialize with README'" -ForegroundColor White
    Write-Host "  2. Use a Personal Access Token as password" -ForegroundColor White
    Write-Host "  3. Run this script again" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  SUCCESS! Code pushed to GitHub" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your repo: https://github.com/MahmoudHusamAbdeen/helpdesk-pro" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT: Deploy to Vercel" -ForegroundColor Yellow
Write-Host "  1. Go to: https://vercel.com/mahmoodhusamabdeen2004-8363s-projects" -ForegroundColor White
Write-Host "  2. Click 'Add New' -> 'Project'" -ForegroundColor White
Write-Host "  3. Import 'MahmoudHusamAbdeen/helpdesk-pro'" -ForegroundColor White
Write-Host "  4. Click 'Deploy' (don't change any settings)" -ForegroundColor White
Write-Host "  5. Wait 60 seconds - you're live!" -ForegroundColor White
Write-Host ""
