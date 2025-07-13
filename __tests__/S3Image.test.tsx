import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import S3Image from '@/components/common/S3Image'

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, onLoad, onError, ...props }: any) {
    return (
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        data-testid="s3-image"
        {...props}
      />
    )
  }
})

describe('S3Image Component', () => {
  beforeEach(() => {
    // Reset environment variables
    delete process.env.NEXT_PUBLIC_S3_IMAGE_URL
  })

  it('renders with basic props', () => {
    render(<S3Image src="/test-image.jpg" alt="Test image" />)
    
    const image = screen.getByTestId('s3-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test image')
  })

  it('uses full URL when src starts with http', () => {
    const fullUrl = 'https://example.com/image.jpg'
    render(<S3Image src={fullUrl} alt="Test image" />)
    
    const image = screen.getByTestId('s3-image')
    expect(image).toHaveAttribute('src', fullUrl)
  })

  it('uses S3 URL when environment variable is set', () => {
    process.env.NEXT_PUBLIC_S3_IMAGE_URL = 'https://my-bucket.s3.amazonaws.com'
    
    render(<S3Image src="path/to/image.jpg" alt="Test image" />)
    
    const image = screen.getByTestId('s3-image')
    expect(image).toHaveAttribute('src', 'https://my-bucket.s3.amazonaws.com/path/to/image.jpg')
  })

  it('handles local paths correctly', () => {
    render(<S3Image src="/local/image.jpg" alt="Test image" />)
    
    const image = screen.getByTestId('s3-image')
    expect(image).toHaveAttribute('src', '/local/image.jpg')
  })

  it('shows fallback image on error', async () => {
    const mockOnError = jest.fn()
    
    render(
      <S3Image 
        src="/broken-image.jpg" 
        alt="Test image" 
        fallback="/fallback.jpg"
      />
    )
    
    const image = screen.getByTestId('s3-image')
    
    // Simulate image error
    image.dispatchEvent(new Event('error'))
    
    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/fallback.jpg')
    })
  })

  it('applies custom className', () => {
    render(
      <S3Image 
        src="/test-image.jpg" 
        alt="Test image" 
        className="custom-class"
      />
    )
    
    const container = screen.getByTestId('s3-image').parentElement
    expect(container).toHaveClass('custom-class')
  })
})