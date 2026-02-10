// Blog Posts Data - Easy to add new posts here
const blogPosts = {
    'rag-architecture': {
        title: 'Understanding RAG Architecture',
        date: 'January 15, 2025',
        content: `
            <h1>Understanding RAG Architecture</h1>
            <p class="blog-meta">Published on January 15, 2025</p>
            
            <p>Retrieval-Augmented Generation (RAG) is a powerful technique that combines the strengths of retrieval-based and generation-based AI models.</p>
            
            <h2>What is RAG?</h2>
            <p>RAG enhances Large Language Models (LLMs) by providing them with relevant context from external knowledge bases before generating responses.</p>
            
            <h2>Key Components</h2>
            <ul>
                <li><strong>Document Store:</strong> Contains the knowledge base</li>
                <li><strong>Embeddings:</strong> Vector representations of text</li>
                <li><strong>Vector Database:</strong> Stores and retrieves embeddings efficiently</li>
                <li><strong>LLM:</strong> Generates responses based on retrieved context</li>
            </ul>
            
            <h2>Benefits</h2>
            <p>RAG allows AI systems to provide more accurate, up-to-date, and contextually relevant responses without retraining the entire model.</p>
        `
    },
    'first-chatbot': {
        title: 'Building My First AI Chatbot',
        date: 'December 20, 2024',
        content: `
            <h1>Building My First AI Chatbot</h1>
            <p class="blog-meta">Published on December 20, 2024</p>
            
            <p>Creating an AI-powered student assistant chatbot was an exciting journey that taught me a lot about LangChain, vector databases, and prompt engineering.</p>
            
            <h2>The Challenge</h2>
            <p>Students needed quick, accurate answers to their academic queries without waiting for human assistance.</p>
            
            <h2>The Solution</h2>
            <p>I built a RAG-based chatbot using:</p>
            <ul>
                <li>Python and LangChain for orchestration</li>
                <li>OpenAI embeddings for vector representations</li>
                <li>Pinecone as the vector database</li>
                <li>GPT-3.5 for response generation</li>
            </ul>
            
            <h2>Lessons Learned</h2>
            <p>Prompt engineering is crucial. The quality of responses depends heavily on how you structure your prompts and context.</p>
        `
    },
    'flutter-tips': {
        title: 'Flutter Development Tips',
        date: 'November 10, 2024',
        content: `
            <h1>Flutter Development Tips</h1>
            <p class="blog-meta">Published on November 10, 2024</p>
            
            <p>After building several Flutter applications, here are my top tips for efficient cross-platform development.</p>
            
            <h2>1. State Management</h2>
            <p>Choose the right state management solution early. Provider and Riverpod are great for most applications.</p>
            
            <h2>2. Widget Composition</h2>
            <p>Break down complex UIs into smaller, reusable widgets. This makes your code more maintainable.</p>
            
            <h2>3. Performance Optimization</h2>
            <ul>
                <li>Use const constructors wherever possible</li>
                <li>Avoid rebuilding widgets unnecessarily</li>
                <li>Implement lazy loading for lists</li>
            </ul>
            
            <h2>4. Testing</h2>
            <p>Write widget tests and integration tests from the start. It saves time in the long run.</p>
        `
    }
};

// Load blog post based on URL parameter
function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    const contentDiv = document.getElementById('blog-content');
    
    if (postId && blogPosts[postId]) {
        contentDiv.innerHTML = blogPosts[postId].content;
    } else {
        contentDiv.innerHTML = `
            <h1>Blog Post Not Found</h1>
            <p>The requested blog post doesn't exist.</p>
            <a href="index.html#blog" class="btn btn-primary">Back to Blog</a>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadBlogPost);

// TO ADD A NEW BLOG POST:
// 1. Add a new entry to the blogPosts object above
// 2. Add a corresponding card in index.html blog section
// 3. Use the same key in the href: blog.html?post=your-post-key
