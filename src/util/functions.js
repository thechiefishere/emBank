export const getLinksFromCategory = (allLinks, category) => {
  const categoryToLowerCase = category.toLowerCase();
  const object = allLinks.filter((link) => {
    return link.category.toLowerCase() === categoryToLowerCase;
  });

  return object[0].links;
};
