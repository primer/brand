/**
 * This script checks for two things:
 *   1. That translation files exist for all supported languages beyond just English.
 *   2. That all translation files have the same keys across all languages.
 */

const fs = require('fs')
const path = require('path')

type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt-BR' | 'ja'
type TranslationContent = Record<string, any>
type TranslationFiles = Record<string, Record<string, string>>
type KeysByLanguage = Record<string, Set<string>>

type ValidationResult = {
  componentName: string
  language: string
  missingKeys: string[]
  extraKeys: string[]
  isValid: boolean
}

type ComponentValidationSummary = {
  componentName: string
  referenceLanguage: string
  totalKeys: number
  results: ValidationResult[]
  hasErrors: boolean
}

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'pt-BR', 'ja'] as const
const REFERENCE_LANGUAGE = 'en' as const
const LANGUAGES_DIR = path.join(__dirname, '..', 'static', 'locales')

;(function () {
  let hasErrors = false

  console.log(`Checking translation key consistency \n`)

  const translationFiles = getTranslationFiles(LANGUAGES_DIR)
  const componentNames = Object.keys(translationFiles)

  if (!componentNames.length) {
    console.error(`❌ No translation files found in ${LANGUAGES_DIR}. Something's wrong.`)
    process.exit(1)
  }

  for (const componentName of componentNames) {
    console.log(`\nComponent: ${componentName}\n`)

    const result = validateEachComponentTranslationFile(componentName, translationFiles[componentName])

    if (result.hasErrors) {
      hasErrors = true
    }
  }

  if (!hasErrors) {
    console.log(`\n🟢 All translation keys are valid`)
    process.exit(0)
  } else {
    console.log(`\n🔴 Translation key inconsistencies found. Please fix the missing translations.`)
    process.exit(1)
  }
})()

function loadJsonFile(filePath: string): TranslationContent | null {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Error loading ${filePath}: ${(error as Error).message}`)
    return null
  }
}

function getLanguageDirs(languagesDir: string): string[] {
  if (!fs.existsSync(languagesDir)) {
    console.error(`Languages directory not found: ${languagesDir}`)
    return []
  }

  const dirs = fs.readdirSync(languagesDir).filter(item => {
    const itemPath = path.join(languagesDir, item)
    return fs.statSync(itemPath).isDirectory()
  })

  return dirs
}

function getTranslationFilesForLanguage(languagePath: string): string[] {
  return fs.readdirSync(languagePath).filter(file => file.endsWith('.json'))
}

function checkEnLangIsPresent(languages: string[]): void {
  if (!languages.includes(REFERENCE_LANGUAGE)) {
    throw new Error(
      `An '${REFERENCE_LANGUAGE}' file is required but missing. All components must have an 'en' translation file.`,
    )
  }
}

function checkOtherLangFilesArePresent(componentName: string, languages: string[]): void {
  const missingLanguages = SUPPORTED_LANGUAGES.filter(requiredLanguage => !languages.includes(requiredLanguage))

  if (missingLanguages.length > 0) {
    throw new Error(
      `${componentName} is missing a translation file for: ${missingLanguages.join(
        ', ',
      )}. All components must have translation files for all supported languages: ${SUPPORTED_LANGUAGES.join(', ')}.`,
    )
  }
}

function validateLanguageKeys(
  language: string,
  currentKeys: Set<string>,
  referenceKeys: Set<string>,
  componentName: string,
): ValidationResult {
  const missingKeys = [...referenceKeys].filter(key => !currentKeys.has(key))
  const extraKeys = [...currentKeys].filter(key => !referenceKeys.has(key))

  return {
    componentName,
    language,
    missingKeys,
    extraKeys,
    isValid: missingKeys.length === 0 && extraKeys.length === 0,
  }
}

function logValidationResult(result: ValidationResult): void {
  const {language, missingKeys, extraKeys, isValid} = result

  if (missingKeys.length > 0) {
    console.error(`❌ ${language} is missing ${missingKeys.length} translation(s):`)
    for (const key of missingKeys) {
      console.error(`   - Missing: ${key}`)
    }
  }

  if (extraKeys.length > 0) {
    console.warn(`⚠️ ${language} has ${extraKeys.length} extra translation(s):`)
    for (const key of extraKeys) {
      console.warn(`  + ${key}`)
    }
  }

  if (isValid) {
    console.log(`✅ ${language} - all keys match`)
  }
}

/**
 * Scans and organizes all translation files by component and language
 */
function getTranslationFiles(languagesDir: string): TranslationFiles {
  const files: TranslationFiles = {}
  const languages = getLanguageDirs(languagesDir)

  for (const language of languages) {
    const languagePath = path.join(languagesDir, language)
    const translationFiles = getTranslationFilesForLanguage(languagePath)

    for (const file of translationFiles) {
      const componentName = path.basename(file, '.json')
      const filePath = path.join(languagePath, file)

      if (!files[componentName]) {
        files[componentName] = {}
      }

      files[componentName][language] = filePath
    }
  }

  return files
}

function validateEachComponentTranslationFile(
  componentName: string,
  languageFiles: Record<string, string>,
): ComponentValidationSummary {
  const languages = Object.keys(languageFiles)
  const keysByLanguage: KeysByLanguage = {}
  const results: ValidationResult[] = []

  try {
    checkEnLangIsPresent(languages)
  } catch (error) {
    console.error(`❌ ${componentName}: ${(error as Error).message}`)
    return {
      componentName,
      referenceLanguage: REFERENCE_LANGUAGE,
      totalKeys: 0,
      results: [],
      hasErrors: true,
    }
  }

  try {
    checkOtherLangFilesArePresent(componentName, languages)
  } catch (error) {
    console.error(`❌ ${(error as Error).message}`)
    return {
      componentName,
      referenceLanguage: REFERENCE_LANGUAGE,
      totalKeys: 0,
      results: [],
      hasErrors: true,
    }
  }

  for (const language of languages) {
    const filePath = languageFiles[language]
    const content = loadJsonFile(filePath)

    if (content) {
      const keys = Object.keys(content)
      keysByLanguage[language] = new Set(keys)
    } else {
      console.error(`❌ Failed to load ${filePath}`)
    }
  }

  const referenceLanguage = REFERENCE_LANGUAGE
  const referenceKeys = keysByLanguage[referenceLanguage]

  if (!referenceKeys) {
    console.error(`❌ Failed to load reference language '${referenceLanguage}' for ${componentName}`)
    return {
      componentName,
      referenceLanguage,
      totalKeys: 0,
      results: [],
      hasErrors: true,
    }
  }

  console.log(
    `✅ ${referenceLanguage} - ${referenceKeys.size} keys found - Using '${referenceLanguage}' as the reference`,
  )

  // Validate each language against the reference
  for (const language of languages) {
    if (language === referenceLanguage) continue

    const currentKeys = keysByLanguage[language]
    if (!currentKeys) continue

    const result = validateLanguageKeys(language, currentKeys, referenceKeys, componentName)
    results.push(result)
    logValidationResult(result)
  }

  const hasErrors = results.some(r => !r.isValid)

  const totalKeys = referenceKeys.size

  return {
    componentName,
    referenceLanguage,
    totalKeys,
    results,
    hasErrors,
  }
}
