import { Activity, AlertTriangle, Clock3, Ticket, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDashboard, type DashboardData } from './dashboard/dashboard.api';

function label(value:string){return value.replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase())}

export function DashboardPage(){
  const [data,setData]=useState<DashboardData|null>(null); const [error,setError]=useState('');
  useEffect(()=>{void getDashboard(7).then(setData).catch(e=>setError(e instanceof Error?e.message:'Unable to load dashboard'));},[]);
  if(error) return <div className="sf-page"><div className="sf-page__inner"><div className="sf-alert">{error}</div></div></div>;
  if(!data) return <div className="sf-page"><div className="sf-page__inner"><div className="sf-empty">Loading dashboard…</div></div></div>;
  const cards=[['Open Tickets',data.summary.openTickets,Ticket],['Pending',data.summary.pendingTickets,Clock3],['High Priority',data.summary.highPriorityTickets,AlertTriangle],['New This Period',data.summary.newTickets,TrendingUp]] as const;
  const max=Math.max(...data.activity.map(x=>x.total),1);
  return <div className="sf-page dashboard-page"><div className="sf-page__inner sf-stack">
    <header className="sf-card sf-page-header" style={{padding:'18px 20px'}}><div className="sf-header-title"><div className="sf-icon-box"><Activity size={18}/></div><div><h1 className="sf-heading">Dashboard</h1><p className="sf-subheading">Live support operations overview from your PostgreSQL data.</p></div></div></header>
    <section className="sf-grid sf-grid--4">{cards.map(([name,value,Icon])=><article className="sf-card sf-kpi" key={name}><div className="sf-header-title"><div className="sf-icon-box"><Icon size={18}/></div><div><div className="sf-kpi__label">{name}</div><div className="sf-kpi__value">{value.toLocaleString()}</div></div></div></article>)}</section>
    <section className="sf-grid" style={{gridTemplateColumns:'minmax(0,1.5fr) minmax(320px,.8fr)'}}>
      <article className="sf-card sf-chart"><div className="sf-section-title">Conversation activity</div><p className="sf-subheading">Customer and agent message activity over the selected period.</p><div className="sf-bar-chart">{data.activity.map(point=><div key={point.date} style={{flex:1}}><div className="sf-bar" style={{height:`${Math.max((point.total/max)*170,4)}px`}} title={`${point.total} messages`}/><div className="sf-bar-label">{point.label}</div></div>)}</div></article>
      <article className="sf-card sf-chart"><div className="sf-section-title">Recent tickets</div><div style={{marginTop:10}}>{data.recentTickets.map(ticket=><div key={ticket.id} className="sf-detail-row"><div><div style={{fontWeight:650,color:'#17233f'}}>{ticket.ticketNumber}</div><div style={{marginTop:3}}>{ticket.subject}</div><div style={{marginTop:3,fontSize:11,color:'#98a2b3'}}>{ticket.customer.name}</div></div><span className={`sf-pill sf-status--${ticket.status.toLowerCase()}`}>{label(ticket.status)}</span></div>)}</div></article>
    </section>
  </div></div>
}
