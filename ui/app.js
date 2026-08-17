// CS2 Customization Manager - Frontend App
class CS2ConfigManager {
  constructor() {
    this.currentConfig = {
      hud: {},
      weapons: {},
      gameplay: {},
      video: {},
      audio: {}
    };
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadDefaults();
    this.setupTabNavigation();
  }

  setupEventListeners() {
    // HUD
    document.getElementById('saveHUD')?.addEventListener('click', () => this.saveHUD());
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.loadPreset(e.target.dataset.preset));
    });

    // Range inputs
    ['radarScale', 'hudScale', 'crosshairSize', 'crosshairThickness', 'crosshairGap'].forEach(id => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.addEventListener('input', (e) => {
          const displayId = id + 'Value';
          const display = document.getElementById(displayId);
          if (display) display.textContent = e.target.value;
        });
      }
    });

    // Weapons
    document.getElementById('saveWeapons')?.addEventListener('click', () => this.saveWeapons());
    ['viewmodelFov', 'offsetX', 'offsetY', 'offsetZ'].forEach(id => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.addEventListener('input', (e) => {
          const displayId = id + 'Value';
          const display = document.getElementById(displayId);
          if (display) display.textContent = e.target.value;
        });
      }
    });

    // Settings
    document.getElementById('saveSettings')?.addEventListener('click', () => this.saveSettings());
    ['fpsMax', 'gamma', 'masterVolume', 'musicVolume', 'headphonePan'].forEach(id => {
      const elem = document.getElementById(id);
      if (elem && elem.type === 'range') {
        elem.addEventListener('input', (e) => {
          const displayId = id + 'Value';
          const display = document.getElementById(displayId);
          if (display) display.textContent = e.target.value;
        });
      }
    });

    // Profiles
    document.getElementById('saveProfile')?.addEventListener('click', () => this.saveProfile());
    document.getElementById('createBackup')?.addEventListener('click', () => this.createBackup());
    this.loadProfiles();

    // Export/Import
    document.getElementById('exportConfig')?.addEventListener('click', () => this.exportConfig());
    document.getElementById('importConfig')?.addEventListener('click', () => this.importConfig());
    document.getElementById('generateAutoexec')?.addEventListener('click', () => this.generateAutoexec());
  }

  setupTabNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        this.showTab(tabName);
      });
    });
  }

  showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });

    // Remove active from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.classList.add('active');

    // Add active to selected button
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
  }

  async loadDefaults() {
    try {
      const response = await fetch('/api/hud/defaults');
      this.currentConfig.hud = await response.json();
      this.updateHUDUI();
    } catch (err) {
      console.error('Error loading HUD defaults:', err);
    }
  }

  updateHUDUI() {
    const hud = this.currentConfig.hud;
    if (hud.radarScale) document.getElementById('radarScale').value = hud.radarScale;
    if (hud.hudScale) document.getElementById('hudScale').value = hud.hudScale;
    if (hud.crosshair) {
      const ch = hud.crosshair;
      document.getElementById('crosshairStyle').value = ch.style || 4;
      document.getElementById('crosshairSize').value = ch.size || 2;
      document.getElementById('crosshairThickness').value = ch.thickness || 0.5;
      document.getElementById('crosshairGap').value = ch.gap || -2;
      document.getElementById('crosshairColorR').value = ch.colorR || 0;
      document.getElementById('crosshairColorG').value = ch.colorG || 255;
      document.getElementById('crosshairColorB').value = ch.colorB || 0;
    }
  }

  async loadPreset(presetName) {
    try {
      const response = await fetch(`/api/hud/defaults`);
      const defaults = await response.json();
      // In a real app, presets would come from server
      alert(`Preset "${presetName}" geladen! (Demo)`);
    } catch (err) {
      console.error('Error loading preset:', err);
    }
  }

  async saveHUD() {
    const hudConfig = {
      radarScale: parseFloat(document.getElementById('radarScale').value),
      hudScale: parseFloat(document.getElementById('hudScale').value),
      deathnotices: parseInt(document.getElementById('deathnotices').value),
      radarRotating: parseInt(document.getElementById('radarRotating').value),
      crosshair: {
        style: parseInt(document.getElementById('crosshairStyle').value),
        size: parseFloat(document.getElementById('crosshairSize').value),
        thickness: parseFloat(document.getElementById('crosshairThickness').value),
        gap: parseFloat(document.getElementById('crosshairGap').value),
        colorR: parseInt(document.getElementById('crosshairColorR').value),
        colorG: parseInt(document.getElementById('crosshairColorG').value),
        colorB: parseInt(document.getElementById('crosshairColorB').value),
        drawOutline: parseInt(document.getElementById('crosshairOutline').value)
      }
    };

    try {
      const response = await fetch('/api/hud/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hudConfig)
      });
      const data = await response.json();
      this.showNotification('✅ HUD gespeichert!');
      this.currentConfig.hud = hudConfig;
    } catch (err) {
      this.showNotification('❌ Fehler beim Speichern');
      console.error('Error saving HUD:', err);
    }
  }

  async saveWeapons() {
    const weaponConfig = {
      viewmodelRecoil: 1,
      viewmodelFov: parseInt(document.getElementById('viewmodelFov').value),
      offsetX: parseFloat(document.getElementById('offsetX').value),
      offsetY: parseFloat(document.getElementById('offsetY').value),
      offsetZ: parseFloat(document.getElementById('offsetZ').value),
      bobStyle: 0
    };

    try {
      const response = await fetch('/api/weapons/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weaponConfig)
      });
      this.showNotification('✅ Waffen gespeichert!');
      this.currentConfig.weapons = weaponConfig;
    } catch (err) {
      this.showNotification('❌ Fehler beim Speichern');
    }
  }

  async saveSettings() {
    const settingsConfig = {
      gameplay: {
        showFps: parseInt(document.getElementById('showFps').value),
        netGraph: parseInt(document.getElementById('netGraph').value),
        autoWeaponSwitch: parseInt(document.getElementById('autoWeaponSwitch').value),
        rate: parseInt(document.getElementById('rate').value)
      },
      video: {
        fpsMax: parseInt(document.getElementById('fpsMax').value),
        antiAlias: parseInt(document.getElementById('antiAlias').value),
        gamma: parseFloat(document.getElementById('gamma').value)
      },
      audio: {
        masterVolume: parseFloat(document.getElementById('masterVolume').value),
        musicVolume: parseFloat(document.getElementById('musicVolume').value),
        headphonePan: parseFloat(document.getElementById('headphonePan').value)
      }
    };

    try {
      const response = await fetch('/api/settings/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsConfig)
      });
      this.showNotification('✅ Einstellungen gespeichert!');
      this.currentConfig = { ...this.currentConfig, ...settingsConfig };
    } catch (err) {
      this.showNotification('❌ Fehler beim Speichern');
    }
  }

  async saveProfile() {
    const profileName = document.getElementById('profileName').value.trim();
    if (!profileName) {
      this.showNotification('❌ Profilname eingeben!');
      return;
    }

    try {
      const response = await fetch('/api/profiles/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profileName, config: this.currentConfig })
      });
      this.showNotification(`✅ Profil "${profileName}" gespeichert!`);
      document.getElementById('profileName').value = '';
      this.loadProfiles();
    } catch (err) {
      this.showNotification('❌ Fehler beim Speichern');
    }
  }

  async loadProfiles() {
    try {
      const response = await fetch('/api/profiles/list');
      const profiles = await response.json();
      const profilesList = document.getElementById('profilesList');
      if (profilesList) {
        profilesList.innerHTML = profiles.map(name => `
          <div class="list-item">
            <span class="list-item-name">${name}</span>
            <button class="list-item-btn" onclick="manager.loadProfile('${name}')">Laden</button>
            <button class="list-item-btn delete" onclick="manager.deleteProfile('${name}')">Löschen</button>
          </div>
        `).join('');
      }
    } catch (err) {
      console.error('Error loading profiles:', err);
    }
  }

  async loadProfile(name) {
    try {
      const response = await fetch('/api/profiles/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      this.currentConfig = await response.json();
      this.updateHUDUI();
      this.showNotification(`✅ Profil "${name}" geladen!`);
    } catch (err) {
      this.showNotification('❌ Fehler beim Laden');
    }
  }

  async deleteProfile(name) {
    if (!confirm(`Profil "${name}" wirklich löschen?`)) return;

    try {
      const response = await fetch('/api/profiles/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      this.showNotification(`✅ Profil "${name}" gelöscht!`);
      this.loadProfiles();
    } catch (err) {
      this.showNotification('❌ Fehler beim Löschen');
    }
  }

  async createBackup() {
    try {
      const response = await fetch('/api/backup/create', { method: 'POST' });
      const data = await response.json();
      this.showNotification('✅ Backup erstellt!');
    } catch (err) {
      this.showNotification('❌ Fehler beim Backup');
    }
  }

  async exportConfig() {
    try {
      const response = await fetch('/api/export/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.currentConfig)
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cs2-config-${new Date().getTime()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showNotification('✅ Config exportiert!');
    } catch (err) {
      this.showNotification('❌ Fehler beim Export');
    }
  }

  async importConfig() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput?.files[0];
    if (!file) {
      this.showNotification('❌ Datei auswählen!');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const config = JSON.parse(e.target.result);
        const response = await fetch('/api/import/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config)
        });
        this.currentConfig = config;
        this.updateHUDUI();
        this.showNotification('✅ Config importiert!');
        fileInput.value = '';
      } catch (err) {
        this.showNotification('❌ Fehler beim Import');
      }
    };
    reader.readAsText(file);
  }

  async generateAutoexec() {
    try {
      const response = await fetch('/api/generate/autoexec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.currentConfig)
      });
      const data = await response.json();
      const preview = document.getElementById('autoexecPreview');
      if (preview) preview.value = data.content;
      this.showNotification('✅ autoexec.cfg generiert!');
    } catch (err) {
      this.showNotification('❌ Fehler beim Generieren');
    }
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 255, 136, 0.2);
      color: #00ff88;
      padding: 15px 25px;
      border-radius: 6px;
      border: 1px solid #00ff88;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

// Global manager instance
let manager;
document.addEventListener('DOMContentLoaded', () => {
  manager = new CS2ConfigManager();
});
