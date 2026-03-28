
# Project Blueprint: Mobility Function Diagnosis and Exercise Recommendation Website

## Overview

This website will guide users through a self-diagnosis of their mobility function and provide personalized exercise recommendations from online sources like YouTube and reputable websites. The goal is to create an accessible and user-friendly tool that empowers users to improve their physical well-being.

## Features & Design

### Implemented

*   **Initial Project Setup:** Basic HTML, CSS, and JavaScript files have been created.

### Current Plan

1.  **Header:**
    *   A prominent, welcoming header with the title "Mobility Hub".
    *   A brief, encouraging introductory text.
    *   A visually appealing background image related to fitness or well-being, sourced from Pexels.

2.  **Mobility Diagnosis Section:**
    *   A series of simple, non-strenuous tests that users can perform at home.
    *   Each test will have a clear description and an accompanying visual (image or GIF).
    *   Tests will target different areas of mobility, such as:
        *   Shoulder flexibility
        *   Hip mobility
        *   Spinal mobility
        *   Ankle flexibility
    *   For each test, users will answer a simple question (e.g., "Could you complete this movement without discomfort?").

3.  **Exercise Recommendation Section:**
    *   Based on the user's answers, the website will dynamically display a list of recommended exercises.
    *   Each recommendation will include:
        *   The name of the exercise.
        *   A brief description of its benefits.
        *   An embedded YouTube video demonstrating the exercise.
        *   A link to a reputable website for more information (e.g., a physical therapy or fitness site).
    *   Exercises will be categorized by the mobility area they target.

4.  **Styling & Design:**
    *   **Color Palette:** A clean and energetic palette.
    *   **Typography:** Clear, legible fonts with good hierarchy.
    *   **Layout:** A responsive, mobile-first design that works well on all screen sizes.
    *   **Visuals:** High-quality images from Pexels to enhance the user experience.
    *   **Interactivity:** Smooth transitions and subtle animations to make the site feel dynamic.

5.  **Web Components:**
    *   `<mobility-test>`: A custom element to display each mobility test, encapsulating the test's description, image, and question.
    *   `<exercise-recommendation>`: A custom element to display each exercise recommendation, including the embedded video and links.
