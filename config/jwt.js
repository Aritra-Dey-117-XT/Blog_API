export default {
  secret: process.env.JWT_SECRET,
  expiresIn: '1h',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 3600000,
  },
}