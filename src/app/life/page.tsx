import React from 'react';
import { getArticlesByCategory } from '@/lib/articles';
import { PillarView } from '@/components/ui/PillarView';

export default function LifePillarPage() {
  const articles = getArticlesByCategory('life');

  return (
    <PillarView
      pillarNumber="01"
      category="Life & Arc"
      title="The Life &"
      titleAccent="Transformation"
      subtitle="From rebel childhood in rural Madhya Pradesh and university philosophy professor to the world-renowned mystic who captivated disciples and drew fierce global resistance."
      plateSrc="/images/archival/osho-teaching.jpg"
      plateAlt="Osho delivering morning discourse, Pune Ashram, 1978"
      plateTag="Archival Record • Pune Ashram, 1978"
      plateCaption="Morning satsang discourse from the marble podium, Buddha Hall, 1978."
      thesisTag="Biographical Thesis"
      thesisTitle="The Metamorphosis of Chandra Mohan Jain"
      thesisDescription="His trajectory defied conventional Indian religious categories: refusing guru status in his youth, debating orthodox religious scholars, introducing provocative theories on sexuality and freedom, and ultimately adopting the title Osho in his final months."
      stat1="3 Complete Chronological Dossiers"
      stat2="Primary Recorded Discourses"
      articles={articles}
      contextIconType="map"
      contextTitle="Cross-Reference With Geographic Coordinates"
      contextDesc="Trace Kuchwada, Jabalpur, Mumbai, Pune, and Oregon on our interactive geopolitical map."
      contextLink="/map"
      contextLinkText="Launch Interactive Map"
      accentVariant="amber"
    />
  );
}
