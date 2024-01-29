import axios from "axios";
const POST_TextContents =
  "https://4tt3fvdg39.execute-api.us-east-1.amazonaws.com/dev";

async function postTextContents() {
  const response = await axios.post(POST_TextContents, {
    texts: ["cat", "in", "boots"],
    userId: "00001",
  });
  console.log(response.data);
}

export default postTextContents;
