export const QUESTIONS = {
    general: [
        { key: 'Gender', question: 'Gender (Male/Female)', type: 'text' },
        { key: 'Age', question: 'Age group [17-25/26-30/31-35/36-40/41-45/46-50/50+]', type: 'text' },
        { key: 'Occupation', question: 'Occupation [Student/Professional/GovEmployee/Entrepreneur/Retired]', type: 'text' },
        { key: 'Income', question: 'Income level [<5M/5-10M/10-20M/20-50M/50M+]', type: 'text' },
        { key: 'StockValue', question: 'Total Stock Investment Value [<5M/5-10M/10-20M/20-50M/50-100M/100M]', type: 'text' }
    ],
    bigFive: {
        Op: ["I enjoy exploring new ideas", "I like unfamiliar activities", "I'm curious", "I prefer novelty", "I enjoy creativity"],
        Co: ["I prepare in advance", "I'm reliable", "I pay attention to details", "I follow plans", "I'm efficient"],
        Ex: ["I like attention", "Comfortable socially", "I talk a lot", "Energetic with people", "I make friends easily"],
        Ag: ["I'm kind", "Avoid conflict", "I trust easily", "I'm cooperative", "I'm empathetic"],
        Ne: ["I stress easily", "I worry", "I get upset", "I'm nervous", "Mood swings"]
    },
    behaviour: {
        FI: ["Follow news", "Monitor investments", "Enjoy finance", "Research before investing", "Review goals"],
        RI: ["Take risks", "Comfortable volatility", "High-risk return", "Not afraid to lose money", "Uncertain assets OK"],
        FD: ["Quick decisions", "Use intuition", "Bold choices", "Prefer fast results", "No overthinking"]
    }
};

