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

// Shuffle all video and Shorts titles
function shuffleYouTubeTitles() {
    console.log("Running YouTube Title Shuffler...");

    // Collect all main page videos & Shorts
    let videoElements = Array.from(document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer'));

    // Collect sidebar video titles
    let sidebarVideos = Array.from(document.querySelectorAll('ytd-compact-video-renderer'));

    // Extract main page video and Shorts titles
    let titles = videoElements.map(video => {
        // Regular video titles
        let titleElem = video.querySelector('#video-title');
        if (titleElem) {
            let title = titleElem.textContent.trim();
            return title.length > 0 ? title : randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
        }

        // Shorts titles (main page)
        let shortsTitleElem = video.querySelector('span.yt-core-attributed-string');
        if (shortsTitleElem) {
            let title = shortsTitleElem.textContent.trim();
            return title.length > 0 ? title : randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
        }

        // Fallback in case no title is found
        return randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    });

    // Extract sidebar video and Shorts titles
    let sidebarTitles = sidebarVideos.map(video => {
        // Sidebar video titles
        let titleElem = video.querySelector('#video-title');
        if (titleElem) {
            let title = titleElem.textContent.trim();
            return title.length > 0 ? title : randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
        }

        // Sidebar Shorts titles
        let shortsTitleElem = video.querySelector('span.yt-core-attributed-string');
        if (shortsTitleElem) {
            let title = shortsTitleElem.textContent.trim();
            return title.length > 0 ? title : randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
        }

        // Fallback
        return randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    });

    // Combine all titles into one list to shuffle
    let allTitles = titles.concat(sidebarTitles);
    shuffleArray(allTitles);

    // Apply shuffled titles back to the main page videos & Shorts
    videoElements.forEach((video, index) => {
        let titleElem = video.querySelector('#video-title');
        if (titleElem) {
            titleElem.textContent = allTitles[index];
        }

        let shortsTitleElem = video.querySelector('span.yt-core-attributed-string');
        if (shortsTitleElem) {
            shortsTitleElem.textContent = allTitles[index];
        }
    });

    // Apply shuffled titles back to sidebar videos & Shorts
    sidebarVideos.forEach((video, index) => {
        let titleElem = video.querySelector('#video-title');
        if (titleElem) {
            titleElem.textContent = allTitles[index + videoElements.length]; // Offset index for sidebar
        }

        let shortsTitleElem = video.querySelector('span.yt-core-attributed-string');
        if (shortsTitleElem) {
            shortsTitleElem.textContent = allTitles[index + videoElements.length]; // Offset index for sidebar
        }
    });

    console.log("Title shuffling complete.");
}

// Observe dynamic content changes
function observeYouTubeChanges() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && (node.matches('ytd-rich-item-renderer') || node.matches('ytd-video-renderer') || node.matches('ytd-compact-video-renderer'))) {
                    shuffleYouTubeTitles(); // Re-shuffle when new videos are added
                }
            });
        });
    });

    // Observe changes in the video list
    const targetNode = document.querySelector('ytd-rich-grid-renderer, ytd-section-list-renderer, ytd-watch-next-secondary-results-renderer');
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
        console.log("Observer initialized to watch for new videos and Shorts in sidebar.");
    } else {
        console.log("Could not find target container to observe.");
    }
}

// Shuffle after a short delay
setTimeout(() => {
    shuffleYouTubeTitles();
    observeYouTubeChanges(); // Observe for dynamically-loaded content
}, 3000);