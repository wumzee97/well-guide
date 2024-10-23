import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
  res.setHeader('Content-Type', 'application/json')

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { focusArea, helpful, response } = req.body

    if (typeof helpful !== 'boolean' || !focusArea || !response) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Here you would typically store the feedback in a database
    // For now, we'll just log it
    console.log('Feedback received:', { focusArea, helpful, response })

    return res.status(200).json({ success: true })
  } catch (error: any) {
    console.error('API Error:', error)
    return res.status(500).json({ 
      error: error.message || 'Internal server error'
    })
  }
}