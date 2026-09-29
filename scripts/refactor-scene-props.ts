import { Project } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: 'tsconfig.app.json',
});

function removePropAndAddZustand(fileName: string) {
  const file = project.getSourceFile(fileName);
  if (!file) {
    console.log(`File not found: ${fileName}`);
    return;
  }

  // 1. Add import for useAppStore
  const imports = file.getImportDeclarations();
  const hasAppStore = imports.some(imp => imp.getModuleSpecifierValue().includes('store'));
  if (!hasAppStore) {
    file.addImportDeclaration({
      namedImports: ['useAppStore'],
      moduleSpecifier: '../../features/store' // Adjust path if needed
    });
  }

  let text = file.getFullText();

  // 1. Add import if not present
  if (!text.includes('useAppStore')) {
    text = `import { useAppStore } from '../../../../features/store';\n` + text;
  }

  // 2. Regex to remove scrollProgress from interface
  text = text.replace(/\bscrollProgress\s*:\s*React\.RefObject<number>;\s*/g, '');

  // 3. Regex to remove scrollProgress from destructured props
  text = text.replace(/\{\s*scrollProgress\s*,\s*/g, '{ ');
  text = text.replace(/,\s*scrollProgress\s*\}/g, ' }');
  text = text.replace(/\{\s*scrollProgress\s*\}/g, '{ }');
  text = text.replace(/\bscrollProgress\s*,\s*/g, '');

  // 4. Replace usage
  text = text
    .replace(/scrollProgress\.current \?\? 0/g, 'useAppStore.getState().scrollProgress')
    .replace(/scrollProgress\.current/g, 'useAppStore.getState().scrollProgress');

  file.replaceWithText(text);
}

const files = [
  'src/widgets/three/scene/camera/ScrollCamera.tsx',
  'src/widgets/three/scene/systems/Atmosphere.tsx',
  'src/widgets/three/scene/environment/LightingRig.tsx',
  'src/widgets/three/scene/environment/SkyDome.tsx',
  'src/widgets/three/scene/environment/ForegroundFraming.tsx',
  'src/widgets/three/scene/environment/ChapterStructures.tsx',
  'src/widgets/three/scene/environment/WorldTerrain.tsx',
  'src/widgets/three/scene/environment/DistantHorizon.tsx',
  'src/widgets/three/scene/environment/AtmosphericMotes.tsx'
];

for (const file of files) {
  removePropAndAddZustand(file);
}

project.saveSync();
console.log('Done refactoring props to Zustand.');
