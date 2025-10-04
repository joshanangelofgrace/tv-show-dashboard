import { createI18n } from 'vue-i18n'
import enLocale from '@/i18n/en.json'
import nlLocale from '@/i18n/nl.json'
import { cloneDeep, isString } from 'lodash'

export type LocaleSchema = typeof enLocale
type DeepStrings = { [key: string]: string | DeepStrings }

export const Messages: LocaleSchema = cloneDeep(enLocale)

function traverseMessages(messages: DeepStrings, prefix = '') {
	for (const key in messages) {
		const value = messages[key]

		if (isString(value)) {
			messages[key] = prefix + key
		} else if (value) {
			traverseMessages(value, prefix + key + '.')
		}
	}
}

traverseMessages(Messages)

// conformsTo wrapper is used to ensure secondary language does not contain excess properties
function conformsTo<T>(messages: { [K in keyof T]: LocaleSchema extends T[K] ? T[K] : never }) {
	return messages
}

const i18n = createI18n<[LocaleSchema], 'en' | 'nl', false>({
	legacy: false,
	locale: import.meta.env.VITE_APP_I18N_LOCALE || 'en',
	fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en',
	messages: conformsTo({
		en: enLocale,
		nl: nlLocale
	})
})

export default i18n
