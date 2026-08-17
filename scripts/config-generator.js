const fs = require('fs-extra');
const path = require('path');

class ConfigGenerator {
  generateAutoexec(config) {
    let cfgContent = '// ============================================\n';
    cfgContent += '// CS2 CUSTOMIZATION MANAGER - AUTO-GENERATED\n';
    cfgContent += '// ============================================\n\n';
    
    // HUD Settings
    cfgContent += '// === HUD SETTINGS ===\n';
    if (config.hud) {
      cfgContent += `cl_draw_only_deathnotices "${config.hud.deathnotices || 0}"\n`;
      cfgContent += `cl_hud_radar_scale "${config.hud.radarScale || 1}"\n`;
      cfgContent += `cl_radar_always_rotating "${config.hud.radarRotating || 1}"\n`;
      cfgContent += `cl_radar_icon_scale_modifier "${config.hud.radarIconScale || 1}"\n`;
      cfgContent += `cl_radar_square_with_scoreboard "${config.hud.radarSquare || 0}"\n`;
      cfgContent += `hud_scaling "${config.hud.hudScale || 0.85}"\n`;
      cfgContent += `safezonex "${config.hud.safeZoneX || 0.85}"\n`;
      cfgContent += `safezoney "${config.hud.safeZoneY || 0.85}"\n`;
    }
    cfgContent += '\n';
    
    // Crosshair Settings
    cfgContent += '// === CROSSHAIR ===\n';
    if (config.hud?.crosshair) {
      const ch = config.hud.crosshair;
      cfgContent += `cl_crosshair_t "${ch.t || 0}"\n`;
      cfgContent += `cl_crosshair_drawoutline "${ch.drawOutline || 1}"\n`;
      cfgContent += `cl_crosshair_dynamic_maxdist_splitratio "${ch.maxDist || 0.35}"\n`;
      cfgContent += `cl_crosshair_friendly_warning "${ch.friendlyWarning || 1}"\n`;
      cfgContent += `cl_crosshair_outlinethickness "${ch.outlineThickness || 1}"\n`;
      cfgContent += `cl_crosshair_sniper_show_normal_inaccuracy "${ch.sniperShow || 0}"\n`;
      cfgContent += `cl_crosshair_sniper_width "${ch.sniperWidth || 1}"\n`;
      cfgContent += `cl_crosshaircolor "${ch.color || 1}"\n`;
      cfgContent += `cl_crosshaircolor_b "${ch.colorB || 0}"\n`;
      cfgContent += `cl_crosshaircolor_g "${ch.colorG || 255}"\n`;
      cfgContent += `cl_crosshaircolor_r "${ch.colorR || 0}"\n`;
      cfgContent += `cl_crosshairgap "${ch.gap || -2}"\n`;
      cfgContent += `cl_crosshairgap_useweaponvalue "${ch.gapWeapon || 0}"\n`;
      cfgContent += `cl_crosshairscale "${ch.scale || 600}"\n`;
      cfgContent += `cl_crosshairsize "${ch.size || 2}"\n`;
      cfgContent += `cl_crosshairstyle "${ch.style || 4}"\n`;
      cfgContent += `cl_crosshairthickness "${ch.thickness || 0.5}"\n`;
    }
    cfgContent += '\n';
    
    // Weapon Settings
    cfgContent += '// === WEAPON SETTINGS ===\n';
    if (config.weapons) {
      cfgContent += `cl_viewmodel_recoil "${config.weapons.viewmodelRecoil || 1}"\n`;
      cfgContent += `viewmodel_fov "${config.weapons.viewmodelFov || 70}"\n`;
      cfgContent += `viewmodel_offset_x "${config.weapons.offsetX || 0}"\n`;
      cfgContent += `viewmodel_offset_y "${config.weapons.offsetY || 0}"\n`;
      cfgContent += `viewmodel_offset_z "${config.weapons.offsetZ || 0}"\n`;
      cfgContent += `bob_money_react_style "${config.weapons.bobStyle || 0}"\n`;
    }
    cfgContent += '\n';
    
    // Video Settings
    cfgContent += '// === VIDEO SETTINGS ===\n';
    if (config.video) {
      cfgContent += `mat_anti_alias "${config.video.antiAlias || 2}"\n`;
      cfgContent += `mat_antialias_mode "${config.video.antiAliasMode || 7}"\n`;
      cfgContent += `mat_queue_mode "${config.video.queueMode || -1}"\n`;
      cfgContent += `fps_max "${config.video.fpsMax || 300}"\n`;
      cfgContent += `r_fullscreen_gamma "${config.video.gamma || 2.2}"\n`;
      cfgContent += `r_dynamic "${config.video.dynamic || 1}"\n`;
      cfgContent += `engine_no_match_command "${config.video.noMatch || 1}"\n`;
    }
    cfgContent += '\n';
    
    // Audio Settings
    cfgContent += '// === AUDIO SETTINGS ===\n';
    if (config.audio) {
      cfgContent += `volume "${config.audio.masterVolume || 1}"\n`;
      cfgContent += `snd_musicvolume "${config.audio.musicVolume || 0.05}"\n`;
      cfgContent += `snd_mvp_award_volume "${config.audio.mvpVolume || 1}"\n`;
      cfgContent += `snd_headphone_pan_exponent "${config.audio.headphonePan || 2}"\n`;
      cfgContent += `snd_front_headphone_position "${config.audio.frontHeadphone || 45}"\n`;
      cfgContent += `snd_rear_headphone_position "${config.audio.rearHeadphone || 90}"\n`;
      cfgContent += `dsp_enhance_stereo "${config.audio.enhanceStereo || 0}"\n`;
    }
    cfgContent += '\n';
    
    // Gameplay Settings
    cfgContent += '// === GAMEPLAY SETTINGS ===\n';
    if (config.gameplay) {
      cfgContent += `developer "${config.gameplay.developer || 0}"\n`;
      cfgContent += `con_enable "${config.gameplay.consoleEnable || 1}"\n`;
      cfgContent += `closeonbuy "${config.gameplay.closeOnBuy || 0}"\n`;
      cfgContent += `cl_autohelp "${config.gameplay.autoHelp || 0}"\n`;
      cfgContent += `cl_autowepswitch "${config.gameplay.autoWeaponSwitch || 0}"\n`;
      cfgContent += `cl_showpos "${config.gameplay.showPos || 0}"\n`;
      cfgContent += `cl_showfps "${config.gameplay.showFps || 0}"\n`;
      cfgContent += `net_graph "${config.gameplay.netGraph || 0}"\n`;
      cfgContent += `net_graphheight "${config.gameplay.netGraphHeight || 64}"\n`;
      cfgContent += `net_graphpos "${config.gameplay.netGraphPos || 1}"\n`;
      cfgContent += `rate "${config.gameplay.rate || 786432}"\n`;
      cfgContent += `cl_interp "${config.gameplay.interp || 0}"\n`;
      cfgContent += `cl_interp_ratio "${config.gameplay.interpRatio || 1}"\n`;
    }
    cfgContent += '\n';
    
    // Bindings
    cfgContent += '// === KEY BINDINGS ===\n';
    if (config.gameplay?.bindings) {
      for (const [key, cmd] of Object.entries(config.gameplay.bindings)) {
        cfgContent += `bind "${key}" "${cmd}"\n`;
      }
    }
    cfgContent += '\n';
    
    cfgContent += '// ============================================\n';
    cfgContent += '// Config End - Placed in: Steam/userdata/[USERID]/730/local/cfg/\n';
    cfgContent += '// ============================================\n';
    
    return cfgContent;
  }
}

module.exports = new ConfigGenerator();
