// public/ai-engine.js
async function startNeuralCore() {
    try {
      const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@latest');
      env.allowLocalModels = false;
  
      console.log("Loading models...");
  
      window.aiEmbedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { quantized: true });
      console.log("Embedder ready");
  
      window.aiClassifier = await pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', { quantized: true });
      console.log("Classifier ready");
  
      // Fast & reliable generator: LaMini-Flan-T5-248M (~300 MB, 30–90s load)
      window.aiGenerator = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-248M', { quantized: true });
      console.log("Generator ready");
  
      console.log("✅ All models loaded");
      window.dispatchEvent(new CustomEvent('AI_ENGINE_READY'));
    } catch (e) {
      console.error("Engine failed:", e);
      window.dispatchEvent(new CustomEvent('AI_ENGINE_ERROR', { detail: e.message || 'Failed to load models' }));
    }
  }
  
  startNeuralCore();