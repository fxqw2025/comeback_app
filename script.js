/* ═══════════════════════════════════════════════════════════════
   Comeback v3 — script.js
   Zero external dependencies · Android WebView safe · Robust init
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════ */
const STORAGE_KEY = 'comeback_words';
const SETTINGS_KEY = 'comeback_settings';
const STREAK_KEY = 'comeback_streak';
const BACKUP_KEY = 'comeback_backup_meta';
const LEITNER = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 15 };

/* ════════════════════════════════════════
   TRANSLATIONS
════════════════════════════════════════ */
const T = {
  en: {
    appName:'Comeback', appSlogan:'Unlock your language with Comeback',
    study:'Study', leitnerReview:'Leitner Review', cards:'cards',
    daily:'Daily', twoDays:'2-Day', weekly:'Weekly', twoWeeks:'2-Week', mastered:'Mastered',
    allCaughtUp:'All Caught Up!', allCaughtUpDesc:'No cards due for review.\nAdd new words or come back later.',
    addNewWord:'Add New Word', tapToReveal:'Tap to reveal meaning',
    forgot:'Forgot', knewIt:'Knew it!',
    dictionary:'Dictionary', yourVocab:'Your Vocabulary',
    newest:'Newest', oldest:'Oldest', byBox:'By Box',
    dictEmpty:'Dictionary is Empty', dictEmptyDesc:'Add your first English word below.',
    addFirstWord:'Add First Word', addNew:'Add New',
    settings:'Settings', prefData:'Preferences & Data',
    fillDetails:'Fill in the details below',
    englishWord:'English Word *', persianMeaning:'Persian Meaning *',
    phonetics:'Pronunciation / IPA', persianPhonetics:'Persian Phonetics',
    wordImage:'Word Image (optional)', uploadImage:'Upload Image',
    exampleSentence:'Example Sentence', notes:'Notes (optional)',
    created:'Created: ', lastEdited:'Last edited: ',
    cancelEdit:'Cancel Edit', saveWord:'Save Word', updateWord:'Update Word',
    totalWords:'Total', dueToday:'Due', dayStreak:'Streak',
    languageSettings:'Language Settings', appLanguage:'App Language',
    appLanguageDesc:'Choose UI language / زبان برنامه',
    speechSettings:'Speech Settings', speechRate:'Speech Rate',
    speechRateDesc:'How fast words are spoken', voice:'Voice',
    voiceDesc:'Select TTS voice', testVoice:'Test Voice',
    backupRestore:'Backup & Restore', autoBackup:'Auto Backup',
    autoBackupDesc:'Backup after each save', lastBackup:'Last Backup',
    neverBacked:'Never backed up', manualBackup:'Manual Backup',
    downloadBackup:'Download', restoreBackup:'Restore from Backup', restoreFile:'Restore File',
    dataManagement:'Data Management', exportVocab:'Export', exportJSON:'Export JSON',
    importVocab:'Import', importJSON:'Import JSON',
    clearAll:'Clear All', clearAllDesc:'Delete all data permanently',
    about:'About',
    edit:'Edit', delete:'Delete', close:'Close', cancel:'Cancel',
    autoFetch:'🔍 Fetching phonetics…', auto:'auto',
    boxLabel1:'Box 1 — Daily', boxLabel2:'Box 2 — Every 2 Days',
    boxLabel3:'Box 3 — Weekly', boxLabel4:'Box 4 — Bi-Weekly', boxLabel5:'Box 5 — Mastered ✓',
    words:'words', word:'word', editing:'Editing',
    // About section
    aboutDesc:'Comeback is a fully offline vocabulary app for building your English-Persian vocabulary using the Leitner spaced repetition system.',
    tagOffline:'Offline First', tagLeitner:'Leitner SRS', tagTTS:'TTS',
    // Confirm modal
    confirmTitle:'Confirm', confirmOk:'Confirm', confirmCancel:'Cancel',
    // Toast / Confirm messages
    storageFull:'Storage full!',
    alreadyExists:'"{{en}}" already in dictionary!',
    wordUpdated:'✅ "{{en}}" updated',
    wordAdded:'🎉 "{{en}}" added!',
    wordDeleted:'"{{en}}" deleted.',
    nothingToBackup:'Nothing to backup yet.',
    backedUp:'✅ Backed up {{n}} words',
    restoredWords:'✅ Restored {{n}} words',
    invalidBackup:'❌ Invalid backup file.',
    exportedWords:'✅ Exported {{n}} words',
    importedWords:'✅ Imported {{n}} words',
    noWordsInFile:'No words found in file.',
    noWordsFound:'No words found.',
    invalidFile:'❌ Invalid file.',
    nothingToExport:'Nothing to export.',
    nothingToClear:'Dictionary is already empty.',
    mergeWords:'Merge {{n}} words into dictionary?',
    deleteAllConfirm:'Delete all {{n}} words? Export a backup first!',
    allClearedToast:'All data cleared.',
    cannotUndo:'This cannot be undone.',
    noWordsDueBox:'No words due in Box {{b}}.',
    enterEnglishFirst:'Enter an English word first.',
    defaultVoice:'Default Voice',
    boxBadge:'Box {{b}}',
    imageTooLarge:'Image too large (max 10MB)',
    fieldRequired:'{{field}} required',
    sfxLabel:'Button Sounds',
    sfxDesc:'Sound effects for UI buttons',
    compressingImage:'⏳ Compressing image…',
  },
  fa: {
    appName:'کامبک', appSlogan:'قفل زبان تو با کامبک باز کن',
    study:'مطالعه', leitnerReview:'مرور لایتنر', cards:'کارت',
    daily:'روزانه', twoDays:'۲ روز', weekly:'هفتگی', twoWeeks:'۲ هفته', mastered:'تسلط یافته',
    allCaughtUp:'آفرین! همه رو خوندی!', allCaughtUpDesc:'الان کارتی برای مرور نداری.\nکلمه جدید اضافه کن.',
    addNewWord:'افزودن کلمه جدید', tapToReveal:'برای دیدن معنی کلیک کن',
    forgot:'فراموش کردم', knewIt:'بلد بودم!',
    dictionary:'واژه‌نامه', yourVocab:'واژگان شما',
    newest:'جدیدترین', oldest:'قدیمی‌ترین', byBox:'بر اساس جعبه',
    dictEmpty:'واژه‌نامه خالی است', dictEmptyDesc:'اولین کلمه انگلیسی‌ات رو اضافه کن.',
    addFirstWord:'اضافه کردن اولین کلمه', addNew:'افزودن',
    settings:'تنظیمات', prefData:'تنظیمات و داده‌ها',
    fillDetails:'مشخصات رو وارد کن',
    englishWord:'کلمه انگلیسی *', persianMeaning:'معنی فارسی *',
    phonetics:'تلفظ / IPA', persianPhonetics:'تلفظ فارسی',
    wordImage:'تصویر کلمه (اختیاری)', uploadImage:'آپلود تصویر',
    exampleSentence:'جمله نمونه', notes:'یادداشت (اختیاری)',
    created:'ایجاد شده: ', lastEdited:'آخرین ویرایش: ',
    cancelEdit:'لغو ویرایش', saveWord:'ذخیره کلمه', updateWord:'به‌روزرسانی',
    totalWords:'مجموع', dueToday:'امروز', dayStreak:'روز',
    languageSettings:'تنظیمات زبان', appLanguage:'زبان برنامه',
    appLanguageDesc:'زبان رابط کاربری را انتخاب کن',
    speechSettings:'تنظیمات صدا', speechRate:'سرعت گفتار',
    speechRateDesc:'سرعت بیان کلمات', voice:'صدا',
    voiceDesc:'انتخاب صدا', testVoice:'تست صدا',
    backupRestore:'پشتیبان‌گیری', autoBackup:'پشتیبان خودکار',
    autoBackupDesc:'بعد از هر ذخیره', lastBackup:'آخرین پشتیبان',
    neverBacked:'هنوز پشتیبانی نشده', manualBackup:'پشتیبان دستی',
    downloadBackup:'دانلود', restoreBackup:'بازیابی', restoreFile:'بارگذاری فایل',
    dataManagement:'مدیریت داده‌ها', exportVocab:'خروجی', exportJSON:'خروجی JSON',
    importVocab:'ورودی', importJSON:'ورودی JSON',
    clearAll:'پاک کردن همه', clearAllDesc:'حذف دائمی همه داده‌ها',
    about:'درباره برنامه',
    edit:'ویرایش', delete:'حذف', close:'بستن', cancel:'لغو',
    autoFetch:'🔍 در حال دریافت تلفظ…', auto:'خودکار',
    boxLabel1:'جعبه ۱ — روزانه', boxLabel2:'جعبه ۲ — هر ۲ روز',
    boxLabel3:'جعبه ۳ — هفتگی', boxLabel4:'جعبه ۴ — دو هفته', boxLabel5:'جعبه ۵ — تسلط ✓',
    words:'کلمه', word:'کلمه', editing:'ویرایش',
    // About section
    aboutDesc:'کامبک یک اپ کاملاً آفلاین برای ساخت واژگان انگلیسی-فارسی با سیستم تکرار فاصله‌دار لایتنر است.',
    tagOffline:'آفلاین', tagLeitner:'لایتنر SRS', tagTTS:'گفتار',
    // Confirm modal
    confirmTitle:'تأیید', confirmOk:'تأیید', confirmCancel:'لغو',
    // Toast / Confirm messages
    storageFull:'حافظه پر است!',
    alreadyExists:'"{{en}}" قبلاً در واژه‌نامه است!',
    wordUpdated:'✅ "{{en}}" به‌روز شد',
    wordAdded:'🎉 "{{en}}" اضافه شد!',
    wordDeleted:'"{{en}}" حذف شد.',
    nothingToBackup:'هنوز چیزی برای پشتیبان‌گیری نیست.',
    backedUp:'✅ {{n}} کلمه پشتیبان گرفته شد',
    restoredWords:'✅ {{n}} کلمه بازیابی شد',
    invalidBackup:'❌ فایل پشتیبان معتبر نیست.',
    exportedWords:'✅ {{n}} کلمه خروجی گرفته شد',
    importedWords:'✅ {{n}} کلمه وارد شد',
    noWordsInFile:'کلمه‌ای در فایل پیدا نشد.',
    noWordsFound:'کلمه‌ای پیدا نشد.',
    invalidFile:'❌ فایل معتبر نیست.',
    nothingToExport:'چیزی برای خروجی وجود ندارد.',
    nothingToClear:'واژه‌نامه از قبل خالی است.',
    mergeWords:'{{n}} کلمه به واژه‌نامه اضافه شود؟',
    deleteAllConfirm:'همه {{n}} کلمه حذف شود؟ ابتدا پشتیبان بگیر!',
    allClearedToast:'همه داده‌ها پاک شدند.',
    cannotUndo:'این کار قابل بازگشت نیست.',
    noWordsDueBox:'در جعبه {{b}} کلمه‌ای برای مرور نیست.',
    enterEnglishFirst:'ابتدا کلمه انگلیسی وارد کن.',
    defaultVoice:'صدای پیش‌فرض',
    boxBadge:'جعبه {{b}}',
    imageTooLarge:'تصویر خیلی بزرگ است (حداکثر ۱۰ مگابایت)',
    fieldRequired:'{{field}} الزامی است',
    sfxLabel:'افکت‌های صوتی',
    sfxDesc:'صدای دکمه‌های برنامه',
    compressingImage:'⏳ در حال فشرده‌سازی تصویر…',
  }
};

/* ════════════════════════════════════════
   STATE
════════════════════════════════════════ */
const S = {
  words: [],
  settings: { ttsRate: 0.9, ttsVoiceURI: '', language: 'en', autoBackup: true, sfxEnabled: true },
  streak: { count: 0, lastStudyDate: null },
  currentPage: 'study',
  session: { queue: [], index: 0, flipped: false },
  modalWordId: null,
  ttsVoices: [],
  confirmCb: null,
  backupMeta: { lastBackup: null },
};

/* ════════════════════════════════════════
   HELPERS
════════════════════════════════════════ */
const t = k => T[S.settings.language]?.[k] ?? T.en[k] ?? k;
/* Template fill: t('key') with {{var}} placeholders */
const tf = (k, vars={}) => {
  let s = t(k);
  for (const [key,val] of Object.entries(vars)) s = s.replace(`{{${key}}}`, val);
  return s;
};
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const todayStr = () => new Date().toISOString().slice(0,10);
const uid = () => (crypto.randomUUID?.() ?? (Date.now().toString(36) + Math.random().toString(36).slice(2)));
const isDue = w => { const d = LEITNER[w.box] ?? 0; if (!w.lastReviewed) return true; return Math.floor((Date.now()-w.lastReviewed)/86400000) >= d; };
const fmtDate = ts => ts ? new Date(ts).toLocaleString(S.settings.language==='fa' ? 'fa-IR' : 'en-GB', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—';

/* setText safely */
function setText(id, val) { const el = $(id); if (el) el.textContent = val; }
function setHtml(id, val) { const el = $(id); if (el) el.innerHTML = val; }

/* Listen safely - won't throw if element missing */
function on(id, event, fn) {
  const el = $(id);
  if (el) el.addEventListener(event, fn);
}

/* ════════════════════════════════════════
   UI SOUNDS — Base64-encoded tiny WAV tones
   (synthesized offline, zero external deps)
════════════════════════════════════════ */
const SFX = (() => {
  /* Three micro WAV files encoded as Base64.
     Each is a hand-crafted PCM WAV:
     8000 Hz · 8-bit mono · ~80–160 ms          */

  // ── Click: crisp 1200 Hz tick, 80 ms ─────────
  const CLICK_B64 =
    'UklGRoQAAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAALQAAAB' +
    'AAAAABAAEAgD4AAAB9AAACAAABAAIABAAGAAkADAAP' +
    'ABIARQBIAEUAQAA4AC8AJQAaABAA' +
    'BQAAAP3/+v/4//b/9P/z//L/8v/z//T/9v/4//v/';

  // ── Success: warm two-note chime, 160 ms ─────
  const SUCCESS_B64 =
    'UklGRgABAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACAAA' +
    'UAAAABAAAAP7/AQAFAAkADwAVABoAHgAhACIAIgAg' +
    'ABwAFwAQAAkAAgD8//b/8f/t/+r/6f/q/+z/8P/1' +
    '/vv/AQAIABAAGAAgACcALQAxADMAMwAxAC0AJgAd' +
    'ABMACAD9//L/6P/f/9f/0P/L/8j/x//I/8v/0P/X' +
    '/9//6P/x//v/BQAPABgAIAAm';

  // ── Delete: short descending blip, 100 ms ────
  const DELETE_B64 =
    'UklGRmwAAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACAAAA' +
    'HAAAABAAAAD+//z/+v/5//n/+f/6//v//f/' +
    'AAADAAcADQATABkAHwAkACgAKwAsACsAKAAlACAAGgAT' +
    'AAsAAgD6//H/6P/f/9b/';

  let _ctx = null;
  function ctx() {
    if (!_ctx) {
      try { _ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e) { return null; }
    }
    return _ctx;
  }

  /* Decode a base64 WAV and play it.
     Falls back to Web Audio synthesis if decode fails. */
  function playB64(b64, fallbackFn) {
    const ac = ctx(); if (!ac) return;
    try {
      const bin = atob(b64);
      const buf = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
      ac.decodeAudioData(buf.buffer, decoded => {
        const src = ac.createBufferSource();
        src.buffer = decoded;
        src.connect(ac.destination);
        src.start();
      }, () => fallbackFn(ac));
    } catch { fallbackFn(ac); }
  }

  /* Synthesis fallbacks — guaranteed to work on all platforms */
  function synthClick(ac) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'square'; o.frequency.setValueAtTime(1200, ac.currentTime);
    g.gain.setValueAtTime(0.18, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.07);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + 0.07);
  }
  function synthSuccess(ac) {
    [523, 784].forEach((freq, i) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      const t0 = ac.currentTime + i * 0.10;
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.22, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
      o.connect(g); g.connect(ac.destination);
      o.start(t0); o.stop(t0 + 0.18);
    });
  }
  function synthDelete(ac) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(400, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(200, ac.currentTime + 0.12);
    g.gain.setValueAtTime(0.2, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + 0.12);
  }

  /* Resume AudioContext on first user gesture (iOS/Android) */
  function resume() { const ac = ctx(); if (ac?.state === 'suspended') ac.resume(); }

  return {
    click:   () => { if (S.settings.sfxEnabled === false) return; resume(); playB64(CLICK_B64,   synthClick);   },
    success: () => { if (S.settings.sfxEnabled === false) return; resume(); playB64(SUCCESS_B64, synthSuccess); },
    delete:  () => { if (S.settings.sfxEnabled === false) return; resume(); playB64(DELETE_B64,  synthDelete);  },
  };
})();


function loadWords() {
  try { S.words = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch(e) { S.words = []; }
}
function saveWords() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(S.words));
    if (S.settings.autoBackup) autoBackup();
  } catch(e) { showToast(t('storageFull'), 'error'); }
}
function loadSettings() {
  try { const r = localStorage.getItem(SETTINGS_KEY); if (r) S.settings = {...S.settings, ...JSON.parse(r)}; }
  catch(e) {}
}
function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(S.settings)); }
  catch(e) {}
}
function loadStreak() {
  try { const r = localStorage.getItem(STREAK_KEY); if (r) S.streak = JSON.parse(r); }
  catch(e) {}
}
function saveStreak() {
  try { localStorage.setItem(STREAK_KEY, JSON.stringify(S.streak)); }
  catch(e) {}
}
function loadBackupMeta() {
  try { const r = localStorage.getItem(BACKUP_KEY); if (r) S.backupMeta = JSON.parse(r); }
  catch(e) {}
}

/* ════════════════════════════════════════
   WORD CRUD
════════════════════════════════════════ */
function createWord(d) {
  return {
    id: uid(),
    en: (d.en||'').trim(), fa: (d.fa||'').trim(),
    phonetic: (d.phonetic||'').trim(), faPhonetic: (d.faPhonetic||'').trim(),
    sentence: LZW.compress((d.sentence||'').trim()),
    notes: LZW.compress((d.notes||'').trim()),
    image: d.image || '',
    box: 1, createdAt: Date.now(), updatedAt: Date.now(), lastReviewed: null,
  };
}
function addWord(d) { const w = createWord(d); S.words.unshift(w); saveWords(); return w; }
function updateWord(id, upd) {
  const i = S.words.findIndex(w => w.id === id);
  if (i < 0) return null;
  S.words[i] = { ...S.words[i], ...upd, updatedAt: Date.now() };
  saveWords(); return S.words[i];
}
function deleteWord(id) { S.words = S.words.filter(w => w.id !== id); saveWords(); }
function findWord(id) { return S.words.find(w => w.id === id) || null; }

/* ════════════════════════════════════════
   LEITNER SRS
════════════════════════════════════════ */
function reviewCard(id, knew) {
  const w = findWord(id); if (!w) return;
  updateWord(id, { box: knew ? Math.min(5, w.box+1) : 1, lastReviewed: Date.now() });
  updateStreak();
}
function buildQueue() {
  const due = S.words.filter(isDue);
  for (let i = due.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [due[i],due[j]] = [due[j],due[i]];
  }
  return due.map(w => w.id);
}
function updateStreak() {
  const today = todayStr();
  if (S.streak.lastStudyDate === today) return;
  const yest = new Date(Date.now()-86400000).toISOString().slice(0,10);
  S.streak.count = (S.streak.lastStudyDate === yest) ? S.streak.count+1 : 1;
  S.streak.lastStudyDate = today;
  saveStreak();
}

/* ════════════════════════════════════════
   AUTO PHONETICS
════════════════════════════════════════ */
async function fetchIPA(word) {
  try {
    const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!r.ok) return null;
    const d = await r.json();
    const e = d[0]; if (!e) return null;
    if (e.phonetic) return e.phonetic;
    return e.phonetics?.find(p => p.text)?.text || null;
  } catch { return null; }
}
function engToPersian(word) {
  if (!word) return '';
  let r = word.toLowerCase();
  const rules = [
    [/tion/g,'شن'],[/sion/g,'ژن'],[/ight/g,'ایت'],[/ough/g,'اف'],
    [/ph/g,'ف'],[/wh/g,'و'],[/sh/g,'ش'],[/ch/g,'چ'],[/th/g,'ث'],
    [/ck/g,'ک'],[/qu/g,'کو'],[/ng/g,'نگ'],[/ee/g,'ی'],[/ea/g,'ی'],
    [/oo/g,'او'],[/ai/g,'ای'],[/ay/g,'ای'],[/oa/g,'او'],[/ou/g,'او'],
    [/ow/g,'او'],[/ew/g,'یو'],[/ie/g,'ای'],
    [/a/g,'اَ'],[/e/g,'اِ'],[/i/g,'ای'],[/o/g,'او'],[/u/g,'اَ'],
    [/b/g,'ب'],[/c/g,'ک'],[/d/g,'د'],[/f/g,'ف'],[/g/g,'گ'],[/h/g,'ه'],
    [/j/g,'ج'],[/k/g,'ک'],[/l/g,'ل'],[/m/g,'م'],[/n/g,'ن'],[/p/g,'پ'],
    [/r/g,'ر'],[/s/g,'س'],[/t/g,'ت'],[/v/g,'و'],[/w/g,'و'],
    [/x/g,'کس'],[/y/g,'ی'],[/z/g,'ز'],
  ];
  for (const [pat, rep] of rules) r = r.replace(pat, rep);
  return r;
}
let autoTimer = null;
async function autoFill(word) {
  if (!word || word.length < 2) return;
  const statusEl = $('auto-status');
  if (statusEl) statusEl.style.display = 'block';
  const ipa = await fetchIPA(word);
  const phoneticEl = $('input-phonetic');
  const faPhoneticEl = $('input-fa-phonetic');
  if (ipa && phoneticEl && !phoneticEl.value.trim()) {
    phoneticEl.value = ipa;
    const badge = $('phonetic-auto-badge');
    if (badge) badge.style.display = 'inline-flex';
  }
  if (faPhoneticEl && !faPhoneticEl.value.trim()) {
    const fa = engToPersian(word);
    if (fa) { faPhoneticEl.value = fa; const b = $('fa-phonetic-auto-badge'); if (b) b.style.display = 'inline-flex'; }
  }
  if (statusEl) statusEl.style.display = 'none';
}

/* ════════════════════════════════════════
   TTS
════════════════════════════════════════ */
function speak(text, btn) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = parseFloat(S.settings.ttsRate) || 0.9;
  u.lang = 'en-US';
  if (S.settings.ttsVoiceURI) {
    const v = S.ttsVoices.find(v => v.voiceURI === S.settings.ttsVoiceURI);
    if (v) u.voice = v;
  }
  if (btn) { u.onstart = () => btn.classList.add('playing'); u.onend = u.onerror = () => btn.classList.remove('playing'); }
  window.speechSynthesis.speak(u);
}
function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  const populate = () => {
    const voices = window.speechSynthesis.getVoices();
    S.ttsVoices = voices.filter(v => v.lang.startsWith('en'));
    if (!S.ttsVoices.length) S.ttsVoices = voices;
    const sel = $('tts-voice'); if (!sel) return;
    sel.innerHTML = `<option value="">${t('defaultVoice')}</option>`;
    S.ttsVoices.forEach(v => {
      const o = document.createElement('option');
      o.value = v.voiceURI; o.textContent = `${v.name} (${v.lang})`;
      if (v.voiceURI === S.settings.ttsVoiceURI) o.selected = true;
      sel.appendChild(o);
    });
  };
  populate();
  if (window.speechSynthesis.onvoiceschanged !== undefined) window.speechSynthesis.onvoiceschanged = populate;
}

/* ════════════════════════════════════════
   TEXT COMPRESSION (LZW — lightweight, zero deps)
════════════════════════════════════════ */
const LZW = (() => {
  function compress(str) {
    if (!str || str.length < 100) return str; // no benefit for short strings
    try {
      const dict = {}; let data = (str + '').split(''); let out = []; let currChar;
      let phrase = data[0]; let code = 256;
      for (let i = 1; i < data.length; i++) {
        currChar = data[i];
        if (dict[phrase + currChar] != null) {
          phrase += currChar;
        } else {
          out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
          dict[phrase + currChar] = code; code++;
          phrase = currChar;
        }
      }
      out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
      return '\x00LZW\x00' + out.map(c => String.fromCharCode(c)).join('');
    } catch { return str; }
  }
  function decompress(str) {
    if (!str || !str.startsWith('\x00LZW\x00')) return str;
    try {
      const data = (str.slice(5)).split('').map(c => c.charCodeAt(0));
      const dict = {}; let currChar = String.fromCharCode(data[0]);
      let oldPhrase = currChar; let out = [currChar]; let code = 256; let phrase;
      for (let i = 1; i < data.length; i++) {
        const currCode = data[i];
        if (currCode < 256) { phrase = String.fromCharCode(currCode); }
        else { phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar); }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar; code++;
        oldPhrase = phrase;
      }
      return out.join('');
    } catch { return str; }
  }
  return { compress, decompress };
})();

/* ════════════════════════════════════════
   IMAGE COMPRESSION (Canvas → WebP/JPEG @ 0.6)
════════════════════════════════════════ */
function compressImage(file) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX_W = 800, MAX_H = 600;
      let { naturalWidth: w, naturalHeight: h } = img;
      const ratio = Math.min(MAX_W / w, MAX_H / h, 1);
      const cw = Math.round(w * ratio);
      const ch = Math.round(h * ratio);
      const canvas = document.createElement('canvas');
      canvas.width = cw; canvas.height = ch;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, cw, ch);
      // Try WebP first (better compression), fall back to JPEG
      const webp = canvas.toDataURL('image/webp', 0.65);
      if (webp.startsWith('data:image/webp')) {
        resolve(webp);
      } else {
        resolve(canvas.toDataURL('image/jpeg', 0.65));
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

/* ════════════════════════════════════════
   IMAGE HANDLING
════════════════════════════════════════ */
function setFormImage(b64) {
  const preview = $('image-preview');
  const box = $('image-preview-box');
  const hidden = $('edit-image');
  if (b64) {
    if (preview) preview.src = b64;
    if (box) box.style.display = 'flex';
    if (hidden) hidden.value = b64;
  } else {
    if (preview) preview.src = '';
    if (box) box.style.display = 'none';
    if (hidden) hidden.value = '';
  }
}
function handleImageFile(file) {
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) { showToast(t('imageTooLarge'), 'error'); return; }
  showToast(t('compressingImage'), 'info');
  compressImage(file).then(compressed => {
    if (compressed) {
      setFormImage(compressed);
    } else {
      // fallback: raw base64
      const r = new FileReader();
      r.onload = e => setFormImage(e.target.result);
      r.readAsDataURL(file);
    }
  });
}

/* ════════════════════════════════════════
   MODAL HELPERS
════════════════════════════════════════ */
function openModal(id) {
  const el = $(id); if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const el = $(id); if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}
function showConfirm(title, body, onOk) {
  setText('confirm-title', title);
  setText('confirm-body', body);
  S.confirmCb = onOk;
  openModal('modal-confirm');
}

/* ════════════════════════════════════════
   TOAST
════════════════════════════════════════ */
let toastTimer;
function showToast(msg, type='info') {
  const el = $('toast'); if (!el) return;
  el.textContent = msg;
  el.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ════════════════════════════════════════
   HEADER & STATS
════════════════════════════════════════ */
function updateHeaderStats() {
  setText('stat-total', S.words.length);
}

/* ════════════════════════════════════════
   i18n
════════════════════════════════════════ */
function applyLanguage() {
  const lang = S.settings.language || 'en';
  const html = document.getElementById('html-root');
  if (lang === 'fa') {
    html.setAttribute('lang','fa'); html.setAttribute('dir','rtl');
    document.body.classList.add('rtl');
  } else {
    html.setAttribute('lang','en'); html.setAttribute('dir','ltr');
    document.body.classList.remove('rtl');
  }

  // Splash
  setText('page-title', t('study'));
  setText('page-subtitle', t('leitnerReview'));

  // Nav labels
  setText('nav-lbl-study', t('study'));
  setText('nav-lbl-dict', t('dictionary'));
  setText('nav-lbl-add', t('addNew'));
  setText('nav-lbl-settings', t('settings'));

  // Study page
  setText('empty-title', t('allCaughtUp'));
  setText('empty-desc', t('allCaughtUpDesc'));
  setText('btn-add-from-empty', t('addNewWord'));
  setText('card-hint', t('tapToReveal'));
  setText('lbl-forgot', t('forgot'));
  setText('lbl-knew', t('knewIt'));
  setText('box-lbl-1', t('daily'));
  setText('box-lbl-2', t('twoDays'));
  setText('box-lbl-3', t('weekly'));
  setText('box-lbl-4', t('twoWeeks'));
  setText('box-lbl-5', t('mastered'));

  // Dict page
  setText('dict-empty-title', t('dictEmpty'));
  setText('dict-empty-desc', t('dictEmptyDesc'));
  setText('btn-add-from-dict', t('addFirstWord'));
  const dictSearch = $('dict-search');
  if (dictSearch) dictSearch.placeholder = lang === 'fa' ? t('searchVocab') || 'جستجو…' : 'Search vocabulary…';
  const dictSort = $('dict-sort');
  if (dictSort) {
    const opts = dictSort.options;
    if (opts[0]) opts[0].text = t('newest');
    if (opts[1]) opts[1].text = t('oldest');
    if (opts[3]) opts[3].text = t('byBox');
  }

  // Form page
  setText('form-title', t('addNewWord'));
  setText('form-subtitle', t('fillDetails'));
  setText('lbl-en', t('englishWord'));
  setText('lbl-fa', t('persianMeaning'));
  setText('lbl-phonetic', t('phonetics'));
  setText('lbl-fa-phonetic', t('persianPhonetics'));
  setText('lbl-sentence', t('exampleSentence'));
  setText('lbl-notes', t('notes'));
  setText('lbl-image', t('wordImage'));
  setText('lbl-upload', t('uploadImage'));
  setText('lbl-created', t('created'));
  setText('lbl-edited', t('lastEdited'));
  setText('btn-save-label', t('saveWord'));
  const cancelBtn = $('btn-cancel-edit'); if (cancelBtn) cancelBtn.textContent = t('cancelEdit');

  // Settings
  setText('settings-slogan', t('appSlogan'));
  setText('s-key-total', t('totalWords'));
  setText('s-key-mastered', t('mastered'));
  setText('s-key-due', t('dueToday'));
  setText('s-key-streak', t('dayStreak'));
  setText('lbl-lang-settings', t('languageSettings'));
  setText('lbl-app-lang', t('appLanguage'));
  setText('lbl-app-lang-desc', t('appLanguageDesc'));
  setText('lbl-speech-settings', t('speechSettings'));
  setText('lbl-speech-rate', t('speechRate'));
  setText('lbl-speech-rate-desc', t('speechRateDesc'));
  setText('lbl-voice', t('voice'));
  setText('lbl-voice-desc', t('voiceDesc'));
  setText('lbl-test-voice', t('testVoice'));
  setText('lbl-backup-section', t('backupRestore'));
  setText('lbl-auto-backup', t('autoBackup'));
  setText('lbl-auto-backup-desc', t('autoBackupDesc'));
  setText('lbl-last-backup', t('lastBackup'));
  setText('lbl-manual-backup', t('manualBackup'));
  setText('lbl-download-backup', t('downloadBackup'));
  setText('lbl-restore', t('restoreBackup'));
  setText('lbl-restore-file', t('restoreFile'));
  setText('lbl-data-section', t('dataManagement'));
  setText('lbl-export', t('exportVocab'));
  setText('lbl-export-desc', '');
  setText('lbl-export-json', t('exportJSON'));
  setText('lbl-import', t('importVocab'));
  setText('lbl-import-json', t('importJSON'));
  setText('lbl-clear-all', t('clearAll'));
  setText('lbl-clear-desc', t('clearAllDesc'));
  setText('lbl-clear-btn', t('clearAll'));
  setText('lbl-about', t('about'));
  setText('lbl-sfx', t('sfxLabel'));
  setText('lbl-sfx-desc', t('sfxDesc'));
  const langSel = $('app-language-select'); if (langSel) langSel.value = lang;

  // Modal
  setText('md-lbl-edit', t('edit'));
  setText('md-lbl-delete', t('delete'));
  setText('md-lbl-close', t('close'));

  // Confirm modal
  setText('confirm-title', t('confirmTitle'));
  setText('confirm-ok', t('confirmOk'));
  setText('confirm-cancel', t('confirmCancel'));

  // About section
  setText('about-desc', t('aboutDesc'));
  const aboutTags = document.querySelectorAll('.about-tag');
  const tagKeys = ['tagOffline', 'tagLeitner', 'tagTTS'];
  aboutTags.forEach((el, i) => { if (tagKeys[i]) el.textContent = t(tagKeys[i]); });
}

/* ════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════ */
function navigateTo(page) {
  if (!page) return;
  S.currentPage = page;

  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  // Show/hide pages
  document.querySelectorAll('.page').forEach(p => {
    const isActive = p.id === `page-${page}`;
    p.classList.toggle('active', isActive);
  });

  // Page title
  const titles = {
    study:      [t('study'),      t('leitnerReview')],
    dictionary: [t('dictionary'), t('yourVocab')],
    add:        [$('edit-id')?.value ? t('updateWord') : t('addNewWord'), t('fillDetails')],
    settings:   [t('settings'),   t('prefData')],
  };
  const [title, sub] = titles[page] || [t('appName'), ''];
  setText('page-title', title);
  setText('page-subtitle', sub);

  // Page-specific rendering
  if (page === 'study')      renderStudyPage();
  else if (page === 'dictionary') renderDictionary();
  else if (page === 'settings')   renderSettings();
  else if (page === 'add' && !$('edit-id')?.value) resetForm();
}

/* ════════════════════════════════════════
   STUDY PAGE
════════════════════════════════════════ */
function renderStudyPage() {
  updateBoxCounts();
  if (!S.session.queue.length || S.session.index >= S.session.queue.length) {
    S.session.queue = buildQueue();
    S.session.index = 0;
    S.session.flipped = false;
  }
  const emptyEl = $('study-empty');
  const cardEl  = $('flashcard-container');
  if (!S.session.queue.length) {
    if (emptyEl) emptyEl.style.display = 'flex';
    if (cardEl)  cardEl.style.display  = 'none';
  } else {
    if (emptyEl) emptyEl.style.display = 'none';
    if (cardEl)  cardEl.style.display  = 'block';
    renderCurrentCard();
  }
}

function updateBoxCounts() {
  for (let b = 1; b <= 5; b++) {
    setText(`box-count-${b}`, S.words.filter(w => w.box === b).length);
  }
}

function renderCurrentCard() {
  const { queue, index } = S.session;
  const word = findWord(queue[index]); if (!word) return;
  const card = $('flip-card'); if (!card) return;
  card.classList.remove('flipped','card-result-knew','card-result-forgot');
  S.session.flipped = false;
  const actionsEl = $('study-actions'); if (actionsEl) actionsEl.style.display = 'none';

  const total = queue.length;
  const fill = $('progress-bar-fill');
  if (fill) fill.style.width = `${(index/total)*100}%`;
  setText('progress-label', `${index} / ${total}`);

  setText('card-front-word', word.en);
  setText('card-front-phonetic', word.phonetic || '');
  setText('card-front-fa-phonetic', word.faPhonetic || '');
  setText('card-box-badge', tf('boxBadge', {b: word.box}));
  setText('card-back-meaning', word.fa);
  setText('card-back-sentence', word.sentence ? `"${LZW.decompress(word.sentence)}"` : '');
  setText('card-back-notes', word.notes ? LZW.decompress(word.notes).slice(0,80) : '');

  const imgWrap = $('card-front-image');
  const img     = $('card-front-img');
  const flipCard = $('flip-card');

  if (word.image && imgWrap && img && flipCard) {
    img.src = word.image;
    imgWrap.style.display = 'flex';
    flipCard.classList.add('has-image');

    // Dynamically size the card to fully preserve the image's natural aspect ratio
    const applyDynamicHeight = (naturalW, naturalH) => {
      const cardWidth = flipCard.offsetWidth || 320;
      const ratio     = naturalH / naturalW;
      // Image display height inside card
      const maxImgH   = Math.round(Math.min(window.innerHeight * 0.52, cardWidth * ratio));
      // Total card height = image + padding + word text row + phonetic + hint
      const textBlock = 130; // px reserved for badge, word, phonetics, hint, tts btn
      const total     = maxImgH + textBlock;
      flipCard.style.height = total + 'px';
    };

    if (img.complete && img.naturalWidth > 0) {
      // Image already in cache
      applyDynamicHeight(img.naturalWidth, img.naturalHeight);
    } else {
      // Wait for load — reset to safe fallback meanwhile
      flipCard.style.height = '280px';
      img.onload  = () => applyDynamicHeight(img.naturalWidth, img.naturalHeight);
      img.onerror = () => { flipCard.style.height = '280px'; };
    }
  } else {
    if (imgWrap)  imgWrap.style.display = 'none';
    if (flipCard) {
      flipCard.classList.remove('has-image');
      flipCard.style.height = ''; // revert to CSS min-height (text-only card)
    }
  }
}

function flipCard() {
  if (!S.session.queue.length) return;
  const card = $('flip-card'); if (!card) return;
  S.session.flipped = !S.session.flipped;
  card.classList.toggle('flipped', S.session.flipped);
  const acts = $('study-actions');
  if (acts) acts.style.display = S.session.flipped ? 'flex' : 'none';
}

function handleStudyResult(knew) {
  const { queue, index } = S.session;
  if (index >= queue.length) return;
  const id = queue[index];
  const card = $('flip-card');
  if (card) card.classList.add(knew ? 'card-result-knew' : 'card-result-forgot');
  reviewCard(id, knew);
  updateBoxCounts();
  setTimeout(() => {
    if (card) card.classList.remove('card-result-knew','card-result-forgot');
    S.session.index++;
    if (S.session.index >= S.session.queue.length) {
      const fill = $('progress-bar-fill'); if (fill) fill.style.width = '100%';
      setText('progress-label', `${queue.length} / ${queue.length}`);
      const acts = $('study-actions'); if (acts) acts.style.display = 'none';
      S.session.queue = []; S.session.index = 0;
      showToast(`🎉 ${t('allCaughtUp')}`, 'success');
      setTimeout(() => {
        const empty = $('study-empty'), ctr = $('flashcard-container');
        if (empty) empty.style.display = 'flex';
        if (ctr) ctr.style.display = 'none';
      }, 500);
    } else {
      renderCurrentCard();
    }
  }, 380);
}

/* ════════════════════════════════════════
   DICTIONARY PAGE
════════════════════════════════════════ */
function renderDictionary() {
  const searchEl = $('dict-search');
  const sortEl   = $('dict-sort');
  const q    = searchEl?.value?.trim() || '';
  const sort = sortEl?.value || 'newest';
  const listEl  = $('word-list');
  const emptyEl = $('dict-empty');
  const countEl = $('dict-count-label');
  const filterEl = $('dict-filter-label');
  if (!listEl) return;

  let words = [...S.words];
  if (q) {
    const ql = q.toLowerCase();
    words = words.filter(w =>
      w.en.toLowerCase().includes(ql) || w.fa.includes(q) ||
      (w.sentence||'').toLowerCase().includes(ql) || (w.phonetic||'').toLowerCase().includes(ql)
    );
  }
  // Sort
  switch (sort) {
    case 'oldest': words.sort((a,b) => a.createdAt-b.createdAt); break;
    case 'az':     words.sort((a,b) => a.en.localeCompare(b.en)); break;
    case 'za':     words.sort((a,b) => b.en.localeCompare(a.en)); break;
    case 'box':    words.sort((a,b) => a.box-b.box); break;
    default:       words.sort((a,b) => b.createdAt-a.createdAt);
  }

  if (!words.length) {
    listEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'flex';
  } else {
    if (emptyEl) emptyEl.style.display = 'none';
    listEl.innerHTML = words.map(renderWordCard).join('');
  }
  const cnt = words.length;
  if (countEl) countEl.textContent = `${cnt} ${cnt===1 ? t('word') : t('words')}`;
  if (filterEl) filterEl.textContent = q ? `🔍 "${q}"` : '';
}

function renderWordCard(w) {
  const imgHtml = w.image
    ? `<div class="wc-image"><img src="${esc(w.image)}" alt="" loading="lazy" /></div>`
    : '';
  return `<div class="word-card" data-id="${esc(w.id)}" role="button" tabindex="0">
    ${imgHtml}
    <div class="word-card-main">
      <div class="wc-en">${esc(w.en)}</div>
      ${w.phonetic ? `<div class="wc-phonetic">${esc(w.phonetic)}</div>` : ''}
      ${w.faPhonetic ? `<div class="wc-fa-phonetic" dir="rtl" lang="fa">${esc(w.faPhonetic)}</div>` : ''}
      <span class="wc-fa" dir="rtl" lang="fa">${esc(w.fa)}</span>
    </div>
    <div class="word-card-meta">
      <span class="wc-box ${w.box===5?'box-5':w.box===1?'box-1':''}">${esc(t(`boxLabel${w.box}`) || tf('boxBadge',{b:w.box}))}</span>
      <button class="wc-tts" data-word="${esc(w.en)}" aria-label="Pronounce">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
      </button>
    </div>
  </div>`;
}

/* ════════════════════════════════════════
   WORD DETAIL MODAL
════════════════════════════════════════ */
const BOX_KEYS = { 1:'boxLabel1', 2:'boxLabel2', 3:'boxLabel3', 4:'boxLabel4', 5:'boxLabel5' };

function openWordModal(id) {
  const word = findWord(id); if (!word) return;
  S.modalWordId = id;
  setText('md-en-word', word.en);
  setText('md-phonetic', word.phonetic || '');
  setText('md-fa-phonetic', word.faPhonetic || '');
  setText('md-fa-meaning', word.fa);
  setText('md-box-badge', t(BOX_KEYS[word.box]) || tf('boxBadge',{b: word.box}));

  const imgWrap = $('md-image-wrap'), img = $('md-image');
  if (word.image && imgWrap && img) { img.src = word.image; imgWrap.style.display = 'block'; }
  else if (imgWrap) imgWrap.style.display = 'none';

  const sentSect = $('md-sentence-section'), sentEl = $('md-sentence');
  if (word.sentence && sentSect && sentEl) { sentEl.textContent = LZW.decompress(word.sentence); sentSect.style.display = 'block'; }
  else if (sentSect) sentSect.style.display = 'none';

  const notesSect = $('md-notes-section'), notesEl = $('md-notes');
  if (word.notes?.trim() && notesSect && notesEl) { notesEl.textContent = LZW.decompress(word.notes); notesSect.style.display = 'block'; }
  else if (notesSect) notesSect.style.display = 'none';

  setText('md-ts-created', `📅 ${t('created')}${fmtDate(word.createdAt)}`);
  setText('md-ts-edited',  `✏️ ${t('lastEdited')}${fmtDate(word.updatedAt)}`);
  openModal('modal-word-detail');
}

function closeWordModal() { closeModal('modal-word-detail'); S.modalWordId = null; }

/* ════════════════════════════════════════
   ADD / EDIT FORM
════════════════════════════════════════ */
function resetForm() {
  ['input-en','input-fa','input-phonetic','input-fa-phonetic','input-sentence','input-notes','edit-id'].forEach(id => {
    const el = $(id); if (el) el.value = '';
  });
  setFormImage('');
  const fi = $('image-file-input'); if (fi) fi.value = '';
  const ts = $('form-timestamps'); if (ts) ts.style.display = 'none';
  const cancel = $('btn-cancel-edit'); if (cancel) cancel.style.display = 'none';
  setText('form-title', t('addNewWord'));
  setText('form-subtitle', t('fillDetails'));
  setText('btn-save-label', t('saveWord'));
  [$('phonetic-auto-badge'),$('fa-phonetic-auto-badge')].forEach(el => { if (el) el.style.display='none'; });
  const status = $('auto-status'); if (status) status.style.display = 'none';
  const autoStatusText = $('auto-status-text'); if (autoStatusText) autoStatusText.textContent = t('autoFetch');
}

function openEditForm(id) {
  const word = findWord(id); if (!word) return;
  navigateTo('add');
  const vals = { 'input-en':word.en, 'input-fa':word.fa, 'input-phonetic':word.phonetic||'',
    'input-fa-phonetic':word.faPhonetic||'', 'input-sentence':LZW.decompress(word.sentence||''),
    'input-notes':LZW.decompress(word.notes||''), 'edit-id':word.id };
  Object.entries(vals).forEach(([id,v]) => { const el = $(id); if (el) el.value = v; });
  setFormImage(word.image || '');
  const ts = $('form-timestamps');
  if (ts) {
    ts.style.display = 'flex';
    setText('ts-created', fmtDate(word.createdAt));
    setText('ts-edited', fmtDate(word.updatedAt));
  }
  setText('form-title', t('updateWord'));
  setText('form-subtitle', `${t('editing')} "${word.en}"`);
  setText('btn-save-label', t('updateWord'));
  const cancel = $('btn-cancel-edit'); if (cancel) cancel.style.display = 'inline-flex';
  closeWordModal();
}

function handleSaveWord() {
  const en       = ($('input-en')?.value||'').trim();
  const fa       = ($('input-fa')?.value||'').trim();
  const phonetic = ($('input-phonetic')?.value||'').trim();
  const faPhon   = ($('input-fa-phonetic')?.value||'').trim();
  const sentence = ($('input-sentence')?.value||'').trim();
  const notes    = ($('input-notes')?.value||'').trim();
  const image    = $('edit-image')?.value || '';
  const editId   = $('edit-id')?.value || '';

  if (!en) { showToast(tf('fieldRequired',{field: t('englishWord')}), 'error'); $('input-en')?.focus(); return; }
  if (!fa) { showToast(tf('fieldRequired',{field: t('persianMeaning')}), 'error'); $('input-fa')?.focus(); return; }
  if (!editId) {
    const dup = S.words.find(w => w.en.toLowerCase() === en.toLowerCase());
    if (dup) { showToast(tf('alreadyExists',{en}), 'error'); return; }
  }

  if (editId) {
    updateWord(editId, { en, fa, phonetic, faPhonetic: faPhon, sentence: LZW.compress(sentence), notes: LZW.compress(notes), image });
    SFX.success();
    showToast(tf('wordUpdated',{en}), 'success');
  } else {
    addWord({ en, fa, phonetic, faPhonetic: faPhon, sentence, notes, image });
    SFX.success();
    showToast(tf('wordAdded',{en}), 'success');
  }
  updateHeaderStats();
  navigateTo('dictionary');
}

/* ════════════════════════════════════════
   SETTINGS PAGE
════════════════════════════════════════ */
function renderSettings() {
  setText('s-total',    S.words.length);
  setText('s-mastered', S.words.filter(w => w.box===5).length);
  setText('s-due',      S.words.filter(isDue).length);
  setText('s-streak',   S.streak.count);
  const rateEl = $('tts-rate'); if (rateEl) rateEl.value = S.settings.ttsRate;
  setText('tts-rate-val', `${S.settings.ttsRate}×`);
  const tog = $('auto-backup-toggle'); if (tog) tog.checked = S.settings.autoBackup !== false;
  const sfxTog = $('sfx-toggle'); if (sfxTog) sfxTog.checked = S.settings.sfxEnabled !== false;
  const langSel = $('app-language-select'); if (langSel) langSel.value = S.settings.language || 'en';
  updateLastBackupDisplay();
}

function updateLastBackupDisplay() {
  const el = $('last-backup-time'); if (!el) return;
  el.textContent = S.backupMeta.lastBackup ? fmtDate(S.backupMeta.lastBackup) : t('neverBacked');
}

/* ════════════════════════════════════════
   BACKUP / EXPORT / IMPORT
════════════════════════════════════════ */
function autoBackup() {
  try {
    const p = { app:'Comeback', version:'3.0.0', exportedAt:new Date().toISOString(), words:S.words, settings:S.settings, streak:S.streak };
    localStorage.setItem('comeback_auto_backup', JSON.stringify(p));
    S.backupMeta.lastBackup = Date.now();
    localStorage.setItem(BACKUP_KEY, JSON.stringify(S.backupMeta));
    updateLastBackupDisplay();
  } catch(e) {}
}

function downloadBackup() {
  if (!S.words.length) { showToast(t('nothingToBackup'), 'info'); return; }
  const p = { app:'Comeback', version:'3.0.0', exportedAt:new Date().toISOString(), wordCount:S.words.length, words:S.words, settings:S.settings, streak:S.streak };
  triggerDownload(JSON.stringify(p,null,2), `comeback-backup-${todayStr()}.json`, 'application/json');
  S.backupMeta.lastBackup = Date.now();
  localStorage.setItem(BACKUP_KEY, JSON.stringify(S.backupMeta));
  updateLastBackupDisplay();
  showToast(tf('backedUp',{n: S.words.length}), 'success');
}

function triggerDownload(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function restoreFromFile(file) {
  if (!file) return;
  const r = new FileReader();
  r.onload = e => {
    try {
      const d = JSON.parse(e.target.result);
      const words = Array.isArray(d) ? d : (d.words || []);
      if (!words.length) { showToast(t('noWordsInFile'), 'error'); return; }
      showConfirm(t('restoreBackup'), tf('mergeWords',{n: words.length}), () => {
        let added = 0;
        words.forEach(w => { if (!S.words.find(e => e.id === w.id)) { S.words.push(w); added++; } });
        saveWords(); updateHeaderStats(); renderSettings();
        showToast(tf('restoredWords',{n: added}), 'success');
      });
    } catch { showToast(t('invalidBackup'), 'error'); }
  };
  r.readAsText(file);
}

function exportData() {
  if (!S.words.length) { showToast(t('nothingToExport'), 'info'); return; }
  const p = { app:'Comeback', version:'3.0.0', exportedAt:new Date().toISOString(), wordCount:S.words.length, words:S.words };
  triggerDownload(JSON.stringify(p,null,2), `comeback-vocab-${todayStr()}.json`, 'application/json');
  showToast(tf('exportedWords',{n: S.words.length}), 'success');
}

function importData(file) {
  if (!file) return;
  const r = new FileReader();
  r.onload = e => {
    try {
      const d = JSON.parse(e.target.result);
      const words = Array.isArray(d) ? d : (d.words || []);
      if (!words.length) { showToast(t('noWordsFound'), 'error'); return; }
      let added = 0;
      words.forEach(w => { if (!S.words.find(e => e.id === w.id)) { S.words.push(w); added++; } });
      saveWords(); updateHeaderStats(); renderSettings();
      showToast(tf('importedWords',{n: added}), 'success');
    } catch { showToast(t('invalidFile'), 'error'); }
  };
  r.readAsText(file);
}

/* ════════════════════════════════════════
   GLOBAL SEARCH
════════════════════════════════════════ */
function toggleSearch(open) {
  const bar = $('global-search-bar');
  if (!bar) return;
  bar.classList.toggle('visible', open);
  if (open) $('global-search-input')?.focus();
}

/* ════════════════════════════════════════
   EVENT LISTENERS — SAFE SETUP
   Each section is independent; one failure won't block others
════════════════════════════════════════ */
function setupEvents() {

  /* ── NAV BUTTONS ── */
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => { SFX.click(); navigateTo(btn.dataset.page); });
  });

  /* ── STUDY PAGE ── */
  on('flip-card', 'click', () => { if (!S.session.flipped) { SFX.click(); flipCard(); } });
  on('flip-card', 'keydown', e => { if ((e.key==='Enter'||e.key===' ') && !S.session.flipped) { e.preventDefault(); SFX.click(); flipCard(); } });
  on('btn-flip-back', 'click', e => { e.stopPropagation(); if (S.session.flipped) { SFX.click(); flipCard(); } });
  on('btn-knew', 'click', () => { SFX.click(); handleStudyResult(true); });
  on('btn-forgot', 'click', () => { SFX.click(); handleStudyResult(false); });
  on('btn-add-from-empty', 'click', () => { SFX.click(); navigateTo('add'); });
  on('tts-btn-front', 'click', e => {
    e.stopPropagation();
    const w = findWord(S.session.queue[S.session.index]);
    if (w) speak(w.en, e.currentTarget);
  });

  /* ── LEITNER BOX FILTER ── */
  document.querySelectorAll('.leitner-box').forEach(box => {
    box.addEventListener('click', () => {
      const b = parseInt(box.dataset.box);
      const filtered = S.words.filter(w => w.box===b && isDue(w));
      if (!filtered.length) { showToast(tf('noWordsDueBox',{b}), 'info'); return; }
      S.session.queue = filtered.map(w => w.id).sort(() => Math.random()-.5);
      S.session.index = 0; S.session.flipped = false;
      const ctr = $('flashcard-container'), empty = $('study-empty');
      if (ctr) ctr.style.display = 'block'; if (empty) empty.style.display = 'none';
      renderCurrentCard();
      document.querySelectorAll('.leitner-box').forEach(b => b.classList.remove('active-box'));
      box.classList.add('active-box');
    });
  });

  /* ── SWIPE STUDY ── */
  let touchX = 0;
  const studyArea = $('study-area');
  if (studyArea) {
    studyArea.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
    studyArea.addEventListener('touchend', e => {
      if (!S.session.flipped) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 60) handleStudyResult(dx > 0);
    }, { passive: true });
  }

  /* ── DICTIONARY ── */
  on('dict-search', 'input', e => {
    const clearBtn = $('dict-clear-btn');
    if (clearBtn) clearBtn.style.display = e.target.value ? 'flex' : 'none';
    renderDictionary();
  });
  on('dict-clear-btn', 'click', () => {
    const s = $('dict-search'); if (s) s.value = '';
    const c = $('dict-clear-btn'); if (c) c.style.display = 'none';
    renderDictionary();
  });
  on('dict-sort', 'change', () => renderDictionary());
  on('btn-add-from-dict', 'click', () => navigateTo('add'));

  /* ── DICTIONARY — EVENT DELEGATION for word cards ── */
  const wordList = $('word-list');
  if (wordList) {
    wordList.addEventListener('click', e => {
      // TTS button
      const ttsBtn = e.target.closest('.wc-tts');
      if (ttsBtn) {
        e.stopPropagation();
        speak(ttsBtn.dataset.word, ttsBtn);
        return;
      }
      // Word card
      const card = e.target.closest('.word-card');
      if (card && card.dataset.id) openWordModal(card.dataset.id);
    });
  }

  /* ── GLOBAL SEARCH ── */
  on('btn-search-toggle', 'click', () => toggleSearch(true));
  on('btn-search-close', 'click', () => {
    toggleSearch(false);
    const inp = $('global-search-input'); if (inp) inp.value = '';
  });
  on('global-search-input', 'input', e => {
    const q = e.target.value;
    if (q.trim()) {
      navigateTo('dictionary');
      const ds = $('dict-search'); if (ds) ds.value = q;
      const dc = $('dict-clear-btn'); if (dc) dc.style.display = 'flex';
      renderDictionary();
    }
  });

  /* ── WORD DETAIL MODAL ── */
  on('md-btn-close', 'click', () => { SFX.click(); closeWordModal(); });
  on('md-btn-edit', 'click', () => { SFX.click(); if (S.modalWordId) openEditForm(S.modalWordId); });
  on('md-btn-delete', 'click', () => {
    const w = findWord(S.modalWordId); if (!w) return;
    showConfirm(`${t('delete')} "${w.en}"?`, t('cannotUndo'), () => {
      SFX.delete();
      deleteWord(S.modalWordId); closeWordModal();
      updateHeaderStats(); renderDictionary(); updateBoxCounts();
      showToast(tf('wordDeleted',{en: w.en}), 'success');
    });
  });
  on('md-tts-btn', 'click', () => {
    const w = findWord(S.modalWordId); if (w) speak(w.en, $('md-tts-btn'));
  });
  const modalWD = $('modal-word-detail');
  if (modalWD) modalWD.addEventListener('click', e => { if (e.target===e.currentTarget) closeWordModal(); });

  /* ── CONFIRM MODAL ── */
  on('confirm-ok', 'click', () => {
    SFX.click();
    closeModal('modal-confirm');
    if (typeof S.confirmCb === 'function') { S.confirmCb(); S.confirmCb = null; }
  });
  on('confirm-cancel', 'click', () => { SFX.click(); closeModal('modal-confirm'); S.confirmCb = null; });
  const modalConf = $('modal-confirm');
  if (modalConf) modalConf.addEventListener('click', e => { if (e.target===e.currentTarget) { closeModal('modal-confirm'); S.confirmCb = null; } });

  /* ── ADD / EDIT FORM ── */
  on('btn-save-word', 'click', () => { SFX.click(); handleSaveWord(); });
  on('btn-cancel-edit', 'click', () => { SFX.click(); resetForm(); navigateTo('dictionary'); });
  on('form-tts-btn', 'click', () => {
    const v = ($('input-en')?.value||'').trim();
    if (v) speak(v); else showToast(t('enterEnglishFirst'), 'info');
  });
  on('input-en', 'blur', e => {
    const w = e.target.value.trim();
    if (w) { clearTimeout(autoTimer); autoTimer = setTimeout(() => autoFill(w), 400); }
  });
  on('input-en', 'input', () => {
    [$('phonetic-auto-badge'),$('fa-phonetic-auto-badge')].forEach(el => { if(el) el.style.display='none'; });
  });
  on('btn-upload-image', 'click', () => $('image-file-input')?.click());
  on('image-file-input', 'change', e => { if (e.target.files[0]) handleImageFile(e.target.files[0]); });
  on('remove-image-btn', 'click', () => { setFormImage(''); const fi=$('image-file-input'); if(fi) fi.value=''; });

  /* ── SETTINGS ── */
  on('app-language-select', 'change', e => {
    S.settings.language = e.target.value;
    saveSettings(); applyLanguage(); renderDictionary(); renderSettings();
    navigateTo(S.currentPage);
  });
  on('tts-rate', 'input', e => {
    const v = parseFloat(e.target.value).toFixed(1);
    S.settings.ttsRate = v;
    setText('tts-rate-val', `${v}×`);
    saveSettings();
  });
  on('tts-voice', 'change', e => { S.settings.ttsVoiceURI = e.target.value; saveSettings(); });
  on('btn-test-tts', 'click', () => speak('Hello! This is Comeback, your vocabulary assistant.', $('btn-test-tts')));
  on('auto-backup-toggle', 'change', e => { S.settings.autoBackup = e.target.checked; saveSettings(); });
  on('sfx-toggle', 'change', e => { S.settings.sfxEnabled = e.target.checked; saveSettings(); });
  on('btn-backup', 'click', downloadBackup);
  on('btn-restore-trigger', 'click', () => $('restore-file-input')?.click());
  on('restore-file-input', 'change', e => { restoreFromFile(e.target.files[0]); e.target.value = ''; });
  on('btn-export', 'click', exportData);
  on('btn-import-trigger', 'click', () => $('import-file-input')?.click());
  on('import-file-input', 'change', e => { importData(e.target.files[0]); e.target.value = ''; });
  on('btn-clear-all', 'click', () => {
    if (!S.words.length) { showToast(t('nothingToClear'), 'info'); return; }
    showConfirm(t('clearAll'), tf('deleteAllConfirm',{n: S.words.length}), () => {
      S.words = []; saveWords();
      S.streak = { count:0, lastStudyDate:null }; saveStreak();
      S.session.queue = []; S.session.index = 0;
      updateHeaderStats(); renderStudyPage(); renderDictionary(); renderSettings();
      showToast(t('allClearedToast'), 'info');
    });
  });

  /* ── KEYBOARD ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal('modal-word-detail'); closeModal('modal-confirm'); toggleSearch(false);
    }
    if (S.currentPage === 'study') {
      if (e.key === ' ' && !S.session.flipped) { e.preventDefault(); flipCard(); }
      if (S.session.flipped) {
        if (e.key === 'ArrowRight') handleStudyResult(true);
        if (e.key === 'ArrowLeft')  handleStudyResult(false);
      }
    }
  });
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
function initApp() {
  // 1. Load data (each safe)
  loadWords();
  loadSettings();
  loadStreak();
  loadBackupMeta();

  // 2. Apply language
  applyLanguage();

  // 3. Setup event listeners FIRST — so UI is responsive immediately
  setupEvents();

  // 4. Load TTS voices (non-blocking)
  loadVoices();

  // 5. Render initial page
  updateHeaderStats();
  navigateTo('study');
}

/* ════════════════════════════════════════
   EXPOSE PUBLIC API ON WINDOW
   (must be done BEFORE splash hides, for safety)
════════════════════════════════════════ */
window.navigateTo = navigateTo;
window.speak = speak;
window.openWordModal = openWordModal;

/* ════════════════════════════════════════
   SPLASH → APP
════════════════════════════════════════ */
function launch() {
  const splash = $('splash-screen');
  const app    = $('app');

  try {
    initApp();
  } catch(err) {
    // Even if something fails, show the app
    console.error('[Comeback] Init error:', err);
  }

  if (app) app.classList.remove('hidden');
  if (splash) splash.classList.add('fade-out');
  setTimeout(() => {
    if (splash?.parentNode) splash.parentNode.removeChild(splash);
  }, 700);
}

// Works in all scenarios: before DOMContentLoaded, after, and Capacitor
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(launch, 1900));
} else {
  setTimeout(launch, 1900);
}
