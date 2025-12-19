import { useState } from 'react';
import { ExternalLink, FileText, Link as LinkIcon, Bell, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';

const NewsItem = ({ title, date, isNew }) => (
  <a 
    href="#" 
    className="flex items-start gap-2 py-2 px-1 text-sm text-primary hover:text-primary-dark hover:bg-primary/5 rounded transition-colors group"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="line-clamp-2 group-hover:underline">{title}</p>
      {date && <p className="text-xs text-muted-foreground mt-0.5">{date}</p>}
    </div>
    {isNew && <span className="new-tag">NEW</span>}
  </a>
);

const QuickLinkItem = ({ title, icon: Icon = LinkIcon, isNew }) => (
  <a 
    href="#" 
    className="flex items-center gap-2 py-2 px-1 text-sm text-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
  >
    <Icon className="h-4 w-4 text-success flex-shrink-0" />
    <span className="flex-1">{title}</span>
    {isNew && <span className="new-tag">NEW</span>}
    <ExternalLink className="h-3 w-3 text-muted-foreground" />
  </a>
);

export function InfoPanels({ language = 'en' }) {
  const [activeTab, setActiveTab] = useState('news');

  const content = {
    en: {
      sectionTitle: 'Information & Updates',
      latestNews: 'Latest News',
      quickLinks: 'Quick Links',
      tenderNotices: 'Tenders',
      viewAll: 'View all',
      news: [
        { title: 'Facility for reduction in premium as per G.R. dtd.14.01.2021 availed by Society', date: 'Dec 15, 2024', isNew: true },
        { title: 'Online application for rental housing scheme now available', date: 'Dec 12, 2024', isNew: true },
        { title: 'Digital agreement signing facility launched for verified tenants', date: 'Dec 10, 2024', isNew: false },
        { title: 'New guidelines for landlord registration process', date: 'Dec 08, 2024', isNew: false },
      ],
      links: [
        { title: 'Rental Housing Lottery Results 2024', isNew: true },
        { title: 'Apply for Rental Accommodation', isNew: false },
        { title: 'Download Rental Agreement Format', isNew: false },
        { title: 'Grievance Redressal Portal', isNew: false },
        { title: 'Police Verification Status', isNew: false },
      ],
      tenders: [
        { title: 'Tender for maintenance of rental housing complex, Pune', date: 'Due: Dec 30, 2024', isNew: true },
        { title: 'E-Tender for security services at MHADA colonies', date: 'Due: Jan 05, 2025', isNew: false },
        { title: 'Tender for renovation of rental units, Mumbai', date: 'Due: Jan 10, 2025', isNew: false },
      ],
    },
    mr: {
      sectionTitle: 'माहिती आणि अद्यतने',
      latestNews: 'ताज्या बातम्या',
      quickLinks: 'जलद दुवे',
      tenderNotices: 'निविदा',
      viewAll: 'सर्व पहा',
      news: [
        { title: 'सोसायटीद्वारे जी.आर. दि.14.01.2021 नुसार प्रीमियममध्ये कपातीची सुविधा', date: 'डिसें 15, 2024', isNew: true },
        { title: 'भाड्याच्या घरांच्या योजनेसाठी ऑनलाइन अर्ज आता उपलब्ध', date: 'डिसें 12, 2024', isNew: true },
        { title: 'सत्यापित भाडेकरूंसाठी डिजिटल करार स्वाक्षरी सुविधा सुरू', date: 'डिसें 10, 2024', isNew: false },
        { title: 'घरमालक नोंदणी प्रक्रियेसाठी नवीन मार्गदर्शक तत्त्वे', date: 'डिसें 08, 2024', isNew: false },
      ],
      links: [
        { title: 'भाड्याचे गृहनिर्माण लॉटरी निकाल 2024', isNew: true },
        { title: 'भाड्याच्या निवासासाठी अर्ज करा', isNew: false },
        { title: 'भाडे करार नमुना डाउनलोड करा', isNew: false },
        { title: 'तक्रार निवारण पोर्टल', isNew: false },
        { title: 'पोलीस पडताळणी स्थिती', isNew: false },
      ],
      tenders: [
        { title: 'भाड्याच्या गृहनिर्माण संकुल देखभालीसाठी निविदा, पुणे', date: 'मुदत: डिसें 30, 2024', isNew: true },
        { title: 'म्हाडा वसाहतींमध्ये सुरक्षा सेवांसाठी ई-निविदा', date: 'मुदत: जाने 05, 2025', isNew: false },
        { title: 'भाड्याच्या युनिट्सच्या नूतनीकरणासाठी निविदा, मुंबई', date: 'मुदत: जाने 10, 2025', isNew: false },
      ],
    },
  };

  const t = content[language];

  const tabs = [
    { id: 'news', label: t.latestNews, icon: Bell },
    { id: 'links', label: t.quickLinks, icon: LinkIcon },
    { id: 'tenders', label: t.tenderNotices, icon: FileText },
  ];

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-primary/5 to-success/5 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">{t.sectionTitle}</h3>
        </div>
      </div>

      {/* Tab Headers */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 max-h-64 overflow-y-auto scrollbar-thin">
        {activeTab === 'news' && (
          <div className="space-y-1">
            {t.news.map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
            <a href="#" className="block text-center text-sm text-primary hover:underline mt-3 pt-2 border-t border-border">
              {t.viewAll} →
            </a>
          </div>
        )}

        {activeTab === 'links' && (
          <div className="space-y-1">
            {t.links.map((item, index) => (
              <QuickLinkItem key={index} {...item} />
            ))}
          </div>
        )}

        {activeTab === 'tenders' && (
          <div className="space-y-1">
            {t.tenders.map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
            <a href="#" className="block text-center text-sm text-primary hover:underline mt-3 pt-2 border-t border-border">
              {t.viewAll} →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
