# Central Statistics Dashboard

This project was initially conceived as a solution to improve the user experience of data provided by the Central Bureau of Statistics (לשכה המרכזית לסטטיסטיקה). However, after thorough testing, it became clear that the underlying API is highly inconsistent and unreliable—no amount of UI refinement can compensate for its shortcomings. Nonetheless, this project remains a robust demonstration of modern React and Material‑UI techniques, along with a seamless data fetching strategy using Axios and fast‑xml‑parser.

## Overview

- **Objective:**  
  Provide a user-friendly dashboard for statistical data from the Central Bureau of Statistics.  
  **Reality Check:** The API is problematic and often fails to deliver consistent results. This project highlights the importance of reliable backend data sources in any frontend redesign.

- **Key Features:**  
  - **Responsive UI:** Built with React and Material‑UI, supporting both RTL and LTR layouts.  
  - **Data Fetching Strategy:**  
    - Attempts to fetch data as JSON via Axios.  
    - Falls back to XML and converts it to JSON using fast‑xml‑parser when needed.  
  - **Toggleable Catalog Views:** Users can switch between tree and list views for catalog data.

## Technologies

- [React](https://reactjs.org/)
- [Material‑UI (MUI)](https://mui.com/)
- [Axios](https://axios-http.com/)
- [fast‑xml‑parser](https://www.npmjs.com/package/fast-xml-parser)
- [Lucide React Icons](https://lucide.dev/)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Customize the Theme (Optional):**

   Modify the theme settings in `./src/theme.js` (or `./src/theme.ts`) to adjust colors, typography, and spacing as needed.

## Running the Application

Start the development server:

```bash
npm start
# or
yarn start
```

The app will run on [http://localhost:3000](http://localhost:3000).

## Data Fetching Strategy

The `fetchData` function handles data retrieval as follows:

1. **Primary JSON Request:**  
   Uses Axios to fetch data with an `Accept: application/json` header.
2. **Fallback to XML:**  
   If the JSON request fails, the function automatically retries the request as XML, then converts the XML to JSON using fast‑xml‑parser.

### Example Usage

```js
fetchData({
  url: 'https://apis.cbs.gov.il/series/catalog/level',
  params: { id: 2, subject: 2, format: 'json', download: false },
})
  .then((data) => console.log('Fetched data:', data))
  .catch((err) => console.error('Data fetch error:', err));
```

## Project Structure

```
.
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── CatalogList.js
│   │   ├── CatalogTreeView.js
│   │   └── CatalogToggleView.js
│   ├── fetchData.js
│   ├── theme.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Known Issues

- **API Reliability:**  
  The Central Bureau of Statistics API is inconsistent. Despite our efforts to gracefully degrade from JSON to XML, the unreliable API remains a major hurdle.
- **Infinite Request Loop:**  
  Ensure that asynchronous operations are properly handled in React (e.g., using `useEffect` for data fetching) to avoid rendering loops.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome. If you have suggestions for improving the data fetching strategy or handling API inconsistencies, please open an issue or submit a pull request.

---

### Final Note

While this project demonstrates modern frontend development techniques and best practices, it also serves as a case study in the critical role that dependable API design plays in application success. In this instance, even the best design cannot fully compensate for a fundamentally flawed backend service.
