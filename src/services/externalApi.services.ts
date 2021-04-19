import axios from "axios";

const httpExternalApi = async (uri: string) => {
  try {
    const response = await axios.get(uri);
    return {
      status: 200,
      response: response.data
    };
  } catch (error) {
    return {
      status: 400,
      error
    }
  }
};

export { httpExternalApi };