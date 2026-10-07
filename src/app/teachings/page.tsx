import React from 'react';
import { getArticlesByCategory } from '@/lib/articles';
import { PillarView } from '@/components/ui/PillarView';

export default function TeachingsPillarPage() {
  const articles = getArticlesByCategory('teachings');

  return (
    <PillarView
      pillarNumber="02"
      category="Teachings"
      title="Teachings &"
      titleAccent="The New Synthesis"
      subtitle="Zorba the Buddha, Dynamic Meditation, and the deconstruction of orthodox ascetic guilt in favor of radical conscious celebration."
      plateSrc="/images/archival/osho-portrait.jpg"
      plateAlt="Bhagwan Shree Rajneesh in meditative stillness, Pune"
      plateTag="Archival Portrait • Pune, 1974"
      plateCaption="“Meditation is the realization that you are not the mind.” — Discourse Series 1974"
      thesisTag="Dialectical Thesis"
      thesisTitle="Reconciling Earthly Joy With Spiritual Silence"
      thesisDescription="Unlike traditional Eastern masters who demanded renunciation and monastic celibacy, Osho argued that suppressing human biology produced neurosis. His archetype of Zorba the Buddha proposed an integrated human being equally at home in material richness and meditative void."
      stat1="Over 600 Volumes Transcribed"
      stat2="Sourced from osho.com Archives"
      articles={articles}
      contextIconType="audio"
      contextTitle="Listen to the Archival Spoken Word Carousel"
      contextDesc="Sample verbatim quotes and recorded discourse transcripts across six key philosophical themes."
      contextLink="/#archival-quotes"
      contextLinkText="Play Archival Quotes"
      accentVariant="amber"
    />
  );
}
