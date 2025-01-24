import { defineStore } from "pinia";
import { data } from "@/composables/data";
import ApiServices from "@/service/services";
export const useGlossaryStore = defineStore("glossary", {
  state: () => ({
    glossaryData: [],
    currentPage: "",
    pageEditMode:false,
    selectedGlossaryItem: {
      glossaryId: "",
      selectedAlphabet: "",
      selectedDocument:{}
    },
  }),
  getters: {
    getCurrentPage: (state) => state.currentPage,
    getGlossaryItems: (state) => state.glossaryData,
    publishedGlossaryItems: (state) =>
      state.glossaryData.filter((item) => item.status === "published"),
    draftGlossaryItems: (state) =>
      state.glossaryData.filter((item) => item.status === "draft"),
    sharedGlossaryItems: (state) =>
      state.glossaryData.filter((item) => item.status === "shared"),
    // getSelectedDocumentList:(state)=>,
    getSelectedDocumentContent:(state)=> state.selectedGlossaryItem.selectedDocument.content,
    getActiveDocument:(state)=> state.selectedGlossaryItem.selectedDocument,
    getPageEditMode:(state)=> state.pageEditMode,
  },
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    async fetchGlossaryItems() {
      try {
        this.glossaryData= await ApiServices.getAllGlossary();
        console.log(this.glossaryData)
      } catch(e){
        this.glossaryData= this.glossaryData || [];
      } finally {
        this.glossaryData= this.glossaryData || [];
      }
      // this.glossaryData = data ? data : null;
    },
    async addNewGlossary(item) {
      // this.glossaryData = [item, ...this.glossaryData];
      // call the api
      try {
        const result= await ApiServices.addNewGlossary(item);
        console.log(result)
      } catch(e) {
        console.log(e);
      }
      
    },
    addDocumentToGlossary(document, glossaryId) {
      if (!document || !glossaryId) {
        return;
      }
      this.glossaryData.forEach((glossary) => {
        if (glossary.id === glossaryId) {
          glossary.pages.push(document);
        }
      });
    },
    fetchAllDocuments(glossaryId) {
      return (
        this.glossaryData.find((glossary) => glossary.id === glossaryId)
          ?.pages || []
      );
    },

    getExistingAlphabets(glossaryId) {
      const existingGlossaryDocuments =
        this.glossaryData.find((glossary) => glossary.id === glossaryId)
          ?.pages || [];
      if (existingGlossaryDocuments.length === 0) {
        return [];
      }
      let alphabets = [];
      for (let i = 0; i < existingGlossaryDocuments.length; i++) {
        const firstLetter = existingGlossaryDocuments[i].title[0].toUpperCase();
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
      
      if(pages.length===0) {
        return {};
      }
      const selectedPage= pages.find(page=> page.title[0].toUpperCase()=== alphabet.toUpperCase());

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
      this.selectedGlossaryItem.glossaryId=glossaryId;
      this.selectedGlossaryItem.selectedDocument= JSON.parse(JSON.stringify(pageContent));
      // console.log(this.selectedGlossaryItem.selectedDocument)
       
    },
    updatePageEditStatus(status) {
      this.pageEditMode=status;
    }
  },
});



/**
 * improved the state such that glossary detials and documents details can be fetched easily and efficiently
 * 
 * 
 */