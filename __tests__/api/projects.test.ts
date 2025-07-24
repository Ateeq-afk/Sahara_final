import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/crm/projects/route'
import dbConnect from '@/lib/mongodb'
import Project from '@/src/models/Project'
import { getServerSession } from 'next-auth'

// Mock dependencies
jest.mock('@/lib/mongodb')
jest.mock('@/src/models/Project')
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}))
jest.mock('@/lib/auth', () => ({
  authOptions: {},
}))

describe('/api/crm/projects', () => {
  const mockDbConnect = dbConnect as jest.MockedFunction<typeof dbConnect>
  const mockGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/crm/projects', () => {
    it('should return 401 if user is not authenticated', async () => {
      mockGetServerSession.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/crm/projects')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return 401 if user is not admin', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { id: '1', email: 'user@test.com', role: 'customer' },
        expires: new Date().toISOString(),
      })

      const request = new NextRequest('http://localhost:3000/api/crm/projects')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return projects with pagination for admin users', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { id: '1', email: 'admin@test.com', role: 'admin' },
        expires: new Date().toISOString(),
      })
      mockDbConnect.mockResolvedValue(true as any)

      const mockProjects = [
        { _id: '1', name: 'Project 1', status: 'active' },
        { _id: '2', name: 'Project 2', status: 'completed' },
      ]

      const mockFind = jest.fn().mockReturnThis()
      const mockPopulate = jest.fn().mockReturnThis()
      const mockSort = jest.fn().mockReturnThis()
      const mockSkip = jest.fn().mockReturnThis()
      const mockLimit = jest.fn().mockReturnThis()
      const mockLean = jest.fn().mockResolvedValue(mockProjects)
      const mockCountDocuments = jest.fn().mockResolvedValue(2)

      ;(Project as any).find = mockFind
      ;(Project as any).countDocuments = mockCountDocuments

      mockFind.mockImplementation(() => ({
        populate: mockPopulate,
        sort: mockSort,
        skip: mockSkip,
        limit: mockLimit,
        lean: mockLean,
      }))

      const request = new NextRequest('http://localhost:3000/api/crm/projects?page=1&limit=10')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.projects).toEqual(mockProjects)
      expect(data.data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        pages: 1,
      })
    })

    it('should handle database errors gracefully', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { id: '1', email: 'admin@test.com', role: 'admin' },
        expires: new Date().toISOString(),
      })
      mockDbConnect.mockRejectedValue(new Error('Database connection failed'))

      const request = new NextRequest('http://localhost:3000/api/crm/projects')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to fetch projects')
    })
  })

  describe('POST /api/crm/projects', () => {
    it('should create a new project for admin users', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { id: '1', email: 'admin@test.com', role: 'admin' },
        expires: new Date().toISOString(),
      })
      mockDbConnect.mockResolvedValue(true as any)

      const newProject = {
        name: 'New Project',
        description: 'Test project',
        type: 'residential',
        customer: { id: 'customer1' },
      }

      const mockCreate = jest.fn().mockResolvedValue({
        ...newProject,
        _id: 'new-project-id',
        projectNumber: 'PRJ-2024-001',
      })

      ;(Project as any).create = mockCreate

      const request = new NextRequest('http://localhost:3000/api/crm/projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toHaveProperty('_id')
      expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining(newProject))
    })

    it('should validate required fields', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { id: '1', email: 'admin@test.com', role: 'admin' },
        expires: new Date().toISOString(),
      })
      mockDbConnect.mockResolvedValue(true as any)

      const invalidProject = {
        // Missing required fields
        description: 'Test project',
      }

      const request = new NextRequest('http://localhost:3000/api/crm/projects', {
        method: 'POST',
        body: JSON.stringify(invalidProject),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('validation')
    })
  })
})