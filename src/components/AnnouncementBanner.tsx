import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface AnnouncementBannerProps {
  title?: string;
  content: string;
  lastUpdated: string;
}

const AnnouncementBanner = ({ title, content, lastUpdated }: AnnouncementBannerProps) => {
  return (
    <Card className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <div className="space-y-3">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        <div className="whitespace-pre-line text-foreground/90">
          {content}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Last updated on {new Date(lastUpdated).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>
    </Card>
  );
};

export default AnnouncementBanner;
