import { Facebook, Youtube, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const eventPlatforms = [
  {
    id: 'facebook',
    labelEn: 'Facebook Live',
    labelMr: 'फेसबुक लाइव्ह',
    icon: Facebook,
    color: 'text-[#1877F2]',
    bgColor: 'bg-[#1877F2]/10',
  },
  {
    id: 'youtube',
    labelEn: 'YouTube Live',
    labelMr: 'यूट्यूब लाइव्ह',
    icon: Youtube,
    color: 'text-[#FF0000]',
    bgColor: 'bg-[#FF0000]/10',
  },
  {
    id: 'zoom',
    labelEn: 'Zoom Live',
    labelMr: 'झूम लाइव्ह',
    icon: Video,
    color: 'text-[#2D8CFF]',
    bgColor: 'bg-[#2D8CFF]/10',
  },
];

export const EventGlimpse = ({ language = 'en' }) => {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              {language === 'en' ? 'Glimpse of the Event' : 'कार्यक्रमाची झलक'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {language === 'en' 
                ? 'Watch official live streams on our platforms' 
                : 'आमच्या प्लॅटफॉर्मवर अधिकृत लाइव्ह स्ट्रीम पहा'}
            </p>
          </div>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventPlatforms.map((platform) => (
              <Card 
                key={platform.id}
                className="border border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className={`w-16 h-16 rounded-full ${platform.bgColor} flex items-center justify-center mb-4`}>
                    <platform.icon className={`h-8 w-8 ${platform.color}`} />
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    {language === 'en' ? platform.labelEn : platform.labelMr}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
