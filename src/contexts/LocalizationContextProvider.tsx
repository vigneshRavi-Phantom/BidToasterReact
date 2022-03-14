import React, { createContext, useState, useContext, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import en from '../localization/en.json';
import { getItem, setItem } from 'utils/CommonUtils';

const DEFAULT_LANGUAGE = 'en';
const APP_LANGUAGE_KEY = 'appLanguage';

const strings = new LocalizedStrings({ en });

export const LocalizationContext = createContext({
    strings: strings,
    setAppLanguage: (_: string) => {},
    appLanguage: DEFAULT_LANGUAGE,
});

/**
 * LocalizationContextProvider manages localization/i18n strings for the app. It allows switching the app language
 * on the fly and allows overriding the localized strings via server configuration.
 */
export const LocalizationContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

    const setLanguage = (language: string) => {
        strings.setLanguage(language);
        setAppLanguage(language);
        setItem(APP_LANGUAGE_KEY, language);
    };

    /**
     * Run the side-effect on initial load only
     */
    useEffect(() => {
        console.debug('[LocalizationContext] Setup app lang');

        const initAppLanguage = async () => {
            const currentLanguage = await getItem(APP_LANGUAGE_KEY);
            setLanguage(currentLanguage || DEFAULT_LANGUAGE);
        };

        // Determines and sets up the language to use
        initAppLanguage();

    }, []);

    return (
        <LocalizationContext.Provider
            value={{
                strings,
                setAppLanguage: setLanguage,
                appLanguage,
            }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (context === undefined) {
        throw new Error('useLocalization must be used within a LocalizationContext');
    }
    return context;
};

