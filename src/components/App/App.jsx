import { useState } from 'react';

import mockData from '../../mockData.json';

import SearchResults from '../SearchResults/SearchResults';


import styles from './App.module.css';

function App() {
	const [searchResults, setSearchResults] = useState(mockData);

	return (
		<div>
			<h1>Spotylist</h1>

			<div className={styles.App}>
				{/* Add SearchBar component */}

				<div className={styles["App-playlist"]}>
					<SearchResults searchResults={searchResults} />
					{/* Add Playlist component */}
				</div>
			</div>
		</div>
	);
}

export default App;