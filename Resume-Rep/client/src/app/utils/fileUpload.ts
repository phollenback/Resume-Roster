export const uploadFile = async (file: File) => {
    console.log('file name', file.name);

    // Get the presigned URL and fields from the server
    const response = await fetch("/api/get-presigned-url", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const { url, fields } = await response.json();

    // Create FormData and append necessary fields and the file
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string); // Assume value is a string
    });
    formData.append('file', file); // Append the file here

   // Fire off the upload without waiting for the response
   fetch(url, {
    method: "POST",
    body: formData,
    }).catch(error => {
        console.error("Failed to upload file:", error);
    });

    console.log('File uploaded successfully');
};