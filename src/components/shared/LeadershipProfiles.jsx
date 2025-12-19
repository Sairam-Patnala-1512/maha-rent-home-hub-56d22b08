import { User } from 'lucide-react';

const leaders = [
  {
    name: 'Shri Devendra Fadnavis',
    designation: "Hon. Chief Minister, Maharashtra",
    designationMr: "मा. मुख्यमंत्री, महाराष्ट्र",
  },
  {
    name: 'Shri Eknath Shinde',
    designation: "Hon. Deputy CM & Housing Minister",
    designationMr: "मा. उपमुख्यमंत्री व गृहनिर्माण मंत्री",
  },
  {
    name: 'Shri Ajit Pawar',
    designation: "Hon. Deputy Chief Minister",
    designationMr: "मा. उपमुख्यमंत्री",
  },
  {
    name: 'Dr. Pankaj Bhoyar',
    designation: "Hon. Minister of State (Housing)",
    designationMr: "मा. गृहनिर्माण राज्यमंत्री",
  },
  {
    name: 'Shri Aseem Kumar Gupta (IAS)',
    designation: "Addl. Chief Secretary (Housing)",
    designationMr: "अपर मुख्य सचिव (गृहनिर्माण)",
  },
  {
    name: 'Shri Sanjeev Jaiswal (IAS)',
    designation: "Vice President & CEO, MHADA",
    designationMr: "उपाध्यक्ष व मुख्य कार्यकारी अधिकारी, म्हाडा",
  },
];

export function LeadershipProfiles({ language = 'en' }) {
  return (
    <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
      <h3 className="text-sm font-semibold text-primary-foreground text-center mb-3 uppercase tracking-wide">
        {language === 'en' ? 'Leadership' : 'नेतृत्व'}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {leaders.map((leader, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Circular portrait placeholder with MHADA saffron border */}
            <div className="w-14 h-14 rounded-full border-2 border-primary bg-primary-foreground/20 flex items-center justify-center mb-1.5 overflow-hidden">
              <User className="h-7 w-7 text-primary-foreground/60" />
            </div>
            {/* Name and designation */}
            <p className="text-[10px] font-semibold text-primary-foreground leading-tight line-clamp-2">
              {leader.name}
            </p>
            <p className="text-[8px] text-primary-foreground/70 leading-tight mt-0.5 line-clamp-2">
              {language === 'en' ? leader.designation : leader.designationMr}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
