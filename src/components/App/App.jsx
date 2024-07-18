import { useState } from 'react';

import mockData from '../../mockData.json';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import styles from './App.module.css';

function App() {
	const [searchResults, setSearchResults] = useState(mockData);
	const [playlistName, setPlaylistName] = useState("Playlist 1");
	const [playlistTracks, setPlaylistTracks] = useState(mockData);

	return (
		<div>
			<h1>Spotylist</h1>

			<div className={styles.App}>
				{/* Add SearchBar component */}

				<div className={styles["App-playlist"]}>
					<SearchResults searchResults={searchResults} />
					<Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
				</div>
			</div>
		</div>
	);
}

export default App;