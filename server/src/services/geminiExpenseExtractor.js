import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const extractExpense = async (emailText) => {
  // 1. Define prompt first
  const prompt = `
    Extract expense details from the following text (Email or PDF content).
    If multiple amounts exist, choose the TOTAL payable amount.
    Return ONLY valid JSON:
    {
      "title": string,
      "amount": number,
      "date": "YYYY-MM-DD",
      "category": "Food | Travel | Utilities | Shopping | Subscription | Other",
      "section": "Essentials | Lifestyle",
      "confidence": number
    }
    If not an expense, return null.

    Text: ${emailText}`;

  // 2. 2026 Active Model Aliases
  const modelNames = ['gemini-3-flash-preview', 'gemini-2.5-flash-lite'];
  
  for (const name of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: name,
        generationConfig: { responseMimeType: "application/json" }
      });
      
      const result = await model.generateContent(prompt);
      const data = JSON.parse(result.response.text());

      if (data && data.amount) return data;
    } catch (err) {
      console.warn(`Model ${name} failed: ${err.message}`);
      // Continue to next model in list
    }
  }

  return null; // Return null if all models fail
};