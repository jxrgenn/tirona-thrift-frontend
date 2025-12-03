import React from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';

const UpcomingEvents: React.FC = () => {
    const events = [
        { 
            date: 'OCT 20', 
            title: 'BUNKER RAVE POP-UP', 
            location: 'Tirana Underground Base', 
            type: 'PHYSICAL',
            status: 'CONFIRMED'
        },
        { 
            date: 'NOV 01', 
            title: 'WINTER DROP VOL. 1', 
            location: 'Online Store', 
            type: 'DIGITAL',
            status: 'UPCOMING'
        },
    ];

    return (
        <div className="border-t border-b border-[#333] bg-[#050505] py-20 px-6 relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 text-[20vw] font-syne font-black text-[#111] leading-none select-none pointer-events-none -z-0">
                EVENTS
             </div>

             <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-4 h-4 bg-[#ccff00] animate-pulse"></div>
                    <h3 className="font-syne text-4xl font-bold uppercase text-white tracking-tighter">
                        Incoming <span className="text-transparent stroke-text text-[#ccff00]">Drops</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map((event, idx) => (
                        <div key={idx} className="group border border-[#333] bg-[#0a0a0a] p-8 hover:border-[#ccff00] transition-colors relative">
                            <div className="absolute top-4 right-4 text-xs font-mono text-[#ccff00] border border-[#ccff00]/30 px-2 py-1 uppercase">
                                {event.status}
                            </div>
                            
                            <div className="flex flex-col gap-6">
                                <div className="font-mono text-5xl md:text-6xl text-transparent stroke-text group-hover:text-[#ccff00] transition-all font-bold opacity-50 group-hover:opacity-100">
                                    {event.date}
                                </div>
                                
                                <div>
                                    <h4 className="font-syne text-2xl font-bold uppercase mb-2">{event.title}</h4>
                                    <div className="flex flex-col gap-2 text-sm font-mono text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Ticket size={14} />
                                            <span>{event.type} ACCESS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
}

export default UpcomingEvents;