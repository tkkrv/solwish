'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'en' | 'ru' | 'kk';

export const translations = {
  en: {
    badge: '⚡ Powered by Solana Blinks & SPL Memo v2',
    heroTitlePrefix: 'Flowers will fade,',
    heroTitleGradient: "SolWish won't.",
    heroSubtitle:
      'The zero-fee social gifting protocol. Send direct P2P crypto wishes with immutable, on-chain personalized greeting cards.',
    createWishBtn: 'Create a Wishlist',
    telegramBtn: 'Open in Telegram',
    p2pBadge: '100% P2P • 0% Platform Fees',
    onChainBadge: 'Permanent On-Chain Memory',
    howItWorks: 'How SolWish Works',
    howItWorksSub: 'Three simple steps to grant or receive wishes in seconds',
    step1Title: '1. Create Wish',
    step1Desc: 'Set your dream item, target amount in SOL, and specify your wallet.',
    step2Title: '2. Share Anywhere',
    step2Desc: 'Post as an interactive Blink on Twitter/X or share link in Telegram.',
    step3Title: '3. Receive & Cherish',
    step3Desc: '100% of SOL arrives straight to your wallet with a perpetual on-chain note.',
    readyTitle: 'Ready to share your dream?',
    readySubtitle: 'Takes less than 60 seconds. No signup, no escrow, no platform fees.',
    footerText: 'Built for Colosseum Solana Hackathon • Devnet Live',
    
    // Create Page
    createTitle: 'Create Your Wish',
    createSubtitle: 'Set up your goal and turn it into a shareable Solana Blink',
    itemTitleLabel: 'What is your wish / gift goal?',
    itemTitlePlaceholder: 'e.g. Mechanical Keyboard or Birthday Fund',
    amountLabel: 'Target Amount (SOL)',
    amountPlaceholder: '1.5',
    recipientLabel: 'Recipient Wallet Address',
    recipientPlaceholder: 'Solana wallet address (or connect wallet)',
    useConnectedWallet: 'Use connected wallet',
    descriptionLabel: 'Personal Note / Story (Optional)',
    descriptionPlaceholder: 'Tell your friends why this wish matters to you...',
    imageUrlLabel: 'Cover Image URL (Optional)',
    imageUrlPlaceholder: 'https://...',
    submitCreateBtn: 'Generate SolWish Blink',
    createdSuccessTitle: '✨ Your Wish is Live!',
    createdSuccessSubtitle: 'Share this link anywhere. In Twitter/X and Blink-enabled apps it turns into an interactive card.',
    copyLinkBtn: 'Copy Blink Link',
    copiedText: 'Copied to Clipboard!',
    openBlinkBtn: 'Open Gift Card',
    directP2PNotice: 'Direct P2P: 100% of donations go directly to your wallet via System Program.'
  },
  ru: {
    badge: '⚡ На базе Solana Blinks и SPL Memo v2',
    heroTitlePrefix: 'Цветы завянут,',
    heroTitleGradient: 'SolWish — нет.',
    heroSubtitle:
      'Децентрализованный протокол подарков с 0% комиссии. Прямые P2P-переводы и вечные персонализированные открытки в блокчейне.',
    createWishBtn: 'Создать вишлист',
    telegramBtn: 'Открыть в Telegram',
    p2pBadge: '100% P2P • 0% комиссии платформы',
    onChainBadge: 'Вечная ончейн-память',
    howItWorks: 'Как работает SolWish',
    howItWorksSub: 'Три простых шага, чтобы исполнить или создать мечту',
    step1Title: '1. Создай мечту',
    step1Desc: 'Укажи название подарка, сумму в SOL и адрес своего кошелька.',
    step2Title: '2. Поделись в соцсетях',
    step2Desc: 'Отправь Blink в Twitter/X или поделись ссылкой в Telegram.',
    step3Title: '3. Получай SOL',
    step3Desc: '100% средств поступают прямо на кошелек вместе с открыткой.',
    readyTitle: 'Готовы поделиться мечтой?',
    readySubtitle: 'Занимает меньше 1 минуты. Без регистрации и комиссий.',
    footerText: 'Создано для Colosseum Solana Hackathon • Devnet Live',
    
    // Create Page
    createTitle: 'Создать желание',
    createSubtitle: 'Настрой цель и получи интерактивный Solana Blink',
    itemTitleLabel: 'Какая у вас мечта или подарок?',
    itemTitlePlaceholder: 'Например: Механическая клавиатура или На день рождения',
    amountLabel: 'Необходимая сумма (SOL)',
    amountPlaceholder: '1.5',
    recipientLabel: 'Адрес кошелька получателя',
    recipientPlaceholder: 'Адрес Solana-кошелька (или подключи кошелек)',
    useConnectedWallet: 'Использовать подключенный кошелек',
    descriptionLabel: 'Описание / История (необязательно)',
    descriptionPlaceholder: 'Расскажи друзьям, почему для тебя это важно...',
    imageUrlLabel: 'Ссылка на изображение (необязательно)',
    imageUrlPlaceholder: 'https://...',
    submitCreateBtn: 'Сгенерировать SolWish Blink',
    createdSuccessTitle: '✨ Ваше желание создано!',
    createdSuccessSubtitle: 'Поделитесь ссылкой. В Twitter/X и кошельках она превратится в интерактивную карточку.',
    copyLinkBtn: 'Скопировать ссылку Blink',
    copiedText: 'Скопировано в буфер!',
    openBlinkBtn: 'Открыть карточку подарка',
    directP2PNotice: 'Прямой P2P: 100% средств поступают напрямую на ваш кошелек через System Program.'
  },
  kk: {
    badge: '⚡ Solana Blinks және SPL Memo v2 негізінде',
    heroTitlePrefix: 'Гүлдер солады,',
    heroTitleGradient: 'SolWish мәңгілік.',
    heroSubtitle:
      '0% комиссиясы бар әлеуметтік сыйлықтар протоколы. Тікелей P2P аударымдар және блокчейнде сақталатын құттықтау хаттары.',
    createWishBtn: 'Тілектер тізімін жасау',
    telegramBtn: 'Telegram-да ашу',
    p2pBadge: '100% P2P • 0% платформа комиссиясы',
    onChainBadge: 'Блокчейндегі мәңгілік естелік',
    howItWorks: 'SolWish қалай жұмыс істейді?',
    howItWorksSub: 'Армандарды орындауға арналған үш қарапайым қадам',
    step1Title: '1. Арманыңызды жазыңыз',
    step1Desc: 'Сыйлық атауын, қажет SOL көлемін көрсетіп, әмияныңызды белгілеңіз.',
    step2Title: '2. Әлеуметтік желіде бөлісіңіз',
    step2Desc: 'Twitter/X желісінде Blink ретінде немесе Telegram-да таратыңыз.',
    step3Title: '3. Қабылдап алыңыз',
    step3Desc: 'Қаражат тікелей әмияныңызға түседі және мәңгілік хат сақталады.',
    readyTitle: 'Арманыңызбен бөлісуге дайынсыз ба?',
    readySubtitle: 'Бар болғаны 1 минут. Тіркелусіз және комиссиясыз.',
    footerText: 'Colosseum Solana Hackathon үшін жасалған • Devnet Live',
    
    // Create Page
    createTitle: 'Жаңа тілек қосу',
    createSubtitle: 'Мақсатыңызды белгілеп, интерактивті Solana Blink жасаңыз',
    itemTitleLabel: 'Қандай арманыңыз немесе сыйлық?',
    itemTitlePlaceholder: 'Мысалы: Механикалық пернетақта немесе Туған күнге',
    amountLabel: 'Қажетті сома (SOL)',
    amountPlaceholder: '1.5',
    recipientLabel: 'Қабылдаушының әмиян мекенжайы',
    recipientPlaceholder: 'Solana әмиян мекенжайы (немесе әмиянды қос)',
    useConnectedWallet: 'Қосылған әмиянды қолдану',
    descriptionLabel: 'Сипаттамасы / Оқиға (міндетті емес)',
    descriptionPlaceholder: 'Достарыңызға бұл арманның маңыздылығын айтыңыз...',
    imageUrlLabel: 'Сурет сілтемесі (міндетті емес)',
    imageUrlPlaceholder: 'https://...',
    submitCreateBtn: 'SolWish Blink жасау',
    createdSuccessTitle: '✨ Арманыңыз дайын болды!',
    createdSuccessSubtitle: 'Сілтемені бөлісіңіз. Twitter/X және әмияндарда ол интерактивті карточкаға айналады.',
    copyLinkBtn: 'Blink сілтемесін көшіру',
    copiedText: 'Көшірілді!',
    openBlinkBtn: 'Карточканы ашу',
    directP2PNotice: 'Тікелей P2P: Қаражаттың 100% делдалсыз сіздің әмияныңызға аударылады.'
  }
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('solwish_lang') as Locale;
    if (saved && ['en', 'ru', 'kk'].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('solwish_lang', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}