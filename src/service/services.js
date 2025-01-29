import { databases, Query } from "./db";
import { ID } from "appwrite";
import { authServices } from "./authServices";
// import { useAuthStore } from "@/store/user";
const databaseId = import.meta.env.VITE_DB_ID;
const glossaryCollectionId = import.meta.env.VITE_DB_GLOSSARY;
const documentCollectionId = import.meta.env.VITE_DB_DOCUMENTS;

// const storeuser = useAuthStore();
const AppServices = {
  addNewGlossary: async (glossary) => {
    try {
      const result = await databases.createDocument(
        databaseId,
        glossaryCollectionId,
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
      const documentList = await databases.listDocuments(
        databaseId,
        glossaryCollectionId,
        [Query.equal("id", glossaryId)]
      );
      if (documentList.total > 0) {
        const documentId = documentList.documents[0].$id;
        const result = await databases.deleteDocument(
          databaseId,
          glossaryCollectionId,
          documentId
        );
        return result;
      }
      throw new Error("Document not found");
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAllGlossary: async () => {
    const user = await authServices.getCurrentUser();
    try {
      const result = await databases.listDocuments(
        databaseId,
        glossaryCollectionId,
        [
          Query.equal("owner", user.$id), // Filter by creator field
        ]
      );
      return result.documents;
    } catch (e) {
      throw new Error(e);
    }
  },
  saveDocuments: async (document) => {
    try {
      const result = await databases.createDocument(
        databaseId,
        documentCollectionId,
        String(ID.unique()),
        document
      );
      return result;
    } catch (e) {
      throw new Error(e);
    }
  },
  fetchAllDocuments: async (currentUser, glossaryId) => {
    try {
      const result = await databases.listDocuments(
        databaseId,
        documentCollectionId,
        [
          Query.and([
            Query.equal("owner", currentUser),
            Query.equal("glossary", glossaryId),
          ]),
          Query.select(["title","$id", "id", "owner"]),
        ]
      );
      return result.documents;
    } catch (e) {
      throw new Error(e);
    }
  },
  fetchOneDocument: async (documentId) => {
    try {
      const result = await databases.getDocument(
        databaseId,
        documentCollectionId,
        documentId,
      );
      return result;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default AppServices;
