
const pexelsApiKey = "ZgonpcSFd8s5CogZvcPvgr7TwCRAj1mBEsYcF5KezR78F2cBiDq2FpYM";
const diagnosisSection = document.getElementById('diagnosis-section');
const recommendationSection = document.getElementById('recommendation-section');
const header = document.querySelector('header');

// Fetch background image from Pexels
async function getBackgroundImage() {
    try {
        const response = await fetch('https://api.pexels.com/v1/search?query=nature&per_page=1', {
            headers: {
                Authorization: pexelsApiKey
            }
        });
        const data = await response.json();
        const imageUrl = data.photos[0].src.landscape;
        header.style.backgroundImage = `url(${imageUrl})`;
    } catch (error) {
        console.error('Error fetching background image:', error);
    }
}

// Web component for mobility tests
class MobilityTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const image = this.getAttribute('image');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                img {
                    max-width: 100%;
                    border-radius: 5px;
                }
                p {
                    margin-top: 1rem;
                }
                .options {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                button {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                button:hover {
                    background-color: #0056b3;
                }
            </style>
            <h3>${title}</h3>
            <img src="${image}" alt="${title}">
            <p>${description}</p>
            <div class="options">
                <button class="yes">Yes</button>
                <button class="no">No</button>
            </div>
        `;

        this.shadowRoot.querySelector('.yes').addEventListener('click', () => this.handleResponse(true));
        this.shadowRoot.querySelector('.no').addEventListener('click', () => this.handleResponse(false));
    }

    handleResponse(canDo) {
        const event = new CustomEvent('test-result', {
            detail: {
                test: this.getAttribute('title'),
                canDo: canDo
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}

// Web component for exercise recommendations
class ExerciseRecommendation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const videoId = this.getAttribute('video-id');
        const link = this.getAttribute('link');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                h3 {
                    margin-top: 0;
                    color: var(--primary-color);
                }
                iframe {
                    width: 100%;
                    border-radius: 5px;
                }
                a {
                    color: var(--primary-color);
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
            <h3>${title}</h3>
            <p>${description}</p>
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p><a href="${link}" target="_blank">More information</a></p>
        `;
    }
}

customElements.define('mobility-test', MobilityTest);
customElements.define('exercise-recommendation', ExerciseRecommendation);

const mobilityTests = [
    {
        title: 'Shoulder Flexibility',
        description: 'Can you touch your hands behind your back?',
        image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' // Replace with a relevant image from Pexels
    },
    {
        title: 'Hip Mobility',
        description: 'Can you sit in a deep squat?',
        image: 'https://images.pexels.com/photos/4164086/pexels-photo-4164086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' // Replace with a relevant image from Pexels
    },
    {
        title: 'Spinal Mobility',
        description: 'Can you touch your toes without bending your knees?',
        image: 'https://images.pexels.com/photos/4498155/pexels-photo-4498155.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' // Replace with a relevant image from Pexels
    }
];

const exerciseRecommendations = {
    'Shoulder Flexibility': {
        title: 'Shoulder Pass-Throughs',
        description: 'Improves shoulder mobility and flexibility.',
        videoId: 'h-a-D_6s-cM',
        link: 'https://www.healthline.com/health/exercise-fitness/shoulder-stretches'
    },
    'Hip Mobility': {
        title: 'Deep Squat',
        description: 'Improves hip flexibility and strength.',
        videoId: 'av3b1_R2h3M',
        link: 'https://www.healthline.com/health/fitness-exercise/deep-squat'
    },
    'Spinal Mobility': {
        title: 'Cat-Cow Stretch',
        description: 'Improves spinal flexibility and relieves back tension.',
        videoId: 'kqnua4rHVVA',
        link: 'https://www.yogajournal.com/poses/cat-pose/'
    }
};

function populateTests() {
    diagnosisSection.innerHTML = '<h2>Diagnose Your Mobility</h2>';
    for (const test of mobilityTests) {
        const mobilityTest = document.createElement('mobility-test');
        mobilityTest.setAttribute('title', test.title);
        mobilityTest.setAttribute('description', test.description);
        mobilityTest.setAttribute('image', test.image);
        diagnosisSection.appendChild(mobilityTest);
    }
}

function handleTestResult(event) {
    const { test, canDo } = event.detail;

    if (!canDo) {
        const recommendation = exerciseRecommendations[test];
        const exerciseRecommendation = document.createElement('exercise-recommendation');
        exerciseRecommendation.setAttribute('title', recommendation.title);
        exerciseRecommendation.setAttribute('description', recommendation.description);
        exerciseRecommendation.setAttribute('video-id', recommendation.videoId);
        exerciseRecommendation.setAttribute('link', recommendation.link);

        if (recommendationSection.children.length < 2) {
            recommendationSection.innerHTML = '<h2>Personalized Exercises</h2>'
        }

        recommendationSection.appendChild(exerciseRecommendation);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    getBackgroundImage();
    populateTests();
    document.addEventListener('test-result', handleTestResult);
});
