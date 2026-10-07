import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import type { SourceItem, GlossaryItem, CorrectionItem } from './types';

export type { SourceItem, GlossaryItem, CorrectionItem };

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

function parseYamlFile<T>(relativePath: string): T[] {
  try {
    const fullPath = path.join(CONTENT_DIR, relativePath);
    if (!fs.existsSync(fullPath)) return [];
    const raw = fs.readFileSync(fullPath, 'utf8');
    const parsed = YAML.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (err) {
    console.error(`Error loading YAML from ${relativePath}:`, err);
    return [];
  }
}

export function getAllSources(): SourceItem[] {
  return parseYamlFile<SourceItem>('sources/sources.yaml');
}

export function getSourceById(id: string): SourceItem | undefined {
  const sources = getAllSources();
  return sources.find((s) => s.id === id);
}

export function getAllGlossary(): GlossaryItem[] {
  return parseYamlFile<GlossaryItem>('glossary.yaml');
}

export function getGlossaryById(id: string): GlossaryItem | undefined {
  const list = getAllGlossary();
  return list.find((g) => g.id.toLowerCase() === id.toLowerCase() || g.term.toLowerCase() === id.toLowerCase());
}

export function getAllCorrections(): CorrectionItem[] {
  return parseYamlFile<CorrectionItem>('corrections.yaml');
}
