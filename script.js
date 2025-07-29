const uploadInput = document.getElementById("upload");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const applyBtn = document.getElementById("apply");
const downloadLink = document.getElementById("download");

let imageData = "";

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      imageData = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

applyBtn.addEventListener("click", async () => {
  if (!imageData) {
    alert("Please upload an image first.");
    return;
  }

  applyBtn.textContent = "Applying...";
  try {
    const prompt = "Keep the original photo unchanged. Only modify the eyes to glow with a neon green dollar bag symbol inside them. Keep everything else, including style, color, pose, and background, exactly as in the original.";
    const response = await fetch("https://gangbags1-backend-3.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      })
    });

    const data = await response.json();
    if (data && data.data && data.data[0].url) {
      result.src = data.data[0].url;
      downloadLink.href = data.data[0].url;
    } else {
      alert("Error generating image.");
    }
  } catch (err) {
    alert("Failed to call OpenAI API: " + err.message);
  } finally {
    applyBtn.textContent = "Apply Gang Bags Style";
  }
});
