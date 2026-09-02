import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Music, Heart } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { voice } from '../../services/voiceService';

const TRACKS = [
  {
    id: '1',
    title: 'Peaceful Assam River & Flute',
    region: 'Brahmaputra Melodies',
    description: 'Calm acoustic river streams and soothing morning bamboo flute.',
  },
  {
    id: '2',
    title: 'Traditional Bihu Dhol & Pepa Rhythm',
    region: 'Assam Folk Culture',
    description: 'Gentle cultural tempo evoking joyful spring festival memories.',
  },
  {
    id: '3',
    title: 'Khasi Hills Acoustic Serenade',
    region: 'Meghalaya Folk',
    description: 'Gentle acoustic strings reminding of misty hill trails and pine groves.',
  },
];

export function MusicPlayer({ currentLang = 'en', onBack }) {
  const [activeTrack, setActiveTrack] = useState(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (track) => {
    if (activeTrack.id === track.id) {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        voice.speak(`Playing ${track.title}`, currentLang);
      }
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
      voice.speak(`Playing ${track.title}`, currentLang);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Back to Hub
        </Button>
        <Badge variant="sky" size="sm">
          <Music className="w-3.5 h-3.5 mr-1" />
          Music & Reminiscence Therapy
        </Badge>
      </div>

      <Card className="border-sky-500/30 bg-slate-900 shadow-xl overflow-hidden">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900 border border-sky-500/30 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300 mx-auto animate-pulse">
              <Music className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{activeTrack.title}</h3>
              <p className="text-xs text-sky-400 font-semibold mt-0.5">{activeTrack.region}</p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                {activeTrack.description}
              </p>
            </div>

            <div className="pt-3 flex items-center justify-center gap-3">
              <Button
                onClick={() => togglePlay(activeTrack)}
                variant="senior"
                size="lg"
                icon={isPlaying ? Pause : Play}
                className="bg-sky-600 hover:bg-sky-500 border-sky-400/40"
              >
                {isPlaying ? 'Pause Melody' : 'Play Soothing Melody'}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Cultural & Regional Melodies
            </h4>
            {TRACKS.map((t) => (
              <div
                key={t.id}
                onClick={() => togglePlay(t)}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  activeTrack.id === t.id
                    ? 'bg-sky-500/10 border-sky-500/40 text-sky-200'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 text-slate-300'
                }`}
              >
                <div>
                  <h5 className="font-bold text-sm text-white">{t.title}</h5>
                  <p className="text-xs text-slate-400">{t.region}</p>
                </div>
                <Button variant="ghost" size="sm" icon={activeTrack.id === t.id && isPlaying ? Pause : Play}>
                  {activeTrack.id === t.id && isPlaying ? 'Playing' : 'Listen'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
