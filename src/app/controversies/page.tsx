import React from 'react';
import { getArticlesByCategory } from '@/lib/articles';
import { PillarView } from '@/components/ui/PillarView';

export default function ControversiesPillarPage() {
  const articles = getArticlesByCategory('controversies');

  return (
    <PillarView
      pillarNumber="04"
      category="Controversies"
      title="The Controversies &"
      titleAccent="Criminal Trials"
      subtitle="The 1984 The Dalles salmonella bioterror attack, wiretapping conspiracies, Ma Anand Sheela’s federal conviction, and Osho’s Alford plea."
      plateSrc="/images/archival/osho-air-rajneesh.jpg"
      plateAlt="Air Rajneesh commuter aircraft and airstrip hangar, Wasco County, Oregon 1984"
      plateTag="Federal Court Evidence • Wasco County, 1984"
      plateCaption="Big Muddy Ranch airfield, center of federal surveillance operations during the 1985 indictments."
      thesisTag="Forensic Summary"
      thesisTitle="The First Domestic Bioterror Attack in U.S. History"
      thesisDescription="In September 1984, members of the commune’s inner circle under Ma Anand Sheela contaminated salad bars across ten restaurants in The Dalles with Salmonella Typhimurium, incapacitating 751 citizens to suppress voter turnout in the county election."
      stat1="U.S. District Court of Oregon Judgments"
      stat2="CDC Epidemiological Confirmation"
      articles={articles}
      contextIconType="sources"
      contextTitle="Cross-Examine Primary Judicial Sources"
      contextDesc="Inspect the declassified FBI file repository, CDC epidemiological reports, and plea bargain transcripts."
      contextLink="/sources"
      contextLinkText="Examine Source Vault"
      accentVariant="rose"
    />
  );
}
