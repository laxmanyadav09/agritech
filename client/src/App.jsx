import { useMemo, useState } from 'react';
import { Sprout, LayoutDashboard, Wheat, CloudSun, FlaskConical, Bug, ShoppingBasket, Users, Bell, Search, Plus, ChevronDown, Sun, Droplets, Wind, ArrowUpRight, Leaf, CalendarDays, Menu, X } from 'lucide-react';

const initialCrops = [
  { id: 1, name: 'Wheat', variety: 'HD-2967', area: '2.5 acres', stage: 'Flowering', health: 92, color: 'gold', icon: '🌾' },
  { id: 2, name: 'Rice', variety: 'Basmati 1121', area: '1.8 acres', stage: 'Vegetative', health: 84, color: 'green', icon: '🌱' },
  { id: 3, name: 'Tomato', variety: 'Arka Rakshak', area: '0.7 acres', stage: 'Fruit setting', health: 76, color: 'red', icon: '🍅' }
];
const nav = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'My Crops', icon: Wheat },
  { label: 'Weather', icon: CloudSun },
  { label: 'Soil Health', icon: FlaskConical },
  { label: 'Pest Alerts', icon: Bug },
  { label: 'Marketplace', icon: ShoppingBasket },
  { label: 'Community', icon: Users }
];

function App() {
  const [active, setActive] = useState('Overview');
  const [crops, setCrops] = useState(initialCrops);
  const [query, setQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [cropName, setCropName] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState('');
  const filtered = useMemo(() => crops.filter(c => c.name.toLowerCase().includes(query.toLowerCase())), [crops, query]);

  function addCrop(e) {
    e.preventDefault();
    if (!cropName.trim()) return;
    setCrops(prev => [...prev, { id: Date.now(), name: cropName.trim(), variety: 'Custom variety', area: 'Not set', stage: 'Seedling', health: 100, color: 'green', icon: '🌿' }]);
    setCropName(''); setShowAdd(false); setActive('My Crops'); setNotice('Crop added to your local dashboard.');
    setTimeout(() => setNotice(''), 3000);
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Sprout size={24}/></div><div><strong>agri<span>tech</span></strong><small>SMART FARMING</small></div><button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X/></button></div>
      <div className="farm-switch"><div className="farm-avatar">LF</div><div><strong>My Farm</strong><small>Indore, Madhya Pradesh</small></div><ChevronDown size={16}/></div>
      <p className="nav-caption">WORKSPACE</p>
      <nav>{nav.map(item => { const Icon = item.icon; return <button key={item.label} className={`nav-link ${active === item.label ? 'active' : ''}`} onClick={() => {setActive(item.label);setMobileNav(false)}}><Icon size={18}/><span>{item.label}</span>{item.label === 'Pest Alerts' && <i className="nav-count">2</i>}</button>})}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Sprout size={18}/></div><strong>Growing together</strong><p>Small steps today, a healthier harvest tomorrow.</p><button onClick={() => setNotice('Your farm guide is coming soon.')}>Explore farm guide <ArrowUpRight size={14}/></button></div><div className="profile-row"><div className="profile-avatar">LY</div><div><strong>Farmer account</strong><small>Free plan</small></div><ChevronDown size={16}/></div></div>
    </aside>
    {mobileNav && <button className="nav-overlay" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}
    <main className="main-area">
      <header className="topbar"><button className="menu-toggle" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div><div className="top-actions"><label className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search crops..."/></label><button className="icon-button notification" aria-label="Notifications" onClick={() => setNotice('You are all caught up!')}><Bell size={19}/><i/></button><div className="top-avatar">LY</div></div></header>
      <div className="page-content">
        <section className="welcome-row"><div><div className="eyebrow"><span className="live-dot"/> FARM OVERVIEW</div><h1>Good morning, Farmer <span>🌿</span></h1><p>Here's what's happening on your farm today.</p></div><button className="date-pill"><CalendarDays size={16}/> Tuesday, 28 October <ChevronDown size={15}/></button></section>
        {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss">×</button></div>}
        <section className="hero-banner"><div className="hero-copy"><span className="hero-label"><Sun size={14}/> YOUR DAILY FIELD NOTE</span><h2>Healthy soil.<br/>Stronger harvests.</h2><p>Good farming starts with knowing what your fields need. Check your crop health and plan your next step.</p><button onClick={() => setActive('Soil Health')}>Check soil health <ArrowUpRight size={16}/></button></div><div className="hero-art"><div className="sun-disc"/><div className="hill hill-back"/><div className="hill hill-front"/><div className="field-lines"/></div></section>
        <section className="stats-grid">
          <Stat title="Total farm area" value="5.0" unit="acres" note="Across 3 crop types" icon={<Sprout/>} tint="mint"/>
          <Stat title="Active crops" value={String(crops.length).padStart(2,'0')} unit="crops" note="Growing this season" icon={<Wheat/>} tint="yellow"/>
          <Stat title="Avg. crop health" value={Math.round(crops.reduce((s,c)=>s+c.health,0)/Math.max(crops.length,1))+'%'} unit="" note="Looking good this week" icon={<Leaf/>} tint="blue"/>
          <Stat title="Farm alerts" value="02" unit="alerts" note="Need your attention" icon={<Bell/>} tint="peach"/>
        </section>
        <section className="content-grid">
          <div className="panel crop-panel"><div className="panel-heading"><div><h3>{active === 'Overview' ? 'Your crops' : active}</h3><p>{active === 'Overview' ? 'Monitor growth and field conditions' : `Manage your farm's ${active.toLowerCase()} information`}</p></div><button className="outline-button" onClick={() => setShowAdd(true)}><Plus size={16}/> Add crop</button></div>
            {active === 'Weather' ? <div className="weather-card"><div><span className="muted-label">CURRENT CONDITIONS · SAMPLE</span><h2>28° <Sun/></h2><p>Partly sunny · Indore</p></div><div className="weather-metrics"><span><Droplets/> Humidity <b>62%</b></span><span><Wind/> Wind <b>11 km/h</b></span><span><CloudSun/> Forecast <b>Clear</b></span></div></div> :
            active === 'Soil Health' ? <div className="soil-card"><div className="soil-score">6.8<small>pH</small></div><div><h4>Soil pH · Sample reading</h4><p>Near-neutral pH is suitable for many common crops. Use a tested soil report for field-specific decisions.</p><div className="soil-meter"><span/></div><small>Acidic <span className="meter-center">Neutral</span><span className="meter-right">Alkaline</span></small></div></div> :
            active === 'Pest Alerts' ? <div className="alert-list"><Alert title="Possible aphid activity" crop="Wheat · Field A" level="Monitor" text="Inspect the underside of leaves and confirm before treatment."/><Alert title="Leaf spot observation" crop="Tomato · Field C" level="Review" text="Record symptoms and consult a local agriculture expert." /></div> :
            active === 'Marketplace' ? <div className="empty-feature"><ShoppingBasket/><h4>Farm essentials</h4><p>Seed, tools, and soil care resources can be added to the marketplace module.</p><button className="outline-button" onClick={() => setNotice('Marketplace catalog setup is ready for the next development phase.')}>Explore resources</button></div> :
            active === 'Community' ? <div className="empty-feature"><Users/><h4>Farmers helping farmers</h4><p>Community discussions and expert Q&amp;A will live here.</p><button className="outline-button" onClick={() => setNotice('Community module is planned for the next development phase.')}>View community</button></div> :
            <div className="crop-list">{filtered.map(crop => <div className="crop-row" key={crop.id}><div className={`crop-emoji ${crop.color}`}>{crop.icon}</div><div className="crop-info"><strong>{crop.name}</strong><small>{crop.variety} · {crop.area}</small></div><div className="crop-stage"><span className="stage-dot"/>{crop.stage}</div><div className="health-wrap"><div className="health-label"><span>Crop health</span><b>{crop.health}%</b></div><div className="health-track"><span style={{width: crop.health+'%'}}/></div></div><button className="row-menu" title={`Remove ${crop.name}`} onClick={() => {setCrops(prev => prev.filter(c => c.id !== crop.id));setNotice(`${crop.name} removed from this local demo.`)}}>×</button></div>)}
            {filtered.length === 0 && <div className="empty-state">No crops match “{query}”. Add a crop to get started.</div>}</div>}
          </div>
          <div className="panel schedule-panel"><div className="panel-heading"><div><h3>Today's checklist</h3><p>Keep your farm on track</p></div><span className="check-count">2 of 4</span></div><Checklist/></div>
        </section>
        <footer> <span>© 2026 AgriTech</span><span>Built for healthier farms <Sprout size={14}/></span><span className="demo-note">Starter demo · figures are illustrative</span></footer>
      </div>
    </main>
    {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><form className="modal-card" onSubmit={addCrop} onClick={e => e.stopPropagation()}><button type="button" className="modal-close" onClick={() => setShowAdd(false)}>×</button><span className="eyebrow">YOUR FARM</span><h2>Add a crop</h2><p>Start tracking a new crop on your dashboard.</p><label>Crop name<input autoFocus value={cropName} onChange={e => setCropName(e.target.value)} placeholder="e.g. Soybean" required/></label><div className="modal-actions"><button type="button" className="outline-button" onClick={() => setShowAdd(false)}>Cancel</button><button className="primary-button" type="submit">Add crop <Plus size={16}/></button></div></form></div>}
  </div>;
}
function Stat({title,value,unit,note,icon,tint}) { return <div className="stat-card"><div className={`stat-icon ${tint}`}>{icon}</div><div className="stat-title">{title}</div><div className="stat-value">{value}<small>{unit}</small></div><div className="stat-note">{note}</div></div>; }
function Alert({title,crop,level,text}) { return <div className="alert-item"><div className="alert-symbol"><Bug size={18}/></div><div className="alert-copy"><strong>{title}</strong><small>{crop}</small><p>{text}</p></div><span className="alert-level">{level}</span></div>; }
function Checklist() { const [items,setItems] = useState([{id:1,text:'Check soil moisture',done:true},{id:2,text:'Inspect wheat leaves',done:true},{id:3,text:'Water tomato field',done:false},{id:4,text:'Review weather forecast',done:false}]); return <div className="checklist">{items.map(item=><label className={`check-item ${item.done?'done':''}`} key={item.id}><input type="checkbox" checked={item.done} onChange={()=>setItems(prev=>prev.map(x=>x.id===item.id?{...x,done:!x.done}:x))}/><span className="custom-check"/><span>{item.text}</span></label>)}<div className="checklist-foot">Tick off tasks as you complete them.</div></div>; }
export default App;
