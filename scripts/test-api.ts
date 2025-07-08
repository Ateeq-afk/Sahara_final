// Test script for API endpoints
// Run with: npx ts-node scripts/test-api.ts

const API_BASE = 'http://localhost:3000/api'

async function testAPI() {
  console.log('🧪 Testing Sahara Developers API Endpoints...\n')

  // Test Quote API
  console.log('📋 Testing Quote API...')
  try {
    // Create a quote
    const quoteData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      projectType: 'construction',
      propertyType: 'villa',
      area: 2000,
      location: 'Whitefield, Bangalore',
      budget: {
        min: 5000000,
        max: 7500000
      },
      expectedStartDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
      urgency: '3-6months',
      requirements: 'Looking to build a 4BHK villa with modern amenities'
    }

    const createResponse = await fetch(`${API_BASE}/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteData)
    })
    const createResult = await createResponse.json()
    console.log('✅ Quote created:', createResult.success ? 'Success' : 'Failed')
    
    // Get all quotes
    const getResponse = await fetch(`${API_BASE}/quotes`)
    const getResult = await getResponse.json()
    console.log(`✅ Fetched ${getResult.data?.length || 0} quotes\n`)
  } catch (error) {
    console.error('❌ Quote API Error:', error)
  }

  // Test Contact API
  console.log('📧 Testing Contact API...')
  try {
    const contactData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      subject: 'Inquiry about construction services',
      message: 'I am interested in building a new home. Please contact me with more details.'
    }

    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    })
    const result = await response.json()
    console.log('✅ Contact form submitted:', result.success ? 'Success' : 'Failed\n')
  } catch (error) {
    console.error('❌ Contact API Error:', error)
  }

  // Test Newsletter API
  console.log('📰 Testing Newsletter API...')
  try {
    const newsletterData = {
      email: 'subscriber@example.com',
      name: 'Newsletter Subscriber'
    }

    const response = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsletterData)
    })
    const result = await response.json()
    console.log('✅ Newsletter subscription:', result.success ? 'Success' : 'Failed')
    
    // Test unsubscribe
    const unsubResponse = await fetch(`${API_BASE}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newsletterData.email })
    })
    const unsubResult = await unsubResponse.json()
    console.log('✅ Newsletter unsubscribe:', unsubResult.success ? 'Success' : 'Failed\n')
  } catch (error) {
    console.error('❌ Newsletter API Error:', error)
  }

  console.log('✨ API testing completed!')
}

// Run the tests
testAPI().catch(console.error)