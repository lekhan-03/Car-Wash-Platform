const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);

const colorMap = [
  // Backgrounds
  { regex: /background:\s*(#fdfdfd|#f4f8fc|#f4f6f9|#f4f7fb|#f8fafc)([\s;]*)/g, replace: 'background: var(--bg-primary)$2' },
  { regex: /background-color:\s*(#fdfdfd|#f4f8fc|#f4f6f9|#f4f7fb|#f8fafc)([\s;]*)/g, replace: 'background-color: var(--bg-primary)$2' },
  { regex: /background:\s*#fff(?:fff)?([\s;]*)/ig, replace: 'background: var(--bg-secondary)$1' },
  { regex: /background-color:\s*#fff(?:fff)?([\s;]*)/ig, replace: 'background-color: var(--bg-secondary)$1' },
  
  // Texts
  { regex: /color:\s*(#0f172a|#0a1929|#1a1a2e|#1e293b|#333|#000)([\s;]*)/ig, replace: 'color: var(--text-primary)$2' },
  { regex: /color:\s*(#64748b|#666|#94a3b8|#a0b2c6)([\s;]*)/ig, replace: 'color: var(--text-secondary)$2' },
  
  // Borders
  { regex: /border-color:\s*(#f0f0f0|#e2e8f0|#f1f5f9|rgba\(0, ?0, ?0, ?0\.05\))([\s;]*)/ig, replace: 'border-color: var(--border-color)$2' },
  { regex: /1px solid (#f0f0f0|#e2e8f0|#f1f5f9|rgba\(0, ?0, ?0, ?0\.05\))/ig, replace: '1px solid var(--border-color)' },
  
  // Box Shadows
  { regex: /box-shadow:\s*0 4px 20px rgba\(10, 25, 41, 0\.15\)/ig, replace: 'box-shadow: var(--shadow-md)' },
  { regex: /box-shadow:\s*0 8px 25px rgba\(0, ?0, ?0, ?0\.03\)/ig, replace: 'box-shadow: var(--shadow-md)' }
];

let updatedCount = 0;

files.forEach(file => {
  // Skip the ones we already meticulously updated by hand
  if (file.includes('index.css') || file.includes('Navbar.css') || file.includes('BottomNavbar.css') || file.includes('Hero.css') || file.includes('Services.css') || file.includes('Login.css')) {
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  colorMap.forEach(mapping => {
    content = content.replace(mapping.regex, mapping.replace);
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log('Updated: ' + path.relative(srcDir, file));
  }
});

console.log(`\nCompleted! Regex replaced colors in ${updatedCount} CSS files.`);
