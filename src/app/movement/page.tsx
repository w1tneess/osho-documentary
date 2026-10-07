import React from 'react';
import { getArticlesByCategory } from '@/lib/articles';
import { PillarView } from '@/components/ui/PillarView';

export default function MovementPillarPage() {
  const articles = getArticlesByCategory('movement');

  return (
    <PillarView
      pillarNumber="03"
      category="Movement"
      title="The Global"
      titleAccent="Movement & Communes"
      subtitle="From the lush tropical ashram in Koregaon Park, Pune, to the 64,000-acre utopian city of Rajneeshpuram in the high desert of Central Oregon."
      plateSrc="/images/archival/rajneesh-rolls-royce.jpg"
      plateAlt="Bhagwan greeting disciples on Nirvana Drive from Rolls-Royce, Rajneeshpuram 1983"
      plateTag="Oregon Commune • Nirvana Drive, 1983"
      plateCaption="Daily drive-by on Nirvana Drive. Disciples purchased a fleet of 93 Rolls-Royces for Osho."
      thesisTag="Institutional Scale"
      thesisTitle="The Built Environment of Spiritual Utopias"
      thesisDescription="The sannyas movement was unique among new religious movements for its immense scale of civil engineering. In Oregon, disciples built an incorporated municipality complete with its own police force, fire department, public transit fleet, private airstrip, and reservoir dam."
      stat1="3 Detailed Epoch Dossiers"
      stat2="Land Deeds & City Charter Records"
      articles={articles}
      contextIconType="photos"
      contextTitle="Inspect the Archival Photograph Gallery"
      contextDesc="Browse authentic historical photographs of the Oregon commune, Air Rajneesh fleet, and Pune gatherings."
      contextLink="/#archival-gallery"
      contextLinkText="View Archival Photos"
      accentVariant="amber"
    />
  );
}
