/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import React from 'react'
import {FaSpinner} from 'react-icons/fa'

export function BlobDownload(props) {
    const { download } = props;
    const [isFetching, setIsFetching] = React.useState(false);
    const [error, setError] = React.useState(null)
    const [downloadFileUrl, setDownloadFileUrl] = React.useState();
    const downloadRef = React.useRef(null); 
    function handleClick(event) {
        event.preventDefault();
        downloadRef.current.click();
    }
    React.useEffect(() => {
        setIsFetching(true)
        fetch(download.file.url)
            .then(res => res.blob())
            .then(URL.createObjectURL)
            .then(setDownloadFileUrl)
            .catch((error) => {
                setError(error);
                console.error(error);
            })
            .finally(() => setIsFetching(false))
    }, []);

    if (error) {
        return null;
    }

    return (
        <>
            <Button
                className={isFetching ? "animate-spin": ""}
                disabled={!downloadFileUrl || isFetching || error}
                sx={{ my: 2 }}
                title={download.title}
                variant="buttons.tertiary" 
                onClick={handleClick} >{
                    isFetching || !downloadFileUrl
                        ? <FaSpinner />
                        : download.title}
                </Button>
            <a 
                ref={downloadRef}
                sx={{ display: 'none'}}
                href={downloadFileUrl}
                download={download.file.fileName}>
                {download.title}
            </a>
        </>
    );
}