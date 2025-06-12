const passwordValidator = value => {
  if (!value) return false
  
  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumbers = /[0-9]/.test(value)
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value)
  
  if (!hasUpperCase) throw new Error('Password must contain at least 1 uppercase letter')
  if (!hasLowerCase) throw new Error('Password must contain at least 1 lowercase letter')
  if (!hasNumbers) throw new Error('Password must contain at least 1 number')
  if (!hasSpecialChars) throw new Error('Password must contain at least 1 special character')
  
  return true
}

export { passwordValidator }