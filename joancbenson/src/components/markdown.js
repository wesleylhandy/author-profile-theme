import React from 'react';
import marked from 'marked';

export function Markdown(props) {
    const { markdown } = props;
    return (
        <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: typeof markdown === 'string' ? marked(markdown, {
                    breaks: true,
                    gfm: true,
                    silent: true,
                    smartLists: true,
                    smartypants: true,
                }) : '',
            }}
        />
    );
}
