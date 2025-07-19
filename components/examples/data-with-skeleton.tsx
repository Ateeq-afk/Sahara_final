"use client"

import { useState, useEffect } from 'react'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import ProjectCardSkeleton from '@/components/skeletons/project-card-skeleton'

// Example component showing how to use skeletons with data fetching
export default function ProjectsWithSkeleton() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate data fetching
    const fetchProjects = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data.data || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProjects()
  }, [])
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonWrapper
        isLoading={isLoading}
        skeleton={<ProjectCardSkeleton />}
        count={6}
      >
        {projects.map((project: any) => (
          <div key={project._id} className="bg-white rounded-lg p-6">
            {/* Your actual project card content */}
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </SkeletonWrapper>
    </div>
  )
}