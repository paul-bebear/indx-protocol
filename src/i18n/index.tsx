import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { en, type Translations } from './en';
import { fr } from './fr';
import { it } from './it';

export type Locale = 'en' | 'fr' | 'it';

const translations: Record<Locale, Translations> = { en, fr, it };

export const localeLabels: Record<Locale, string> = {
    en: 'EN',
    fr: 'FR',
    it: 'IT',
};

interface I18nContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Translations;
}

const I18nContext = createContext<I18nContextValue>({
    locale: 'en',
    setLocale: () => { },
    t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(() => {
        const stored = localStorage.getItem('indx-locale') as Locale | null;
        return stored && translations[stored] ? stored : 'en';
    });

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('indx-locale', newLocale);
        document.documentElement.lang = newLocale;
    }, []);

    const t = translations[locale];

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    return useContext(I18nContext);
}
