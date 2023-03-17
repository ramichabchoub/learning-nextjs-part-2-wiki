import React from "react";
import getWikiResults from "@/lib/getWikiResults";
import Item from "./components/Item";

type Props = {
  params: {
    searchTerm: string;
  };
};

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;
  const displayTerm = searchTerm.replace(/_/g, " ");
  if (!data?.query?.pages)
    return {
      title: `No results found for "${displayTerm}"`,
      description: `No results found for "${displayTerm}"`,
    };
  return {
    title: `Search results for "${displayTerm}"`,
    description: `Search results for "${displayTerm}"`,
  };
}

export default async function page({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;
  const results: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results ? (
        Object.values(results).map((result) => (
          <div key={result.pageid} className="bg-white p-2 rounded-xl my-2">
            <Item result={result} />
          </div>
        ))
      ) : (
        <h1 className="text-2xl font-bold">
          {`No results found for "${searchTerm}"`}
        </h1>
      )}
    </main>
  );
  return content;
}
