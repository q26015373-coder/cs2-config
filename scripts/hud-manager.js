class HUDManager {
  constructor() {
    this.presets = {
      competitive: {
        radarScale: 1.2,
        radarRotating: 1,
        radarSquare: 0,
        hudScale: 0.85,
        deathnotices: 0,
        crosshair: {
          style: 4,
          size: 2,
          gap: -2,
          thickness: 0.5,
          color: 1,
          colorR: 0,
          colorG: 255,
          colorB: 0,
          drawOutline: 1,
          outlineThickness: 1
        }
      },
      casual: {
        radarScale: 1,
        radarRotating: 1,
        radarSquare: 1,
        hudScale: 1,
        deathnotices: 1,
        crosshair: {
          style: 2,
          size: 5,
          gap: 0,
          thickness: 1,
          color: 1,
          colorR: 255,
          colorG: 0,
          colorB: 0,
          drawOutline: 0
        }
      },
      minimalist: {
        radarScale: 0.8,
        radarRotating: 1,
        radarSquare: 0,
        hudScale: 0.7,
        deathnotices: 0,
        crosshair: {
          style: 4,
          size: 1,
          gap: -3,
          thickness: 0.5,
          color: 5,
          colorR: 0,
          colorG: 255,
          colorB: 255,
          drawOutline: 0
        }
      }
    };
  }

  getPreset(name) {
    return this.presets[name] || null;
  }

  getAllPresets() {
    return Object.keys(this.presets);
  }

  validateHUDSettings(settings) {
    const errors = [];
    if (settings.hudScale < 0.5 || settings.hudScale > 1) {
      errors.push('HUD Scale muss zwischen 0.5 und 1 liegen');
    }
    if (settings.crosshair.size < 0 || settings.crosshair.size > 100) {
      errors.push('Crosshair Size muss zwischen 0 und 100 liegen');
    }
    return errors;
  }
}

module.exports = new HUDManager();
