# Coolify Deployment Guide

This guide explains how to deploy this Next.js application on Coolify using Nixpacks.

## Coolify Configuration

### Build Settings

1. **Build Pack**: Select `Nixpacks` (not Docker)
2. **Port**: Coolify will automatically assign a port (typically 3000)
3. **Output Directory**: Leave empty (not a static site anymore)

### Environment Variables

Coolify will automatically set:
- `PORT` - The port the application should listen on
- `NODE_ENV=production` - Set by nixpacks.toml

### Domain Configuration

- **Root Domain** (thomasscheiber.com): Point to this application
- Coolify will handle the reverse proxy automatically
- Cloudflare should proxy through to your VPS

### Important Notes

1. **No Static Export**: This app uses SSR, so do NOT enable "Is it a static site?" in Coolify
2. **No Output Directory**: Do NOT set an output directory (removed `/out` folder)
3. **Health Endpoint**: The app includes `/api/health` for monitoring

### Troubleshooting

If the app doesn't start:
- Check that `nixpacks.toml` is in the repository root
- Verify Node.js 22 is being used (check build logs)
- Ensure the PORT environment variable is set by Coolify
- Check that the app is listening on `0.0.0.0` (configured in nixpacks.toml)

