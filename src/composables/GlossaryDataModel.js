
function createGlossaryItem(options = {}) {
  return {
    id: `${Date.now()}`,
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
    id: Date.now(),
    title: options.title,
    content:options.content,
    owner: "Udit",
    createdAt: initialCreateTime,
    updatedAt: initialCreateTime,
    status: "draft",
    collaborators: [],
    version:'0.1',
    attachments:[]
  };
}

export {createGlossaryItem,createDocument};
