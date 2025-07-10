import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import User from '@/src/models/User'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const searchParams = req.nextUrl.searchParams
    const role = searchParams.get('role')
    const isVerified = searchParams.get('isVerified')

    const query: any = {}
    if (role) query.role = role
    if (isVerified !== null) query.isVerified = isVerified === 'true'

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      users
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}