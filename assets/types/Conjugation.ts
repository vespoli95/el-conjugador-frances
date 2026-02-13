export type FrenchVerbData = {
  auxiliaire: string;
  conditionnelPasse: string[];
  conditionnelPasseII: string[];
  conditionnelPresent: string[];
  formePronominale: string;
  futurAnterieur: string[];
  futurSimple: string[];
  imperatif: string[];
  imperatifPasse: string[];
  imparfait: string[];
  infinitif: string;
  participePasse: string;
  participePresent: string;
  passeAnterieur: string[];
  passeCompose: string[];
  passeSimple: string[];
  plusQueParfait: string[];
  present: string[];
  subjonctifImparfait: string[];
  subjonctifPasse: string[];
  subjonctifPlusQueParfait: string[];
  subjonctifPresent: string[];
};

export type ConjugationEntry = {
  form: string;
  group: string;
  subgroup: string;
  value: string;
};
