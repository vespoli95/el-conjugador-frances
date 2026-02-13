import { FrenchVerbData } from '../assets/types/Conjugation';
import { verbMap } from './verbList';

export async function readJSONFile(verb: string): Promise<FrenchVerbData> {
  const verbModule = await verbMap(verb.toLowerCase());
  // Dynamic import wraps JSON in a module with .default
  const verbData = (verbModule as { default: FrenchVerbData }).default ?? verbModule;
  return verbData as FrenchVerbData;
}
