# returns-ui
Vue.js UI for catch returns with Auth0 authentication and authorization

# Redirect traffic to index for external mapped request
 Because this is a single page app which uses a third party identity provider (Auth0) authentication requests are
 forwarded to an Auth0 host page. We supply a callback URL to the host page which it forwards to upon a successfuly auth
 That URL is a mapped component, within out Vue-router and so we must ensure that requests from external sources, such
 as Auth0, are handled by the vue-router. This means forwarding all request through index.html.

 To do this when deployed to Apache we add the following .htaccess file in /var/www/html/

```xml
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . index.html [L]
</IfModule>
```

Alternatively, when running this application from Node using the server.js file, we must add configuration to do the same
 with the express server.

 ```
app.use(function(req, res, next) {
     if (req.url == '/callback') {
       res.sendfile(__dirname + '/dist/index.html');
     } else {
       next();
     }
 });
 ```


