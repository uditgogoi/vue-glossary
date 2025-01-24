import { databases, ID,Query } from "./db";
import { authServices } from "./authServices";
const databaseId = import.meta.env.VITE_DB_ID;
const collectionId = import.meta.env.VITE_DB_GLOSSARY;
// import api from "./Api";
// export const fetchText=async(text)=> {
//     const headers = {
//         Authorization: `Bearer`,
//         "Content-Type": "application/json",
//         "x-wait-for-model": "true"
//       };

//       const body = {
//         inputs: 'hello india', // The input text to generate content from
//       };
//     try {
//         const result= await api.post('/google/gemma-2-2b-it',body,{ headers })
//         return result;
//     } catch(e) {
//         return new Error('Unexpected Result')
//     }
// }

const AppServices = {
  addNewGlossary: async (glossary) => {
    try {
      console.log("id---", ID, typeof ID);
      const result = await databases.createDocument(
        databaseId,
        collectionId,
        String(ID),
        glossary
      );
      return result;
    } catch (e) {
      return new Error(e);
    }
  },
  getAllGlossary: async () => {
    const user = await authServices.getCurrentUser();
    console.log(user.$id);
    try {
      const result = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("owner", user.$id), // Filter by creator field
      ]);
      return result.documents
    } catch (e) {
      console.log(e)
    }
  },
};

export default AppServices;
