Here is the entire README content with all steps combined in a single block for easy copying:

# Vite + React App Deployment

This project is a React application built with Vite. The guide below provides steps to deploy the app on an Ubuntu server using Nginx.

## Prerequisites

Before starting, ensure the following are installed and configured:

- **Node.js and npm**: Required to build the project.
- **Nginx**: For serving the application.
- **Ubuntu server access**: You have SSH access to the server.
- **Domain name** (optional): If you want to set up a custom domain.

## Step 1: Build the Vite + React App

First, build the production version of the Vite + React application, you need:

````bash
cd validatorvn
npm install
npm run build

This command will create a `dist` folder containing the static files required for deployment.

## Step 2: Install Nginx

If Nginx is not already installed, install it on your Ubuntu server:

```bash
sudo apt update
sudo apt install nginx -y
````

## Step 3: Configure Nginx

1. **Create a new Nginx configuration file** for your app:

   ```bash
   sudo nano /etc/nginx/sites-available/your-app
   ```

2. **Add the following configuration**, replacing `your-app.com` with your domain name or server IP:

   ```nginx
   server {
       listen 80;
       server_name your-app.com www.your-app.com;

       root /var/www/your-app/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       error_page 404 /index.html;

       location ~ /\.ht {
           deny all;
       }
   }
   ```

3. **Enable the configuration** by creating a symbolic link:

   ```bash
   sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
   ```

4. **Test the Nginx configuration**:

   ```bash
   sudo nginx -t
   ```

   If there are no errors, restart Nginx:

   ```bash
   sudo systemctl restart nginx
   ```

## Step 4: Deploy the App

1. **Upload the contents of the `dist` folder** to your server. Place them in `/var/www/your-app`:

   ```bash
   sudo mkdir -p /var/www/your-app
   sudo cp -r dist/* /var/www/your-app/
   ```

2. **Set the correct permissions for Nginx** to access the files:

   ```bash
   sudo chown -R www-data:www-data /var/www/your-app
   ```

3. **Access the app in your browser** at `http://your-app.com` or your server's IP address.

## Step 5: Optional - Enable HTTPS with Let's Encrypt

1. **Install Certbot**:

   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain an SSL certificate**:

   ```bash
   sudo certbot --nginx -d your-app.com -d www.your-app.com
   ```

3. **Follow the prompts** to complete the installation. Certbot will automatically configure Nginx to use the SSL certificate.

4. **Set up automatic certificate renewal**:

   ```bash
   sudo crontab -e
   ```

   Add the following line to the crontab to renew the certificate daily:

   ```bash
   0 0 * * * /usr/bin/certbot renew --quiet
   ```

## Troubleshooting

- **If the app does not load**, check the Nginx error logs:

  ```bash
  sudo tail -f /var/log/nginx/error.log
  ```

- **Verify that the `dist` folder** was copied correctly to `/var/www/your-app`.

- **Ensure your domain** is pointing to the correct server IP address in your DNS settings.

## Useful Commands

- **Test Nginx Configuration**: `sudo nginx -t`
- **Restart Nginx**: `sudo systemctl restart nginx`
- **View Nginx Error Logs**: `sudo tail -f /var/log/nginx/error.log`

## License

This project is open-source and available under the MIT License.

```

This README content is formatted as a single block to make it easy for you to copy and paste into your project's README file on GitHub.
```
