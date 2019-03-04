#!/bin/bash

export COMPOSER_CARD=admin@gridly
export COMPOSER_NAMESPACES=never
export COMPOSER_AUTHENTICATION=true
export COMPOSER_PROVIDERS='{
    "google": {
        "provider": "google",
        "module": "passport-google-oauth2",
        "clientID": "1087558561551-8popcehm8qskiqdkkbg5ga4qfs98aeue.apps.googleusercontent.com",
        "clientSecret": "6m77Aph4yLSGHDP3aw0Tg_mo",
        "authPath": "/auth/google",
        "callbackURL": "/auth/google/callback",
        "scope": "https://www.googleapis.com/auth/plus.login",
        "successRedirect": "/",
        "failureRedirect": "/"
    }
}'

composer-rest-server
