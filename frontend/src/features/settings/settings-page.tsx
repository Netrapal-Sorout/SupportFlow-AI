import { Bell, Bot, Building2, Save, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSettings, updatePreferences, updateProfile, updateWorkspace, type SettingsData } from './settings.api';

type Section = 'profile' | 'workspace' | 'notifications' | 'ai';
const sections: Array<[Section,string,string,typeof User]> = [
  ['profile','Profile','Personal account',User],
  ['workspace','Workspace','Company settings',Building2],
  ['notifications','Notifications','Alert preferences',Bell],
  ['ai','AI Configuration','AI behavior',Bot],
];

export function SettingsPage() {
  const [active, setActive] = useState<Section>('profile');
  const [data, setData] = useState<SettingsData | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { void getSettings().then(setData).catch((e) => setError(e instanceof Error ? e.message : 'Unable to load settings')); }, []);
  if (!data) return <div className="sf-page"><div className="sf-page__inner">{error ? <div className="sf-alert">{error}</div> : <div className="sf-empty">Loading settings…</div>}</div></div>;
  return (
    <div className="sf-page settings-page">
      <div className="sf-page__inner sf-stack">
        <header className="sf-card sf-page-header" style={{ padding: '18px 20px' }}>
          <div><h1 className="sf-heading">Settings</h1><p className="sf-subheading">Manage account, workspace, notifications and AI preferences.</p></div>
        </header>
        <div className="sf-settings-layout">
          <aside className="sf-card sf-settings-nav">
            {sections.map(([id, label, desc, Icon]) => (
              <button key={id} className={`sf-settings-nav__item ${active === id ? 'sf-settings-nav__item--active' : ''}`} onClick={() => setActive(id)}>
                <Icon size={17}/><span><b style={{fontSize:13}}>{label}</b><span className="sf-settings-nav__meta">{desc}</span></span>
              </button>
            ))}
          </aside>
          <main>
            {active === 'profile' && <Profile data={data} onSave={async (v) => setData({ ...data, profile: await updateProfile(v) })} />}
            {active === 'workspace' && <Workspace data={data} onSave={async (v) => setData({ ...data, workspace: await updateWorkspace(v) })} />}
            {active === 'notifications' && <Preferences data={data} kind="notifications" onSave={async (p) => setData({ ...data, preferences: await updatePreferences(p) })} />}
            {active === 'ai' && <Preferences data={data} kind="ai" onSave={async (p) => setData({ ...data, preferences: await updatePreferences(p) })} />}
          </main>
        </div>
      </div>
    </div>
  );
}
function Profile({data,onSave}:{data:SettingsData;onSave:(v:{name:string;email:string})=>Promise<void>}){const [form,setForm]=useState({name:data.profile.name,email:data.profile.email});const [saving,setSaving]=useState(false);return <SettingsCard icon={<User size={18}/>} title="Profile" description="Your authenticated account details."><div className="sf-stack"><div><label className="sf-label">Full Name</label><input className="sf-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div><div><label className="sf-label">Email</label><input className="sf-input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div><div><label className="sf-label">Role</label><input className="sf-input" value={data.profile.role} disabled/></div><button className="sf-button sf-button--primary" style={{width:'fit-content'}} disabled={saving} onClick={async()=>{setSaving(true);await onSave(form);setSaving(false)}}><Save size={15}/>{saving?'Saving…':'Save Changes'}</button></div></SettingsCard>}
function Workspace({data,onSave}:{data:SettingsData;onSave:(v:{name:string;supportEmail:string;timezone:string;language:string})=>Promise<void>}){const [form,setForm]=useState({name:data.workspace?.name||'',supportEmail:data.workspace?.supportEmail||'',timezone:data.workspace?.timezone||'Asia/Kolkata',language:data.workspace?.language||'en'});return <SettingsCard icon={<Building2 size={18}/>} title="Workspace" description="Persistent workspace settings stored in PostgreSQL."><div className="sf-stack"><div><label className="sf-label">Workspace Name</label><input className="sf-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div><div><label className="sf-label">Support Email</label><input className="sf-input" type="email" value={form.supportEmail} onChange={e=>setForm({...form,supportEmail:e.target.value})}/></div><div className="sf-form-grid"><div><label className="sf-label">Timezone</label><select className="sf-select" value={form.timezone} onChange={e=>setForm({...form,timezone:e.target.value})}><option>Asia/Kolkata</option><option>America/New_York</option><option>Europe/London</option></select></div><div><label className="sf-label">Language</label><select className="sf-select" value={form.language} onChange={e=>setForm({...form,language:e.target.value})}><option value="en">English</option></select></div></div><button className="sf-button sf-button--primary" style={{width:'fit-content'}} onClick={()=>onSave(form)}><Save size={15}/>Save Workspace</button></div></SettingsCard>}
function Preferences({data,kind,onSave}:{data:SettingsData;kind:'notifications'|'ai';onSave:(p:SettingsData['preferences'])=>Promise<void>}){const [prefs,setPrefs]=useState(data.preferences);const items=kind==='notifications'?[['emailNotifications','Email Notifications'],['ticketAssignments','Ticket Assignments'],['ticketReplies','Ticket Replies'],['aiAlerts','AI Alerts'],['weeklyReports','Weekly Reports']]:[['aiEnabled','AI Enabled'],['autoClassification','Auto Classification'],['suggestedReplies','Suggested Replies'],['autoSummaries','Auto Summaries'],['humanApprovalRequired','Human Approval Required']];return <SettingsCard icon={kind==='notifications'?<Bell size={18}/>:<Bot size={18}/>} title={kind==='notifications'?'Notifications':'AI Configuration'} description="Changes are persisted to your authenticated user preferences."><div>{items.map(([key,title])=><div className="sf-detail-row" key={key}><div><b>{title}</b><div style={{fontSize:11,color:'#667085',marginTop:3}}>{kind==='notifications'?'Control this notification channel.':'Control this AI workflow behavior.'}</div></div><button className={`sf-toggle ${prefs[kind][key as keyof typeof prefs[typeof kind]]?'sf-toggle--on':''}`} onClick={()=>setPrefs({...prefs,[kind]:{...prefs[kind],[key]:!prefs[kind][key as keyof typeof prefs[typeof kind]]}})}><span/></button></div>)}{kind==='ai'&&<div style={{paddingTop:18}}><label className="sf-label">Confidence Threshold: {prefs.ai.confidenceThreshold}%</label><input type="range" min="50" max="100" value={prefs.ai.confidenceThreshold} onChange={e=>setPrefs({...prefs,ai:{...prefs.ai,confidenceThreshold:Number(e.target.value)}})} style={{width:'100%'}}/></div>}<button className="sf-button sf-button--primary" style={{marginTop:18}} onClick={()=>onSave(prefs)}><Save size={15}/>Save Preferences</button></div></SettingsCard>}
function SettingsCard({icon,title,description,children}:{icon:React.ReactNode;title:string;description:string;children:React.ReactNode}){return <section className="sf-card"><div className="sf-card__header"><div className="sf-header-title"><div className="sf-icon-box">{icon}</div><div><div className="sf-section-title">{title}</div><p className="sf-subheading">{description}</p></div></div></div><div className="sf-card__body">{children}</div></section>}
