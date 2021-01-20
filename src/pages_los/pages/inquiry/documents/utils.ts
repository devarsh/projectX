import { APITemplateData } from "./types";

export const normalizeTemplateData = (data: APITemplateData[]) => {
  if (Array.isArray(data)) {
    const map = new Map();
    data.forEach((item) => {
      let collection = map.get(item.doc_type ?? "notFound");
      if (
        collection !== undefined &&
        collection?.items !== null &&
        Array.isArray(collection.items)
      ) {
        collection.items.push({
          docDescription: item.docDescription,
          docLabel: item.docTitle,
          docID: item.docID,
          status: item.status ?? "",
        });
      } else {
        collection = {
          groupName: item.doc_type,
          groupLabel: "",
          items: [
            {
              docDescription: item.docDescription,
              docLabel: item.docTitle,
              docID: item.docID,
              status: item.status,
            },
          ],
        };
        map.set(item.doc_type ?? "notFound", collection);
      }
    });
    let result = Array.from(map);
    result = result.map((one) => one[1]);
    map.clear();
    return result as any[];
  }
  return [] as any[];
};
