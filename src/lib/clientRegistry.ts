export const GOAL_TEMPLATES = {
  "revenue-recovery": {
    label: "Revenue Recovery (LTV)",
    aiPersona: "Financial Growth Strategist",
    focus: "Mapping friction to churn and monetary loss.",
    primaryMetric: "LTV/Revenue"
  },
  "operational-safety": {
    label: "Operational Risk & Safety",
    aiPersona: "Compliance & Safety Auditor",
    focus: "Identifying high-severity clusters and infrastructure failures.",
    primaryMetric: "Risk Score"
  },
  "product-feedback": {
    label: "Product Innovation",
    aiPersona: "Product Manager",
    focus: "Discovery of 'unknown-unknown' feature requests and bugs.",
    primaryMetric: "Sentiment Trend"
  }
};

export const CLIENT_REGISTRY: Record<string, any> = {
  "retail-giant-beta": {
    name: "Retail Giant Beta",
    passkey: "beta123",
    goalType: "revenue-recovery" // Links to the template above
  },
  "pharma-secure": {
    name: "Swiss Pharma Corp",
    passkey: "pharma99",
    goalType: "operational-safety"
  }
};