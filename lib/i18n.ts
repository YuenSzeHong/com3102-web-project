import i18n, { changeLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../public/locales/en-US/translation.json';
import chs from '../public/locales/zh-CN/translation.json';
import cht from '../public/locales/zh-TW/translation.json';

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            "en-US": {
                translation: en
            },
            "zh-CN": {
                translation: chs
            },
            "zh-TW": {
                translation: cht
            }
        },
        fallbackLng: "en-US",
    });