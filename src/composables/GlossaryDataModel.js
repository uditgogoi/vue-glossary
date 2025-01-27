import {ID} from 'appwrite';
function createGlossaryItem(options = {}) {
  return {
    id: `${ID.unique()}`,
    title: options.title,
    owner: options.owner,
    createdAt: new Date(),
    status: "draft",
    collaborators: [],
    pages: [],
  };
}

function createDocument(options = {}) {
  const initialCreateTime= new Date();
  return {
    id: `${ID.unique()}`,
    title: options.title,
    content:options.content,
    owner: options.owner,
    createdAt: initialCreateTime,
    updatedAt: initialCreateTime,
    status: "draft",
    collaborators: [],
    version:'0.1',
    attachments:[],
    glossary:options.glossaryId
  };
}

export {createGlossaryItem,createDocument};
