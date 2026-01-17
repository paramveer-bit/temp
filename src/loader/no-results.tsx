'use client';
import React from 'react';
import { SearchX } from 'lucide-react';

interface NoResultsProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NoResults({
  title = 'No Results Found',
  description = "We couldn't find any items matching your criteria.",
  className = '',
}: NoResultsProps) {
  return (
    <div className={`text-center w-full flex flex-col justify-center items-center  ${className}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
    </div>
  );
}
