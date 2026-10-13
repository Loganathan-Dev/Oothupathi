export const validators = {
  required: (value) => {
    if (!value || value.trim() === '') {
      return 'This field is required'
    }
    return null
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  phone: (value) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number'
    }
    return null
  },

  minLength: (min) => (value) => {
    if (value.length < min) {
      return `Must be at least ${min} characters`
    }
    return null
  },

  maxLength: (max) => (value) => {
    if (value.length > max) {
      return `Must be at most ${max} characters`
    }
    return null
  },

  password: (value) => {
    if (value.length < 8) {
      return 'Password must be at least 8 characters'
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number'
    }
    return null
  },

  confirmPassword: (password) => (value) => {
    if (value !== password) {
      return 'Passwords do not match'
    }
    return null
  },

  url: (value) => {
    try {
      new URL(value)
      return null
    } catch {
      return 'Please enter a valid URL'
    }
  },
}

export const validate = (validations, value) => {
  for (const validation of validations) {
    const error = validation(value)
    if (error) return error
  }
  return null
}