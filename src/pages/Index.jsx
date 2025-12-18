import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GovHeader } from '@/components/shared/GovHeader';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Home,
  Building2,
  Shield,
  Users,
  FileCheck,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Search,
  FileText,
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  const content = {
    en: {
      hero: {
        title: 'Maharashtra State Rental Housing Portal',
        subtitle: 'A Government Initiative for Transparent & Verified Rental Housing',
        description: 'Find verified rental properties, complete digital rental journey with eKYC, and secure government-backed rental agreements.',
        cta: 'Get Started',
        searchPlaceholder: 'Search by location, property type...',
      },
      roles: {
        title: 'Choose Your Role',
        subtitle: 'Select how you want to use the portal',
        tenant: {
          title: 'I am a Tenant',
          description: 'Search verified properties, apply for rentals, and manage your agreements digitally.',
          features: ['Search verified properties', 'Digital rental application', 'Secure agreements'],
        },
        landlord: {
          title: 'I am a Landlord',
          description: 'List your properties, verify tenants, and manage rental agreements from one place.',
          features: ['List multiple properties', 'Verify tenants', 'Digital agreements'],
        },
        admin: {
          title: 'Government Admin',
          description: 'Monitor rental inventory, verify listings, and manage grievances across Maharashtra.',
          features: ['GIS-based monitoring', 'Application oversight', 'Grievance management'],
        },
      },
      features: {
        title: 'Why Choose Our Portal?',
        items: [
          { icon: Shield, title: 'Government Verified', description: 'All properties and tenants are verified through official channels' },
          { icon: FileCheck, title: 'Digital Agreements', description: 'Complete rental agreements digitally with e-signing' },
          { icon: MapPin, title: 'Location Based', description: 'Find properties in your preferred location with GIS mapping' },
          { icon: Users, title: 'Police Verification', description: 'Integrated police verification for safety and security' },
        ],
      },
      stats: {
        properties: '10,000+',
        propertiesLabel: 'Verified Properties',
        tenants: '50,000+',
        tenantsLabel: 'Registered Tenants',
        agreements: '25,000+',
        agreementsLabel: 'Digital Agreements',
        districts: '36',
        districtsLabel: 'Districts Covered',
      },
    },
    mr: {
      hero: {
        title: 'महाराष्ट्र राज्य भाड्याचे गृहनिर्माण पोर्टल',
        subtitle: 'पारदर्शक आणि सत्यापित भाड्याच्या घरांसाठी सरकारी उपक्रम',
        description: 'सत्यापित भाड्याचे घर शोधा, eKYC सह डिजिटल भाडे प्रक्रिया पूर्ण करा आणि सरकार-समर्थित भाडे करार सुरक्षित करा.',
        cta: 'सुरू करा',
        searchPlaceholder: 'स्थान, मालमत्ता प्रकार शोधा...',
      },
      roles: {
        title: 'तुमची भूमिका निवडा',
        subtitle: 'तुम्हाला पोर्टल कसे वापरायचे आहे ते निवडा',
        tenant: {
          title: 'मी भाडेकरू आहे',
          description: 'सत्यापित मालमत्ता शोधा, भाड्यासाठी अर्ज करा आणि तुमचे करार डिजिटली व्यवस्थापित करा.',
          features: ['सत्यापित मालमत्ता शोधा', 'डिजिटल भाडे अर्ज', 'सुरक्षित करार'],
        },
        landlord: {
          title: 'मी घरमालक आहे',
          description: 'तुमच्या मालमत्ता सूचीबद्ध करा, भाडेकरूंची पडताळणी करा आणि एकाच ठिकाणाहून भाडे करार व्यवस्थापित करा.',
          features: ['अनेक मालमत्ता सूचीबद्ध करा', 'भाडेकरू पडताळणी', 'डिजिटल करार'],
        },
        admin: {
          title: 'सरकारी प्रशासक',
          description: 'भाड्याच्या यादीचे निरीक्षण करा, सूचींची पडताळणी करा आणि संपूर्ण महाराष्ट्रातील तक्रारी व्यवस्थापित करा.',
          features: ['GIS-आधारित निरीक्षण', 'अर्ज देखरेख', 'तक्रार व्यवस्थापन'],
        },
      },
      features: {
        title: 'आमचे पोर्टल का निवडा?',
        items: [
          { icon: Shield, title: 'सरकार सत्यापित', description: 'सर्व मालमत्ता आणि भाडेकरू अधिकृत चॅनेलद्वारे सत्यापित' },
          { icon: FileCheck, title: 'डिजिटल करार', description: 'ई-स्वाक्षरीसह डिजिटली भाडे करार पूर्ण करा' },
          { icon: MapPin, title: 'स्थान आधारित', description: 'GIS मॅपिंगसह तुमच्या पसंतीच्या ठिकाणी मालमत्ता शोधा' },
          { icon: Users, title: 'पोलीस पडताळणी', description: 'सुरक्षितता आणि सुरक्षेसाठी एकात्मिक पोलीस पडताळणी' },
        ],
      },
      stats: {
        properties: '१०,०००+',
        propertiesLabel: 'सत्यापित मालमत्ता',
        tenants: '५०,०००+',
        tenantsLabel: 'नोंदणीकृत भाडेकरू',
        agreements: '२५,०००+',
        agreementsLabel: 'डिजिटल करार',
        districts: '३६',
        districtsLabel: 'जिल्हे समाविष्ट',
      },
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-8 animate-fade-in">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'Official Government Portal' : 'अधिकृत सरकारी पोर्टल'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-4 animate-slide-up delay-100">
                {t.hero.subtitle}
              </p>
              <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto animate-slide-up delay-200">
                {t.hero.description}
              </p>

              <div className="max-w-2xl mx-auto mb-8 animate-slide-up delay-300">
                <div className="flex gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
                    <input
                      type="text"
                      placeholder={t.hero.searchPlaceholder}
                      className="w-full h-12 pl-12 pr-4 bg-primary-foreground/10 rounded-lg text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                    />
                  </div>
                  <Button variant="hero" size="lg" onClick={() => navigate('/tenant/properties')}>
                    <Search className="h-5 w-5" />
                    {language === 'en' ? 'Search' : 'शोधा'}
                  </Button>
                </div>
              </div>

              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate('/register')}
                className="animate-slide-up delay-400"
              >
                {t.hero.cta}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="hsl(var(--background))"
              />
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 -mt-8 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
              {[
                { value: t.stats.properties, label: t.stats.propertiesLabel, icon: Home },
                { value: t.stats.tenants, label: t.stats.tenantsLabel, icon: Users },
                { value: t.stats.agreements, label: t.stats.agreementsLabel, icon: FileText },
                { value: t.stats.districts, label: t.stats.districtsLabel, icon: MapPin },
              ].map((stat, index) => (
                <Card
                  key={index}
                  variant="elevated"
                  className="text-center p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Role Selection Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.roles.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.roles.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card
                variant="interactive"
                className="overflow-hidden group"
                onClick={() => navigate('/login?role=tenant')}
              >
                <div className="h-2 bg-gradient-to-r from-primary to-info" />
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{t.roles.tenant.title}</CardTitle>
                  <CardDescription>{t.roles.tenant.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {t.roles.tenant.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="default">
                    {language === 'en' ? 'Continue as Tenant' : 'भाडेकरू म्हणून सुरू ठेवा'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card
                variant="interactive"
                className="overflow-hidden group"
                onClick={() => navigate('/login?role=landlord')}
              >
                <div className="h-2 bg-gradient-to-r from-accent to-accent-light" />
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{t.roles.landlord.title}</CardTitle>
                  <CardDescription>{t.roles.landlord.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {t.roles.landlord.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="hero">
                    {language === 'en' ? 'Continue as Landlord' : 'घरमालक म्हणून सुरू ठेवा'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card
                variant="interactive"
                className="overflow-hidden group"
                onClick={() => navigate('/login?role=admin')}
              >
                <div className="h-2 bg-gradient-to-r from-success to-info" />
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="h-8 w-8 text-success" />
                  </div>
                  <CardTitle className="text-xl">{t.roles.admin.title}</CardTitle>
                  <CardDescription>{t.roles.admin.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {t.roles.admin.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="success">
                    {language === 'en' ? 'Admin Login' : 'प्रशासक लॉगिन'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.features.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {t.features.items.map((feature, index) => (
                <Card
                  key={index}
                  variant="elevated"
                  className="text-center p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {language === 'en' ? 'How It Works' : 'हे कसे कार्य करते'}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: 1, title: language === 'en' ? 'Register' : 'नोंदणी करा', icon: Users, description: language === 'en' ? 'Create your account with Aadhaar verification' : 'आधार पडताळणीसह तुमचे खाते तयार करा' },
                  { step: 2, title: language === 'en' ? 'Search' : 'शोधा', icon: Search, description: language === 'en' ? 'Browse verified properties in your area' : 'तुमच्या क्षेत्रातील सत्यापित मालमत्ता शोधा' },
                  { step: 3, title: language === 'en' ? 'Apply' : 'अर्ज करा', icon: FileCheck, description: language === 'en' ? 'Submit rental application online' : 'ऑनलाइन भाडे अर्ज सादर करा' },
                  { step: 4, title: language === 'en' ? 'Sign Agreement' : 'करार स्वाक्षरी', icon: Shield, description: language === 'en' ? 'Complete digital rental agreement' : 'डिजिटल भाडे करार पूर्ण करा' },
                ].map((item, index) => (
                  <div key={index} className="relative text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 relative z-10">
                      <item.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                    )}
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' ? 'Ready to Find Your New Home?' : 'तुमचे नवीन घर शोधण्यास तयार आहात?'}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Join thousands of citizens who have found verified rental housing through our portal.'
                : 'आमच्या पोर्टलद्वारे सत्यापित भाड्याचे घर शोधलेल्या हजारो नागरिकांमध्ये सामील व्हा.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" onClick={() => navigate('/register')}>
                {language === 'en' ? 'Register Now' : 'आता नोंदणी करा'}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate('/tenant/properties')}
              >
                {language === 'en' ? 'Browse Properties' : 'मालमत्ता शोधा'}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
