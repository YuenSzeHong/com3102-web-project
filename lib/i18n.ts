import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../public/locales/en-US/common.json';
import sc from '../public/locales/zh-CN/common.json';
import tc from '../public/locales/zh-TW/common.json';


i18n
    .use(Backend)
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            'en-US': {
                translation: {
                    ...en
                }
            },
            'zh-CN': {
                translation: {
                    ...sc
                }
            },
            'zh-TW': {
                translation: {
                    ...tc
                }
            }
        },
        detection: {
            order: ['cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie']
        },
        fallbackLng: 'en-US',
        // debug: true,
    });

export default i18n;
