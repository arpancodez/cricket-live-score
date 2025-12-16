# Deployment Guide

## Vercel Deployment

This app is optimized for Vercel:

```bash
vercel deploy
```

## Environment Setup

### Required Variables
- `DATABASE_URL` - MongoDB connection string
- `API_KEY` - Cricket API key
- `JWT_SECRET` - JWT signing secret

## Docker Deployment

```bash
docker build -t cricket-live-score .
docker run -p 3000:3000 cricket-live-score
```

## Production Checklist

- [ ] Update environment variables
- [ ] Run tests
- [ ] Build optimized bundle
- [ ] Configure CDN
- [ ] Set up monitoring
- [ ] Enable HTTPS
- [ ] Configure rate limiting

## Monitoring

Use Vercel Analytics for:
- Performance metrics
- Error tracking
- Database queries

## Rollback Procedure

Vercel automatically maintains previous deployments. Use:

```bash
vercel rollback
```
