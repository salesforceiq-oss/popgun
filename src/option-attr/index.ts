
function isOptionAttr(attrName: string): boolean {
  return (
      attrName.indexOf('data-popgun-') === 0 || attrName.indexOf('popgun-') === 0
  ) && !isSchemaAttr(attrName);
}

function isSchemaAttr(attrName: string): boolean {
  return attrName === 'data-popgun-schema' || attrName === 'popgun-schema';
}

// function 

export {
  isOptionAttr,
  isSchemaAttr
}