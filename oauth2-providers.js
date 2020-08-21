module.exports = {
    "facebook-login": {
        "provider": "facebook",
        "module": "passport-facebook",
        "profileFields": ["gender", "link", "locale", "name", "timezone",
        "verified", "email", "updated_time", "displayName", "id"],
        "clientID": process.env.facebook_client_id,
        "clientSecret": process.env.facebook_client_secret,
        "callbackURL": "/api/auth/thirdparty/facebook/callback",
        "authPath": "/api/auth/thirdparty/facebook",
        "callbackPath": "/api/auth/thirdparty/facebook/callback",
        "successRedirect": "/auth/account",
        "failureRedirect": "/login",
        "scope": ["email"],
        "failureFlash": true
    },
    "google-login": {
        "provider": "google",
        "module": "passport-google-oauth2",
        "strategy": "OAuth2Strategy",
        "clientID": process.env.google_client_id,
        "clientSecret": process.env.google_client_secret,
        "callbackURL": "/api/auth/thirdparty/google/callback",
        "authPath": "/api/auth/thirdparty/google",
        "callbackPath": "/api/auth/thirdparty/google/callback",
        "successRedirect": "/auth/account",
        "failureRedirect": "/login",
        "scope": ["email", "profile"],
        "failureFlash": true
    },
    "oauth2": {
        "provider": "oauth2",
        "module": "passport-oauth2",
        "strategy": "OAuth2Strategy",
        "authPath": "/api/auth/thirdparty/oauth2",
        "callbackPath": "/api/auth/thirdparty/oauth2/callback",
        "successRedirect": "/auth/account",
        "failureRedirect": "/login",
        "scope": ["email", "profile"],
        "failureFlash": true,
        "clientID": "1111",
        "clientSecret": "app1_secret",
        "callbackURL": "http://localhost:3000/api/auth/thirdparty/oauth2/callback",
        "authorizationURL": "http://localhost:9000/oauth/dialog",
        "tokenURL": "http://localhost:9000/oauth/token"
    }
};
