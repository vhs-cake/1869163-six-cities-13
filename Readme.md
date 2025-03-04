# Six Cities

Six Cities is a travel service designed for budget-conscious travelers looking for affordable rental accommodations. Choose from six popular cities and get an up-to-date list of rental offers. Detailed information about each property, interactive maps, and a user-friendly interface help you quickly find the best option.

## 1. Features

### 1.1 Application Pages

The application consists of the following pages:
- **Main Page (/)**
- **Login Page (/login)**
- **Favorites Page (/favorites) (Private)**
- **Offer Page (/offer/:id)**

#### Page Access Rules:
- The **Favorites Page** is only available to authorized users.
- If a user is authorized and tries to access the **Login Page**, they will be redirected to the **Main Page**.
- If an unauthorized user attempts to access a private page, they will be redirected to the **Login Page**.
- The header displays a link to the **Login Page** (if the user is not authorized) or the user's email and a **Log Out** button (if authorized).
- Clicking the **Log Out** button logs out the user and exits the private section of the application.
- Clicking the user’s email redirects to the **Favorites Page**.
- Non-existent pages redirect the user to a **404 Page**, which contains a message and a link back to the main page.

### 1.1.1 Main Page

- The main page displays a list of six cities with rental offers:
  - Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf.
- By default, **Paris** is selected, and rental offers for this city are displayed.
- Offers are shown on a map with **blue markers**.
- Changing the selected city updates the list of offers and the map.
- The header displays the number of available rental offers, e.g., **"312 places to stay in Amsterdam"**.
- Each offer card includes:
  - Image of the rental property.
  - **Premium label** (if applicable).
  - **Price per night (in EUR)**.
  - **Title** (e.g., "Beautiful & luxurious apartment at great location").
  - **Property type** (apartment, room, house, hotel).
  - **Favorite button**:
    - Clicking it adds/removes the property from favorites.
    - If the user is not authorized, they will be redirected to **Login Page**.
  - **Rating (1-5 stars)**:
    - Rounded to the nearest whole number.
    - Example: **3.1 → 3 stars, 4.5 → 5 stars**.
  - Clicking the **title** opens the **Offer Page** with detailed information.
- Sorting options for offers:
  - **Popular (default order from the server)**
  - **Price: low to high**
  - **Price: high to low**
  - **Top rated first**
  - Sorting menu opens on click and closes when an option is selected.

### 1.1.1.2 Map
- All rental offers for the selected city are shown on a map with **blue markers**.
- Hovering over an offer card highlights its marker **in orange**.
- On the **Offer Page**, markers do not change color.

### 1.1.2 Offer Page (/offer/:id)
- Displays detailed rental information:
  - Up to **6 photos**.
  - **Title and description**.
  - **Premium label (if applicable)**.
  - **Property type** (apartment, room, house, hotel).
  - **Rating (1-5 stars, rounded)** and **average score (not rounded)**.
  - **Number of bedrooms** (e.g., "3 Bedrooms").
  - **Maximum guests** (e.g., "Max 4 adults").
  - **Price per night (in EUR)**.
  - **Amenities** (e.g., WiFi, Heating, Kitchen, Cable TV, etc.).
  - **Host information** (avatar, name, "Pro" badge if applicable).
  - **Favorite button** (adds/removes from favorites, redirects to **Login Page** if unauthorized).
  - **User Reviews Section**:
    - Displays up to **10 reviews**, sorted **newest to oldest**.
    - Shows **total review count**.
    - Reviews include:
      - **Author avatar and name**
      - **Rating (1-5 stars)**
      - **Date (formatted as Month Year, e.g., "April 2019")**
      - **Review text**
  - **Nearby Offers**:
    - **3 random nearby rental offers** displayed on a map along with the current offer.
    - Current offer marker is **orange**, others are **blue**.
    - Below the map, offer cards are shown with the same details as on the main page.

### 1.1.2.2 Review Submission Form
- Available **only for authorized users**.
- Users must select a **rating (1-5 stars)** and write a **review (50-300 characters)**.
- The **Submit button is disabled** until a valid rating and review are entered.
- Upon submission:
  - The form and button become **disabled**.
  - On **success**, the form is **cleared**.
  - On **error**, the user is notified.
- Users can submit **multiple reviews**.

### 1.1.3 Login Page (/login)
- Users enter **email** and **password**.
- No registration is required—any non-empty credentials work.
- **Email must be valid**.
- **Password must contain at least one letter and one number**.
- Only accessible to **unauthorized users** (authorized users are redirected to **Main Page**).

### 1.1.4 Favorites Page (/favorites)
- Only accessible to **authorized users**.
- Displays all **favorite rental offers**, grouped **by city**.
- Clicking the **Favorite button** removes an offer from the list.
- If no offers are favorited, the page displays **"Nothing yet saved"**.
- The header displays the **number of favorite offers**, updating dynamically.

## 2. API Interaction

- The application interacts with a backend server.
- **Server Base URL**: [https://13.design.htmlacademy.pro/six-cities](https://13.design.htmlacademy.pro/six-cities)
- If the server is unavailable, an **error message** is shown.
- **All requests are sent in JSON format**.
- **Authorization**:
  - The server requires a **token-based authentication**.
  - The token is included in the **X-Token header** with each request.
## Getting Started

### Clone the repository

### Installation
```npm install```

### Running the Application
```npm start```



