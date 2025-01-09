import api from "./Api";
export const fetchText=async(text)=> {
    const headers = {
        Authorization: `Bearer`,
        "Content-Type": "application/json",
        "x-wait-for-model": "true"
      };
    
      const body = {
        inputs: 'hello india', // The input text to generate content from
      };
    try {
        const result= await api.post('/google/gemma-2-2b-it',body,{ headers })
        return result;
    } catch(e) {
        return new Error('Unexpected Result')
    }
}