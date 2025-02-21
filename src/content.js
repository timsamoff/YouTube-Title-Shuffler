// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Random quotes to use for missing titles
const randomQuotes = [
    "The journey of a thousand miles begins with one step...",
    "Life is what happens when you’re busy making other plans",
    "Do what you can, with what you have, where you are",
    "You miss 100% of the shots you don’t take",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Not all those who wander are lost",
    "Everything you can imagine is real",
    "Turn your wounds into wisdom",
    "Happiness depends upon ourselves",
    "The only limit to our realization of tomorrow is our doubts of today...",
    "Imagination is more important than knowledge",
    "Not all those who wander are lost",
    "Do. or do not. There is no try.",
    "The way to get started is to quit talking and begin doing",
    "To infinity and beyond!",
    "Common sense is like deodorant. The people who need it most never use it.",
    "Gravitation is not responsible for people falling in love",
    "As you get older, three things happen. The first is your memory goes, and I can’t remember the other two.",
    "Clothes make the man. Naked people have little or no influence in society.",
    "Some people care too much. I think it's called love.",
    "And now that you don't have to be perfect, you can be good.",
    "Lighten up on yourself. No one is perfect. Gently accept your humanness",
    "To love oneself is the beginning of a lifelong romance",
    "Self-care is how you take your power back",
    "Take the time today to love yourself. You deserve it.",
    "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure",
    "Everybody is different, and every body is different",
    "No one is dumb who is curious. The people who don't ask questions remain clueless throughout their lives.",
    "Don't go chasing waterfalls",
    "You look pretty!",
    "I made like a tree and left",
    "Nothing is impossible unless you can't do it",
    "I figured something out. Life is unpredictable.",
    "The following statement is true. The previous statement is false.",
    "Have you ever wondered why you can't taste your tongue?"
];

// Shuffle YouTube titles
function shuffleYouTubeTitles() {
    console.log("🔄 Shuffling YouTube titles...");

    // Select video elements (Main page & Sidebar)
    let videoElements = Array.from(document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer'));

    // Extract titles
    let titles = videoElements.map(video => {
        let titleElem = video.querySelector('#video-title') || video.querySelector('span.yt-core-attributed-string');
        let title = titleElem ? titleElem.textContent.trim() : "";
        return title.length > 0 ? title : randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    });

    // Shuffle titles
    shuffleArray(titles);

    // Apply shuffled titles back
    videoElements.forEach((video, index) => {
        let titleElem = video.querySelector('#video-title') || video.querySelector('span.yt-core-attributed-string');
        if (titleElem) {
            titleElem.textContent = titles[index];
        }
    });

    console.log("✅ Title shuffling complete.");
}

// Observe sidebar changes
function observeSidebar() {
    const sidebar = document.querySelector('ytd-watch-next-secondary-results-renderer');
    if (!sidebar) {
        console.log("⚠️ Sidebar not found. Retrying...");
        setTimeout(observeSidebar, 2000); // Retry in 2 seconds
        return;
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                console.log("📌 New sidebar content detected. Shuffling...");
                setTimeout(shuffleYouTubeTitles, 1500); // Allow content to fully load
            }
        });
    });

    observer.observe(sidebar, { childList: true, subtree: true });
    console.log("👀 Sidebar observer activated.");
}

// Detect internal page navigation
function detectPageChange() {
    let lastUrl = location.href;

    setInterval(() => {
        if (location.href !== lastUrl) {
            console.log("🔄 URL changed! Updating sidebar...");
            lastUrl = location.href;
            setTimeout(() => {
                shuffleYouTubeTitles();
                observeSidebar();
            }, 2000); // Delay for loading
        }
    }, 500);
}

// Listen for internal navigation events
function addYouTubeEventListener() {
    document.addEventListener("yt-navigate-finish", () => {
        console.log("🎯 YouTube navigation detected!");
        setTimeout(() => {
            shuffleYouTubeTitles();
            observeSidebar();
        }, 2000); // Allow content to load
    });
}

// Run after page load
setTimeout(() => {
    shuffleYouTubeTitles();
    observeSidebar();
    detectPageChange();
    addYouTubeEventListener();
}, 3000);