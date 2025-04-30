import { QueryClient } from "@tanstack/react-query";

// Function to check if response is ok and throw error if not
async function throwIfResNotOk(res) {
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const json = await res.json();
      throw new Error(json.message || "An unknown error occurred");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// API request function for data fetching
export async function apiRequest(method, endpoint, data) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, options);
  await throwIfResNotOk(response);

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }

  return response.text();
}

// QueryClient configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});