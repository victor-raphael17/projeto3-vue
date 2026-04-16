import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import configPrettier from 'eslint-config-prettier'

export default [
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    configPrettier,
    {
        files: ['src/**/*.{js,vue}'],
        languageOptions: {
            globals: {
                window: 'readonly',
                document: 'readonly',
                localStorage: 'readonly',
                console: 'readonly',
                crypto: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
            },
        },
        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
            'vue/multi-word-component-names': 'off',
        },
    },
]
