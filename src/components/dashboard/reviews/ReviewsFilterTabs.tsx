import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ReviewTab = 'published' | 'pending';

interface ReviewsFilterTabsProps {
  activeTab: ReviewTab;
  onTabChange: (tab: ReviewTab) => void;
}

const ReviewsFilterTabs: React.FC<ReviewsFilterTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex-shrink-0">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as ReviewTab)}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger
            value="published"
            className="data-[state=active]:bg-[#201781] data-[state=active]:text-white data-[state=active]:underline data-[state=active]:underline-offset-4"
          >
            Published
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-[#201781] data-[state=active]:text-white data-[state=active]:underline data-[state=active]:underline-offset-4"
          >
            Pending
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ReviewsFilterTabs;
