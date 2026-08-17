const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('ui'));

// Import Manager
const configGenerator = require('./scripts/config-generator');
const profileManager = require('./scripts/profile-manager');
const hudManager = require('./scripts/hud-manager');
const weaponManager = require('./scripts/weapon-manager');

// === API ENDPOINTS ===

// HUD Endpoints
app.get('/api/hud/defaults', (req, res) => {
  try {
    const defaults = fs.readJsonSync('./config/hud-defaults.json');
    res.json(defaults);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load HUD defaults' });
  }
});

app.post('/api/hud/update', (req, res) => {
  try {
    const hudData = req.body;
    fs.writeJsonSync('./config/hud-current.json', hudData, { spaces: 2 });
    res.json({ success: true, message: 'HUD aktualisiert' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update HUD' });
  }
});

// Weapon Endpoints
app.get('/api/weapons/defaults', (req, res) => {
  try {
    const defaults = fs.readJsonSync('./config/weapons-defaults.json');
    res.json(defaults);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load weapon defaults' });
  }
});

app.post('/api/weapons/update', (req, res) => {
  try {
    const weaponData = req.body;
    fs.writeJsonSync('./config/weapons-current.json', weaponData, { spaces: 2 });
    res.json({ success: true, message: 'Waffen aktualisiert' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update weapons' });
  }
});

// Settings Endpoints
app.get('/api/settings/defaults', (req, res) => {
  try {
    const gameplayDefaults = fs.readJsonSync('./config/gameplay-defaults.json');
    const videoDefaults = fs.readJsonSync('./config/video-defaults.json');
    const audioDefaults = fs.readJsonSync('./config/audio-defaults.json');
    
    res.json({
      gameplay: gameplayDefaults,
      video: videoDefaults,
      audio: audioDefaults
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load settings defaults' });
  }
});

app.post('/api/settings/update', (req, res) => {
  try {
    const { gameplay, video, audio } = req.body;
    
    if (gameplay) fs.writeJsonSync('./config/gameplay-current.json', gameplay, { spaces: 2 });
    if (video) fs.writeJsonSync('./config/video-current.json', video, { spaces: 2 });
    if (audio) fs.writeJsonSync('./config/audio-current.json', audio, { spaces: 2 });
    
    res.json({ success: true, message: 'Einstellungen aktualisiert' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Profile Endpoints
app.get('/api/profiles/list', (req, res) => {
  try {
    const profiles = profileManager.listProfiles();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list profiles' });
  }
});

app.post('/api/profiles/save', (req, res) => {
  try {
    const { name, config } = req.body;
    profileManager.saveProfile(name, config);
    res.json({ success: true, message: `Profil "${name}" gespeichert` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

app.post('/api/profiles/load', (req, res) => {
  try {
    const { name } = req.body;
    const config = profileManager.loadProfile(name);
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

app.post('/api/profiles/delete', (req, res) => {
  try {
    const { name } = req.body;
    profileManager.deleteProfile(name);
    res.json({ success: true, message: `Profil "${name}" gelöscht` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});

// Config Generation
app.post('/api/generate/autoexec', (req, res) => {
  try {
    const { hud, weapons, gameplay, video, audio } = req.body;
    const autoexecContent = configGenerator.generateAutoexec({
      hud, weapons, gameplay, video, audio
    });
    
    const outputPath = path.join(__dirname, 'output', 'autoexec.cfg');
    fs.ensureDirSync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, autoexecContent);
    
    res.json({ 
      success: true, 
      message: 'autoexec.cfg generiert',
      content: autoexecContent,
      path: outputPath
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate autoexec' });
  }
});

// Export Config
app.post('/api/export/config', (req, res) => {
  try {
    const config = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `cs2-config-${timestamp}.json`;
    
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(config, null, 2));
  } catch (err) {
    res.status(500).json({ error: 'Failed to export config' });
  }
});

// Import Config
app.post('/api/import/config', (req, res) => {
  try {
    const config = req.body;
    
    if (config.hud) fs.writeJsonSync('./config/hud-current.json', config.hud, { spaces: 2 });
    if (config.weapons) fs.writeJsonSync('./config/weapons-current.json', config.weapons, { spaces: 2 });
    if (config.gameplay) fs.writeJsonSync('./config/gameplay-current.json', config.gameplay, { spaces: 2 });
    if (config.video) fs.writeJsonSync('./config/video-current.json', config.video, { spaces: 2 });
    if (config.audio) fs.writeJsonSync('./config/audio-current.json', config.audio, { spaces: 2 });
    
    res.json({ success: true, message: 'Konfiguration importiert' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to import config' });
  }
});

// Backup
app.post('/api/backup/create', (req, res) => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, 'backups', `backup-${timestamp}`);
    
    fs.ensureDirSync(backupDir);
    fs.copySync(path.join(__dirname, 'config'), backupDir);
    
    res.json({ success: true, message: 'Backup erstellt', path: backupDir });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create backup' });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`🎮 CS2 Customization Manager läuft auf http://localhost:${PORT}`);
  console.log(`📁 Öffne http://localhost:${PORT} in deinem Browser`);
});
