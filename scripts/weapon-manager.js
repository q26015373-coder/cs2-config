class WeaponManager {
  constructor() {
    this.weapons = {
      knife: { name: 'Messer', stattrak: false },
      deagle: { name: 'Desert Eagle', stattrak: true, price: 700 },
      usp: { name: 'USP-S', stattrak: true, price: 200 },
      glock: { name: 'Glock-18', stattrak: true, price: 200 },
      ak47: { name: 'AK-47', stattrak: true, price: 2700 },
      m4a4: { name: 'M4A4', stattrak: true, price: 2300 },
      m4a1s: { name: 'M4A1-S', stattrak: true, price: 2300 },
      awp: { name: 'AWP Dragon Lore', stattrak: true, price: 4750 },
      scout: { name: 'SSG 08', stattrak: true, price: 1700 },
      mac10: { name: 'MAC-10', stattrak: true, price: 1050 },
      mp9: { name: 'MP9', stattrak: true, price: 1250 },
      p90: { name: 'P90', stattrak: true, price: 2350 },
      ump45: { name: 'UMP-45', stattrak: true, price: 1200 },
      famas: { name: 'FAMAS', stattrak: true, price: 1050 },
      galil: { name: 'Galil AR', stattrak: true, price: 1800 },
      nova: { name: 'Nova', stattrak: true, price: 1050 },
      xm1014: { name: 'XM1014', stattrak: true, price: 2000 },
      negev: { name: 'Negev', stattrak: true, price: 1900 }
    };
  }

  getWeapon(weaponId) {
    return this.weapons[weaponId] || null;
  }

  getAllWeapons() {
    return this.weapons;
  }

  createLoadout() {
    return {
      knife: { name: 'Messer', skin: '', float: '' },
      pistol: { weapon: 'deagle', skin: '', float: '' },
      smg: { weapon: 'mp9', skin: '', float: '' },
      rifle: { weapon: 'ak47', skin: '', float: '' },
      awp: { weapon: 'awp', skin: '', float: '' },
      utility: [
        { weapon: 'nova', skin: '', float: '' }
      ]
    };
  }

  validateLoadout(loadout) {
    const errors = [];
    if (!loadout.rifle) {
      errors.push('Primärwaffe erforderlich');
    }
    if (!loadout.pistol) {
      errors.push('Pistole erforderlich');
    }
    return errors;
  }
}

module.exports = new WeaponManager();
