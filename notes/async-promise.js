// write a function to retrieve a blob of json
// make an ajax request! Use the 'fetch' function.
// https://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums(){
// 	fetch('https://rallycoding.herokuapp.com/api/music_albums').then( res => res.json()).then(json => console.log(json));
// }

// async function fetchAlbums(){
const fetchAlbums = async () => {
	const res = await fetch(
		'https://rallycoding.herokuapp.com/api/music_albums'
	);
	const json = await res.json();
	console.log(json);
};

fetchAlbums();

// This is because the port you are using to run the script is already in use. You have to stop all other node which are using that post . for that you can check all node by

// ps -e
// to Kill all node process

// sudo killall -9 node
// killall node
// "webhook": "./sendgrid_webhook.sh"
// "dev":
    //   "concurrently \"npm run server\" \"npm run client\" \"npm run webhook\"",
