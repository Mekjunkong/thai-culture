import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth-cookie'

const maxAgeSeconds = 60 * 60

export async function POST(req: NextRequest) {
  const authorization = req.headers.get('authorization') ?? ''
  const match = authorization.match(/^Bearer\s+([^\s]+)$/i)
  if (!match) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ACCESS_TOKEN_COOKIE, match[1], {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ACCESS_TOKEN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}