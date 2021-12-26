import { getRoute, postRoute } from "./AuthService";

export const postRelationshipType = name => {
  return postRoute("relationshipTypes", JSON.stringify({ name: name }));
};

export const getMyRelationshipType = () => {
  return getRoute("userRelationshipTypes");
};

export const getMyRelationship = () => {
  return getRoute("relationships");
};

export const getRelationshipDetail = (id) => {
  return getRoute("relationships/" + id);
}

export const postRelationship = (name, relationshipTypeId) => {
  return postRoute(
    "relationships",
    JSON.stringify({ name: name, userRelationshipTypeId: relationshipTypeId })
  );
};
