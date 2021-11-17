/** @jsx jsx */
import { jsx } from 'theme-ui'
import Img from 'gatsby-image'
import React from 'react'
import { Markdown } from './markdown'
import { BlobDownload } from './blob-download'

export function FreeContentBody(props) {
    const { content, emptyMessage } = props;
    return content.length > 0
            ? content.map(node => (
                <div id={node.id}>
                    <h3>{node.title}</h3>
                    <Markdown markdown={node.description.description} />
                    {node.previewImage && (
                        <Img 
                            fluid={node.previewImage.fluid} alt={node.previewImage.description}
                            sx={{
                                display: 'block',
                                width: '100%',
                            }} />
                    )}
                    { node.downloadableContent && node.downloadableContent.length > 0 && (
                        <React.Fragment>
                        <h4>Downloads</h4>
                        <ul>
                        {node.downloadableContent.map(download => (
                            <li key={download.id}>
                                <BlobDownload download={download} />
                            </li>
                        ))}
                        </ul>
                        </React.Fragment>
                    )}
                    { node.textContent && (
                        <Markdown markdown={node.textContent.textContent } />
                    )}
                </div>
            ))
            : (
              <p>{emptyMessage}</p>
          );
}