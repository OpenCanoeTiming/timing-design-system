#!/usr/bin/env node
/**
 * CSS Build Script for Timing Design System
 *
 * Concatenates all CSS files in the correct order, resolving @import statements.
 * Outputs: dist/timing.css (and optionally dist/timing.min.css)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// Order matters - tokens first, then components
const FILES = [
  // Design tokens
  'src/tokens/fonts.css',
  'src/tokens/colors.css',
  'src/tokens/typography.css',
  'src/tokens/spacing.css',
  'src/tokens/canoe.css',
  // CSS components (base first)
  'src/css/base.css',
  'src/css/buttons.css',
  'src/css/forms.css',
  'src/css/cards.css',
  'src/css/tables.css',
  'src/css/status.css',
  'src/css/layout.css',
  'src/css/modal.css',
  'src/css/toast.css',
  'src/css/tabs.css',
  'src/css/header.css',
  'src/css/log.css',
  'src/css/dropzone.css',
];

function readCssFile(relativePath) {
  const fullPath = join(ROOT, relativePath);
  let content = readFileSync(fullPath, 'utf8');

  // Remove @import statements (we're concatenating manually)
  content = content.replace(/@import\s+['"][^'"]+['"];?\s*/g, '');

  // Fix font paths: ../fonts/ -> ./fonts/ (relative to dist/)
  content = content.replace(/url\(['"]?\.\.\/fonts\//g, "url('./fonts/");

  return content;
}

function copyFonts() {
  console.log('Copying fonts...');

  const srcFontsDir = join(ROOT, 'src', 'fonts');
  const distFontsDir = join(ROOT, 'dist', 'fonts');

  // Create dist/fonts/ directory
  if (!existsSync(distFontsDir)) {
    mkdirSync(distFontsDir, { recursive: true });
  }

  // Copy all font files
  const fontFiles = readdirSync(srcFontsDir).filter(f => f.endsWith('.woff2'));
  for (const file of fontFiles) {
    copyFileSync(join(srcFontsDir, file), join(distFontsDir, file));
  }

  console.log(`✓ Copied ${fontFiles.length} font files to dist/fonts/`);
}

function buildCss() {
  console.log('Building timing.css...');

  // Ensure dist directory exists
  const distDir = join(ROOT, 'dist');
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  // Build header
  const header = `/**
 * Timing Design System v${getVersion()}
 *
 * Complete CSS bundle with all tokens and components.
 * Supports dark (.theme-dark) and light (.theme-light) themes.
 *
 * Generated: ${new Date().toISOString().split('T')[0]}
 */

`;

  // Concatenate all files
  let output = header;

  for (const file of FILES) {
    const sectionName = file.replace('src/', '').replace('.css', '');
    output += `/* ========================================\n`;
    output += ` * ${sectionName}\n`;
    output += ` * ======================================== */\n\n`;
    output += readCssFile(file);
    output += '\n\n';
  }

  // Write output
  const outputPath = join(distDir, 'timing.css');
  writeFileSync(outputPath, output);

  const stats = {
    files: FILES.length,
    size: (output.length / 1024).toFixed(1),
  };

  console.log(`✓ Created dist/timing.css (${stats.files} files, ${stats.size} KB)`);

  return output;
}

function minifyCss(css) {
  // Simple minification (no external deps)
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove newlines and extra whitespace
    .replace(/\s+/g, ' ')
    // Remove space around selectors and braces
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*,\s*/g, ',')
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, '}')
    .trim();
}

function buildMinified(css) {
  console.log('Building timing.min.css...');

  const minified = minifyCss(css);
  const outputPath = join(ROOT, 'dist', 'timing.min.css');
  writeFileSync(outputPath, minified);

  const stats = {
    size: (minified.length / 1024).toFixed(1),
    reduction: (100 - (minified.length / css.length) * 100).toFixed(0),
  };

  console.log(`✓ Created dist/timing.min.css (${stats.size} KB, ${stats.reduction}% smaller)`);
}

function getVersion() {
  try {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
    return pkg.version || '0.0.0';
  } catch {
    return '0.0.0';
  }
}

// Run
copyFonts();
const css = buildCss();
buildMinified(css);
console.log('\nBuild complete!');
