import devendraFadnavis from '@/assets/leaders/devendra-fadnavis.jpg';
import eknathShinde from '@/assets/leaders/eknath-shinde.jpeg';
import ajitPawar from '@/assets/leaders/ajit-pawar.jpg';
import pankajBhoyar from '@/assets/leaders/pankaj-bhoyar.jpg';
import aseemKumarGupta from '@/assets/leaders/aseem-kumar-gupta.jpg';
import sanjeevJaiswal from '@/assets/leaders/sanjeev-jaiswal.avif';

const leaders = [
  {
    name: 'Shri Devendra Fadnavis',
    designation: "Hon. Chief Minister, Maharashtra",
    designationMr: "मा. मुख्यमंत्री, महाराष्ट्र",
    image: devendraFadnavis,
  },
  {
    name: 'Shri Eknath Shinde',
    designation: "Hon. Deputy CM & Housing Minister",
    designationMr: "मा. उपमुख्यमंत्री व गृहनिर्माण मंत्री",
    image: eknathShinde,
  },
  {
    name: 'Shri Ajit Pawar',
    designation: "Hon. Deputy Chief Minister",
    designationMr: "मा. उपमुख्यमंत्री",
    image: ajitPawar,
  },
  {
    name: 'Dr. Pankaj Bhoyar',
    designation: "Hon. Minister of State (Housing)",
    designationMr: "मा. गृहनिर्माण राज्यमंत्री",
    image: pankajBhoyar,
  },
  {
    name: 'Shri Aseem Kumar Gupta (IAS)',
    designation: "Addl. Chief Secretary (Housing)",
    designationMr: "अपर मुख्य सचिव (गृहनिर्माण)",
    image: aseemKumarGupta,
  },
  {
    name: 'Shri Sanjeev Jaiswal (IAS)',
    designation: "VP & CEO, MHADA",
    designationMr: "उपाध्यक्ष व CEO, म्हाडा",
    image: sanjeevJaiswal,
  },
];

export function LeadershipProfiles({ language = 'en' }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/95 shadow-xl">
      {/* Subtle tricolour wave background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#FF9933]/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 -left-10 w-32 h-32 bg-gradient-to-r from-white/40 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-[#138808]/15 to-transparent rounded-full blur-2xl" />
        {/* Subtle wave pattern */}
        <svg className="absolute bottom-0 left-0 right-0 h-16 opacity-10" viewBox="0 0 400 50" preserveAspectRatio="none">
          <path d="M0,25 Q100,0 200,25 T400,25 L400,50 L0,50 Z" fill="#FF9933" />
          <path d="M0,30 Q100,10 200,30 T400,30 L400,50 L0,50 Z" fill="#FFFFFF" />
          <path d="M0,35 Q100,20 200,35 T400,35 L400,50 L0,50 Z" fill="#138808" />
        </svg>
      </div>

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
              {language === 'en' ? 'Government Leadership' : 'शासकीय नेतृत्व'}
            </span>
          </div>
          <h3 className="text-sm font-bold text-foreground">
            {language === 'en' ? 'Maharashtra State & MHADA' : 'महाराष्ट्र राज्य व म्हाडा'}
          </h3>
        </div>

        {/* Leaders Grid - 2 rows × 3 columns */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          {leaders.map((leader, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Circular portrait with saffron border */}
              <div className="relative mb-2">
                <div className="w-16 h-16 rounded-full border-[3px] border-primary bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Name */}
              <p className="text-[11px] font-semibold text-foreground leading-tight line-clamp-2 px-1">
                {leader.name}
              </p>
              
              {/* Designation */}
              <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 line-clamp-2 px-1">
                {language === 'en' ? leader.designation : leader.designationMr}
              </p>
            </div>
          ))}
        </div>

        {/* Footer accent */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-[9px] text-center text-muted-foreground">
            {language === 'en' 
              ? 'Committed to Transparent & Affordable Housing' 
              : 'पारदर्शक आणि परवडणाऱ्या गृहनिर्माणासाठी वचनबद्ध'}
          </p>
        </div>
      </div>
    </div>
  );
}
