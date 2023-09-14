import { NextRequest, NextResponse } from 'next/server'

function getUserStatus(token: string) {
    if (token === 'admin') {
        return 'admin'
    } else if (token === 'user') {
        return 'user'
    } else {
        return 'guest'
    }
}

function getRequiredStatus(pathname: string) {
    if (pathname === '/admin') {
        return 'admin'
    } else if (pathname === '/profile') {
        return 'user'
    } else {
        return 'guest'
    }
}

export default function middleware(req: { cookies: { token: any }; nextUrl: { pathname: any } }) {
    const token = req.cookies.token
    const userStatus = getUserStatus(token)
    const requiredStatus = getRequiredStatus(req.nextUrl.pathname)

    if (userStatus !== requiredStatus) {
        if (userStatus === 'guest') {
            return NextResponse.redirect('/login')
        } else {
            return NextResponse.redirect('/error')
        }
    }
}