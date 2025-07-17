import { useState, useCallback } from 'react'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validate?: (value: any) => boolean | string
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

export interface ValidationErrors {
  [key: string]: string
}

export function useFormValidation(rules?: ValidationRules) {
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateField = useCallback((name: string, value: any, isRequired?: boolean): boolean => {
    // Built-in validations for common fields
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value && isRequired) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }))
        return false
      }
      if (value && !emailRegex.test(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }))
        return false
      }
    }

    if (name === 'phone') {
      const phoneRegex = /^\+?[\d\s-()]+$/
      if (!value && isRequired) {
        setErrors(prev => ({ ...prev, phone: 'Phone number is required' }))
        return false
      }
      if (value && (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10)) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }))
        return false
      }
    }

    if (name === 'name' && isRequired && !value) {
      setErrors(prev => ({ ...prev, name: 'Name is required' }))
      return false
    }

    // Custom rules if provided
    if (rules) {
      const fieldRules = rules[name]
      if (!fieldRules) return true

      if (fieldRules.required && !value) {
        setErrors(prev => ({ ...prev, [name]: 'This field is required' }))
        return false
      }

      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        setErrors(prev => ({ ...prev, [name]: `Minimum length is ${fieldRules.minLength}` }))
        return false
      }

      if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        setErrors(prev => ({ ...prev, [name]: `Maximum length is ${fieldRules.maxLength}` }))
        return false
      }

      if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        setErrors(prev => ({ ...prev, [name]: 'Invalid format' }))
        return false
      }

      if (fieldRules.validate) {
        const result = fieldRules.validate(value)
        if (result !== true) {
          setErrors(prev => ({ ...prev, [name]: typeof result === 'string' ? result : 'Invalid value' }))
          return false
        }
      }
    }

    return true
  }, [rules])

  const validateForm = useCallback((data: Record<string, any>): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    if (rules) {
      Object.keys(rules).forEach(field => {
        if (!validateField(field, data[field])) {
          isValid = false
        }
      })
    }

    return isValid
  }, [rules, validateField])

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  return {
    errors,
    validateField,
    validateForm,
    clearError,
    clearErrors,
    setFieldError
  }
}