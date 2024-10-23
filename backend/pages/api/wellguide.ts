import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import { promptTemplates } from '../../config/prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { focusArea, symptoms } = req.body

    if (!focusArea || !symptoms) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const template = promptTemplates[focusArea as keyof typeof promptTemplates]
    if (!template) {
      return res.status(400).json({ error: 'Invalid focus area' })
    }

    const userMessage = template.userTemplate.replace('{{symptoms}}', symptoms)

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: template.systemMessage },
        { role: "user", content: userMessage }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000
    })

    const aiResponse = completion.choices[0]?.message?.content
    if (!aiResponse) {
      return res.status(500).json({ error: 'No response from AI' })
    }

    const response = `${aiResponse}\n\n${template.disclaimer}`
    return res.status(200).json({ response })
  } catch (error: any) {
    return res.status(500).json({ 
      error: error.message || 'Internal server error'
    })
  }
}