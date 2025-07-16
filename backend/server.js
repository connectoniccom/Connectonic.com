require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
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
const allowedOrigins = ['https://9000-firebase-studio-1750940658370.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev', 'https://connectoniccom.github.io'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
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
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
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
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    const newUser = { id: Date.now().toString(), email: email, password: hash, provider: 'local' };
    users.push(newUser);
    console.log('User registered:', newUser);
    console.log('All users:', users);
    res.status(201).json({ message: 'User created successfully' });
  });
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

app.get('/api/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('https://connectoniccom.github.io/Connect.world/');
  });
});

app.get('/api/current_user', (req, res) => {
  res.json(req.user);
});

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('https://connectoniccom.github.io/Connect.world/');
});

// Facebook Auth Routes
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('https://connectoniccom.github.io/Connect.world/');
});

// GitHub Auth Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('https://connectoniccom.github.io/Connect.world/');
});


// --- API Routes ---
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
