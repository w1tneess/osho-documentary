import { Project } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

const project = new Project({
  tsConfigFilePath: 'tsconfig.app.json',
});

// Helper to move a directory and its contents in the project
function moveDirectory(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory not found: ${src}`);
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const sourceFiles = project.getSourceFiles(src + '/**/*');
  for (const file of sourceFiles) {
    const relativePath = file.getFilePath().substring(path.resolve(src).length + 1);
    const newPath = path.resolve(dest, relativePath);
    console.log(`Moving ${file.getFilePath()} to ${newPath}`);
    file.move(newPath);
  }

  // Move non-ts files manually (like CSS)
  function moveNonTs(dir: string, currentDest: string) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const srcPath = path.join(dir, item.name);
      const destPath = path.join(currentDest, item.name);
      if (item.isDirectory()) {
        if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
        moveNonTs(srcPath, destPath);
      } else {
        if (!srcPath.endsWith('.ts') && !srcPath.endsWith('.tsx')) {
          console.log(`Moving non-ts file: ${srcPath} to ${destPath}`);
          if (!fs.existsSync(path.dirname(destPath))) {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
          }
          fs.copyFileSync(srcPath, destPath);
          fs.unlinkSync(srcPath);
        }
      }
    }
  }
  moveNonTs(src, dest);
}

async function run() {
  console.log('Starting FSD Migration...');

  // 1. App
  fs.mkdirSync('src/app', { recursive: true });
  const appFile = project.getSourceFile('src/App.tsx');
  if (appFile) appFile.move('src/app/App.tsx');
  const mainFile = project.getSourceFile('src/main.tsx');
  if (mainFile) mainFile.move('src/app/main.tsx');

  // 2. Widgets
  moveDirectory('src/components/documentary', 'src/widgets/documentary');
  moveDirectory('src/components/three', 'src/widgets/three');
  moveDirectory('src/scene', 'src/widgets/three/scene');

  // 3. Features
  moveDirectory('src/hooks', 'src/features');

  // 4. Entities
  moveDirectory('src/content', 'src/entities/content');
  moveDirectory('src/config', 'src/entities/chapter'); // e.g. chapters.ts

  // 5. Shared
  moveDirectory('src/components/ui', 'src/shared/ui');
  moveDirectory('src/styles', 'src/shared/styles');
  moveDirectory('src/utils', 'src/shared/lib/utils');
  moveDirectory('src/lib', 'src/shared/lib');
  moveDirectory('src/types', 'src/shared/types');

  // Save changes via ts-morph (updates all imports automatically!)
  console.log('Saving TS project...');
  await project.save();
  console.log('Migration complete.');
}

run().catch(console.error);
