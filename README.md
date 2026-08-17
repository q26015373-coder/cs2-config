# CS2 Customization Manager 🎮

Ein umfassendes Tool zur Verwaltung deines Counter-Strike 2 HUD Designs, Weapon Skins, Einstellungen und mehr.

## 🎯 Features

- 🎮 **HUD Design Manager** - Vollständige HUD-Anpassung (Crosshair, Radar, Scoreboard, etc.)
- 🔫 **Weapon Skin Manager** - Verwaltung aller Weapon Skins und Stattrak
- ⚙️ **Game Settings** - Video-, Audio- und Gameplay-Einstellungen
- 🎨 **Color & Theme System** - Individuelle Farben und Themes
- 💾 **Profil-System** - Speichern und Laden von verschiedenen Profilen
- 🔄 **Auto-Backup** - Automatische Backups deiner Konfigurationen
- 📊 **Export/Import** - Konfigurationen teilen und importieren
- 🖥️ **Web-Interface** - Benutzerfreundliche GUI

## 📦 Installation

```bash
# Repository klonen
git clone https://github.com/q26015373-coder/cs2-config.git
cd cs2-config

# Dependencies installieren
npm install

# App starten
npm start
```

Die App läuft dann auf **http://localhost:3000**

## 📁 Struktur

```
cs2-config/
├── README.md
├── package.json
├── server.js
├── config/
│   ├── hud-defaults.json
│   ├── weapons-defaults.json
│   ├── gameplay-defaults.json
│   ├── video-defaults.json
│   ├── audio-defaults.json
│   └── profiles/
├── scripts/
│   ├── hud-manager.js
│   ├── weapon-manager.js
│   ├── config-generator.js
│   ├── profile-manager.js
│   └── file-handler.js
├── ui/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── templates/
│   └── autoexec-template.cfg
└── output/
    └── autoexec.cfg (generiert)
```

## 🚀 Verwendung

1. Öffne die Web-Interface (http://localhost:3000)
2. Konfiguriere HUD, Weapons und Einstellungen
3. Generiere deine autoexec.cfg
4. Speichere dein Profil
5. Exportiere oder importiere Konfigurationen

## 🎮 Wie man die Config in CS2 einfügt

1. Generiere die `autoexec.cfg` mit dem Manager
2. Kopiere die Datei nach: `Steam/userdata/[USERID]/730/local/cfg/`
3. Starten Sie CS2 neu
4. Die Config wird automatisch geladen

## 💡 Tipps

- **Presets nutzen**: Starten Sie mit Competitive, Casual oder Minimalist
- **Profile speichern**: Erstellen Sie verschiedene Profile für unterschiedliche Spielmodi
- **Backup machen**: Erstellen Sie regelmäßig Backups Ihrer Konfiguration
- **Export/Import**: Teilen Sie Ihre Config mit Freunden oder importieren Sie beliebte Configs

## 📝 Lizenz

MIT
