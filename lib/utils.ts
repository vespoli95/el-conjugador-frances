import { VerbName } from '../assets/types/Search';
import { commonFrenchVerbs } from './verbList';

/**
 * Search for verbs matching the input text (Spanish or French)
 */
export function findVerbs(text: string): VerbName[] {
  const lowerCase = text?.toLowerCase();
  const candidates: string[] = spanishFrenchCombined().filter(verb =>
    removeAccents(verb)?.startsWith(removeAccents(lowerCase))
  );
  return candidates.map(verb => findVerb(verb));
}

function spanishFrenchCombined(): string[] {
  return Object.entries(commonFrenchVerbs).flatMap(([spanish, french]) => [spanish, french]);
}

/**
 * Resolve a text match to a French verb entry
 */
function findVerb(text: string): VerbName {
  const lowerCase = text?.toLowerCase();
  const foundFromSpanish = commonFrenchVerbs[text];

  let returnObj = { frenchVerb: '', displayName: '' };
  if (Object.values(commonFrenchVerbs).includes(lowerCase)) {
    const found = Object.keys(commonFrenchVerbs).find(spanish => commonFrenchVerbs[spanish] === lowerCase);
    const french = commonFrenchVerbs[found!];
    returnObj = {
      frenchVerb: capitalizeFirstLetter(french),
      displayName: `${capitalizeFirstLetter(french)} (${capitalizeFirstLetter(found!)})`,
    };
  } else if (foundFromSpanish) {
    returnObj = {
      frenchVerb: capitalizeFirstLetter(foundFromSpanish),
      displayName: `${capitalizeFirstLetter(foundFromSpanish)} (${capitalizeFirstLetter(text)})`,
    };
  } else {
    returnObj = { frenchVerb: '', displayName: '' };
  }
  return returnObj;
}

export function capitalizeFirstLetter(text: string) {
  return text && text.charAt(0)?.toUpperCase() + text.slice(1);
}

export function removeAccents(text: string) {
  return text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** French pronouns */
export const pronouns = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'];

/** Imperative-only pronouns (index 1=tu, 3=nous, 4=vous have values) */
export const imperativePronouns = ['', 'tu', '', 'nous', 'vous', ''];

/** Tense display names in Spanish (for the UI) */
export const tenseLabels: Record<string, string> = {
  present: 'Presente',
  imparfait: 'Imperfecto',
  passeSimple: 'Pretérito',
  futurSimple: 'Futuro',
  passeCompose: 'Pasado compuesto',
  plusQueParfait: 'Pluscuamperfecto',
  passeAnterieur: 'Pretérito anterior',
  futurAnterieur: 'Futuro anterior',
  subjonctifPresent: 'Presente',
  subjonctifImparfait: 'Imperfecto',
  subjonctifPasse: 'Pasado',
  subjonctifPlusQueParfait: 'Pluscuamperfecto',
  conditionnelPresent: 'Condicional presente',
  conditionnelPasse: 'Condicional pasado',
  conditionnelPasseII: 'Condicional pasado II',
  imperatif: 'Imperativo',
  imperatifPasse: 'Imperativo pasado',
  participePresent: 'Participio presente',
  participePasse: 'Participio pasado',
};

/** Tense keys grouped by category */
export const indicativeTenses = [
  'present', 'imparfait', 'passeSimple', 'futurSimple',
  'passeCompose', 'plusQueParfait', 'passeAnterieur', 'futurAnterieur',
];

export const indicativeFirstHalf = ['present', 'imparfait', 'passeSimple'];
export const indicativeSecondHalf = ['futurSimple', 'passeCompose', 'plusQueParfait', 'passeAnterieur', 'futurAnterieur'];

export const subjunctiveTenses = [
  'subjonctifPresent', 'subjonctifImparfait', 'subjonctifPasse', 'subjonctifPlusQueParfait',
];

export const conditionalTenses = [
  'conditionnelPresent', 'conditionnelPasse', 'conditionnelPasseII',
];

export const otherTenses = [
  'imperatif', 'imperatifPasse',
];

/** Tab labels in Spanish */
export const tabLabels = ['Indicativo', 'Subjuntivo', 'Condicional', 'Otro'];

export function getSpanishTranslation(frenchVerb: string): string | undefined {
  const lowerCase = frenchVerb?.toLowerCase();
  const spanish = Object.keys(commonFrenchVerbs).find(key => commonFrenchVerbs[key] === lowerCase);
  return spanish ? capitalizeFirstLetter(spanish) : undefined;
}

export function getInitialFrenchVerbsList(): VerbName[] {
  return Object.keys(commonFrenchVerbs)
    .map(spanish => {
      const french = commonFrenchVerbs[spanish];
      return {
        displayName: `${capitalizeFirstLetter(french)} (${spanish})`,
        frenchVerb: capitalizeFirstLetter(french),
      };
    })
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}
