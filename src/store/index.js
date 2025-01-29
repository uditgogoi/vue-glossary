import { defineStore } from "pinia";
import ApiServices from "@/service/services";
import {sortArrayByAlphabet} from "@/utils/helper"
export const useGlossaryStore = defineStore("glossary", {
  state: () => ({
    glossaryData: [],
    documentList: [],
    currentPage: "",
    pageEditMode: false,
    alphabets:[],
    selectedGlossaryItem: {
      glossaryId: "",
      selectedAlphabet: "",
      selectedDocument: {},
    },
  }),
  getters: {
    getCurrentPage: (state) => state.currentPage,
    getGlossaryItems: (state) => state.glossaryData,
    getDocumentList:(state)=> state.documentList,
    publishedGlossaryItems: (state) =>
      state.glossaryData.filter((item) => item.status === "published"),
    draftGlossaryItems: (state) =>
      state.glossaryData.filter((item) => item.status === "draft"),
    sharedGlossaryItems: (state) =>
      state.glossaryData.filter((item) => item.status === "shared"),
    getSelectedGlossaryItem:(state)=>state.selectedGlossaryItem,
    getSelectedDocumentContent: (state) =>
      state.selectedGlossaryItem.selectedDocument,
    getPageEditMode: (state) => state.pageEditMode,
    getAlphabets:(state)=> state.alphabets,
  },
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    async fetchGlossaryItems() {
      try {
        this.glossaryData = await ApiServices.getAllGlossary();
      } catch (e) {
        this.glossaryData = this.glossaryData || [];
      } finally {
        this.glossaryData = this.glossaryData || [];
      }
      // this.glossaryData = data ? data : null;
    },
    async addNewGlossary(item) {
      // this.glossaryData = [item, ...this.glossaryData];
      // call the api
      try {
        const result = await ApiServices.addNewGlossary(item);
        this.glossaryData = [item, ...this.glossaryData];
        return result;
      } catch (e) {
        throw new Error(e);
      }
    },
    async deleteGlossaryItem(id) {
      try {
        const result = await ApiServices.deleteGlossaryitem(id);
        if (typeof result === "object") {
          this.glossaryData = this.glossaryData.filter(
            (item) => item.id !== id
          );
        }
        return result;
      } catch (e) {
        throw new Error(e);
      }
    },
    async addDocumentToGlossary(document) {
      if (!document) {
        return false;
      }
      try {
        const res = await ApiServices.saveDocuments(document);
        // need to push the documents inside the glossary
        return res;
      } catch (e) {
        throw new Error(e);
      }
    },
    async fetchAllDocuments(userId, glossaryId) {
      try {
        const result = await ApiServices.fetchAllDocuments(userId, glossaryId);
        this.documentList = sortArrayByAlphabet(result);
        this.constructExistingAlphabets();
        return result;
      } catch (e) {
        throw new Error(e);
      }
    },

    async getSelectedDocument(documentId) {
      try{
        const newDocumentId= documentId || this.documentList[0]?.$id;
        const result= await ApiServices.fetchOneDocument(newDocumentId);
        return result;
      } catch(e) {
        throw new Error(e);
      }
    },
    constructExistingAlphabets() {
      if (this.getDocumentList.length === 0) {
        return [];
      }
      let alphabets = [];
      for (let i = 0; i < this.getDocumentList.length; i++) {
        const firstLetter = this.getDocumentList[i].title[0].toUpperCase();
        if (!alphabets.includes(firstLetter)) {
          alphabets.push(firstLetter);
        }
      }
      
      this.alphabets= alphabets.sort();
    },

    async updateSelectedGlossaryItem(currentSelection) {
      this.selectedGlossaryItem = JSON.parse(JSON.stringify(currentSelection));
      const currentDoc= this.getDocumentList.find(item=> item.title[0].toLowerCase()=== this.selectedGlossaryItem.selectedAlphabet.toLowerCase())
      const document= await this.getSelectedDocument(currentDoc.$id);
      this.selectedGlossaryItem.selectedDocument=document;
    },

    async currentGlossaryPageContent(glossaryId, pageId) {
      this.selectedGlossaryItem.glossaryId = glossaryId;
      const document= await this.getSelectedDocument(pageId);
      this.selectedGlossaryItem.selectedDocument = document
    },
    updatePageEditStatus(status) {
      this.pageEditMode = status;
    },
  },
});

/**
 * improved the state such that glossary detials and documents details can be fetched easily and efficiently
 *
 *
 */
