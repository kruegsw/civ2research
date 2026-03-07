# Civ2 Viewer Deployment Guide

Target: Ubuntu server with Apache2 + HTTPS (Let's Encrypt) already configured.
Domain: charlization.com
URL: https://charlization.com/civ2/

---

## Step 1: Enable Apache proxy modules (skip if already done for trevdor)

```bash
sudo a2enmod proxy proxy_http proxy_wstunnel
```

## Step 2: Add proxy rules to Apache

Edit your HTTPS virtual host config:
```bash
sudo nano /etc/apache2/sites-available/YOUR-SSL-CONFIG.conf
```

Add these lines INSIDE the `<VirtualHost *:443>` block, before `</VirtualHost>`:
```apache
    # ── Civ2 Viewer (port 8788) ──
    # WebSocket proxy (MUST come before the HTTP proxy)
    ProxyPass /civ2/ws ws://127.0.0.1:8788/ws
    ProxyPassReverse /civ2/ws ws://127.0.0.1:8788/ws

    # HTTP proxy for static files
    ProxyPass /civ2/ http://127.0.0.1:8788/
    ProxyPassReverse /civ2/ http://127.0.0.1:8788/
```

Test config and restart:
```bash
sudo apache2ctl configtest
sudo systemctl restart apache2
```

## Step 3: Clone and set up

```bash
cd /opt
sudo mkdir -p civ2
sudo chown $USER:$USER civ2
git clone https://github.com/kruegsw/civ2research.git civ2-repo
ln -s /opt/civ2-repo/charlizationv3 /opt/civ2
cd /opt/civ2
npm install
```

## Step 4: Start with pm2

```bash
pm2 start server/server.js --name civ2
pm2 save
```

## Step 5: Test

Open https://charlization.com/civ2/ in your browser.

---

## Useful pm2 commands

```bash
pm2 status          # Check if running
pm2 logs civ2       # See server logs
pm2 restart civ2    # Restart after code changes
pm2 stop civ2       # Stop the server
```

## Updating after code changes

```bash
cd /opt/civ2
git pull
npm install
pm2 restart civ2
```

## Local development

```bash
npm install
npm start
# Open http://localhost:8788
```
