let quotes = [
    {"quote": "The best way to get started is to quit talking and begin doing.", "author": "- Walt Disney"},
    {"quote": "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.", "author" :"- Winston Churchill"},
    {"quote": "Don’t let yesterday take up too much of today.", "author" :"- Will Rogers"},
    {"quote": "You miss 100% of the shots you don't take - Wayne Gretzky", "author": "- Michael Scott"},
    {"quote": "Believe you can and you're halfway there.", "author": "- Theodore Roosevelt"},
    {"quote": "The only way to do great work is to love what you do.", "author": "- Steve Jobs"},
    {"quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.", "author": "- Winston Churchill"},
    {"quote": "Don't watch the clock; do what it does. Keep going.", "author": "- Sam Levenson"},
    {"quote": "The future belongs to those who believe in the beauty of their dreams.", "author": "- Eleanor Roosevelt"},
    {"quote": "The harder you work for something, the greater you'll feel when you achieve it.", "author": "- Unknown"},
    {"quote": "Your time is limited, don't waste it living someone else's life.", "author": "- Steve Jobs"},
    {"quote": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "author": "- Albert Schweitzer"},
    {"quote": "Don't wait for opportunity. Create it.", "author": "- Unknown"},
    {"quote": "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "author": "- Christian D. Larson"},
]

document.addEventListener('DOMContentLoaded', function() {
    const quote = quotes[Math.floor(Math.random()*quotes.length)];
    document.getElementById('quote').innerText = quote.quote;
    document.getElementById('author').innerText = quote.author;
});
