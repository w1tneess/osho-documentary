import * as fs from 'fs';

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
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/import \{ useAppStore \} from ["']\.\.\/\.\.\/features\/store["'];\n?/g, '');
  text = text.replace(/import \{ useAppStore \} from ["']\.\.\/\.\.\/\.\.\/\.\.\/features\/store["'];\n?/g, '');
  text = text.replace(/import \{ useAppStore \} from ["']\.\.\/\.\.\/\.\.\/features\/store["'];\n?/g, '');
  
  text = `import { useAppStore } from '../../../../features/store';\n` + text;
  fs.writeFileSync(file, text, 'utf8');
}
console.log('Fixed imports!');
