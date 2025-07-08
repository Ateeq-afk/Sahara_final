import { NextResponse } from 'next/server'

export class ApiResponse {
  static success(data: any, message?: string, status = 200) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
      },
      { status }
    )
  }

  static error(error: string | string[], status = 400) {
    return NextResponse.json(
      {
        success: false,
        error: Array.isArray(error) ? error : [error],
        timestamp: new Date().toISOString()
      },
      { status }
    )
  }

  static validationError(errors: any[]) {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        errors,
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    )
  }

  static notFound(resource = 'Resource') {
    return NextResponse.json(
      {
        success: false,
        error: `${resource} not found`,
        timestamp: new Date().toISOString()
      },
      { status: 404 }
    )
  }

  static unauthorized(message = 'Unauthorized access') {
    return NextResponse.json(
      {
        success: false,
        error: message,
        timestamp: new Date().toISOString()
      },
      { status: 401 }
    )
  }

  static serverError(error?: any) {
    console.error('Server error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}