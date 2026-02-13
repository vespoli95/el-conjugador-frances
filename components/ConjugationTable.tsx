import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { FrenchVerbData } from '@/assets/types/Conjugation';
import {
  conditionalTenses,
  indicativeFirstHalf,
  indicativeSecondHalf,
  subjunctiveTenses,
  otherTenses,
  tabLabels,
} from '@/lib/utils';
import ConjTypeMenu from './ConjTypeMenu';
import TenseGroup from './TenseGroup';

type ConjugationTableProps = {
  verbData: FrenchVerbData;
};

const ConjugationTable: React.FC<ConjugationTableProps> = ({ verbData }) => {
  const [currentTab, setCurrentTab] = useState('Indicativo');
  const [scrolled, setScrolled] = useState(false);

  const handleOnScrolled = () => {
    if (!scrolled) {
      setScrolled(true);
    }
  };

  const handleSetCurrentTab = (tab: string) => {
    setScrolled(false);
    setCurrentTab(tab);
  };

  const getTenseKeys = () => {
    switch (currentTab) {
      case 'Indicativo':
        return scrolled ? [...indicativeFirstHalf, ...indicativeSecondHalf] : indicativeFirstHalf;
      case 'Subjuntivo':
        return subjunctiveTenses;
      case 'Condicional':
        return conditionalTenses;
      case 'Otro':
        return [...otherTenses, 'participePresent', 'participePasse'];
      default:
        return [];
    }
  };

  return (
    <ScrollView style={{ marginTop: 12, flex: 1 }} onScroll={handleOnScrolled}>
      <ConjTypeMenu currentTense={currentTab} tenses={tabLabels} setCurrentTense={handleSetCurrentTab} />
      <TenseGroup verbData={verbData} tenseKeys={getTenseKeys()} />
    </ScrollView>
  );
};

export default ConjugationTable;
