/**
 * Maj Mob - Study Materials & Worksheet Builder Script
 * Manages preset selection, live customization, custom tile construction, and print triggers.
 */

document.addEventListener('DOMContentLoaded', () => {

  // Preset Configurations
  const presets = {
    even_steven_triplets: {
      title: "Even Steven (1st line, option 1)",
      pattern: "222 444 666 888",
      rows: {
        1: ['crak_2', 'crak_2', 'crak_2', 'crak_4', 'crak_4', 'crak_4', 'crak_6', 'crak_6', 'crak_6', 'crak_8', 'crak_8', 'crak_8'],
        2: ['dot_2', 'dot_2', 'dot_2', 'dot_4', 'dot_4', 'dot_4', 'dot_6', 'dot_6', 'dot_6', 'dot_8', 'dot_8', 'dot_8'],
        3: ['bam_2', 'bam_2', 'bam_2', 'bam_4', 'bam_4', 'bam_4', 'bam_6', 'bam_6', 'bam_6', 'bam_8', 'bam_8', 'bam_8']
      }
    },
    even_steven_pairs: {
      title: "Even Steven (1st line, option 1)",
      pattern: "22 44 66 88",
      rows: {
        1: ['bam_2', 'bam_2', 'bam_4', 'bam_4', 'bam_6', 'bam_6', 'bam_8', 'bam_8'],
        2: ['crak_2', 'crak_2', 'crak_4', 'crak_4', 'crak_6', 'crak_6', 'crak_8', 'crak_8'],
        3: ['dot_2', 'dot_2', 'dot_4', 'dot_4', 'dot_6', 'dot_6', 'dot_8', 'dot_8']
      }
    },
    even_steven_mixed: {
      title: "Even Steven (2nd line, option 2)",
      pattern: "22 44 66 88",
      rows: {
        1: ['bam_2', 'bam_2', 'bam_4', 'bam_4', 'crak_6', 'crak_6', 'crak_8', 'crak_8'],
        2: ['crak_2', 'crak_2', 'crak_4', 'crak_4', 'dot_6', 'dot_6', 'dot_8', 'dot_8'],
        3: ['dot_2', 'dot_2', 'dot_4', 'dot_4', 'bam_6', 'bam_6', 'bam_8', 'bam_8']
      }
    },
    even_steven_flowers: {
      title: "Even Steven (2nd line)",
      pattern: "FFFF 2468",
      rows: {
        1: ['flower_1', 'flower_2', 'flower_3', 'flower_4', 'bam_2', 'bam_4', 'bam_6', 'bam_8'],
        2: ['flower_5', 'flower_6', 'flower_7', 'flower_8', 'crak_2', 'crak_4', 'crak_6', 'crak_8'],
        3: ['flower_1', 'flower_2', 'flower_3', 'flower_4', 'dot_2', 'dot_4', 'dot_6', 'dot_8']
      }
    },
    make_match_1: {
      title: "Make Me a Match (1st line)",
      pattern: "1111 1111",
      rows: {
        1: ['dot_1', 'dot_1', 'dot_1', 'dot_1', 'bam_1', 'bam_1', 'bam_1', 'bam_1'],
        2: ['crak_4', 'crak_4', 'crak_4', 'crak_4', 'dot_4', 'dot_4', 'dot_4', 'dot_4'],
        3: ['bam_9', 'bam_9', 'bam_9', 'bam_9', 'crak_9', 'crak_9', 'crak_9', 'crak_9']
      }
    },
    make_match_2: {
      title: "Make Me a Match (2nd line)",
      pattern: "FF 11 11 11",
      rows: {
        1: ['flower_1', 'flower_2', 'dot_1', 'dot_1', 'crak_1', 'crak_1', 'bam_1', 'bam_1'],
        2: ['flower_3', 'flower_4', 'crak_5', 'crak_5', 'bam_5', 'bam_5', 'dot_5', 'dot_5'],
        3: ['flower_5', 'flower_6', 'bam_8', 'bam_8', 'dot_8', 'dot_8', 'crak_8', 'crak_8']
      }
    },
    easy_run_1: {
      title: "Easy as 1, 2, 3 (or ANY run!) (1st line, option 1)",
      pattern: "11 22 33 44",
      rows: {
        1: ['crak_1', 'crak_1', 'crak_2', 'crak_2', 'crak_3', 'crak_3', 'crak_4', 'crak_4'],
        2: ['dot_5', 'dot_5', 'dot_6', 'dot_6', 'dot_7', 'dot_7', 'dot_8', 'dot_8'],
        3: ['bam_2', 'bam_2', 'bam_3', 'bam_3', 'bam_4', 'bam_4', 'bam_5', 'bam_5']
      }
    },
    easy_run_2: {
      title: "Easy as 1, 2, 3 (or ANY run!) (2nd line)",
      pattern: "FF 11 22 DD",
      rows: {
        1: ['flower_1', 'flower_2', 'crak_1', 'crak_1', 'crak_2', 'crak_2', 'dragon_red', 'dragon_red'],
        2: ['flower_3', 'flower_4', 'dot_6', 'dot_6', 'dot_7', 'dot_7', 'dragon_white', 'dragon_white'],
        3: ['flower_5', 'flower_6', 'bam_3', 'bam_3', 'bam_4', 'bam_4', 'dragon_green', 'dragon_green']
      }
    },
    easy_run_3: {
      title: "Easy as 1, 2, 3 (or ANY run!) (3rd line)",
      pattern: "111 22 333",
      rows: {
        1: ['crak_1', 'crak_1', 'crak_1', 'crak_2', 'crak_2', 'crak_3', 'crak_3', 'crak_3'],
        2: ['dot_6', 'dot_6', 'dot_6', 'dot_7', 'dot_7', 'dot_8', 'dot_8', 'dot_8'],
        3: ['bam_3', 'bam_3', 'bam_3', 'bam_4', 'bam_4', 'bam_5', 'bam_5', 'bam_5']
      }
    },
    odd_ball_1: {
      title: "Odd Ball (1st line, option 1)",
      pattern: "111 33 555",
      rows: {
        1: ['crak_1', 'crak_1', 'crak_1', 'crak_3', 'crak_3', 'crak_5', 'crak_5', 'crak_5'],
        2: ['dot_1', 'dot_1', 'dot_1', 'dot_3', 'dot_3', 'dot_5', 'dot_5', 'dot_5'],
        3: ['bam_1', 'bam_1', 'bam_1', 'bam_3', 'bam_3', 'bam_5', 'bam_5', 'bam_5']
      }
    },
    odd_ball_2: {
      title: "Odd Ball (last line, option 2)",
      pattern: "FF 55 77 99",
      rows: {
        1: ['flower_1', 'flower_2', 'bam_5', 'bam_5', 'bam_7', 'bam_7', 'bam_9', 'bam_9'],
        2: ['flower_3', 'flower_4', 'crak_5', 'crak_5', 'crak_7', 'crak_7', 'crak_9', 'crak_9'],
        3: ['flower_5', 'flower_6', 'dot_5', 'dot_5', 'dot_7', 'dot_7', 'dot_9', 'dot_9']
      }
    },
    winds_dragons_1: {
      title: "Winds, Dragons, & Flowers, Oh My!",
      pattern: "NN EE WW SS",
      rows: {
        1: ['wind_4', 'wind_4', 'wind_1', 'wind_1', 'wind_3', 'wind_3', 'wind_2', 'wind_2'],
        2: ['wind_4', 'wind_4', 'wind_1', 'wind_1', 'wind_3', 'wind_3', 'wind_2', 'wind_2'],
        3: ['wind_4', 'wind_4', 'wind_1', 'wind_1', 'wind_3', 'wind_3', 'wind_2', 'wind_2']
      }
    },
    winds_dragons_2: {
      title: "Winds, Dragons, & Flowers, Oh My!",
      pattern: "DD NEWS DD",
      rows: {
        1: ['dragon_green', 'dragon_green', 'wind_4', 'wind_1', 'wind_3', 'wind_2', 'dragon_white', 'dragon_white'],
        2: ['dragon_red', 'dragon_red', 'wind_4', 'wind_1', 'wind_3', 'wind_2', 'dragon_green', 'dragon_green'],
        3: ['dragon_white', 'dragon_white', 'wind_4', 'wind_1', 'wind_3', 'wind_2', 'dragon_red', 'dragon_red']
      }
    },
    winds_dragons_3: {
      title: "Winds, Dragons, & Flowers, Oh My!",
      pattern: "FF DD DD DD",
      rows: {
        1: ['flower_1', 'flower_2', 'dragon_white', 'dragon_white', 'dragon_red', 'dragon_red', 'dragon_green', 'dragon_green'],
        2: ['flower_3', 'flower_4', 'dragon_white', 'dragon_white', 'dragon_red', 'dragon_red', 'dragon_green', 'dragon_green'],
        3: ['flower_5', 'flower_6', 'dragon_white', 'dragon_white', 'dragon_red', 'dragon_red', 'dragon_green', 'dragon_green']
      }
    },
    fine_369_1: {
      title: "369 is Mighty Fine! (top line, option 2)",
      pattern: "333 66 999",
      rows: {
        1: ['bam_3', 'bam_3', 'bam_3', 'crak_6', 'crak_6', 'dot_9', 'dot_9', 'dot_9'],
        2: ['crak_3', 'crak_3', 'crak_3', 'dot_6', 'dot_6', 'bam_9', 'bam_9', 'bam_9'],
        3: ['dot_3', 'dot_3', 'dot_3', 'bam_6', 'bam_6', 'crak_9', 'crak_9', 'crak_9']
      }
    },
    fine_369_2: {
      title: "369 is Mighty Fine! (last line, option 2)",
      pattern: "FF 33 66 99",
      rows: {
        1: ['flower_1', 'flower_2', 'bam_3', 'bam_3', 'crak_6', 'crak_6', 'dot_9', 'dot_9'],
        2: ['flower_3', 'flower_4', 'crak_3', 'crak_3', 'dot_6', 'dot_6', 'bam_9', 'bam_9'],
        3: ['flower_5', 'flower_6', 'dot_3', 'dot_3', 'bam_6', 'bam_6', 'crak_9', 'crak_9']
      }
    },
    custom: {
      title: "My Custom Hand Layout",
      pattern: "1111 2222 3333",
      rows: {
        1: [],
        2: [],
        3: []
      }
    }
  };

  // State
  let currentPresetKey = 'even_steven_triplets';
  let activeCustomRow = 1;
  const customRowsData = {
    1: [],
    2: [],
    3: []
  };

  // DOM Elements
  const presetSelect = document.getElementById('preset-select');
  const fontSelect = document.getElementById('font-select');
  const colorSelect = document.getElementById('color-select');
  const borderStyleSelect = document.getElementById('border-style-select');
  const titleInput = document.getElementById('title-input');
  const patternInput = document.getElementById('pattern-input');
  
  const worksheetTitle = document.getElementById('worksheet-title');
  const worksheetPattern = document.getElementById('worksheet-pattern');
  const letterPage = document.getElementById('letter-page-container');
  
  const customBuilderArea = document.getElementById('custom-builder-area');
  const clearRowsBtn = document.getElementById('clear-rows-btn');
  const resetBtn = document.getElementById('reset-btn');
  const printBtn = document.getElementById('print-btn');

  // Available Tiles list for custom picker
  const tileInventory = [];
  
  // Populate Dots (1-9)
  for (let i = 1; i <= 9; i++) tileInventory.push({ id: `dot_${i}`, path: `_assets/images/tiles/dot_${i}.png`, label: `Dot ${i}` });
  // Populate Craks (1-9)
  for (let i = 1; i <= 9; i++) tileInventory.push({ id: `crak_${i}`, path: `_assets/images/tiles/crak_${i}.png`, label: `Crak ${i}` });
  // Populate Bams (1-9)
  for (let i = 1; i <= 9; i++) tileInventory.push({ id: `bam_${i}`, path: `_assets/images/tiles/bam_${i}.png`, label: `Bam ${i}` });
  
  // Winds (1-4 -> E, S, W, N)
  const windLabels = { 1: "East (東)", 2: "South (南)", 3: "West (西)", 4: "North (北)" };
  for (let i = 1; i <= 4; i++) tileInventory.push({ id: `wind_${i}`, path: `_assets/images/tiles/wind_${i}.png`, label: windLabels[i] });
  
  // Flowers (1-8)
  for (let i = 1; i <= 8; i++) tileInventory.push({ id: `flower_${i}`, path: `_assets/images/tiles/flower_${i}.png`, label: `Flower ${i}` });
  
  // Dragons (Red, Green, White)
  tileInventory.push({ id: 'dragon_red', path: '_assets/images/tiles/dragon_red.png', label: 'Red Dragon' });
  tileInventory.push({ id: 'dragon_green', path: '_assets/images/tiles/dragon_green.png', label: 'Green Dragon' });
  tileInventory.push({ id: 'dragon_white', path: '_assets/images/tiles/dragon_white.png', label: 'White Dragon (Soap)' });
  
  // Joker
  tileInventory.push({ id: 'joker', path: '_assets/images/tiles/joker.png', label: 'Joker' });

  // Init Picker
  const pickerContainer = document.querySelector('.tile-picker-container');
  if (pickerContainer) {
    tileInventory.forEach(tile => {
      const btn = document.createElement('button');
      btn.className = 'picker-tile-btn';
      btn.title = tile.label;
      btn.setAttribute('data-tile-id', tile.id);
      btn.innerHTML = `<img src="${tile.path}" alt="${tile.label}">`;
      btn.addEventListener('click', () => addTileToActiveRow(tile.id));
      pickerContainer.appendChild(btn);
    });
  }

  // Active custom row listeners
  document.querySelectorAll('input[name="active-row"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      activeCustomRow = parseInt(e.target.value);
    });
  });

  // Render a specific tile row
  const renderRow = (rowNum, tileIds) => {
    const grid = document.getElementById(`tile-grid-${rowNum}`);
    if (!grid) return;
    
    grid.innerHTML = '';
    
    tileIds.forEach((id, index) => {
      const card = document.createElement('div');
      card.className = 'tile-card';
      card.setAttribute('data-slot', index + 1);
      
      const foundTile = tileInventory.find(t => t.id === id);
      if (foundTile) {
        card.innerHTML = `<img src="${foundTile.path}" alt="${foundTile.label}">`;
      } else {
        card.innerHTML = '<span style="font-size: 8px; color: #ccc;">Empty</span>';
      }
      
      // Click tile to remove in custom mode
      card.addEventListener('click', () => {
        if (currentPresetKey === 'custom') {
          removeTileFromRow(rowNum, index);
        }
      });
      
      grid.appendChild(card);
    });
  };

  // Render all rows based on current state
  const renderAllRows = () => {
    const data = presets[currentPresetKey];
    if (currentPresetKey === 'custom') {
      renderRow(1, customRowsData[1]);
      renderRow(2, customRowsData[2]);
      renderRow(3, customRowsData[3]);
    } else {
      renderRow(1, data.rows[1]);
      renderRow(2, data.rows[2]);
      renderRow(3, data.rows[3]);
    }
  };

  // Load preset data into inputs and render
  const loadPreset = (key) => {
    currentPresetKey = key;
    const data = presets[key];
    
    titleInput.value = data.title;
    patternInput.value = data.pattern;
    
    worksheetTitle.textContent = data.title;
    worksheetPattern.textContent = data.pattern;
    
    if (key === 'custom') {
      customBuilderArea.style.display = 'block';
    } else {
      customBuilderArea.style.display = 'none';
    }
    
    renderAllRows();
  };

  // Custom row builder operations
  const addTileToActiveRow = (tileId) => {
    if (currentPresetKey !== 'custom') {
      presetSelect.value = 'custom';
      loadPreset('custom');
    }
    
    // Max 12 tiles per row
    if (customRowsData[activeCustomRow].length >= 12) {
      alert(`Row ${activeCustomRow} already has the maximum of 12 tiles!`);
      return;
    }
    
    customRowsData[activeCustomRow].push(tileId);
    renderRow(activeCustomRow, customRowsData[activeCustomRow]);
  };

  const removeTileFromRow = (rowNum, index) => {
    customRowsData[rowNum].splice(index, 1);
    renderRow(rowNum, customRowsData[rowNum]);
  };

  // Live input synchronization
  titleInput.addEventListener('input', (e) => {
    worksheetTitle.textContent = e.target.value;
    if (currentPresetKey !== 'custom') {
      presets[currentPresetKey].title = e.target.value;
    }
  });

  patternInput.addEventListener('input', (e) => {
    worksheetPattern.textContent = e.target.value;
    if (currentPresetKey !== 'custom') {
      presets[currentPresetKey].pattern = e.target.value;
    }
  });

  // Preset Selection
  presetSelect.addEventListener('change', (e) => {
    loadPreset(e.target.value);
  });

  // Font Selection
  fontSelect.addEventListener('change', (e) => {
    const font = e.target.value;
    worksheetTitle.style.fontFamily = `'${font}', sans-serif`;
    worksheetPattern.style.fontFamily = `'${font}', sans-serif`;
  });

  // Color Selection
  colorSelect.addEventListener('change', (e) => {
    const color = e.target.value;
    worksheetTitle.style.color = color;
    worksheetPattern.style.color = color;
  });

  // Border Style Selection
  borderStyleSelect.addEventListener('change', (e) => {
    const style = e.target.value;
    
    // Set border outline on tiles
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      .tile-card {
        border-style: ${style} !important;
        border-width: ${style === 'none' ? '0px' : '1px'} !important;
      }
    `;
    document.head.appendChild(styleSheet);
  });

  // Reset Button
  resetBtn.addEventListener('click', () => {
    if (currentPresetKey === 'custom') {
      customRowsData[1] = [];
      customRowsData[2] = [];
      customRowsData[3] = [];
      renderAllRows();
    } else {
      // Reload current preset
      loadPreset(currentPresetKey);
    }
  });

  // Clear Rows Button
  if (clearRowsBtn) {
    clearRowsBtn.addEventListener('click', () => {
      customRowsData[1] = [];
      customRowsData[2] = [];
      customRowsData[3] = [];
      renderAllRows();
    });
  }

  // Print Trigger
  printBtn.addEventListener('click', () => {
    window.print();
  });

  // Load default preset on startup
  loadPreset('even_steven_triplets');

});
