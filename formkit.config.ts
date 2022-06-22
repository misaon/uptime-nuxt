import { en } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

const config: DefaultConfigOptions = {
  locales: { en },
  locale: 'en',
  config: {
    classes: generateClasses({
      text: {
        outer: 'flex flex-col gap-1',
        wrapper: 'flex flex-col gap-1',
        label: 'font-bold ',
        input: 'input w-full',
        help: 'text-slate-400 text-sm',
        message: 'py-1 px-2 rounded text-white bg-orange-600 inline-block'
      }
    })
  }
}

export default config
