import { defineStore } from "pinia";
import ApiServices from "@/service/services";
export const useGlossaryStore = defineStore("glossary", {
  state: () => ({
    glossaryData: [],
    documentList: [],
    currentPage: "",
    pageEditMode: false,
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
    // getSelectedDocumentList:(state)=>,
    getSelectedDocumentContent: (state) =>
      state.selectedGlossaryItem.selectedDocument.content,
    getActiveDocument: (state) => state.selectedGlossaryItem.selectedDocument,
    getPageEditMode: (state) => state.pageEditMode,
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
        this.documentList = result;
        return result;
      } catch (e) {
        throw new Error(e);
      }
    },

    getExistingAlphabets() {
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
      
      return alphabets;
    },

    updateSelectedGlossaryItem(currentSelection) {
      this.selectedGlossaryItem = JSON.parse(JSON.stringify(currentSelection));
    },
    getSelectedPagesByAlphabet(glossaryId) {
      const existingGlossaryDocuments =
        this.glossaryData.find((glossary) => glossary.id === glossaryId)
          ?.pages || [];
      // based on the selected alphabet of 'selectedGlossaryItem', select the page list
      let pageList = [];
      for (let i = 0; i < existingGlossaryDocuments.length; i++) {
        if (
          existingGlossaryDocuments[i].title[0]?.toUpperCase() ===
          this.selectedGlossaryItem.selectedAlphabet?.toUpperCase()
        ) {
          pageList.push(existingGlossaryDocuments[i]);
        }
      }
      return pageList;
    },
    defaultGlossaryPageContent(glossaryId, alphabet) {
      const pages =
        this.glossaryData.find((glossary) => glossary.id === glossaryId)
          ?.pages || [];

      if (pages.length === 0) {
        return {};
      }
      const selectedPage = pages.find(
        (page) => page.title[0].toUpperCase() === alphabet.toUpperCase()
      );

      return selectedPage;
    },
    currentGlossaryPageContent(glossaryId, pageId) {
      const pages =
        this.glossaryData.find((glossary) => glossary.id === glossaryId)
          ?.pages || [];
      let pageContent = "";
      if (pages.length > 0) {
        pageContent = pages.find((page) => page.id === pageId);
      }
      this.selectedGlossaryItem.glossaryId = glossaryId;
      this.selectedGlossaryItem.selectedDocument = JSON.parse(
        JSON.stringify(pageContent)
      );
      // console.log(this.selectedGlossaryItem.selectedDocument)
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
