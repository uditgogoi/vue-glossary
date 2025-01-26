import { databases, Query } from "./db";
import { ID } from "appwrite";
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
      const result = await databases.createDocument(
        databaseId,
        collectionId,
        String(ID.unique()),
        glossary
      );
      return result;
    } catch (e) {
      throw new Error(e);
    }
  },
  deleteGlossaryitem: async (glossaryId) => {
    try {
      const documentList = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("id", glossaryId),
      ]);
      if (documentList.total > 0) {
        const documentId = documentList.documents[0].$id;
        const result = await databases.deleteDocument(
          databaseId,
          collectionId,
          documentId
        );
        return result;
      }
      throw new Error('Document not found')
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAllGlossary: async () => {
    const user = await authServices.getCurrentUser();
    try {
      const result = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("owner", user.$id), // Filter by creator field
      ]);
      return result.documents;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default AppServices;
