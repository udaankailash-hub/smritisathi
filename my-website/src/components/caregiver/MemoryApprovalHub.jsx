import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, Upload, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { FormField, Input, Textarea, Select } from '../ui/Form';
import { memoryGraphService } from '../../services/memoryGraph';

export function MemoryApprovalHub({ onMemoryApproved }) {
  const [memories, setMemories] = useState(() => memoryGraphService.getMemories());
  const [isAdding, setIsAdding] = useState(false);

  // New Memory Form State
  const [category, setCategory] = useState('PLACES');
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80');

  const handleCreateMemory = (e) => {
    e.preventDefault();
    if (!title || !context) return;

    const newMem = memoryGraphService.addMemory({
      category,
      title,
      context,
      imageUrl,
      caregiverName: 'Priyanka Borah',
    });

    setMemories([...memoryGraphService.getMemories()]);
    setIsAdding(false);
    setTitle('');
    setContext('');
  };

  const handleApprove = (id) => {
    memoryGraphService.approveMemory(id, 'Priyanka Borah');
    setMemories([...memoryGraphService.getMemories()]);
    onMemoryApproved?.();
  };

  const pending = memories.filter((m) => m.approvalStatus === 'PENDING_REVIEW');
  const approved = memories.filter((m) => m.approvalStatus === 'APPROVED');

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-100">Personal Memory Approval Pipeline</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Only caregiver-approved memories are generated as activities for Abeni.
          </p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant="primary" size="sm" icon={Plus}>
          {isAdding ? 'Cancel' : 'Upload New Memory'}
        </Button>
      </div>

      {/* New Memory Drawer Form */}
      {isAdding && (
        <Card className="border-teal-500/40 bg-slate-900/95 shadow-xl">
          <CardHeader>
            <CardTitle className="text-base">Upload Family Photograph & Context</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateMemory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Pillar / Category" required>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={[
                      { value: 'PEOPLE', label: 'Family & Loved Ones' },
                      { value: 'PLACES', label: 'Familiar Spaces & Home' },
                      { value: 'OBJECTS', label: 'Domestic Traditional Objects' },
                      { value: 'EVENTS', label: 'Festivals & Celebrations' },
                    ]}
                  />
                </FormField>

                <FormField label="Human Label / Title" required helperText="e.g. Guwahati Front Garden">
                  <Input
                    placeholder="Enter familiar name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Context / Memory Story" required helperText="Describe the memory in warm, simple words">
                <Textarea
                  placeholder="e.g. Sharing morning tea with potted orchids on the veranda..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </FormField>

              <div className="flex justify-end gap-3 pt-2">
                <Button onClick={() => setIsAdding(false)} variant="outline" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={Sparkles}>
                  Prepare Structured Activity
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Pending Approvals Section */}
      {pending.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Pending Caregiver Approval ({pending.length})
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pending.map((m) => (
              <Card key={m.id} className="border-amber-500/40 bg-slate-900 shadow-md">
                <div className="h-44 bg-slate-950 overflow-hidden relative">
                  <img src={m.imageUrl} alt={m.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge variant="amber" size="xs">Needs Approval</Badge>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h5 className="font-bold text-base text-white">{m.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">"{m.context}"</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                    <span className="text-teal-400 font-bold block mb-1">Generated Activity Question:</span>
                    <p>{m.question}</p>
                  </div>
                  <Button
                    onClick={() => handleApprove(m.id)}
                    variant="primary"
                    size="sm"
                    className="w-full bg-teal-600 hover:bg-teal-500"
                    icon={CheckCircle2}
                  >
                    Approve for Abeni's Activities
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Approved Catalog */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Active in Abeni's Activities ({approved.length})
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {approved.map((m) => (
            <Card key={m.id} className="border-slate-800 bg-slate-900/80">
              <div className="h-36 bg-slate-950 overflow-hidden relative">
                <img src={m.imageUrl} alt={m.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant="teal" size="xs">Approved ✓</Badge>
                </div>
              </div>
              <CardContent className="p-3.5 space-y-1">
                <h5 className="font-bold text-sm text-white truncate">{m.title}</h5>
                <p className="text-xs text-slate-400 line-clamp-2">{m.context}</p>
                <span className="text-[10px] text-teal-400 font-semibold block pt-1">
                  Approved by {m.approvedBy || 'Priyanka'}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
