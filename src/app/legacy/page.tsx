import React from 'react';
import { getArticlesByCategory } from '@/lib/articles';
import { PillarView } from '@/components/ui/PillarView';

export default function LegacyPillarPage() {
  const articles = getArticlesByCategory('legacy');

  return (
    <PillarView
      pillarNumber="05"
      category="Legacy"
      title="Legacy &"
      titleAccent="Cultural Resurgence"
      subtitle="The transformation into the OSHO International Meditation Resort, multimillion-dollar publishing empires, and the explosive cultural impact of Netflix’s Wild Wild Country."
      plateSrc="/images/archival/osho-portrait-zen.jpg"
      plateAlt="Osho photographed in his final Pune Zen master period, 1989"
      plateTag="Final Pune Discourses • Zen Era, 1989"
      plateCaption="Pune Ashram, 1989. The final transition from Bhagwan Shree Rajneesh to Osho."
      thesisTag="Cultural Trajectory"
      thesisTitle="From Sensational Cult to Modern Mindfulness Empire"
      thesisDescription="Following Osho’s death in January 1990, his disciples rebranded the movement from a countercultural ashram to a luxury spiritual resort and global publishing entity. Decades later, the 2018 Netflix documentary series re-introduced the Rajneesh story to a generation of over 100 million streaming viewers."
      stat1="3 Post-1990 Analytical Dossiers"
      stat2="Trademark Filings & Streaming Data"
      articles={articles}
      contextIconType="glossary"
      contextTitle="Consult the Archival Glossary"
      contextDesc="Detailed etymological and historical definitions for terms like Neo-Sannyas, Dynamic Meditation, and Zorba the Buddha."
      contextLink="/glossary"
      contextLinkText="Explore Glossary"
      accentVariant="purple"
    />
  );
}
