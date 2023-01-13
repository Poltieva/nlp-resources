import axios from "axios";

export default function handleDelete(url) {
    axios
        .delete(url)
        .then((response) => {
            if (response.status === 204) {
                window.location.reload(true);
            }
        })
        .catch((e) => console.log('something went wrong!', e));
}