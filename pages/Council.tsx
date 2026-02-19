import React from 'react';
import { Quote, Award, GraduationCap, Newspaper, ExternalLink, Brain, FileText } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TextEffect from '../components/TextEffect';
import { useData } from '../context/DataContext';

const Council: React.FC = () => {
  const { council } = useData();

  // Leadership
  const advisor = council.find(m => m.role.toLowerCase().includes('cố vấn'));
  const director = council.find(m => m.role.toLowerCase().includes('viện trưởng') && !m.role.toLowerCase().includes('phó'));
  const viceDirector = council.find(m => m.role.toLowerCase().includes('viện phó'));
  const leadershipMembers = [advisor, director, viceDirector].filter((m): m is typeof advisor => !!m);

  // Scientific Council
  const leadershipIds = leadershipMembers.map(m => m!.id);
  const scientificCouncil = council.filter(m => !leadershipIds.includes(m.id));

  return (
    <div className="bg-white dark:bg-darkBg min-h-screen transition-colors duration-300 font-sans pb-20">
       
       {/* HERO HEADER */}
       <div className="relative py-16 md:py-24 bg-gradient-to-r from-[#38b6ff] to-blue-600 text-white">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
         <div className="container mx-auto px-4 text-center relative z-10">
           <ScrollReveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-4">
                <Brain className="w-3 h-3 mr-2" /> Tổ chức Nhân sự
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                <TextEffect text="Cơ cấu Tổ chức" />
              </h1>
              <p className="text-blue-100 max-w-2xl mx-auto font-light">
                Hội đồng Khoa học uy tín và Ban Lãnh đạo tâm huyết.
              </p>
           </ScrollReveal>
         </div>
       </div>

      {/* SECTION 1: LEADERSHIP */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
             <div className="text-center mb-12">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white uppercase text-[#38b6ff]">Ban Lãnh đạo Viện</h2>
                <div className="w-16 h-1 bg-[#38b6ff] mx-auto mt-3"></div>
             </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipMembers.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 150} direction="up" className="h-full">
                 <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="h-2 bg-[#38b6ff] w-full"></div>
                    <div className="p-6 flex flex-col items-center text-center flex-1">
                        <div className="w-32 h-32 rounded-full p-1 border-2 border-gray-100 dark:border-gray-700 mb-4 group-hover:border-[#38b6ff] transition-colors">
                            <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        
                        <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-[#38b6ff] text-xs font-bold uppercase rounded-full mb-3">
                            {member.role}
                        </span>
                        
                        <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                        {member.alias && <p className="text-gray-400 text-xs italic mb-4">({member.alias})</p>}

                        <div className="w-full border-t border-gray-100 dark:border-gray-800 my-4"></div>

                        <div className="text-sm text-gray-600 dark:text-gray-300 text-left w-full space-y-4">
                            {member.bio && (
                                <p className="italic text-gray-500 text-center text-xs">"{member.bio}"</p>
                            )}
                            
                            {member.education && member.education.length > 0 && (
                                <div>
                                    <h4 className="font-bold text-xs uppercase text-gray-400 mb-2 flex items-center"><GraduationCap className="w-3 h-3 mr-1"/> Học vấn</h4>
                                    <ul className="space-y-1">
                                        {member.education.map((edu, i) => (
                                            <li key={i} className="flex items-start text-xs">
                                                <span className="mr-2 text-[#38b6ff]">•</span> {edu}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {member.achievements && member.achievements.length > 0 && (
                                <div>
                                    <h4 className="font-bold text-xs uppercase text-gray-400 mb-2 flex items-center"><Award className="w-3 h-3 mr-1"/> Thành tựu</h4>
                                    <ul className="space-y-1">
                                        {member.achievements.slice(0, 2).map((ach, i) => (
                                            <li key={i} className="flex items-start text-xs">
                                                <span className="mr-2 text-yellow-500">★</span> {ach}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                        {member.pressLinks && member.pressLinks.length > 0 && (
                           <div className="mt-auto w-full pt-4">
                              <p className="text-[10px] font-bold text-gray-400 uppercase text-left mb-2">Báo chí</p>
                              {member.pressLinks.map((link, idx) => (
                                <a key={idx} href={link.url} target="_blank" rel="noopener" className="flex items-center text-xs text-[#38b6ff] hover:underline mb-1">
                                    <Newspaper className="w-3 h-3 mr-1" /> <span className="truncate">{link.source}</span> <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              ))}
                           </div>
                        )}
                    </div>
                 </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: SCIENTIFIC COUNCIL */}
      <section className="py-12 bg-gray-50 dark:bg-[#151f32]">
        <div className="container mx-auto px-4">
           <ScrollReveal>
             <div className="mb-10 border-l-4 border-[#38b6ff] pl-4">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white uppercase">Hội đồng Khoa học</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Các chuyên gia, giảng viên và nhà nghiên cứu uy tín.</p>
             </div>
           </ScrollReveal>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {scientificCouncil.map((member, i) => (
                <ScrollReveal key={member.id} delay={i * 50} direction="up">
                    <div className="bg-white dark:bg-[#1e293b] p-6 rounded border border-gray-200 dark:border-gray-800 hover:border-[#38b6ff] transition-all flex items-start gap-4 h-full">
                        <img src={member.image} alt={member.name} className="w-16 h-16 rounded object-cover bg-gray-100" />
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{member.name}</h4>
                            <p className="text-xs font-bold text-[#38b6ff] uppercase mb-1">{member.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                    </div>
                </ScrollReveal>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Council;
