const c=JSON.parse(document.querySelector('#page-content').textContent);
const t=v=>typeof v==='object'?v[c.lang]:v;
const text=v=>String(t(v)).replace(/<[^>]+>/g,'');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const form=document.querySelector('#request-form');
const result=document.querySelector('#form-result');
const calendar=document.querySelector('#calendar-panel');
let mode='idea';
function setMode(next){
 mode=next;
 document.querySelectorAll('[name=mode]').forEach(el=>el.checked=el.value===mode);
 result.hidden=true;
 const useCalendar=mode==='consulta'&&c.channels.calendar;
 form.hidden=useCalendar;calendar.hidden=!useCalendar;
 const label=document.querySelector('label[for=idea]>span');
 label.innerHTML=t(c.form.describe[mode].label)+(mode==='idea'?'<sup aria-hidden="true"> *</sup>':'');
 form.elements.idea.placeholder=text(c.form.describe[mode].placeholder);
 form.elements.idea.required=mode==='idea';
 form.querySelector('.submit-button>span').textContent=t(c.form.submit[mode]);
 if(useCalendar&&!document.querySelector('#calendar-frame').dataset.initialized){
  const wrap=document.querySelector('#calendar-frame');wrap.dataset.initialized='true';
  const loading=document.createElement('span');loading.className='loading';loading.textContent=t(c.ui.calendarLoading);wrap.append(loading);
  // Cal's queue API initializes the iframe handshake; a bare iframe stays hidden.
  const cal=window.Cal||function(){cal.q.push(arguments);};
  cal.q=cal.q||[];cal.ns=cal.ns||{};window.Cal=cal;
  if(!cal.loaded){
   cal.loaded=true;
   const script=document.createElement('script');script.src='https://app.cal.com/embed/embed.js';
   script.onload=()=>loading.remove();script.onerror=()=>{loading.textContent=t(c.ui.calendarFallback);};
   document.head.append(script);
  }
  cal('init',{origin:'https://app.cal.com'});
  cal('inline',{elementOrSelector:'#calendar-frame',calLink:new URL(c.calendar.url).pathname.slice(1),config:{layout:'month_view',theme:'dark',locale:c.lang}});
  cal('ui',{hideEventTypeDetails:false,layout:'month_view',theme:'dark'});
 }

 updateSticky();
}
document.querySelectorAll('[name=mode]').forEach(el=>el.addEventListener('change',()=>setMode(el.value)));
document.querySelectorAll('[data-mode]').forEach(el=>el.addEventListener('click',()=>setMode(el.dataset.mode)));
document.querySelectorAll('[data-flash]').forEach(el=>el.addEventListener('click',()=>{
 setMode('idea');const design=c.flash.designs[Number(el.dataset.flash)];
 form.elements.idea.value=t(c.flash.prefill)+t(design.caption);
}));
form.addEventListener('input',e=>{
 if(e.target.getAttribute('aria-invalid')){e.target.removeAttribute('aria-invalid');const err=document.getElementById(e.target.id+'-error');if(err)err.hidden=true;}
});
form.addEventListener('submit',e=>{
 e.preventDefault();
 const invalid=[...form.querySelectorAll('[required]')].filter(el=>!el.value.trim());
 form.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
 form.querySelectorAll('.field-error').forEach(el=>el.hidden=true);
 const summary=form.querySelector('.error-summary');summary.hidden=!invalid.length;
 if(invalid.length){invalid.forEach(el=>{el.setAttribute('aria-invalid','true');document.getElementById(el.id+'-error').hidden=false;});invalid[0].focus();return;}
 let href='';
 if(c.channels.whatsapp){
  const values={name:form.elements.name.value,contact:form.elements.contact.value,idea:form.elements.idea.value,placement:form.elements.placement.value,size:form.elements.size.value===''?'':t(c.form.sizes[Number(form.elements.size.value)]),availability:form.elements.availability.value};
  const lines=[t(c.form.wa.intro[mode]),'',...Object.entries(values).filter(([,v])=>v.trim()).map(([key,v])=>`${t(c.form.wa.labels[key])}: ${v.trim()}`),'',t(c.form.wa.outro)];
  href=`https://wa.me/${c.contact.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
  // This opens a draft only. The visitor still reviews and sends it in WhatsApp.
  window.open(href,'_blank','noopener,noreferrer');
 }
 form.hidden=true;result.hidden=false;
 const done=c.channels.whatsapp?{title:c.form.wa.done_title,body:c.form.wa.done_body}:c.form.done[mode];
 result.innerHTML=`<h3>${escape(t(done.title))}</h3><p>${escape(t(done.body))}</p><p class="request-note">${escape(t(c.ui.requestNote))}</p>${href?`<a class="submit-button" href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(t(c.form.wa.done_button))}<span aria-hidden="true">↗</span></a>`:`<p class="demo-note">${escape(t(c.ui.noSend))}</p>`}<button type="button">${escape(t(c.ui.edit))}</button>`;
 result.querySelector('button').addEventListener('click',()=>{result.hidden=true;form.hidden=false;form.elements.name.focus();});
 result.focus();updateSticky();
});
// Portfolio filters keep the DOM reading order intact.
let currentFilter='all';
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 currentFilter=button.dataset.filter;
 document.querySelector('.gallery').dataset.currentFilter=currentFilter;
 document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
 document.querySelectorAll('.work-card').forEach(el=>el.hidden=currentFilter!=='all'&&!el.dataset.tags.split(' ').includes(currentFilter));
}));
const dialog=document.querySelector('#lightbox');
let activeItems=[],activeIndex=0,opener;
const img=document.querySelector('#lightbox-image');
function showImage(){
 const item=activeItems[activeIndex];
 document.querySelector('#image-error').hidden=true;
 img.hidden=false;img.src=`/demos/naotis/img/${item.img}-900.webp`;img.alt=text(item.caption);
 document.querySelector('#lightbox-caption').textContent=text(item.caption);
 document.querySelector('#lightbox-count').textContent=`${String(activeIndex+1).padStart(2,'0')} / ${String(activeItems.length).padStart(2,'0')}`;
}
function openImage(items,index,source){activeItems=items;activeIndex=index;opener=source;showImage();dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('[data-close]').focus();updateSticky();}
document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{
 const selected=c.gallery[Number(button.dataset.lightbox)];
 const items=c.gallery.filter(x=>currentFilter==='all'||x.tags.includes(currentFilter));
 openImage(items,items.indexOf(selected),button);
}));
document.querySelectorAll('[data-flash-lightbox]').forEach(button=>button.addEventListener('click',()=>openImage(c.flash.designs,Number(button.dataset.flashLightbox),button)));
const move=dir=>{activeIndex=(activeIndex+dir+activeItems.length)%activeItems.length;showImage();};
dialog.querySelector('[data-prev]').addEventListener('click',()=>move(-1));
dialog.querySelector('[data-next]').addEventListener('click',()=>move(1));
dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus({preventScroll:true});updateSticky();});
img.addEventListener('error',()=>{img.hidden=true;document.querySelector('#image-error').hidden=false;});
document.querySelector('#image-retry').addEventListener('click',showImage);
// Any part of the booking panel in view suppresses the mobile CTA.
const hero=document.querySelector('#hero'),panel=document.querySelector('#form-panel'),sticky=document.querySelector('.mobile-sticky');
let heroVisible=true,panelVisible=false;
function updateSticky(){if(!sticky)return;const typing=/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'');sticky.hidden=heroVisible||panelVisible||dialog.open||typing;}
new IntersectionObserver(entries=>{for(const entry of entries){if(entry.target===hero)heroVisible=entry.isIntersecting;if(entry.target===panel)panelVisible=entry.isIntersecting;}updateSticky();},{threshold:0}).observe(hero);
new IntersectionObserver(entries=>{panelVisible=entries[0].isIntersecting;updateSticky();},{threshold:0}).observe(panel);
document.addEventListener('focusin',updateSticky);document.addEventListener('focusout',()=>setTimeout(updateSticky,0));

form.querySelector('.submit-button').disabled=false;

// One entrance after local fonts and hero images settle. Nothing is hidden while
// waiting; the complete still composition also works without JavaScript.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reducedMotion.matches){
 const ready=Promise.allSettled([document.fonts.ready,...[...hero.querySelectorAll('img')].map(img=>img.decode())]);
 Promise.race([ready,new Promise(resolve=>setTimeout(resolve,1200))]).then(()=>{
  if(reducedMotion.matches||window.scrollY>hero.offsetHeight/3)return;
  requestAnimationFrame(()=>hero.classList.add('entrance-ready'));
 });
}

// One-time viewport entry, informed by cnippet-dev's 21st Scroll Reveal.
// Content stays visible without JS; fast scrolling and anchor jumps skip motion.
const revealObserver=new IntersectionObserver(entries=>{
 for(const entry of entries){
  if(!entry.isIntersecting)continue;
  revealObserver.unobserve(entry.target);
  if(reducedMotion.matches||entry.boundingClientRect.top<0)continue;
  entry.target.animate([{opacity:.55,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:520,easing:'cubic-bezier(.2,.7,.2,1)'});
 }
},{threshold:.12});
document.querySelectorAll('.work-card,.flash-sheets figure,.about-grid figure').forEach(el=>revealObserver.observe(el));
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)document.getAnimations().forEach(animation=>animation.cancel());});
