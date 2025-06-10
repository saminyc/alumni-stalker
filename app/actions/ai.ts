"use server"

// This file is kept as a placeholder but the functionality is removed
// You can delete this file if you don't need it anymore

// Configure DeepSeek with environment variable
// const deepseek = createOpenAI({
//   apiKey: process.env.DEEPSEEK_API_KEY,
//   baseURL: "https://api.deepseek.com",
// })

// export async function generateConnectLetter(resumeText: string, position: string, company: string, college: string) {
//   try {
//     if (!process.env.DEEPSEEK_API_KEY) {
//       return { success: false, error: "DeepSeek API key is not configured. Please contact the administrator." }
//     }

//     const { text } = await generateText({
//       model: deepseek("deepseek-chat"),
//       system: `You are a professional networking expert who helps people write compelling LinkedIn connection messages. Create personalized, professional connection messages that are:
// - Concise (2-3 short paragraphs max)
// - Personal and authentic
// - Focused on shared experiences and mutual value
// - Professional but warm in tone
// - Specific to the person's background and target role`,
//       prompt: `Based on this resume content, write a professional LinkedIn connection message to reach out to an alumni who works as a ${position} at ${company} and also attended ${college}.

// Resume content:
// ${resumeText}

// The message should:
// 1. Mention the shared college connection
// 2. Reference relevant experience from the resume that relates to the target role
// 3. Express genuine interest in learning about their experience
// 4. Be specific about why you're reaching out
// 5. Keep it under 300 characters (LinkedIn limit)
// 6. End with a clear, soft ask for advice or insights

// Make it personal and authentic, not generic.`,
//     })

//     return { success: true, letter: text }
//   } catch (error: any) {
//     console.error("Error generating connect letter:", error)

//     if (error.message?.includes("401") || error.message?.includes("unauthorized")) {
//       return { success: false, error: "API authentication failed. Please contact the administrator." }
//     }

//     return { success: false, error: "Failed to generate connection letter. Please try again." }
//   }
// }
