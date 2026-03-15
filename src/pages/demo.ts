const params = new URLSearchParams(location.search);
const id = params.get("id");

if (!id) {
  throw new Error("id is required");
}

import(`../demos/${id}/index.ts`)