const fs = require('fs-extra');
const path = require('path');

class ProfileManager {
  constructor() {
    this.profilesDir = path.join(__dirname, '../config/profiles');
    fs.ensureDirSync(this.profilesDir);
  }

  saveProfile(name, config) {
    const profilePath = path.join(this.profilesDir, `${name}.json`);
    fs.writeJsonSync(profilePath, config, { spaces: 2 });
    console.log(`✅ Profil "${name}" gespeichert`);
  }

  loadProfile(name) {
    const profilePath = path.join(this.profilesDir, `${name}.json`);
    if (!fs.existsSync(profilePath)) {
      throw new Error(`Profil "${name}" nicht gefunden`);
    }
    return fs.readJsonSync(profilePath);
  }

  deleteProfile(name) {
    const profilePath = path.join(this.profilesDir, `${name}.json`);
    if (fs.existsSync(profilePath)) {
      fs.removeSync(profilePath);
      console.log(`🗑️ Profil "${name}" gelöscht`);
    }
  }

  listProfiles() {
    const files = fs.readdirSync(this.profilesDir);
    return files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  }

  duplicateProfile(sourceName, newName) {
    const source = this.loadProfile(sourceName);
    this.saveProfile(newName, source);
    console.log(`📋 Profil "${sourceName}" als "${newName}" dupliziert`);
  }
}

module.exports = new ProfileManager();
