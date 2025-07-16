const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3001;

// --- In-memory user store (for demonstration purposes) ---
const users = [];

// --- Middleware Setup ---
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend to access
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'a_very_secret_key_that_should_be_in_env_vars',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// --- Passport Configuration ---
// Local Strategy (Email/Password)
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  const user = users.find(u => u.email === email);
  if (!user) {
    return done(null, false, { message: 'Incorrect email.' });
  }
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Password incorrect' });
    }
  });
}));

// Google Strategy
passport.use(new GoogleStrategy({
    // Replace these with your actual credentials from the Google Cloud Console
    clientID: '737297307622-vi8817pmmk4q9kmq4i18ciutofiko218.apps.googleusercontent.com', 
    clientSecret: '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',
    callbackURL: 'https://3001-firebase-studio-1750940658370.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // Find or create user
    let user = users.find(u => u.id === profile.id);
    if (!user) {
      user = { id: profile.id, displayName: profile.displayName, provider: 'google' };
      users.push(user);
    }
    return done(null, user);
  }
));

// Facebook Strategy
passport.use(new FacebookStrategy({
    // Replace these with your actual credentials from the Facebook for Developers portal
    clientID: process.env.FACEBOOK_APP_ID || 'PASTE_YOUR_FACEBOOK_APP_ID_HERE', 
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'PASTE_YOUR_FACEBOOK_APP_SECRET_HERE',
    callbackURL: 'https://3001-firebase-studio-1750940658370.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/auth/facebook/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    let user = users.find(u => u.id === profile.id);
    if (!user) {
      user = { id: profile.id, displayName: profile.displayName, provider: 'facebook' };
      users.push(user);
    }
    return done(null, user);
  }
));

// GitHub Strategy
passport.use(new GitHubStrategy({
    // Replace these with your actual credentials from your GitHub Developer Settings
    clientID: process.env.GITHUB_CLIENT_ID || 'PASTE_YOUR_GITHUB_CLIENT_ID_HERE', 
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'PASTE_YOUR_GITHUB_CLIENT_SECRET_HERE',
    callbackURL: 'https://3001-firebase-studio-1750940658370.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/auth/github/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    let user = users.find(u => u.id === profile.id);
    if (!user) {
      user = { id: profile.id, displayName: profile.displayName, provider: 'github' };
      users.push(user);
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});


// --- API Data ---
const artistsData = [
    {
      name: 'Luminous Nexus',
      bio: 'An electronic duo known for their ethereal soundscapes and synth-driven melodies.',
      tracks: [ { title: 'Celestial Drift' }, { title: 'Neon Tides' } ],
    },
    {
      name: 'Echoes of Chronos',
      bio: 'A solo artist who blends classical piano with futuristic ambient textures.',
      tracks: [ { title: 'Temporal Echoes' }, { title: 'Faded Photograph' } ],
    },
];

const newsData = [
  { id: 1, title: 'New Album "Digital Dawn" Released!', summary: 'Luminous Nexus has just dropped their latest album...', date: '2024-07-20' },
  { id: 2, title: 'Echoes of Chronos Announces World Tour', summary: 'Following the success of their latest video...', date: '2024-07-18' },
];

// --- Authentication Routes ---
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    const newUser = { id: Date.now().toString(), email: email, password: hash, provider: 'local' };
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
  });
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

app.get('/api/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/api/current_user', (req, res) => {
  res.json(req.user);
});

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('http://localhost:3000/'); // Redirect to home on success
});

// Facebook Auth Routes
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('http://localhost:3000/');
});

// GitHub Auth Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('http://localhost:3000/');
});


// --- API Routes ---
app.get('/', (req, res) => {
  res.send('Backend server is running. Ready to serve API data.');
});

app.get('/api/artists', (req, res) => {
  res.json(artistsData);
});

app.get('/api/news', (req, res) => {
  res.json(newsData);
});


// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
